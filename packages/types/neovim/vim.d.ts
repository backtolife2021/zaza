/** @noSelfInFile */

/** @noSelf **/
declare const vim: Vim

/** @noSelf **/
declare namespace Vim {
  /** @noSelf **/
  export interface G {
    mapleader: string
    [key: string]: any
  }
}

/**
 * @description export vim interface
 * @see https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#objects-with-properties
 * @see https://github.com/folke/lua-dev.nvim#-how
 * @see https://typescripttolua.github.io/docs/the-self-parameter/#noself
 * @noSelf
 *
 */
declare interface Vim {
  cmd: (cmd: string) => string
  /**
   * @see https://neovim.io/doc/user/lua.html#vim.opt
   */
  opt: typeof vim.o & typeof vim.wo & typeof vim.bo
  /**
   * @see https://neovim.io/doc/user/lua.html#vim.g
   */
  g: Vim.G
  b: any
  /**
   * @see https://neovim.io/doc/user/lua.html#vim.defer_fn()
   * @description
   * Defers calling `fn` until `timeout` ms passes.
   *
   *  Use to do a one-shot timer that calls `fn` Note: The {fn} is |schedule_wrap|ped automatically,
   *  so API functions are safe to call.
   * @param {fn} Callback to call once `timeout` expires
   * @param {timeout} Number of milliseconds to wait before calling `fn`
   * @returns timer luv timer object
   */
  defer_fn: (fn: (...args: any[]) => any, timeout: number) => number
  /**
   * HACK: hardcode these levels, since there's currently no docs for them
   *
   * */
  log: {
    levels: {
      TRACE: 0
      DEBUG: 1
      INFO: 2
      WARN: 3
      ERROR: 4
    }
  }
}

/**
 * @noSelf
 */
declare interface Lsp {
  protocol: {
    make_client_capabilities: () => any
    resolve_capabilities: ({ server_capabilities: any }) => any
  }
  handlers: any
  diagnostic: any
}

/** @noSelf */
interface Diagnostic {
  /**
   * @see https://github.com/neovim/neovim/blob/7b8fbbdebe90a2dbf0d57464c93c7d5bfc3da449/runtime/lua/vim/diagnostic.lua#L5
   */
  severity: {
    ERROR: 1
    WARN: 2
    INFO: 3
    HINT: 4
  }
}
