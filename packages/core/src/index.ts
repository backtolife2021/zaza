/** @onSelfInFile */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { keymaps } from './keymaps'
import { options } from './options'

export interface Get {
  options: (keys: keyof typeof vim.opt | (keyof typeof vim.opt)[]) => any
}
export interface PluginEnv {
  zaza: typeof Zaza
}
export type Plugin<T extends Record<any, any> | void = void> = (
  args: T
) => (env: PluginEnv) => unknown

/** @noSelf */
export default class Zaza {
  static env: PluginEnv = {
    zaza: Zaza,
  }

  static options = options(Zaza)

  static keymaps = keymaps(Zaza)

  static use (plugin: ReturnType<Plugin>) {
    plugin(Zaza.env)
    return Zaza
  }

  static cmd (command: string) {
    vim.cmd(command)
    return Zaza
  }
}
