/** @noSelfInFile */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-restricted-globals */

import Zaza from '@zaza/core'
import zaza_plugin_speed from '@zaza/speed'
import * as utils from '@zaza/utils'

import './global'

/**
 * @see https://github.com/NvChad/NvChad/blob/main/lua/core/options.lua
 */
Zaza.options
  .set({
    // -- NeoVim/Vim options
    title: true,
    cursorline: true,
    clipboard: 'unnamedplus',
    cmdheight: 1,
    hidden: true,
    ignorecase: true,
    mouse: 'a',
    // Numbers
    ruler: true,
    number: true,
    // -- relative numbers in normal mode tool at the bottom of options.lua
    numberwidth: 2,
    relativenumber: false,
    // -- Indentline
    expandtab: true,
    shiftwidth: 2,
    smartindent: true,
    signcolumn: 'yes',
    splitbelow: true,
    splitright: true,
    tabstop: 8, // -- Number of spaces that a <Tab> in the file counts for
    timeoutlen: 400,
    // -- interval for writing swap file to disk, also used by gitsigns
    updatetime: 250,
    undofile: true, // -- keep a permanent undo (across restarts)
    termguicolors: true,
  })
  .options.append({
    shortmess: 'sI', // -- disable nvim intro
    // -- go to previous/next line with h,l,left arrow and right arrow
    // -- when cursor reaches end/beginning of line
    whichwrap: '<>[]hl',
  })
  .use(() => {
    const speed = 5

    Zaza.use(
      zaza_plugin_speed({
        speed,
        keymaps_options: [
          {
            lhs: 'k',
            rhs: 'j',
          },
          {
            lhs: 'j',
            rhs: 'h',
          },
          {
            lhs: 'i',
            rhs: 'k',
          },
        ],
      })
    ).use(() => {
      Zaza.keymaps([
        {
          lhs: 'h',
          rhs: 'i',
        },
        {
          lhs: 'L',
          rhs: `${speed}l`,
        },
      ])
    })
  })
  .use(() => {
    // disable some builtin vim plugins
    const disabled_built_ins = [
      '2html_plugin',
      'getscript',
      'getscriptPlugin',
      'gzip',
      'logipat',
      'netrw',
      'netrwPlugin',
      'netrwSettings',
      'netrwFileHandlers',
      'matchit',
      'tar',
      'tarPlugin',
      'rrhelper',
      'spellfile_plugin',
      'vimball',
      'vimballPlugin',
      'zip',
      'zipPlugin',
    ]

    for (const plugin of disabled_built_ins) {
      /**
       * @see https://neovim.discourse.group/t/how-to-disable-builtin-plugins/787
       * @see https://www.reddit.com/r/neovim/comments/p1qlbn/help_speeding_up_startup_time_disabling_builtin/
       */
      vim.g[`loaded_${plugin}`] = 1
    }
  })
  .use(() => {
    if (!vim.g.is_vscode) return null

    /**
     * Commentary
     * @see https://github.com/asvetliakov/vscode-neovim#vim-commentary
     */
    vim.cmd("exec 'source' '$HOME/.config/nvim/vim/vscode.vim'")
  })

// utils.dump({
//   is_vscode: vim.g.is_vscode,
// })

vim.cmd("silent! command PackerSync lua require 'plugins.index' require('packer').sync()")
