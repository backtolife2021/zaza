/// <reference path="./vim.fn.d.ts" />
/// <reference path="./vim.options.d.ts" />
/// <reference path="./vim.api.d.ts" />
/// <reference path="./vim.lsp.d.ts" />
/// <reference path="./vim.treesitter.d.ts" />
/// <reference path="./vim.diagnostic.d.ts" />
/// <reference path="./vim.lua.d.ts" />
/// <reference path="./vim.d.ts" />

/** @noSelf **/
declare namespace Neovim {
  /**
   * @see https://neovim.io/doc/user/api.html#nvim_set_keymap()
   * @see https://neovim.io/doc/user/map.html#:map-modes
   */
  export type KeyMapMode = '' | 'n' | 'v' | 's' | 'x' | 'o' | '!' | 'i' | 'l' | 'c' | 't'

  /**
   * @see https://neovim.io/doc/user/map.html#:map-arguments
   */
  export type MapArguments = 'buffer' | 'nowait' | 'silent' | 'script' | 'expr' | 'unique'

  /**
   *
   */
  export type Scope = 'global' | 'window' | 'buffer'
}
