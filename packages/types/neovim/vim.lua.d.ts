/* eslint-disable @typescript-eslint/ban-types */
/** @noSelf */
declare interface Vim {
  /**
   *Add new filetype mappings.
   *Filetype mappings can be added either by extension or by
   *filename (either the "tail" or the full file path). The full
   *file path is checked first, followed by the file name. If a
   *match is not found using the filename, then the filename is
   *matched against the list of |lua-patterns| (sorted by
   *priority) until a match is found. Lastly, if pattern matching
   *does not find a filetype, then the file extension is used.
   *The filetype can be either a string (in which case it is used
   *as the filetype directly) or a function. If a function, it
   *takes the full path and buffer number of the file as arguments
   *(along with captures from the matched pattern, if any) and
   *should return a string that will be used as the buffer's
   *filetype. Optionally, the function can return a second
   *function value which, when called, modifies the state of the
   *buffer. This can be used to, for example, set
   *filetype-specific buffer variables.
   *Filename patterns can specify an optional priority to resolve
   *cases when a file path matches multiple patterns. Higher
   *priorities are matched first. When omitted, the priority
   *defaults to 0.
   *See $VIMRUNTIME\/lua\/vim\/filetype.lua for more examples.
   *Note that Lua filetype detection is only enabled when
   *|g:do_filetype_lua| is set to 1.
   *@example >
   *
   *  vim.filetype.add({
   *    extension = {
   *      foo = "fooscript",
   *      bar = function(path, bufnr)
   *        if some_condition() then
   *          return "barscript", function(bufnr)
   *            -- Set a buffer variable
   *            vim.b[bufnr].barscript_version = 2
   *          end
   *        end
   *        return "bar"
   *      end,
   *    },
   *    filename = {
   *      [".foorc"] = "toml",
   *      ["\/etc\/foo\/config"] = "toml",
   *    },
   *    pattern = {
   *      [".*&zwj;\/etc\/foo\/.*"] = "fooscript",
   *      -- Using an optional priority
   *      [".*&zwj;\/etc\/foo\/.*%.conf"] = { "dosini", { priority = 10 } },
   *      ["README.(%a+)$"] = function(path, bufnr, ext)
   *        if ext == "md" then
   *          return "markdown"
   *        elseif ext == "rst" then
   *          return "rst"
   *        end
   *      end,
   *    },
   *  })
   *
   *<
   */
  add: (filetypes: any) => any
  /**
   *Return the basename of the given file or directory
   */
  basename: (file: any) => any
  /**
   *Execute Vim script commands.
   *@example >
   *
   *   vim.cmd('echo 42')
   *   vim.cmd([[
   *     augroup My_group
   *       autocmd!
   *       autocmd FileType c setlocal cindent
   *     augroup END
   *   ]])
   *   vim.cmd({ cmd = 'echo', args = { '"foo"' } })
   *
   *<
   */
  cmd: (command: any) => any
  /**
   *
   */
  connection_failure_errmsg: (consequence: any) => any
  /**
   *Deep compare values for equality
   *Tables are compared recursively unless they both provide the `eq` metamethod. All other types are compared using the equality `==` operator.
   */
  deep_equal: (a: any, b: any) => any
  /**
   *Returns a deep copy of the given object. Non-table objects are
   *copied as in a typical Lua assignment, whereas table objects
   *are copied recursively. Functions are naively copied, so
   *functions in the copied table point to the same functions as
   *those in the input table. Userdata and threads are not copied
   *and will throw an error.
   */
  deepcopy: (orig: any) => any
  /**
   *Defers calling `fn` until `timeout` ms passes.
   *Use to do a one-shot timer that calls `fn` Note: The {fn} is |schedule_wrap|ped automatically, so API
   *functions are safe to call.
   */
  defer_fn: (fn: any, timeout: any) => any
  /**
   *Remove an existing mapping. @example >
   *
   *   vim.keymap.del('n', 'lhs')
   *
   *   vim.keymap.del({'n', 'i', 'v'}, '<leader>w', { buffer = 5 })
   *
   *<
   */
  del: (modes: any, lhs: any, opts: any) => any
  /**
   *Display a deprecation notification to the user.
   */
  deprecate: (name: any, alternative: any, version: any, plugin: any, backtrace: any) => any
  /**
   *Return an iterator over the files and directories located in
   *{path}
   */
  dir: (path: any) => any
  /**
   *Return the parent directory of the given file or directory
   */
  dirname: (file: any) => any
  /**
   *Tests if `s` ends with `suffix`.
   */
  endswith: (s: any, suffix: any) => any
  /**
   *Find files or directories in the given path.
   *Finds any files or directories given in {names} starting from
   *{path}. If {upward} is "true" then the search traverses upward
   *through parent directories; otherwise, the search traverses
   *downward. Note that downward searches are recursive and may
   *search through many directories! If {stop} is non-nil, then
   *the search stops when the directory given in {stop} is
   *reached. The search terminates when {limit} (default 1)
   *matches are found. The search can be narrowed to find only
   *files or or only directories by specifying {type} to be "file"
   *or "directory", respectively.
   */
  find: (names: any, opts: any) => any
  /**
   *Splits a string at each instance of a separator.
   */
  gsplit: (s: any, sep: any, plain: any) => any
  /**
   *Prompts the user for input
   *@example >
   *
   * vim.ui.input({ prompt = 'Enter value for shiftwidth: ' }, function(input)
   *     vim.o.shiftwidth = tonumber(input)
   * end)
   *
   *<
   */
  input: (opts: any, on_confirm: any) => any
  /**
   *Return a human-readable representation of the given object.
   */
  inspect: (object: any, options: any) => any
  /**
   *Returns true if object `f` can be called as a function.
   */
  is_callable: (f: any) => any
  /**
   *Extends a list-like table with the values of another list-like
   *table.
   *NOTE: This mutates dst!
   */
  list_extend: (dst: any, src: any, start: any, finish: any) => any
  /**
   *Creates a copy of a table containing only elements from start
   *to end (inclusive)
   */
  list_slice: (list: any, start: any, finish: any) => any
  /**
   *Perform filetype detection.
   *The filetype can be detected using one of three methods:
   *1. Using an existing buffer
   *2. Using only a file name
   *3. Using only file contents
   *
   *Of these, option 1 provides the most accurate result as it
   *uses both the buffer's filename and (optionally) the buffer
   *contents. Options 2 and 3 can be used without an existing
   *buffer, but may not always provide a match in cases where the
   *filename (or contents) cannot unambiguously determine the
   *filetype.
   *Each of the three options is specified using a key to the
   *single argument of this function. @example
   *>
   *
   *   -- Using a buffer number
   *   vim.filetype.match({ buf = 42 })
   *
   *   -- Override the filename of the given buffer
   *   vim.filetype.match({ buf = 42, filename = 'foo.c' })
   *
   *   -- Using a filename without a buffer
   *   vim.filetype.match({ filename = 'main.lua' })
   *
   *   -- Using file contents
   *   vim.filetype.match({ contents = {'#!\/usr\/bin\/env bash'} })
   *
   *<
   */
  match: (arg: any) => any
  /**
   *Normalize a path to a standard format. A tilde (~) character
   *at the beginning of the path is expanded to the user's home
   *directory and any backslash (\) characters are converted to
   *forward slashes (\/). Environment variables are also expanded.
   *@example >
   *
   * vim.fs.normalize('C:\Users\jdoe')
   * => 'C:\/Users\/jdoe'
   *
   * vim.fs.normalize('~\/src\/neovim')
   * => '\/home\/jdoe\/src\/neovim'
   *
   * vim.fs.normalize('$XDG_CONFIG_HOME\/nvim\/init.vim')
   * => '\/Users\/jdoe\/.config\/nvim\/init.vim'
   *
   *<
   */
  normalize: (path: any) => any
  /**
   *Display a notification to the user.
   *This function can be overridden by plugins to display
   *notifications using a custom provider (such as the system
   *notification provider). By default, writes to |:messages|.
   */
  notify: (msg: any, level: any, opts: any) => any
  /**
   *Display a notification only one time.
   *Like |vim.notify()|, but subsequent calls with the same
   *message will not display a notification.
   */
  notify_once: (msg: any, level: any, opts: any) => any
  /**
   *Adds Lua function {fn} with namespace id {ns_id} as a listener
   *to every, yes every, input key.
   *The Nvim command-line option |-w| is related but does not
   *support callbacks and cannot be toggled dynamically.
   *
   *Note:
   *    {fn} will not be cleared by |nvim_buf_clear_namespace()|
   *
   *Note:
   *    {fn} will receive the keys after mappings have been
   *    evaluated
   *
   */
  on_key: (fn: any, ns_id: any) => any
  /**
   *Iterate over all the parents of the given file or directory.
   *@example >
   *
   * local root_dir
   * for dir in vim.fs.parents(vim.api.nvim_buf_get_name(0)) do
   *   if vim.fn.isdirectory(dir .. "\/.git") == 1 then
   *     root_dir = dir
   *     break
   *   end
   * end
   *
   * if root_dir then
   *   print("Found git repository at", root_dir)
   * end
   *
   *<
   */
  parents: (start: any) => any
  /**
   *Paste handler, invoked by |nvim_paste()| when a conforming UI
   *(such as the |TUI|) pastes text into the editor.
   *@example To remove ANSI color codes when pasting: >
   *
   * vim.paste = (function(overridden)
   *   return function(lines, phase)
   *     for i,line in ipairs(lines) do
   *       -- Scrub ANSI color codes from paste input.
   *       lines[i] = line:gsub('\27%[[0-9;mK]+', '')
   *     end
   *     overridden(lines, phase)
   *   end
   * end)(vim.paste)
   *
   *<
   */
  paste: (lines: any, phase: any) => any
  /**
   *Escapes magic chars in a Lua pattern.
   */
  pesc: (s: any) => any
  /**
   *Prints given arguments in human-readable format. @example >
   *  -- Print highlight group Normal and store it's contents in a variable.
   *  local hl_normal = vim.pretty_print(vim.api.nvim_get_hl_by_name("Normal", true))
   *
   *<
   */
  pretty_print: (...args: any[]) => any
  /**
   *Get a table of lines with start, end columns for a region
   *marked by two points
   */
  region: (bufnr: any, pos1: any, pos2: any, regtype: any, inclusive: any) => any
  /**
   *Defers callback `cb` until the Nvim API is safe to call.
   */
  schedule_wrap: (cb: any) => any
  /**
   *Prompts the user to pick a single item from a collection of
   *entries
   *@example >
   *
   * vim.ui.select({ 'tabs', 'spaces' }, {
   *     prompt = 'Select tabs or spaces:',
   *     format_item = function(item)
   *         return "I'd like to choose " .. item
   *     end,
   * }, function(choice)
   *     if choice == 'spaces' then
   *         vim.o.expandtab = true
   *     else
   *         vim.o.expandtab = false
   *     end
   * end)
   *
   *<
   */
  select: (items: any, opts: any, on_choice: any) => any
  /**
   *Add a new |mapping|. @example >
   *
   *   -- Can add mapping to Lua functions
   *   vim.keymap.set('n', 'lhs', function() print("real lua function") end)
   *
   *   -- Can use it to map multiple modes
   *   vim.keymap.set({'n', 'v'}, '<leader>lr', vim.lsp.buf.references, { buffer=true })
   *
   *   -- Can add mapping for specific buffer
   *   vim.keymap.set('n', '<leader>w', "<cmd>w<cr>", { silent = true, buffer = 5 })
   *
   *   -- Expr mappings
   *   vim.keymap.set('i', '<Tab>', function()
   *     return vim.fn.pumvisible() == 1 and "<C-n>" or "<Tab>"
   *   end, { expr = true })
   *   -- <Plug> mappings
   *   vim.keymap.set('n', '[%', '<Plug>(MatchitNormalMultiBackward)')
   *
   *<
   *Note that in a mapping like: >
   *
   *    vim.keymap.set('n', 'asdf', require('jkl').my_fun)
   *
   *<
   *the `require('jkl')` gets evaluated during this call in order to access the
   *function. If you want to avoid this cost at startup you can
   *wrap it in a function, for example: >
   *
   *    vim.keymap.set('n', 'asdf', function() return require('jkl').my_fun() end)
   *
   *<
   */
  set: (mode: any, lhs: any, rhs: any, opts: any) => any
  /**
   *Splits a string at each instance of a separator.
   *@example >
   *
   *  split(":aa::b:", ":")     --> {'','aa','','b',''}
   *  split("axaby", "ab?")     --> {'','x','y'}
   *  split("x*yz*o", "*", {plain=true})  --> {'x','yz','o'}
   *  split("|x|y|z|", "|", {trimempty=true}) --> {'x', 'y', 'z'}
   *
   *<
   */
  split: (s: any, sep: any, kwargs: any) => any
  /**
   *Tests if `s` starts with `prefix`.
   */
  startswith: (s: any, prefix: any) => any
  /**
   *Add the reverse lookup values to an existing table. For
   *example: `tbl_add_reverse_lookup { A = 1 } == { [1] = 'A', A =
   *1 }`
   *Note that this modifies the input.
   */
  tbl_add_reverse_lookup: (o: any) => any
  /**
   *Checks if a list-like (vector) table contains `value`.
   */
  tbl_contains: (t: any, value: any) => any
  /**
   *Counts the number of non-nil values in table `t`.
   *>
   *
   * vim.tbl_count({ a=1, b=2 }) => 2
   * vim.tbl_count({ 1, 2 }) => 2
   *
   *<
   */
  tbl_count: (t: any) => any
  /**
   *Merges recursively two or more map-like tables.
   */
  tbl_deep_extend: (behavior: any, ...args: any[]) => any
  /**
   *Merges two or more map-like tables.
   */
  tbl_extend: (behavior: any, ...args: any[]) => any
  /**
   *Filter a table using a predicate function
   */
  tbl_filter: (func: any, t: any) => any
  /**
   *Creates a copy of a list-like table such that any nested
   *tables are "unrolled" and appended to the result.
   */
  tbl_flatten: (t: any) => any
  /**
   *Index into a table (first argument) via string keys passed as
   *subsequent arguments. Return `nil` if the key does not exist.
   *@example >
   *
   *  vim.tbl_get({ key = { nested_key = true }}, 'key', 'nested_key') == true
   *  vim.tbl_get({ key = {}}, 'key', 'nested_key') == nil
   *
   *<
   */
  tbl_get: (o: any, ...args: any[]) => any
  /**
   *Checks if a table is empty.
   */
  tbl_isempty: (t: any) => any
  /**
   *Tests if a Lua table can be treated as an array.
   *Empty table `{}` is assumed to be an array, unless it was
   *created by |vim.empty_dict()| or returned as a dict-like |API|
   *or Vimscript result, for example from |rpcrequest()| or
   *|vim.fn|.
   */
  tbl_islist: (t: any) => any
  /**
   *Return a list of all keys used in a table. However, the order
   *of the return table of keys is not guaranteed.
   */
  tbl_keys: (t: any) => any
  /**
   *Apply a function to all values of a table.
   */
  tbl_map: (func: any, t: any) => any
  /**
   *Return a list of all values used in a table. However, the
   *order of the return table of values is not guaranteed.
   */
  tbl_values: (t: any) => any
  /**
   *Trim whitespace (Lua pattern "%s") from both sides of a
   *string.
   */
  trim: (s: any) => any
  /**
   *Get a URI from a bufnr
   */
  uri_from_bufnr: (bufnr: any) => any
  /**
   *Get a URI from a file path.
   */
  uri_from_fname: (path: any) => any
  /**
   *Get the buffer for a uri. Creates a new unloaded buffer if no
   *buffer for the uri already exists.
   */
  uri_to_bufnr: (uri: any) => any
  /**
   *Get a filename from a URI
   */
  uri_to_fname: (uri: any) => any
  /**
   *Validates a parameter specification (types and values).
   *Usage example: >
   *
   *  function user.new(name, age, hobbies)
   *    vim.validate{
   *      name={name, 'string'},
   *      age={age, 'number'},
   *      hobbies={hobbies, 'table'},
   *    }
   *    ...
   *  end
   *
   *<
   *Examples with explicit argument values (can be run directly): >
   *
   *  vim.validate{arg1={{'foo'}, 'table'}, arg2={'foo', 'string'}}
   *     => NOP (success)
   *
   *  vim.validate{arg1={1, 'table'}}
   *     => error('arg1: expected table, got number')
   *
   *  vim.validate{arg1={3, function(a) return (a % 2) == 0 end, 'even number'}}
   *     => error('arg1: expected even number, got 3')
   *
   *<
   *If multiple types are valid they can be given as a list. >
   *
   *  vim.validate{arg1={{'foo'}, {'table', 'string'}}, arg2={'foo', {'table', 'string'}}}
   *     => NOP (success)
   *
   *  vim.validate{arg1={1, {'string', table'}}}
   *     => error('arg1: expected string|table, got number')
   *
   *
   *<
   */
  validate: (opt: any) => any
}
