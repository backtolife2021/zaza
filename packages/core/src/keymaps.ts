/** @onSelfInFile */

export interface KeymapsOptions
  extends Partial<Record<Exclude<Neovim.MapArguments, 'buffer'> | 'noremap', boolean>> {
  mode?: Neovim.KeyMapMode | Neovim.KeyMapMode[]
  scope?: {
    type: Exclude<Neovim.Scope, 'window'>
    buffer?: NeovimBuffer
  }
  lhs: string
  rhs: string
}
export const keymaps = <Class extends { new (...args: any[]): any }>(cls: Class) => {
  const set = (opts: KeymapsOptions | KeymapsOptions[]) => {
    const _opts = Array.isArray(opts) ? opts : [opts]

    for (const { mode, scope, lhs, rhs, ...other } of _opts) {
      const _mode = Array.isArray(mode) ? mode : [mode ?? '']

      for (const __mode of _mode) {
        switch (scope?.type) {
          case 'buffer':
            vim.api.nvim_buf_set_keymap(scope.buffer ?? 0, __mode, lhs, rhs, {
              ...{ noremap: true, silent: true },
              ...other,
            })
            break
          default:
            vim.api.nvim_set_keymap(__mode, lhs, rhs, {
              ...{ noremap: true, silent: true },
              ...other,
            })
            break
        }
      }
    }

    return cls
  }
  function impl (opts: KeymapsOptions | KeymapsOptions[]) {
    return (function (_: any, _opts: KeymapsOptions | KeymapsOptions[]) {
      return set(_opts)
    } as any) as Class
  }

  /**
   * @see https://github.com/TypeScriptToLua/TypeScriptToLua/issues/388#issuecomment-483042031
   * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppress-errors-in-ts-files-using--ts-ignore-comments
   */
  // @ts-ignore
  // eslint-disable-next-line
  impl = setmetatable({}, { __call: (impl as any)() })

  impl.set = set

  return impl
}
