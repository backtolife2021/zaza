/** @noSelfInFile */
/* eslint-disable unicorn/no-unused-properties */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import Zaza from '@zaza/core'
import zaza_plugin_packer from '@zaza/packer'
import * as utils from '@zaza/utils'

const is_vscode = vim.g.is_vscode
const can_load = () => !vim.g.is_vscode

Zaza.use(zaza_plugin_packer()).use(({ packer }) => {
  const use = utils.formal_fn(packer.use)

  /**
   * @see https://github.com/wbthomason/packer.nvim/issues/432
   * @see https://github.com/wbthomason/packer.nvim#compiling-lazy-loaders
   * If you use a function value for config or setup keys in any plugin specifications, it must not have any upvalues (i.e. captures)
   */
  packer.startup(() => {
    // Packer can manage itself
    use('wbthomason/packer.nvim', {
      event: 'VimEnter',
    })

    use('nvim-lua/plenary.nvim')

    /**
     * @see https://github.com/neovim/nvim-lspconfig
     * @see https://github.com/NvChad/NvChad/blob/c5fe1f711e/lua/plugins/init.lua#L116
     */
    use('neovim/nvim-lspconfig', {
      disable: is_vscode,
      cond: can_load,
      opt: true,
      setup () {
        vim.defer_fn(() => {
          ;(require('packer') as Packer).loader('nvim-lspconfig')
          vim.cmd('if &ft == "packer" | echo "" | else | silent! e %')
        }, 0)
      },
      config () {
        const [has_lspconfig, lspconfig] = pcall<
          Parameters<typeof require>,
          {
            [key: string]: NeovimPluginSetup
          }
        >(require, 'lspconfig')
        if (!has_lspconfig || typeof lspconfig === 'string') return null

        // replace the default lsp diagnostic symbols
        const lspSymbol = (name: string, icon: string) => {
          vim.fn.sign_define('LspDiagnosticsSign' + name, {
            text: icon,
            numhl: 'LspDiagnosticsDefault' + name,
          })
        }

        lspSymbol('Error', '')
        lspSymbol('Information', '')
        lspSymbol('Hint', '')
        lspSymbol('Warning', '')

        const lsp_publish_diagnostics_options = {
          virtual_text: {
            prefix: '',
            spacing: 0,
          },
          signs: true,
          underline: true,
          update_in_insert: false, // update diagnostics insert mode
        }
        vim.lsp.handlers['textDocument/publishDiagnostics'] = vim.lsp.with(
          vim.lsp.diagnostic.on_publish_diagnostics,
          lsp_publish_diagnostics_options
        )
        vim.lsp.handlers['textDocument/hover'] = vim.lsp.with(vim.lsp.handlers.hover, {
          border: 'single',
        })
        vim.lsp.handlers['textDocument/signatureHelp'] = vim.lsp.with(
          vim.lsp.handlers.signature_help,
          {
            border: 'single',
          }
        )

        // suppress error messages from lang servers
        vim.notify = (msg: string, log_level, _opts) => {
          if (msg.includes('exit code')) {
            return null
          }

          if (log_level === vim.log.levels.ERROR) {
            vim.api.nvim_err_writeln(msg)
          } else {
            vim.api.nvim_echo([[msg]], true, {})
          }
        }
      },
    })

    /**
     * @see
     */
    use('williamboman/nvim-lsp-installer', {
      disable: is_vscode,
      cond: can_load,
      config () {
        const lsp_installer = require('nvim-lsp-installer') as LspInstaller

        /**
         * @see https://github.com/williamboman/nvim-lsp-installer/wiki/Advanced-Configuration#automatically-install-lsp-servers
         */
        const servers = ['tsserver', 'sumneko_lua']

        for (const name of servers) {
          const [server_is_found, server] = lsp_installer.get_server(name)

          if (server_is_found) {
            if (!server.is_installed()) {
              print('Installing ' + name)
              server.install()
            }
          }
        }

        lsp_installer.on_server_ready((server: any) => {
          /**
           * @see https://github.com/NvChad/NvChad/blob/main/lua/plugins/configs/lspconfig.lua
           */
          const on_attach = (_: any, buffer: NeovimBuffer) => {
            /**
             * @see https://github.com/microsoft/TypeScript/pull/39094
             */
            type DropFirst<T extends readonly unknown[]> = T extends readonly [
              any?,
              ...infer U
            ]
              ? U
              : [...T]

            const buf_set_keymap = (
              ...args: DropFirst<Parameters<typeof vim.api.nvim_buf_set_keymap>>
            ) => {
              vim.api.nvim_buf_set_keymap(buffer, ...args)
            }

            const buf_set_option = (
              ...args: DropFirst<Parameters<typeof vim.api.nvim_buf_set_option>>
            ) => {
              vim.api.nvim_buf_set_option(buffer, ...args)
            }

            // Enable completion triggered by <c-x><c-o>
            buf_set_option('omnifunc', 'v:lua.vim.lsp.omnifunc')

            // Mappings.
            const opts = { noremap: true, silent: true }

            // See `:help vim.lsp.*` for documentation on any of the below functions
            buf_set_keymap('n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<CR>', opts)
            buf_set_keymap('n', 'gd', '<cmd>lua vim.lsp.buf.definition()<CR>', opts)
            buf_set_keymap('n', 'gh', '<cmd>lua vim.lsp.buf.hover()<CR>', opts)
            buf_set_keymap('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<CR>', opts)
            buf_set_keymap('n', 'gk', '<cmd>lua vim.lsp.buf.signature_help()<CR>', opts)
            buf_set_keymap(
              'n',
              '<space>wa',
              '<cmd>lua vim.lsp.buf.add_workspace_folder()<CR>',
              opts
            )
            buf_set_keymap(
              'n',
              '<space>wr',
              '<cmd>lua vim.lsp.buf.remove_workspace_folder()<CR>',
              opts
            )
            buf_set_keymap(
              'n',
              '<space>wl',
              '<cmd>lua print(vim.inspect(vim.lsp.buf.list_workspace_folders()))<CR>',
              opts
            )
            buf_set_keymap(
              'n',
              '<space>D',
              '<cmd>lua vim.lsp.buf.type_definition()<CR>',
              opts
            )
            buf_set_keymap('n', '<space>rn', '<cmd>lua vim.lsp.buf.rename()<CR>', opts)
            buf_set_keymap('n', '<space>ca', '<cmd>lua vim.lsp.buf.code_action()<CR>', opts)
            buf_set_keymap('n', 'gr', '<cmd>lua vim.lsp.buf.references()<CR>', opts)
            buf_set_keymap(
              'n',
              'ge',
              '<cmd>lua vim.lsp.diagnostic.show_line_diagnostics()<CR>',
              opts
            )
            buf_set_keymap('n', '[d', '<cmd>lua vim.lsp.diagnostic.goto_prev()<CR>', opts)
            buf_set_keymap('n', ']d', '<cmd>lua vim.lsp.diagnostic.goto_next()<CR>', opts)
            buf_set_keymap(
              'n',
              '<space>q',
              '<cmd>lua vim.lsp.diagnostic.set_loclist()<CR>',
              opts
            )
            buf_set_keymap('n', '<space>fm', '<cmd>lua vim.lsp.buf.formatting()<CR>', opts)
            buf_set_keymap(
              'v',
              '<space>ca',
              '<cmd>lua vim.lsp.buf.range_code_action()<CR>',
              opts
            )
          }

          const capabilities = vim.lsp.protocol.make_client_capabilities()
          capabilities.textDocument.completion.completionItem.documentationFormat = [
            'markdown',
            'plaintext',
          ]
          capabilities.textDocument.completion.completionItem.snippetSupport = true
          capabilities.textDocument.completion.completionItem.preselectSupport = true
          capabilities.textDocument.completion.completionItem.insertReplaceSupport = true
          capabilities.textDocument.completion.completionItem.labelDetailsSupport = true
          capabilities.textDocument.completion.completionItem.deprecatedSupport = true
          capabilities.textDocument.completion.completionItem.commitCharactersSupport = true
          capabilities.textDocument.completion.completionItem.tagSupport = { valueSet: [1] }
          capabilities.textDocument.completion.completionItem.resolveSupport = {
            properties: ['documentation', 'detail', 'additionalTextEdits'],
          }

          const config = {
            // enable snippet support
            capabilities,
            // map buffer const keybindings when the language server attaches
            on_attach,
          }

          server.setup(config)

          vim.cmd('do User LspAttachBuffers')
        })
      },
    })

    use('nvim-treesitter/nvim-treesitter', {
      disable: is_vscode,
      cond: can_load,
      event: 'BufRead',
      config () {
        const [has_treesitter_configs, treesitter_configs] = pcall<
          Parameters<typeof require>,
          NeovimPluginSetup
        >(require, 'nvim-treesitter.configs')

        if (!has_treesitter_configs || typeof treesitter_configs === 'string') return null

        treesitter_configs.setup({
          ensure_installed: ['lua', 'typescript'],
          highlight: {
            enable: true,
            use_languagetree: true,
          },
        })
      },
    })

    use('dracula/vim', {
      disable: is_vscode,
      cond: can_load,
      as: 'dracula',
      config () {
        vim.cmd('colorscheme dracula')
      },
    })

    use('nvim-telescope/telescope.nvim', {
      disable: is_vscode,
      cond: can_load,
      module: 'telescope',
      cmd: 'Telescope',
      requires: [
        {
          1: 'nvim-telescope/telescope-fzf-native.nvim',
          run: 'make',
        },
        {
          1: 'nvim-telescope/telescope-media-files.nvim',
          setup () {
            const zaza = require('packages.core.dist.index').default as typeof Zaza
            const mappings = require('mappings').default as typeof import('../mappings')
            const keys = mappings.plugins.telescope

            zaza.keymaps.set({
              lhs: keys.telescope_media.media_files,
              rhs: ':Telescope media_files <CR>',
            })
          },
        },
      ],
      setup () {
        const zaza = require('packages.core.dist.index').default as typeof Zaza
        const mappings = require('mappings').default as typeof import('../mappings')
        const keys = mappings.plugins.telescope

        zaza.keymaps.set([
          {
            lhs: keys.buffers,
            rhs: ':Telescope buffers <CR>',
          },
          {
            lhs: keys.find_files,
            rhs: ':Telescope find_files no_ignore=true <CR>',
          },
          {
            lhs: keys.find_hiddenfiles,
            rhs: ':Telescope find_files hidden=true <CR>',
          },
          {
            lhs: keys.git_commits,
            rhs: ':Telescope git_commits <CR>',
          },
          {
            lhs: keys.git_status,
            rhs: ':Telescope git_status <CR>',
          },
          {
            lhs: keys.help_tags,
            rhs: ':Telescope help_tags <CR>',
          },
          {
            lhs: keys.live_grep,
            rhs: ':Telescope live_grep <CR>',
          },
          {
            lhs: keys.oldfiles,
            rhs: ':Telescope oldfiles <CR>',
          },
          {
            lhs: keys.themes,
            rhs: ':Telescope themes <CR>',
          },
        ])
      },
      config () {
        const [has_telescope, telescope] = pcall<
          Parameters<typeof require>,
          NeovimPluginSetup
        >(require, 'nvim-treesitter.configs')

        if (!has_telescope || typeof telescope === 'string') return null

        telescope.setup({
          defaults: {
            vimgrep_arguments: [
              'rg',
              '--color=never',
              '--no-heading',
              '--with-filename',
              '--line-number',
              '--column',
              '--smart-case',
            ],
            prompt_prefix: '   ',
            selection_caret: '  ',
            entry_prefix: '  ',
            initial_mode: 'insert',
            selection_strategy: 'reset',
            sorting_strategy: 'ascending',
            layout_strategy: 'horizontal',
            layout_config: {
              horizontal: {
                prompt_position: 'top',
                preview_width: 0.55,
                results_width: 0.8,
              },
              vertical: {
                mirror: false,
              },
              width: 0.87,
              height: 0.8,
              preview_cutoff: 120,
            },
            file_sorter: require('telescope.sorters').get_fuzzy_file,
            file_ignore_patterns: ['node_modules', '.git'],
            generic_sorter: require('telescope.sorters').get_generic_fuzzy_sorter,
            path_display: ['truncate'],
            winblend: 0,
            border: {},
            borderchars: ['─', '│', '─', '│', '╭', '╮', '╯', '╰'],
            color_devicons: true,
            use_less: true,
            set_env: { COLORTERM: 'truecolor' }, // default:nil,
            file_previewer: require('telescope.previewers').vim_buffer_cat.new,
            grep_previewer: require('telescope.previewers').vim_buffer_vimgrep.new,
            qflist_previewer: require('telescope.previewers').vim_buffer_qflist.new,
            // Developer configurations: Not meant for general override
            buffer_previewer_maker: require('telescope.previewers').buffer_previewer_maker,
          },
          extensions: {
            fzf: {
              fuzzy: true, // false will only do exact matching
              override_generic_sorter: false, // override the generic sorter
              override_file_sorter: true, // override the file sorter
              case_mode: 'smart_case', // or "ignore_case" or "respect_case"
              // the default case_mode is "smart_case"
            },
            media_files: {
              filetypes: ['png', 'webp', 'jpg', 'jpeg'],
              find_cmd: 'rg', // find command (defaults to `fd`)
            },
          },
        })

        const extensions = ['themes', 'terms', 'fzf']
        let packer_repos = `"extensions", "telescope-fzf-native.nvim"`

        if (vim.fn.executable('ueberzug') === 1) {
          extensions.push('media_files')
          packer_repos = packer_repos + ', "telescope-media-files.nvim"'
        }

        pcall(() => {
          for (const ext of extensions) {
            ;(
              telescope as any as {
                load_extension: (this: void, ext: string) => void
              }
            ).load_extension(ext)
          }
        })
      },
    })

    use('numToStr/FTerm.nvim', {
      disable: is_vscode,
      cond: can_load,
      config () {
        ;(require('FTerm') as NeovimPluginSetup).setup({
          border: 'single',
          dimensions: {
            height: 0.9,
            width: 0.9,
          },
        })

        const zaza = require('packages.core.dist.index').default as typeof Zaza
        const mappings = require('mappings').default as typeof import('../mappings')
        const keys = mappings.plugins.float_terminal

        zaza.keymaps.set([
          {
            lhs: keys.toggle,
            rhs: '<CMD>lua require("FTerm").toggle()<CR>',
          },
          {
            lhs: keys.toggle,
            rhs: '<C-\\><C-n><CMD>lua require("FTerm").toggle()<CR>',
            mode: 't',
          },
        ])
      },
    })

    use('kyazdani42/nvim-tree.lua', {
      disable: is_vscode,
      cond: can_load,
      cmd: ['NvimTreeToggle', 'NvimTreeFocus'],
      setup () {
        vim.api.nvim_set_keymap('n', '<C-n>', ':NvimTreeToggle <CR>', {
          noremap: true,
          silent: true,
        })
        vim.api.nvim_set_keymap('n', '<leader>e', ':NvimTreeFocus <CR>', {
          noremap: true,
          silent: true,
        })
      },
      config () {
        const [has_nvimtree, nvimtree] = pcall<
          Parameters<typeof require>,
          NeovimPluginSetup
        >(require, 'nvim-tree')

        if (!has_nvimtree || typeof nvimtree === 'string') return null

        const git_status = true
        const g = vim.g

        vim.o.termguicolors = true

        g.nvim_tree_add_trailing = 0 // append a trailing slash to folder names
        g.nvim_tree_git_hl = git_status
        g.nvim_tree_gitignore = 0
        g.nvim_tree_highlight_opened_files = 0
        g.nvim_tree_indent_markers = 1
        g.nvim_tree_ignore = ['.git', 'node_modules', '.cache']
        g.nvim_tree_quit_on_open = 0 // closes tree when file's opened
        g.nvim_tree_root_folder_modifier = `:t:gs?$?/..${string.rep(' ', 1000)}?:gs?^??`

        g.nvim_tree_show_icons = {
          folders: 1,
          // folder_arrows: 1
          files: 1,
          git: git_status,
        }

        g.nvim_tree_icons = {
          default: '',
          symlink: '',
          git: {
            deleted: '',
            ignored: '◌',
            renamed: '➜',
            staged: '✓',
            unmerged: '',
            unstaged: '✗',
            untracked: '★',
          },
          folder: {
            // disable indent_markers option to get arrows working or if you want both arrows and indent then just add the arrow icons in front            ofthe default and opened folders below!
            // arrow_open : "",
            // arrow_closed : "",
            default: '',
            empty: '', // 
            empty_open: '',
            open: '',
            symlink: '',
            symlink_open: '',
          },
        }

        nvimtree.setup({
          diagnostics: {
            enable: false,
            icons: {
              hint: '',
              info: '',
              warning: '',
              error: '',
            },
          },
          filters: {
            dotfiles: false,
          },
          disable_netrw: true,
          hijack_netrw: true,
          ignore_ft_on_setup: ['dashboard'],
          auto_close: true,
          open_on_tab: false,
          hijack_cursor: true,
          update_cwd: true,
          update_focused_file: {
            enable: true,
            update_cwd: false,
          },
          view: {
            allow_resize: true,
            side: 'left',
            width: 25,
          },
        })
      },
    })

    use('kyazdani42/nvim-web-devicons', {
      disable: is_vscode,
      cond: can_load,
      after: 'dracula',
    })

    use('lukas-reineke/indent-blankline.nvim', {
      disable: is_vscode,
      cond: can_load,
      event: 'BufRead',
      config () {
        ;(require('indent_blankline') as NeovimPluginSetup).setup({
          indentLine_enabled: 1,
          char: '▏',
          filetype_exclude: [
            'help',
            'terminal',
            'dashboard',
            'packer',
            'lspinfo',
            'TelescopePrompt',
            'TelescopeResults',
            'nvchad_cheatsheet',
          ],
          buftype_exclude: ['terminal'],
          show_trailing_blankline_indent: false,
          show_first_indent_level: false,
        })
      },
    })

    // use('akinsho/bufferline.nvim', {
    //   disable: is_vscode,
    //   cond: can_load,
    //   after: 'nvim-web-devicons',
    //   setup () {
    //     const zaza = require('packages.core.dist.index').default as typeof Zaza
    //     const mappings = require('mappings').default as typeof import('../mappings')
    //     const keys = mappings.plugins.bufferline

    //     zaza.keymaps.set([
    //       {
    //         lhs: keys.next_buffer,
    //         rhs: ':BufferLineCycleNext <CR>',
    //       },
    //       {
    //         lhs: keys.prev_buffer,
    //         rhs: ':BufferLineCyclePrev <CR>',
    //       },
    //     ])
    //   },
    //   config () {},
    // })

    use('feline-nvim/feline.nvim', {
      disable: is_vscode,
      cond: can_load,
      config () {
        ;(require('feline') as NeovimPluginSetup).setup()
      },
    })

    use('lewis6991/gitsigns.nvim', {
      disable: is_vscode,
      cond: can_load,
      opt: true,
      setup () {
        vim.defer_fn(() => {
          ;(require('packer') as Packer).loader('gitsigns.nvim')
        }, 0)
      },
      config () {
        const [has_gitsigns, gitsigns] = pcall<
          Parameters<typeof require>,
          NeovimPluginSetup
        >(require, 'gitsigns')
        if (!has_gitsigns || typeof gitsigns === 'string') return null

        gitsigns.setup({
          signs: {
            add: { hl: 'DiffAdd', text: '│', numhl: 'GitSignsAddNr' },
            change: { hl: 'DiffChange', text: '│', numhl: 'GitSignsChangeNr' },
            delete: { hl: 'DiffDelete', text: '', numhl: 'GitSignsDeleteNr' },
            topdelete: { hl: 'DiffDelete', text: '‾', numhl: 'GitSignsDeleteNr' },
            changedelete: { hl: 'DiffChangeDelete', text: '~', numhl: 'GitSignsChangeNr' },
          },
        })
      },
    })

    //   -- load luasnips + cmp related in insert mode only

    use('rafamadriz/friendly-snippets', {
      disable: is_vscode,
      cond: can_load,
      event: 'InsertEnter',
    })

    // use('hrsh7th/nvim-cmp', {
    //   disable: is_vscode,
    //   cond: can_load,
    //   after: 'friendly-snippets',
    //   config () {
    //     const [has_cmp, cmp] = pcall<Parameters<typeof require>, NeovimPluginSetup>(
    //       require,
    //       'cmp'
    //     )
    //     if (!has_cmp || typeof cmp === 'string') return null

    //     vim.opt.completeopt = 'menuone,noselect'

    //     cmp.setup({
    //       snippet: {
    //         expand (args: any) {
    //           ;(require('luasnip') as Luasnip).lsp_expand(args.body)
    //         },
    //       },
    //     })
    //   },
    // })

    // use('L3MON4D3/LuaSnip', {
    //   disable: is_vscode,
    //   cond: can_load,
    //   wants: 'friendly-snippets',
    //   after: 'nvim-cmp',
    //   config () {
    //     const [has_luasnip, luasnip] = pcall<Parameters<typeof require>, Luasnip>(
    //       require,
    //       'luasnip'
    //     )
    //     if (!has_luasnip || typeof luasnip === 'string') return null

    //     luasnip.config.set_config({
    //       history: true,
    //       updateevents: 'TextChanged,TextChangedI',
    //     })
    //     ;(require('luasnip/loaders/from_vscode') as {
    //       load: (this: void, opts?: any) => unknown
    //     }).load({ paths: {} })
    //     ;(require('luasnip/loaders/from_vscode') as {
    //       load: (this: void, opts?: any) => unknown
    //     }).load()
    //   },
    // })

    // use('saadparwaiz1/cmp_luasnip', {
    //   disable: is_vscode,
    //   cond: can_load,
    //   after: 'LuaSnip',
    // })

    // use('hrsh7th/cmp-nvim-lua', {
    //   disable: is_vscode,
    //   cond: can_load,
    //   after: 'cmp_luasnip',
    // })

    // use('hrsh7th/cmp-nvim-lsp', {
    //   disable: is_vscode,
    //   cond: can_load,
    //   after: 'cmp-nvim-lua',
    // })

    // use('hrsh7th/cmp-buffer', {
    //   disable: is_vscode,
    //   cond: can_load,
    //   after: 'cmp-nvim-lsp',
    // })

    // use('hrsh7th/cmp-path', {
    //   disable: is_vscode,
    //   cond: can_load,
    //   after: 'cmp-buffer',
    // })

    use('tpope/vim-commentary', {
      disable: is_vscode,
      cond: can_load,
    })

    use('backtolife2021/antovim', {
      event: 'BufRead',
    })

    use('Mephistophiles/surround.nvim', {
      event: 'BufRead',
      config () {
        ;(require('surround') as Surround).setup({ mappings_style: 'surround' })
      },
    })
  })
})
