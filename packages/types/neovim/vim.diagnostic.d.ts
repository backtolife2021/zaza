/* eslint-disable @typescript-eslint/ban-types */
/** @noSelf */
interface Diagnostic {
  /**
   *Configure diagnostic options globally or for a specific
   *diagnostic namespace.
   *Configuration can be specified globally, per-namespace, or
   *ephemerally (i.e. only for a single call to
   *|vim.diagnostic.set()| or |vim.diagnostic.show()|). Ephemeral
   *configuration has highest priority, followed by namespace
   *configuration, and finally global configuration.
   *For example, if a user enables virtual text globally with >
   *
   *   vim.diagnostic.config({virtual_text = true})
   *
   *<
   *and a diagnostic producer sets diagnostics with >
   *
   *   vim.diagnostic.set(ns, 0, diagnostics, {virtual_text = false})
   *
   *<
   *then virtual text will not be enabled for those diagnostics.
   *
   *Note:
   *    Each of the configuration options below accepts one of the
   *    following:
   *    • `false`: Disable this feature
   *    • `true`: Enable this feature, use default settings.
   *    • `table`: Enable this feature with overrides. Use an
   *      empty table to use default values.
   *    • `function`: Function with signature (namespace, bufnr)
   *      that returns any of the above.
   *
   *
   */
  config: (opts: any, namespace: any) => any
  /**
   *Disable diagnostics in the given buffer.
   */
  disable: (bufnr: any, namespace: any) => any
  /**
   *Enable diagnostics in the given buffer.
   */
  enable: (bufnr: any, namespace: any) => any
  /**
   *Convert a list of quickfix items to a list of diagnostics.
   */
  fromqflist: (list: any) => any
  /**
   *Get current diagnostics.
   */
  get: (bufnr: any, opts: any) => any
  /**
   *Get namespace metadata.
   */
  get_namespace: (namespace: any) => any
  /**
   *Get current diagnostic namespaces.
   */
  get_namespaces: () => any
  /**
   *Get the next diagnostic closest to the cursor position.
   */
  get_next: (opts: any) => any
  /**
   *Return the position of the next diagnostic in the current
   *buffer.
   */
  get_next_pos: (opts: any) => any
  /**
   *Get the previous diagnostic closest to the cursor position.
   */
  get_prev: (opts: any) => any
  /**
   *Return the position of the previous diagnostic in the current
   *buffer.
   */
  get_prev_pos: (opts: any) => any
  /**
   *Move to the next diagnostic.
   */
  goto_next: (opts: any) => any
  /**
   *Move to the previous diagnostic in the current buffer.
   */
  goto_prev: (opts: any) => any
  /**
   *Hide currently displayed diagnostics.
   *This only clears the decorations displayed in the buffer.
   *Diagnostics can be redisplayed with |vim.diagnostic.show()|.
   *To completely remove diagnostics, use
   *|vim.diagnostic.reset()|.
   *To hide diagnostics and prevent them from re-displaying, use
   *|vim.diagnostic.disable()|.
   */
  hide: (namespace: any, bufnr: any) => any
  /**
   *Parse a diagnostic from a string.
   *For example, consider a line of output from a linter: >
   *
   * WARNING filename:27:3: Variable 'foo' does not exist
   *
   *<
   *This can be parsed into a diagnostic |diagnostic-structure|
   *with: >
   *
   * local s = "WARNING filename:27:3: Variable 'foo' does not exist"
   * local pattern = "^(%w+) %w+:(%d+):(%d+): (.+)$"
   * local groups = {"severity", "lnum", "col", "message"}
   * vim.diagnostic.match(s, pattern, groups, {WARNING = vim.diagnostic.WARN})
   *
   *<
   */
  match: (str: any, pat: any, groups: any, severity_map: any, defaults: any) => any
  /**
   *Show diagnostics in a floating window.
   */
  open_float: (opts: any, ...args: any[]) => any
  /**
   *Remove all diagnostics from the given namespace.
   *Unlike |vim.diagnostic.hide()|, this function removes all
   *saved diagnostics. They cannot be redisplayed using
   *|vim.diagnostic.show()|. To simply remove diagnostic
   *decorations in a way that they can be re-displayed, use
   *|vim.diagnostic.hide()|.
   */
  reset: (namespace: any, bufnr: any) => any
  /**
   *Set diagnostics for the given namespace and buffer.
   */
  set: (namespace: any, bufnr: any, diagnostics: any, opts: any) => any
  /**
   *Add buffer diagnostics to the location list.
   */
  setloclist: (opts: any) => any
  /**
   *Add all diagnostics to the quickfix list.
   */
  setqflist: (opts: any) => any
  /**
   *Display diagnostics for the given namespace and buffer.
   */
  show: (namespace: any, bufnr: any, diagnostics: any, opts: any) => any
  /**
   *Convert a list of diagnostics to a list of quickfix items that
   *can be passed to |setqflist()| or |setloclist()|.
   */
  toqflist: (diagnostics: any) => any
}
/** @noSelf */
declare interface Vim {
  diagnostic: Diagnostic
}
