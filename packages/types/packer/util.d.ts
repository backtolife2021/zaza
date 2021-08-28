/** @noSelfInFile */

/**
 * @noSelf
 */
declare module 'packer/util' {
  export function map<A, R, T> (func: (...args: A[]) => R, seq: Record<number, T>): R[]
  export function partition<T, T1> (
    sub: Record<number, T>,
    seq: Record<number, T1>
  ): LuaMultiReturn<[(T | T1)[], (T | T1)[]]>
}
