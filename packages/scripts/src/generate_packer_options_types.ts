#!/usr/bin/env bazx
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import luaparse from 'luaparse'
import ts from 'typescript'
import { fetch, fs, path } from 'zx'

/** @see https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const markdown_text = await (
  await fetch('https://raw.githubusercontent.com/wbthomason/packer.nvim/master/README.md')
).text()
const matched = /```lua\n({[^`]+)```/.exec(markdown_text)
const code = `local options = ${matched?.[1] ?? ''}`
const file_path = path.join(__dirname, '../data/lua/packer_options.lua')
void fs.writeFile(file_path, code)

const ast = luaparse.parse(code)

const json = JSON.stringify(ast)
void fs.writeFile(path.join(__dirname, '../data/json/packer_options.json'), json)

// console.log('ast', ast)

/**
 * @see https://astexplorer.net/
 * @see https://shadeglare.medium.com/typescript-code-generation-using-its-compiler-api-4c50ad9f7884
 * @see https://github.com/HearTao/ts-creator
 */
export const lua2ts = (ast: luaparse.Node) => {
  const file = ts.createSourceFile(
    'source.ts',
    '',
    ts.ScriptTarget.ESNext,
    false,
    ts.ScriptKind.TS
  )
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  const stringTypeReference = ts.factory.createTypeReferenceNode('string')
  const uuidDecl = ts.factory.createTypeAliasDeclaration(
    undefined, // decorators
    undefined, // modifiers
    ts.factory.createIdentifier('Uuid'), // name
    undefined, // type parameters
    stringTypeReference // aliased type
  )

  const result = printer.printNode(ts.EmitHint.Unspecified, uuidDecl, file)
  console.log(result)

  const parse = (leaf: luaparse.Node, env: any = {}): any => {
    switch (leaf.type) {
      case 'Chunk':
        return leaf.body.map((it) => {
          return parse(it, {
            ...env,
            loc: leaf.loc,
            comments: leaf.comments,
          })
        })

      case 'LocalStatement':
        return leaf.variables.map((it) => {
          return parse(it, {
            ...env,
            loc: leaf.loc,
            init: leaf.init,
          })
        })

      case 'TableConstructorExpression':
        return leaf.fields.map((it) => {
          return parse(it, {
            ...env,
            loc: leaf.loc,
          })
        })
      default:
        break
    }

    return ''
  }

  parse(ast)

  return result
}
