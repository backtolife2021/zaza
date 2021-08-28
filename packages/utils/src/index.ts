/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/** @noSelfInFile */

export const dump = (...lua_table: any[]) => {
  print(unpack(vim.tbl_map(vim.inspect, lua_table)))
}

export const formal_table = <V, O extends Record<any, any>>(value: V | V[], object?: O) => {
  const array = Array.isArray(value) ? value : [value]

  return array.reduce((accumulator, currentValue, index) => {
    return {
      ...accumulator,
      [index + 1]: currentValue,
    }
  }, object ?? {}) as O & Record<number, V>
}

export const formal_fn = <V, T extends (...arg: any[]) => any>(
  fn: T
): ((value: V | V[], object?: Partial<Parameters<T>[0]>) => ReturnType<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (value, object) => fn(formal_table(value, object))
}
