/* eslint-disable no-restricted-globals */

import type { Plugin } from '@zaza/core'

declare module '@zaza/core' {
  /** @see https://github.com/microsoft/TypeScript/issues/39691#issue-662917565 */
  export interface PluginEnv {
    packer: Packer
  }
}

/**
 * @see https://github.com/nvim-lua/nvim-lua-plugin-template/issues/3#issue-971226888
 * @see https://github.com/wbthomason/packer.nvim/issues/432
 * @see https://github.com/NvChad/NvChad/blob/main/lua/plugins/packerInit.lua
 * @param env this zaza plugin env
 * @param options ths plugins options
 */
export const zaza_plugin_packer: Plugin = () => ({ zaza }) => {
  const cmd = vim.cmd

  //  Only required if you have packer configured as `opt`
  cmd('packadd packer.nvim')

  let [has_packer, packer] = pcall(require, 'packer') as [boolean, Packer]

  if (!has_packer) {
    const packer_path = `${vim.fn.stdpath('data')}/site/pack/packer/opt/packer.nvim`

    print('Cloning packer..')
    // remove the dir before cloning
    vim.fn.delete(packer_path, 'rf')
    vim.fn.system([
      'git',
      'clone',
      'https://github.com/wbthomason/packer.nvim',
      '--depth',
      '20',
      packer_path,
    ])

    cmd('packadd packer.nvim')
    ;[has_packer, packer] = pcall(require, 'packer') as [boolean, Packer]

    if (has_packer) {
      print('Packer cloned successfully.')
    } else {
      error(`Couldn't clone packer !\nPacker path: ${packer_path}\n packer`)
    }
  }

  zaza.env.packer = packer

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  packer.init({
    display: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      open_fn: () => {
        /**
         * @see https://github.com/TypeScriptToLua/TypeScriptToLua/pull/1139
         */
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const [has_packer_util, util] = pcall(require, 'packer.util') as [
          boolean,
          {
            float: (this: void, args: any) => any
          }
        ]
        if (has_packer_util) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return util.float({ border: 'single' })
        }

        return {}
      },
      prompt_border: 'single',
    },
    git: {
      clone_timeout: 600,
    },
    auto_clean: true,
    compile_on_sync: true,
  })
}

export default zaza_plugin_packer
