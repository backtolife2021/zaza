#!/usr/bin/env zx

import child_process from 'child_process'
import { createRequire } from 'node:module'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import msgpack from '@msgpack/msgpack'
import { enableAllPlugins, produce } from 'immer'
import isValidVarName from 'is-valid-var-name'
import neovim from 'neovim'
import prettier from 'prettier'
import ts from 'typescript'
import { $, fs, globby, path } from 'zx'

enableAllPlugins()

/** @see https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * @see https://stackoverflow.com/questions/33913020/docker-remove-none-tag-images
 */
export const download_neovim_msgpack = async () => {
  return $`DOCKER_BUILDKIT=1 docker build --no-cache -f ${path.join(
    __dirname,
    '../dockerfile'
  )} -o data/mpack . && docker image prune`
}

/**
 * @see https://github.com/folke/lua-dev.nvim/issues/27
 * @see https://stackoverflow.com/questions/56517061/how-to-download-the-latest-file-from-a-github-repository
 */
export const download_builtin_docs = async () => {
  return $`curl https://raw.githubusercontent.com/iamcco/vim-language-server/master/src/docs/builtin-docs.json -o ${path.join(
    __dirname,
    '../data/json/builtin-docs.json'
  )}`
}

/**
 * @see https://stackoverflow.com/a/59271443/11791657
 */
export const download_lua_dev_types = async () => {
  const dir = `${path.join(__dirname, '../data/lua')}`
  return $`rm -rf ${dir} && svn export https://github.com/folke/lua-dev.nvim/trunk/types ${dir} && rm -rf ${path.join(
    dir,
    '.git'
  )}`
}

/**
 * @see https://github.com/folke/lua-dev.nvim#-how
 */
export const msgpack2json = async () => {
  for await (const file of globby.globbyStream(
    path.join(__dirname, '../data/mpack/*.mpack')
  )) {
    const context = await fs.readFile(file)
    const object = msgpack.decode(context)
    const json = JSON.stringify(object)

    await fs.writeFile(
      path.join(__dirname, `../data/json/${path.parse(file.toString()).name}.json`),
      prettier.format(json, {
        parser: 'json',
        ...createRequire(import.meta.url)('../../../.prettierrc.json'),
      })
    )
  }
}

/**
 * @see https://astexplorer.net/
 * @see https://shadeglare.medium.com/typescript-code-generation-using-its-compiler-api-4c50ad9f7884
 * @see https://github.com/HearTao/ts-creator
 * @see https://github.com/neovim/node-client#attach
 * @see https://github.com/folke/lua-dev.nvim/blob/6a7abb62af1b6a4411a3f5ea5cf0cb6b47878cc0/lua/lua-dev/parser.lua#L188
 * @see https://github.com/neovim/neovim/blob/389a898586c1ed2c6cd50f3099ff50fe0645f86f/runtime/doc/api.txt#L868
 * @see https://github.com/neovim/node-client/blob/81285291295339e79308966069b98257159ca00f/src/api/Neovim.ts#L30
 * @see https://github.com/nanotee/nvim-lua-guide
 */
export const json2ts = async () => {
  const { attach } = neovim
  const nvim_proc = child_process.spawn('nvim', ['-u', 'NONE', '-N', '--embed'], {})
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const nvim = await attach({ proc: nvim_proc })

  const capitalize_first_letter = (str: string) => {
    const [first, ...other] = str
    return `${first.toUpperCase()}${other.join('').toLowerCase()}`
  }

  const get_vim = async () => {
    const get_context = async () => {
      let context = ''
      for await (const file of globby.globbyStream(
        path.join(__dirname, '../data/lua/*.lua')
      )) {
        context += (await fs.readFile(file)).toString()
      }
      return context
    }

    const context = await get_context()

    const get_group = (regexp: RegExp, string: string) =>
      Array.from(regexp[Symbol.matchAll](string), (it) => it.at(1))

    const keys = ['fn', 'api', 'lsp'] as const
    const vim = keys.reduce(
      (acc, current) => ({
        ...acc,
        [current]: new Set(
          get_group(new RegExp(`function vim.${current}.(.+)\\(`, 'g'), context)
        ),
      }),
      {} as Record<typeof keys[number], Set<string>>
    )

    return vim
  }

  /**
   * @see https://github.com/folke/lua-dev.nvim/blob/6a7abb62af1b6a4411a3f5ea5cf0cb6b47878cc0/lua/lua-dev/parser.lua#L236
   */
  const generate_functions = async () => {
    /**
     * @see https://github.com/microsoft/TypeScript/issues/40694
     * @see https://github.com/nodejs/node/issues/33741#issuecomment-639463213
     * FIXME
     */
    const data: typeof import('../data/json/builtin-docs.json') = createRequire(
      import.meta.url
    )('../data/json/builtin-docs.json')

    const functions = data.signatureHelp
    const docs = data.documents.functions

    const exclude = ['or', 'and', 'repeat', 'function', 'end']

    const vim = await get_vim()

    type Params = {
      name?: string
      required: boolean
      next_required: boolean
      isRest: boolean
    }[]
    const funs = Object.entries(functions)
      .filter(([name]) => vim.fn.has(name) && !vim.api.has(name) && !exclude[name])
      .map(([name, props]) => {
        const [params, return_type] = props
        const param_arr = params.split(',')
        const return_type_arr = return_type.split('/')

        const valided_var_name = (str: string) => {
          return Number.isNaN(Number(exclude.includes(str) ? `_${str}` : str))
            ? str.replaceAll('-', '_') + '_'
            : `_${Math.abs(Number(str))}`
        }

        const fun = {
          name,
          fqname: `vim.fn${name}`,
          doc: ((docs[name] as any[]) ?? []).join('\n'),
          params:
            param_arr.at(0) === ''
              ? []
              : param_arr.reduce<Params>((acc, current, idx) => {
                const str = current.trim()

                const isRest = str.includes('...')
                const required =
                  acc.at(-1)?.next_required || (idx === 0 && str.at(0) !== '[')
                const next_required = !(str.at(-1) === '[')
                const param_name = str.replaceAll(/[ .[\]{}]/g, '')

                return [
                  ...acc,
                  {
                    name:
                      isValidVarName(param_name) && !exclude.includes(param_name)
                        ? param_name
                        : valided_var_name(param_name),
                    required,
                    next_required,

                    isRest,
                  },
                ]
              }, []),
          return:
            return_type !== ''
              ? return_type_arr.map((it) => {
                return {
                  type: capitalize_first_letter(it),
                }
              })
              : [],
        }

        return fun
      })

    const get_type_alias = () => {
      return (
        [
          ['Window', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          ['Buffer', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          ['Tabpage', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          ['Job', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          ['Channel', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          ['Sends', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          ['Blob', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          [
            'List',
            ts.factory.createArrayTypeNode(
              ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
            ),
          ],
          [
            'Array',
            ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('NeovimList')),
          ],
          [
            'Dictionary',
            ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Record'), [
              ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
              ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
            ]),
          ],
          [
            'Dict',
            ts.factory.createTypeReferenceNode(
              ts.factory.createIdentifier('NeovimDictionary')
            ),
          ],
          ['Float', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          [
            'Neovimref',
            ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Function')),
          ],
          [
            'Funcref',
            ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Function')),
          ],
          ['None', ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)],
          ['Start', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          ['Stop', ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)],
          ['Expr', ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)],
          ['Set', ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)],
        ] as const
      ).map(([alias, origin]) => {
        return ts.factory.createTypeAliasDeclaration(
          void 0,
          void 0,
          ts.factory.createIdentifier(`Neovim${alias}`),
          void 0,
          origin
        )
      })
    }

    const get_functions = () => {
      const format = (str: string) =>
        ['String', 'Number', 'Any'].includes(str) ? str.toLowerCase() : `Neovim${str}`
      const interface_declaration = ts.factory.createInterfaceDeclaration(
        void 0,
        void 0,
        ts.factory.createIdentifier('FN'),
        void 0,
        void 0,
        funs.map((fun, idx) => {
          const node = ts.factory.createPropertySignature(
            void 0,
            ts.factory.createIdentifier(fun.name),
            void 0,
            ts.factory.createFunctionTypeNode(
              void 0,
              fun.params.map((param) => {
                return ts.factory.createParameterDeclaration(
                  void 0,
                  void 0,
                  param.isRest
                    ? ts.factory.createToken(ts.SyntaxKind.DotDotDotToken)
                    : void 0,
                  ts.factory.createIdentifier(param.name!),
                  param.required
                    ? void 0
                    : ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                  param.isRest
                    ? ts.factory.createArrayTypeNode(
                      ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                    )
                    : ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                )
              }),
              fun.return.length === 0
                ? ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
                : fun.return.length >= 2
                  ? ts.factory.createUnionTypeNode(
                    fun.return.map((it) => {
                      return ts.factory.createTypeReferenceNode(
                        ts.factory.createIdentifier(format(it.type))
                      )
                    })
                  )
                  : ts.factory.createTypeReferenceNode(
                    ts.factory.createIdentifier(format(fun.return.at(0)!.type))
                  )
            )
          )

          /**
           * @see https://github.com/microsoft/TypeScript/issues/44151#issuecomment-865484494
           */
          ts.addSyntheticLeadingComment(
            node,
            ts.SyntaxKind.MultiLineCommentTrivia,
            '*\n*' +
              fun.doc
                .replaceAll('/', '\\/')
                .replaceAll('\t', '  ')
                .replaceAll('\n', '\n*')
                .replaceAll(/(Examples:|Example:)/g, '@example') +
              ' \n',
            /* hasTrailingNewLine */ true
          )

          return node
        })
      )

      /**
       * @see https://github.com/microsoft/TypeScript/issues/44151#issuecomment-865484494
       */
      ts.addSyntheticLeadingComment(
        interface_declaration,
        ts.SyntaxKind.MultiLineCommentTrivia,
        '* @noSelf ',
        /* hasTrailingNewLine */ true
      )

      return interface_declaration
    }

    const get_vim_interface = () => {
      const interface_declaration = ts.factory.createInterfaceDeclaration(
        void 0,
        [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
        ts.factory.createIdentifier('Vim'),
        void 0,
        void 0,
        [
          ts.factory.createPropertySignature(
            void 0,
            ts.factory.createIdentifier('fn'),
            void 0,
            ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('FN'), void 0)
          ),
        ]
      )

      /**
       * @see https://github.com/microsoft/TypeScript/issues/44151#issuecomment-865484494
       */
      ts.addSyntheticLeadingComment(
        interface_declaration,
        ts.SyntaxKind.MultiLineCommentTrivia,
        '* @noSelf ',
        /* hasTrailingNewLine */ true
      )

      return interface_declaration
    }

    const file = ts.factory.updateSourceFile(
      ts.createSourceFile('temporary.ts', '', ts.ScriptTarget.Latest),
      [...get_type_alias(), get_functions(), get_vim_interface()]
    )
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    const ts_code = printer.printFile(file)
    const head = ['/* eslint-disable @typescript-eslint/ban-types */']
    // console.log(ts_code)
    return fs.writeFile(
      path.join(__dirname, '../../types/neovim/vim.fn.d.ts'),
      prettier.format(`${head.join('\n')}\n${ts_code}`, {
        parser: 'typescript',
        ...createRequire(import.meta.url)('../../../.prettierrc.json'),
      })
    )
  }

  /**
   * @see https://github.com/folke/lua-dev.nvim/blob/6a7abb62af1b6a4411a3f5ea5cf0cb6b47878cc0/lua/lua-dev/parser.lua?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L183
   * @see https://neovim.io/doc/user/options.html
   * @see https://github.com/nanotee/nvim-lua-guide#using-api-functions-1
   */

  const generate_options = async () => {
    /**
     * @see https://github.com/microsoft/TypeScript/issues/40694
     * @see https://github.com/nodejs/node/issues/33741#issuecomment-639463213
     * FIXME
     */
    const data: typeof import('../data/json/builtin-docs.json') = createRequire(
      import.meta.url
    )('../data/json/builtin-docs.json')

    const docs = data.documents.options

    type Options = {
      name: string
      shortname: string
      scope: 'buf' | 'win' | 'global'
      global_local: boolean
      commalist: boolean
      flaglist: boolean
      was_set: boolean
      last_set_sid: number
      last_set_linenr: number
      last_set_chan: number
      type: string
      default: number
      allows_duplicates: boolean
    }
    const all_options_info = (await nvim.request(`nvim_get_all_options_info`)) as Record<
      string,
      Options
    >

    const all_options_info_ = Object.entries(all_options_info).reduce<
      Record<'o' | 'wo' | 'bo', Options[]>
    >(
      (acc, current) => {
        const [name, option] = current
        const maps = {
          buf: 'bo',
          win: 'wo',
          global: 'o',
        } as const
        const key = maps[option.scope]

        return produce(acc, (draft) => {
          draft[key].push(option)
        })
      },
      { o: [], wo: [], bo: [] }
    )

    const get_propertys = () => {
      const format = (str: string) =>
        (ts.SyntaxKind as any)[
          `${capitalize_first_letter(str)}Keyword`
        ] as ts.KeywordTypeSyntaxKind

      const interface_declaration = ts.factory.createInterfaceDeclaration(
        void 0,
        [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
        ts.factory.createIdentifier('Vim'),
        void 0,
        void 0,
        Object.entries(all_options_info_).map(([scope, options]) => {
          return ts.factory.createPropertySignature(
            void 0,
            ts.factory.createIdentifier(scope),
            void 0,
            ts.factory.createTypeLiteralNode(
              options.map((option) => {
                const node = ts.factory.createPropertySignature(
                  void 0,
                  ts.factory.createIdentifier(option.name),
                  void 0,
                  ts.factory.createKeywordTypeNode(format(option.type))
                )
                const doc = docs[option.name]
                  ? (docs[option.name] as string[]).join('\n')
                  : null
                /**
                 * @see https://github.com/microsoft/TypeScript/issues/44151#issuecomment-865484494
                 */
                doc &&
                  ts.addSyntheticLeadingComment(
                    node,
                    ts.SyntaxKind.MultiLineCommentTrivia,
                    '*\n* ' +
                      doc
                        .replaceAll('/', '\\/')
                        .replaceAll('\t', '  ')
                        .replaceAll('\n', '\n*') +
                      ' \n',
                    /* hasTrailingNewLine */ true
                  )
                return node
              })
            )
          )
        })
      )

      /**
       * @see https://github.com/microsoft/TypeScript/issues/44151#issuecomment-865484494
       */
      ts.addSyntheticLeadingComment(
        interface_declaration,
        ts.SyntaxKind.MultiLineCommentTrivia,
        '* @noSelf ',
        /* hasTrailingNewLine */ true
      )

      return interface_declaration
    }

    const file = ts.factory.updateSourceFile(
      ts.createSourceFile('temporary.ts', '', ts.ScriptTarget.Latest),
      [get_propertys()]
    )
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    const ts_code = printer.printFile(file)
    const head = ['']
    // console.log(ts_code)
    return fs.writeFile(
      path.join(__dirname, '../../types/neovim/vim.options.d.ts'),
      prettier.format(`${head.join('\n')}\n${ts_code}`, {
        parser: 'typescript',
        ...createRequire(import.meta.url)('../../../.prettierrc.json'),
      })
    )
  }

  const generate_neovim_lua_api = async () => {
    const api_json: typeof import('../data/json/api.json') = createRequire(import.meta.url)(
      '../data/json/api.json'
    )
    const lsp_json: typeof import('../data/json/lsp.json') = createRequire(import.meta.url)(
      '../data/json/lsp.json'
    )
    const lua_json: typeof import('../data/json/lua.json') = createRequire(import.meta.url)(
      '../data/json/lua.json'
    )
    const treesitter_json: typeof import('../data/json/treesitter.json') = createRequire(
      import.meta.url
    )('../data/json/treesitter.json')

    const diagnostic_json: typeof import('../data/json/diagnostic.json') = createRequire(
      import.meta.url
    )('../data/json/diagnostic.json')

    type Data = Record<
      string,
      {
        annotations: any[]
        signature: string
        parameters: string[][]
        parameters_doc: {
          a: string
          b: string
        }
        doc: string[]
        return: string[]
        seealso: never[]
      }
    >
    const parse = async (file_name: string, data: Data) => {
      const is_lua_json = file_name === 'lua'

      const format = (str: string) =>
        ['String', 'Number', 'Any'].includes(str) ? str.toLowerCase() : `Neovim${str}`

      const get_functions = () => {
        const { funs, has_colon_funs } = Object.entries(data)
          .map(([k, v]) => {
            const has_colon = k.includes(':')

            return {
              name: has_colon ? k.split(':').at(-1)! : k,
              prop_name: has_colon ? k.split(':').at(0)! : '',
              has_colon,
              params: v.parameters
                .filter(([type, name]) => !['err', ''].includes(name))
                .map(([type, name]) => {
                  return {
                    name: name === '...' ? 'args' : name,
                    type,
                    doc: v.parameters_doc[name] ?? '',
                    isRest: name === '...',
                  }
                }),
              doc: v.doc.join('\n'),
              return: v.return.at(0)?.split('\n').join(' ') ?? '',
            }
          })
          .reduce<
            Record<
              'has_colon_funs' | 'funs',
              {
                name: string
                prop_name: string
                has_colon: boolean
                params: { name: string; type: string; doc: any; isRest: boolean }[]
                doc: string
                return: string
              }[]
            >
          >(
            (acc, current) => {
              return {
                has_colon_funs: [
                  ...acc.has_colon_funs,
                  ...(current.has_colon ? [current] : []),
                ],
                funs: [...acc.funs, ...(current.has_colon ? [] : [current])],
              }
            },
            {
              has_colon_funs: [],
              funs: [],
            }
          )

        return { funs, has_colon_funs }
      }

      /**
       * @see https://stackoverflow.com/a/64489535/11791657
       * @see https://github.com/microsoft/TypeScript/issues/47171
       */
      const groupBy = <T>(array: T[], predicate: (v: T) => string) =>
        array.reduce<{ [key: string]: T[] }>((acc, value) => {
          ;(acc[predicate(value)] ||= []).push(value)
          return acc
        }, {})

      const { funs, has_colon_funs } = get_functions()
      const grouped_has_colon_funs = Object.entries(
        groupBy(has_colon_funs, (it) => it.prop_name)
      )

      const get_interface_declaration = (
        funs_: ReturnType<typeof get_functions>['funs' | 'has_colon_funs'],
        interface_name = file_name
      ) => {
        const interface_declaration = ts.factory.createInterfaceDeclaration(
          void 0,
          is_lua_json ? [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)] : void 0,
          ts.factory.createIdentifier(
            is_lua_json ? 'Vim' : capitalize_first_letter(interface_name)
          ),
          void 0,
          void 0,
          [
            ...grouped_has_colon_funs.map(([key]) => {
              return ts.factory.createPropertySignature(
                void 0,
                ts.factory.createIdentifier(key),
                void 0,
                ts.factory.createTypeReferenceNode(
                  ts.factory.createIdentifier(capitalize_first_letter(key)),
                  void 0
                )
              )
            }),
            ...funs_.map((fun, idx) => {
              const node = ts.factory.createPropertySignature(
                void 0,
                ts.factory.createIdentifier(fun.name),
                void 0,
                ts.factory.createFunctionTypeNode(
                  void 0,
                  fun.params.map((param) => {
                    return ts.factory.createParameterDeclaration(
                      void 0,
                      void 0,
                      param.isRest
                        ? ts.factory.createToken(ts.SyntaxKind.DotDotDotToken)
                        : void 0,
                      ts.factory.createIdentifier(param.name),
                      void 0,
                      param.isRest
                        ? ts.factory.createArrayTypeNode(
                          ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                        )
                        : ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                      void 0
                    )
                  }),
                  ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                )
              )

              /**
               * @see https://github.com/microsoft/TypeScript/issues/44151#issuecomment-865484494
               */
              ts.addSyntheticLeadingComment(
                node,
                ts.SyntaxKind.MultiLineCommentTrivia,
                '*\n*' +
                  fun.doc
                    .replaceAll('/', '\\/')
                    .replaceAll('\t', '  ')
                    .replaceAll('\n', '\n*')
                    .replaceAll(/(Examples:|Example:)/g, '@example') +
                  ' \n',
                /* hasTrailingNewLine */ true
              )

              return node
            }),
          ]
        )

        /**
         * @see https://github.com/microsoft/TypeScript/issues/44151#issuecomment-865484494
         */
        ts.addSyntheticLeadingComment(
          interface_declaration,
          ts.SyntaxKind.MultiLineCommentTrivia,
          '* @noSelf ',
          /* hasTrailingNewLine */ true
        )

        return interface_declaration
      }

      const get_vim_interface = () => {
        const interface_declaration = ts.factory.createInterfaceDeclaration(
          void 0,
          [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
          ts.factory.createIdentifier('Vim'),
          void 0,
          void 0,
          [
            ts.factory.createPropertySignature(
              void 0,
              ts.factory.createIdentifier(file_name),
              void 0,
              ts.factory.createTypeReferenceNode(
                ts.factory.createIdentifier(capitalize_first_letter(file_name)),
                void 0
              )
            ),
          ]
        )

        /**
         * @see https://github.com/microsoft/TypeScript/issues/44151#issuecomment-865484494
         */
        ts.addSyntheticLeadingComment(
          interface_declaration,
          ts.SyntaxKind.MultiLineCommentTrivia,
          '* @noSelf ',
          /* hasTrailingNewLine */ true
        )

        return interface_declaration
      }

      const file = ts.factory.updateSourceFile(
        ts.createSourceFile('temporary.ts', '', ts.ScriptTarget.Latest),
        [
          ...grouped_has_colon_funs.map(([key, value]) =>
            get_interface_declaration(value, key)
          ),
          get_interface_declaration(funs),
          ...(!is_lua_json ? [get_vim_interface()] : []),
        ]
      )
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
      const ts_code = printer.printFile(file)
      const head = ['/* eslint-disable @typescript-eslint/ban-types */']
      // console.log(ts_code)
      return fs.writeFile(
        path.join(__dirname, `../../types/neovim/vim.${file_name}.d.ts`),
        prettier.format(`${head.join('\n')}\n${ts_code}`, {
          parser: 'typescript',
          ...createRequire(import.meta.url)('../../../.prettierrc.json'),
        })
      )
    }

    return Promise.all(
      Object.entries({
        api: api_json,
        lsp: lsp_json,
        treesitter: treesitter_json,
        lua: lua_json,
        diagnostic: diagnostic_json,
      }).map(async ([k, v]) => {
        return parse(k, v as unknown as Data)
      })
    )
  }

  /**
   * @see https://github.com/folke/lua-dev.nvim/blob/6a7abb62af1b6a4411a3f5ea5cf0cb6b47878cc0/lua/lua-dev/parser.lua#L282
   */
  const build = async () => {
    await generate_functions()
    await generate_options()
    await generate_neovim_lua_api()
  }

  await build()
  nvim.quit()
}

try {
  await download_builtin_docs()
  await download_lua_dev_types()
  await download_neovim_msgpack()
  await msgpack2json()
  void json2ts()
} catch (err: any) {
  throw new Error(err)
}
