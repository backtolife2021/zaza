/** @noSelfInFile */

/** @noSelf */
declare module 'nvim-lsp-installer' {
  export const get_server: (
    this: void,
    server_name: string
  ) => LuaMultiReturn<[boolean, any]>
  export const on_server_ready: (this: void, server: any) => unknown
}
declare type LspInstaller = typeof import('nvim-lsp-installer')
