/** @onSelfInFile */

export const options = <Class extends { new (...args: any[]): any }>(cls: Class) => {
  const set = (opts: Partial<typeof vim.opt>) => {
    for (const [k, v] of Object.entries(opts)) {
      ;(vim.opt as any)[k] = v
    }
    return cls
  }
  function impl (opts: Partial<typeof vim.opt>) {
    return (function (_: any, _opts: Partial<typeof vim.opt>) {
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

  impl.get = (keys: keyof typeof vim.opt | (keyof typeof vim.opt)[]) => {
    const get_option = (key: keyof typeof vim.opt) =>
      // eslint-disable-next-line
      (vim.opt as any)[key].get((vim.opt as any)[key])

    if (Array.isArray(keys)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return keys.map((key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return get_option(key)
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return get_option(keys)
  }

  impl.append = (opts: Partial<typeof vim.opt>) => {
    for (const [k, v] of Object.entries(opts)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      ;(vim.opt as any)[k].append(v)
    }
    return cls
  }

  impl.remove = (opts: Partial<typeof vim.opt>) => {
    for (const [k, v] of Object.entries(opts)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      ;(vim.opt as any)[k].remove(v)
    }
    return cls
  }

  return impl
}
