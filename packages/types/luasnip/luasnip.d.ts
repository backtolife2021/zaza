/* eslint-disable @typescript-eslint/naming-convention */
/** @noSelfInFile */

/** @noSelf */
declare module 'luasnip' {
  export const config: {
    set_config: (this: void, opts: Record<any, any>) => void
  }

  export const lsp_expand: (this: void, opts?: Record<any, any>) => void
}
declare type Luasnip = typeof import('luasnip')
