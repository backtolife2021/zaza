/* eslint-disable no-restricted-globals */

import type { Plugin } from '@zaza/core'
import type { KeymapsOptions } from '@zaza/core/dist/keymaps'

export interface SpeedOptions {
  speed: number
  keymaps_options: KeymapsOptions | KeymapsOptions[]
}
export const zaza_plugin_speed: Plugin<SpeedOptions> = ({ speed, keymaps_options }) => ({
  zaza,
}) => {
  zaza.keymaps.set(keymaps_options)

  const array = Array.isArray(keymaps_options) ? keymaps_options : [keymaps_options]

  const speed_keymaps_options = array.map((it) => ({
    ...it,
    lhs: it.lhs.toUpperCase(),
    rhs: `${speed}${it.rhs}`,
  }))

  zaza.keymaps.set(speed_keymaps_options)
}

export default zaza_plugin_speed
