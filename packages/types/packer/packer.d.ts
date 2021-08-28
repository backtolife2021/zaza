/* eslint-disable @typescript-eslint/ban-types */
/** @noSelfInFile */

/// <reference path="./util.d.ts" />

/**
 * @noSelf
 */
declare module 'packer' {
  /**
   * @see https://github.com/wbthomason/packer.nvim#specifying-plugins
   * @noSelf
   */
  interface PluginSpec {
    /**
     * @description -- The following keys are all optional
     * @example
     * ```ts
     * {
     *  1: 'myusername/example'
     * }
     * ```
     */
    [key: number]: string
    /**
     * @description -- Mark a plugin as inactive
     */
    disable?: boolean
    /**
     * @description -- Specifies an alias under which to install the plugin
     */
    as?: string
    /**
     * @description -- Specifies custom installer. See "custom installers" below.
     */
    installer: Function
    /**
     * @description -- Specifies custom updater. See "custom installers" below.
     */
    updater: Function
    /**
     * @description  -- Specifies plugins to load before this plugin. See "sequencing" below
     */
    after: string | string[]
    /**
     * @description  -- Specifies a subdirectory of the plugin to add to runtimepath.
     */
    rtp: string
    /**
     * @description   -- Manually marks a plugin as optional.
     */
    opt: boolean
    /**
     * @description    -- Specifies a git branch to use
     */
    branch: string
    /**
     * @description         -- Specifies a git tag to use
     */
    tag: string
    /**
     * @description            -- Specifies a git commit to use
     */
    commit: string
    /**
     * @description         -- Skip updating this plugin in updates/syncs. Still cleans.
     */
    lock: boolean
    /**
     * @description           -- Post-update/install hook. See "update/install hooks".
     */
    run: string | Function | Object
    /**
     * @description           -- Specifies plugin dependencies. See "dependencies".
     */
    requires: Partial<PluginSpec>[]
    /**
     *
     */
    wants: string
    /**
     * @description            -- Specifies Luarocks dependencies for the plugin
     */
    rocks: string | string[]
    /**
     * @description           -- Specifies code to run after this plugin is loaded.
     */
    config: string | (() => any)

    /**
     * @description           -- The setup key implies opt = true
     *  -- Specifies code to run before this plugin is loaded.
     */
    setup: string | (() => any)
    /**
     * @description    -- Specifies commands which load this plugin. Can be an autocmd pattern.
     */
    cmd: string | string[]
    /**
     * @description   -- Specifies filetypes which load this plugin.
     */
    ft: string | string[]
    /**
     * @description   -- Specifies maps which load this plugin. See "Keybindings".
     */
    keys: string | string[]
    /**
     * @description   -- Specifies autocommand events which load this plugin.
     */
    event: string | string[]
    /**
     * @description   -- Specifies functions which load this plugin.
     */
    fn: string | string[]
    /**
     * @description  -- Specifies a conditional test to load this plugin
     */
    cond: string | Function | string[] | Function[]
    /**
     * @description    -- Specifies Lua module names for require. When requiring a string which starts
     *                            -- with one of these module names, the plugin will be loaded.
     */
    module: string | string[]

    /**
     * @description  -- Specifies Lua pattern of Lua module names for require. When
     * requiring a string which matches one of these patterns, the plugin will be loaded.
     */
    module_pattern: string | string[]
  }

  export const init: (user_config: any) => void
  export const make_commands: () => void
  /**
   * @see https://github.com/wbthomason/packer.nvim/blob/797f15afd80dcfe213d421e969f9f5f62af3a728/lua/packer.lua#L136
   * @description 重置
   */
  export const reset: () => void
  export const use_rocks: (rock: any) => void
  export const set_handler: (name: any, func: any) => void
  export const use: (plugin_spec: PluginSpec) => void
  export const clean: (results: any) => void
  export const install: (...args: any[]) => any
  export const update: (...args: any[]) => any
  export const sync: (...args: any[]) => any
  export const status: (...args: any[]) => any
  export const startup: (...args: any[]) => any
  /**
   * @see https://github.com/wbthomason/packer.nvim/blob/master/lua/packer.lua#L748
   * @description
   * Load plugins
   * @param plugins string String of space separated plugins names
   *    intended for PackerLoad command
   *    or list of plugin names as independent strings
   */
  export const loader: (...args: string[]) => void
}

declare type Packer = typeof import('packer')

declare const _packer: Packer
