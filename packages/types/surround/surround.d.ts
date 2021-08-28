/** @noSelfInFile */

/** @noSelf */
declare module 'surround' {
  /** @onSelf */
  export const setup: (
    this: void,
    opts?: Partial<{
      context_offset: number
      load_autogroups: boolean
      mappings_style: 'sandwich' | 'surround'
      map_insert_mode: boolean
      quotes: string[]
      brackets: string[]
      pairs: {
        nestable: string[][]
        linear: string[][]
      }
      prefix: string
    }>
  ) => void
}
declare type Surround = typeof import('surround')
