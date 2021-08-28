declare let dump: typeof import('@zaza/utils').dump

declare namespace Vim {
  export interface G {
    is_vscode: boolean
  }
}

declare interface NeovimPluginSetup {
  setup: (this: void, opts?: any) => any
}
