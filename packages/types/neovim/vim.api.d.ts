/* eslint-disable @typescript-eslint/ban-types */
/** @noSelf */
interface Api {
  /**
   *
   */
  nvim__buf_redraw_range: (buffer: any, first: any, last: any) => any
  /**
   *
   */
  nvim__buf_stats: (buffer: any) => any
  /**
   *
   */
  nvim__get_hl_defs: (ns_id: any) => any
  /**
   *
   */
  nvim__get_lib_dir: () => any
  /**
   *Find files in runtime directories
   */
  nvim__get_runtime: (pat: any, all: any, opts: any) => any
  /**
   *Returns object given as argument.
   *This API function is used for testing. One should not rely on
   *its presence in plugins.
   */
  nvim__id: (obj: any) => any
  /**
   *Returns array given as argument.
   *This API function is used for testing. One should not rely on
   *its presence in plugins.
   */
  nvim__id_array: (arr: any) => any
  /**
   *Returns dictionary given as argument.
   *This API function is used for testing. One should not rely on
   *its presence in plugins.
   */
  nvim__id_dictionary: (dct: any) => any
  /**
   *Returns floating-point value given as argument.
   *This API function is used for testing. One should not rely on
   *its presence in plugins.
   */
  nvim__id_float: (flt: any) => any
  /**
   *
   */
  nvim__inspect_cell: (grid: any, row: any, col: any) => any
  /**
   *
   */
  nvim__runtime_inspect: () => any
  /**
   *
   */
  nvim__screenshot: (path: any) => any
  /**
   *Set active namespace for highlights.
   *NB: this function can be called from async contexts, but the
   *semantics are not yet well-defined. To start with
   *|nvim_set_decoration_provider| on_win and on_line callbacks
   *are explicitly allowed to change the namespace during a redraw
   *cycle.
   */
  nvim__set_hl_ns: (ns_id: any) => any
  /**
   *Gets internal stats.
   */
  nvim__stats: () => any
  /**
   *
   */
  nvim__unpack: (str: any) => any
  /**
   *Adds a highlight to buffer.
   *Useful for plugins that dynamically generate highlights to a
   *buffer (like a semantic highlighter or linter). The function
   *adds a single highlight to a buffer. Unlike |matchaddpos()|
   *highlights follow changes to line numbering (as lines are
   *inserted\/removed above the highlighted line), like signs and
   *marks do.
   *Namespaces are used for batch deletion\/updating of a set of
   *highlights. To create a namespace, use
   *|nvim_create_namespace()| which returns a namespace id. Pass
   *it in to this function as `ns_id` to add highlights to the
   *namespace. All highlights in the same namespace can then be
   *cleared with single call to |nvim_buf_clear_namespace()|. If
   *the highlight never will be deleted by an API call, pass
   *`ns_id = -1`.
   *As a shorthand, `ns_id = 0` can be used to create a new
   *namespace for the highlight, the allocated id is then
   *returned. If `hl_group` is the empty string no highlight is
   *added, but a new `ns_id` is still returned. This is supported
   *for backwards compatibility, new code should use
   *|nvim_create_namespace()| to create a new empty namespace.
   */
  nvim_buf_add_highlight: (
    buffer: any,
    ns_id: any,
    hl_group: any,
    line: any,
    col_start: any,
    col_end: any
  ) => any
  /**
   *Activates buffer-update events on a channel, or as Lua
   *callbacks.
   *Example (Lua): capture buffer updates in a global `events` variable (use "print(vim.inspect(events))" to see its
   *contents): >
   *  events = {}
   *  vim.api.nvim_buf_attach(0, false, {
   *    on_lines=function(...) table.insert(events, {...}) end})
   *
   *<
   */
  nvim_buf_attach: (buffer: any, send_buffer: any, opts: any) => any
  /**
   *call a function with buffer as temporary current buffer
   *This temporarily switches current buffer to "buffer". If the
   *current window already shows "buffer", the window is not
   *switched If a window inside the current tabpage (including a
   *float) already shows the buffer One of these windows will be
   *set as current window temporarily. Otherwise a temporary
   *scratch window (called the "autocmd window" for historical
   *reasons) will be used.
   *This is useful e.g. to call vimL functions that only work with
   *the current buffer\/window currently, like |termopen()|.
   */
  nvim_buf_call: (buffer: any, fun: any) => any
  /**
   *Clears namespaced objects (highlights, extmarks, virtual text)
   *from a region.
   *Lines are 0-indexed. |api-indexing| To clear the namespace in
   *the entire buffer, specify line_start=0 and line_end=-1.
   */
  nvim_buf_clear_namespace: (buffer: any, ns_id: any, line_start: any, line_end: any) => any
  /**
   *Create a new user command |user-commands| in the given buffer.
   */
  nvim_buf_create_user_command: (buffer: any, name: any, command: any, opts: any) => any
  /**
   *Removes an extmark.
   */
  nvim_buf_del_extmark: (buffer: any, ns_id: any, id: any) => any
  /**
   *Unmaps a buffer-local |mapping| for the given mode.
   */
  nvim_buf_del_keymap: (buffer: any, mode: any, lhs: any) => any
  /**
   *Deletes a named mark in the buffer. See |mark-motions|.
   *
   *Note:
   *    only deletes marks set in the buffer, if the mark is not
   *    set in the buffer it will return false.
   *
   */
  nvim_buf_del_mark: (buffer: any, name: any) => any
  /**
   *Delete a buffer-local user-defined command.
   *Only commands created with |:command-buffer| or
   *|nvim_buf_create_user_command()| can be deleted with this
   *function.
   */
  nvim_buf_del_user_command: (buffer: any, name: any) => any
  /**
   *Removes a buffer-scoped (b:) variable
   */
  nvim_buf_del_var: (buffer: any, name: any) => any
  /**
   *Deletes the buffer. See |:bwipeout|
   */
  nvim_buf_delete: (buffer: any, opts: any) => any
  /**
   *Deactivates buffer-update events on the channel.
   */
  nvim_buf_detach: (buffer: any) => any
  /**
   *Gets a changed tick of a buffer
   */
  nvim_buf_get_changedtick: (buffer: any) => any
  /**
   *Gets a map of buffer-local |user-commands|.
   */
  nvim_buf_get_commands: (buffer: any, opts: any) => any
  /**
   *Gets the position (0-indexed) of an extmark.
   */
  nvim_buf_get_extmark_by_id: (buffer: any, ns_id: any, id: any, opts: any) => any
  /**
   *Gets extmarks in "traversal order" from a |charwise| region
   *defined by buffer positions (inclusive, 0-indexed
   *|api-indexing|).
   *Region can be given as (row,col) tuples, or valid extmark ids
   *(whose positions define the bounds). 0 and -1 are understood
   *as (0,0) and (-1,-1) respectively, thus the following are
   *equivalent:
   *>
   *  nvim_buf_get_extmarks(0, my_ns, 0, -1, {})
   *  nvim_buf_get_extmarks(0, my_ns, [0,0], [-1,-1], {})
   *
   *<
   *If `end` is less than `start`, traversal works backwards.
   *(Useful with `limit`, to get the first marks prior to a given
   *position.)
   *@example
   *>
   *  local a   = vim.api
   *  local pos = a.nvim_win_get_cursor(0)
   *  local ns  = a.nvim_create_namespace('my-plugin')
   *  -- Create new extmark at line 1, column 1.
   *  local m1  = a.nvim_buf_set_extmark(0, ns, 0, 0, {})
   *  -- Create new extmark at line 3, column 1.
   *  local m2  = a.nvim_buf_set_extmark(0, ns, 0, 2, {})
   *  -- Get extmarks only from line 3.
   *  local ms  = a.nvim_buf_get_extmarks(0, ns, {2,0}, {2,0}, {})
   *  -- Get all marks in this buffer + namespace.
   *  local all = a.nvim_buf_get_extmarks(0, ns, 0, -1, {})
   *  print(vim.inspect(ms))
   *
   *<
   */
  nvim_buf_get_extmarks: (buffer: any, ns_id: any, start: any, end: any, opts: any) => any
  /**
   *Gets a list of buffer-local |mapping| definitions.
   */
  nvim_buf_get_keymap: (buffer: any, mode: any) => any
  /**
   *Gets a line-range from the buffer.
   *Indexing is zero-based, end-exclusive. Negative indices are
   *interpreted as length+1+index: -1 refers to the index past the
   *end. So to get the last element use start=-2 and end=-1.
   *Out-of-bounds indices are clamped to the nearest valid value,
   *unless `strict_indexing` is set.
   */
  nvim_buf_get_lines: (buffer: any, start: any, end: any, strict_indexing: any) => any
  /**
   *Returns a tuple (row,col) representing the position of the
   *named mark. See |mark-motions|.
   *Marks are (1,0)-indexed. |api-indexing|
   */
  nvim_buf_get_mark: (buffer: any, name: any) => any
  /**
   *Gets the full file name for the buffer
   */
  nvim_buf_get_name: (buffer: any) => any
  /**
   *Returns the byte offset of a line (0-indexed). |api-indexing|
   *Line 1 (index=0) has offset 0. UTF-8 bytes are counted. EOL is
   *one byte. 'fileformat' and 'fileencoding' are ignored. The
   *line index just after the last line gives the total byte-count
   *of the buffer. A final EOL byte is counted if it would be
   *written, see 'eol'.
   *Unlike |line2byte()|, throws error for out-of-bounds indexing.
   *Returns -1 for unloaded buffer.
   */
  nvim_buf_get_offset: (buffer: any, index: any) => any
  /**
   *Gets a buffer option value
   */
  nvim_buf_get_option: (buffer: any, name: any) => any
  /**
   *Gets a range from the buffer.
   *This differs from |nvim_buf_get_lines()| in that it allows
   *retrieving only portions of a line.
   *Indexing is zero-based. Row indices are end-inclusive, and
   *column indices are end-exclusive.
   *Prefer |nvim_buf_get_lines()| when retrieving entire lines.
   */
  nvim_buf_get_text: (
    buffer: any,
    start_row: any,
    start_col: any,
    end_row: any,
    end_col: any,
    opts: any
  ) => any
  /**
   *Gets a buffer-scoped (b:) variable.
   */
  nvim_buf_get_var: (buffer: any, name: any) => any
  /**
   *Checks if a buffer is valid and loaded. See |api-buffer| for
   *more info about unloaded buffers.
   */
  nvim_buf_is_loaded: (buffer: any) => any
  /**
   *Checks if a buffer is valid.
   *
   *Note:
   *    Even if a buffer is valid it may have been unloaded. See
   *    |api-buffer| for more info about unloaded buffers.
   *
   */
  nvim_buf_is_valid: (buffer: any) => any
  /**
   *Returns the number of lines in the given buffer.
   */
  nvim_buf_line_count: (buffer: any) => any
  /**
   *Creates or updates an extmark.
   *By default a new extmark is created when no id is passed in,
   *but it is also possible to create a new mark by passing in a
   *previously unused id or move an existing mark by passing in
   *its id. The caller must then keep track of existing and unused
   *ids itself. (Useful over RPC, to avoid waiting for the return
   *value.)
   *Using the optional arguments, it is possible to use this to
   *highlight a range of text, and also to associate virtual text
   *to the mark.
   */
  nvim_buf_set_extmark: (buffer: any, ns_id: any, line: any, col: any, opts: any) => any
  /**
   *Sets a buffer-local |mapping| for the given mode.
   */
  nvim_buf_set_keymap: (buffer: any, mode: any, lhs: any, rhs: any, opts: any) => any
  /**
   *Sets (replaces) a line-range in the buffer.
   *Indexing is zero-based, end-exclusive. Negative indices are
   *interpreted as length+1+index: -1 refers to the index past the
   *end. So to change or delete the last element use start=-2 and
   *end=-1.
   *To insert lines at a given index, set `start` and `end` to the
   *same index. To delete a range of lines, set `replacement` to
   *an empty array.
   *Out-of-bounds indices are clamped to the nearest valid value,
   *unless `strict_indexing` is set.
   */
  nvim_buf_set_lines: (
    buffer: any,
    start: any,
    end: any,
    strict_indexing: any,
    replacement: any
  ) => any
  /**
   *Sets a named mark in the given buffer, all marks are allowed
   *file\/uppercase, visual, last change, etc. See |mark-motions|.
   *Marks are (1,0)-indexed. |api-indexing|
   *
   *Note:
   *    Passing 0 as line deletes the mark
   *
   */
  nvim_buf_set_mark: (buffer: any, name: any, line: any, col: any, opts: any) => any
  /**
   *Sets the full file name for a buffer
   */
  nvim_buf_set_name: (buffer: any, name: any) => any
  /**
   *Sets a buffer option value. Passing 'nil' as value deletes the
   *option (only works if there's a global fallback)
   */
  nvim_buf_set_option: (buffer: any, name: any, value: any) => any
  /**
   *Sets (replaces) a range in the buffer
   *This is recommended over |nvim_buf_set_lines()| when only
   *modifying parts of a line, as extmarks will be preserved on
   *non-modified parts of the touched lines.
   *Indexing is zero-based. Row indices are end-inclusive, and
   *column indices are end-exclusive.
   *To insert text at a given `(row, column)` location, use
   *`start_row = end_row = row` and `start_col = end_col = col`.
   *To delete the text in a range, use `replacement = {}`.
   *Prefer |nvim_buf_set_lines()| if you are only adding or
   *deleting entire lines.
   */
  nvim_buf_set_text: (
    buffer: any,
    start_row: any,
    start_col: any,
    end_row: any,
    end_col: any,
    replacement: any
  ) => any
  /**
   *Sets a buffer-scoped (b:) variable
   */
  nvim_buf_set_var: (buffer: any, name: any, value: any) => any
  /**
   *Calls many API methods atomically.
   *This has two main usages:
   *1. To perform several requests from an async context
   *   atomically, i.e. without interleaving redraws, RPC requests
   *   from other clients, or user interactions (however API
   *   methods may trigger autocommands or event processing which
   *   have such side effects, e.g. |:sleep| may wake timers).
   *2. To minimize RPC overhead (roundtrips) of a sequence of many
   *   requests.
   *
   */
  nvim_call_atomic: (calls: any) => any
  /**
   *Calls a VimL |Dictionary-function| with the given arguments.
   *On execution error: fails with VimL error, updates v:errmsg.
   */
  nvim_call_dict_function: (dict: any, fn: any, args: any) => any
  /**
   *Calls a VimL function with the given arguments.
   *On execution error: fails with VimL error, updates v:errmsg.
   */
  nvim_call_function: (fn: any, args: any) => any
  /**
   *Send data to channel `id`. For a job, it writes it to the
   *stdin of the process. For the stdio channel |channel-stdio|,
   *it writes to Nvim's stdout. For an internal terminal instance
   *(|nvim_open_term()|) it writes directly to terminal output.
   *See |channel-bytes| for more information.
   *This function writes raw data, not RPC messages. If the
   *channel was created with `rpc=true` then the channel expects
   *RPC messages, use |vim.rpcnotify()| and |vim.rpcrequest()|
   *instead.
   */
  nvim_chan_send: (chan: any, data: any) => any
  /**
   *Clear all autocommands that match the corresponding {opts}. To
   *delete a particular autocmd, see |nvim_del_autocmd|.
   */
  nvim_clear_autocmds: (opts: any) => any
  /**
   *Executes an Ex command.
   *Unlike |nvim_command()| this command takes a structured
   *Dictionary instead of a String. This allows for easier
   *construction and manipulation of an Ex command. This also
   *allows for things such as having spaces inside a command
   *argument, expanding filenames in a command that otherwise
   *doesn't expand filenames, etc.
   *On execution error: fails with VimL error, updates v:errmsg.
   */
  nvim_cmd: (cmd: any, opts: any) => any
  /**
   *Executes an Ex command.
   *On execution error: fails with VimL error, updates v:errmsg.
   *Prefer using |nvim_cmd()| or |nvim_exec()| over this. To
   *evaluate multiple lines of Vim script or an Ex command
   *directly, use |nvim_exec()|. To construct an Ex command using
   *a structured format and then execute it, use |nvim_cmd()|. To
   *modify an Ex command before evaluating it, use
   *|nvim_parse_cmd()| in conjunction with |nvim_cmd()|.
   */
  nvim_command: (command: any) => any
  /**
   *Create or get an autocommand group |autocmd-groups|.
   *To get an existing group id, do: >
   *    local id = vim.api.nvim_create_augroup("MyGroup", {
   *        clear = false
   *    })
   *
   *<
   */
  nvim_create_augroup: (name: any, opts: any) => any
  /**
   *Create an |autocommand|
   *The API allows for two (mutually exclusive) types of actions
   *to be executed when the autocommand triggers: a callback
   *function (Lua or Vimscript), or a command (like regular
   *autocommands).
   *Example using callback: >
   *    -- Lua function
   *    local myluafun = function() print("This buffer enters") end
   *
   *    -- Vimscript function name (as a string)
   *    local myvimfun = "g:MyVimFunction"
   *
   *    vim.api.nvim_create_autocmd({"BufEnter", "BufWinEnter"}, {
   *      pattern = {"*.c", "*.h"},
   *      callback = myluafun,  -- Or myvimfun
   *    })
   *
   *<
   *Lua functions receive a table with information about the
   *autocmd event as an argument. To use a function which itself
   *accepts another (optional) parameter, wrap the function in a
   *lambda:
   *>
   *    -- Lua function with an optional parameter.
   *    -- The autocmd callback would pass a table as argument but this
   *    -- function expects number|nil
   *    local myluafun = function(bufnr) bufnr = bufnr or vim.api.nvim_get_current_buf() end
   *
   *    vim.api.nvim_create_autocmd({"BufEnter", "BufWinEnter"}, {
   *      pattern = {"*.c", "*.h"},
   *      callback = function() myluafun() end,
   *    })
   *
   *<
   *Example using command: >
   *    vim.api.nvim_create_autocmd({"BufEnter", "BufWinEnter"}, {
   *      pattern = {"*.c", "*.h"},
   *      command = "echo 'Entering a C or C++ file'",
   *    })
   *
   *<
   *Example values for pattern: >
   *  pattern = "*.py"
   *  pattern = { "*.py", "*.pyi" }
   *
   *<
   *Example values for event: >
   *  "BufWritePre"
   *  {"CursorHold", "BufWritePre", "BufWritePost"}
   *
   *<
   */
  nvim_create_autocmd: (event: any, opts: any) => any
  /**
   *Creates a new, empty, unnamed buffer.
   */
  nvim_create_buf: (listed: any, scratch: any) => any
  /**
   *Creates a new *namespace* or gets an existing one.
   *Namespaces are used for buffer highlights and virtual text,
   *see |nvim_buf_add_highlight()| and |nvim_buf_set_extmark()|.
   *Namespaces can be named or anonymous. If `name` matches an
   *existing namespace, the associated id is returned. If `name`
   *is an empty string a new, anonymous namespace is created.
   */
  nvim_create_namespace: (name: any) => any
  /**
   *Create a new user command |user-commands|
   *{name} is the name of the new command. The name must begin
   *with an uppercase letter.
   *{command} is the replacement text or Lua function to execute.
   *@example >
   *   :call nvim_create_user_command('SayHello', 'echo "Hello world!"', {})
   *   :SayHello
   *   Hello world!
   *
   *<
   */
  nvim_create_user_command: (name: any, command: any, opts: any) => any
  /**
   *Delete an autocommand group by id.
   *To get a group id one can use |nvim_get_autocmds()|.
   *NOTE: behavior differs from |augroup-delete|. When deleting a
   *group, autocommands contained in this group will also be
   *deleted and cleared. This group will no longer exist.
   */
  nvim_del_augroup_by_id: (id: any) => any
  /**
   *Delete an autocommand group by name.
   *NOTE: behavior differs from |augroup-delete|. When deleting a
   *group, autocommands contained in this group will also be
   *deleted and cleared. This group will no longer exist.
   */
  nvim_del_augroup_by_name: (name: any) => any
  /**
   *Delete an autocommand by id.
   *NOTE: Only autocommands created via the API have an id.
   */
  nvim_del_autocmd: (id: any) => any
  /**
   *Deletes the current line.
   */
  nvim_del_current_line: () => any
  /**
   *Unmaps a global |mapping| for the given mode.
   *To unmap a buffer-local mapping, use |nvim_buf_del_keymap()|.
   */
  nvim_del_keymap: (mode: any, lhs: any) => any
  /**
   *Deletes an uppercase\/file named mark. See |mark-motions|.
   *
   *Note:
   *    fails with error if a lowercase or buffer local named mark
   *    is used.
   *
   */
  nvim_del_mark: (name: any) => any
  /**
   *Delete a user-defined command.
   */
  nvim_del_user_command: (name: any) => any
  /**
   *Removes a global (g:) variable.
   */
  nvim_del_var: (name: any) => any
  /**
   *Echo a message.
   */
  nvim_echo: (chunks: any, history: any, opts: any) => any
  /**
   *Writes a message to the Vim error buffer. Does not append
   *"\n", the message is buffered (won't display) until a linefeed
   *is written.
   */
  nvim_err_write: (str: any) => any
  /**
   *Writes a message to the Vim error buffer. Appends "\n", so the
   *buffer is flushed (and displayed).
   */
  nvim_err_writeln: (str: any) => any
  /**
   *Evaluates a VimL |expression|. Dictionaries and Lists are
   *recursively expanded.
   *On execution error: fails with VimL error, updates v:errmsg.
   */
  nvim_eval: (expr: any) => any
  /**
   *Evaluates statusline string.
   */
  nvim_eval_statusline: (str: any, opts: any) => any
  /**
   *Executes Vimscript (multiline block of Ex commands), like
   *anonymous |:source|.
   *Unlike |nvim_command()| this function supports heredocs,
   *script-scope (s:), etc.
   *On execution error: fails with VimL error, updates v:errmsg.
   */
  nvim_exec: (src: any, output: any) => any
  /**
   *Execute all autocommands for {event} that match the
   *corresponding {opts} |autocmd-execute|.
   */
  nvim_exec_autocmds: (event: any, opts: any) => any
  /**
   *Execute Lua code. Parameters (if any) are available as `...`
   *inside the chunk. The chunk can return a value.
   *Only statements are executed. To evaluate an expression,
   *prefix it with `return`: return my_function(...)
   */
  nvim_exec_lua: (code: any, args: any) => any
  /**
   *Sends input-keys to Nvim, subject to various quirks controlled
   *by `mode` flags. This is a blocking call, unlike
   *|nvim_input()|.
   *On execution error: does not fail, but updates v:errmsg.
   *To input sequences like <C-o> use |nvim_replace_termcodes()|
   *(typically with escape_ks=false) to replace |keycodes|, then
   *pass the result to nvim_feedkeys().
   *@example >
   *    :let key = nvim_replace_termcodes("<C-o>", v:true, v:false, v:true)
   *    :call nvim_feedkeys(key, 'n', v:false)
   *
   *<
   */
  nvim_feedkeys: (keys: any, mode: any, escape_ks: any) => any
  /**
   *Gets the option information for all options.
   *The dictionary has the full option names as keys and option
   *metadata dictionaries as detailed at |nvim_get_option_info|.
   */
  nvim_get_all_options_info: () => any
  /**
   *Returns a 2-tuple (Array), where item 0 is the current channel
   *id and item 1 is the |api-metadata| map (Dictionary).
   */
  nvim_get_api_info: () => any
  /**
   *Get all autocommands that match the corresponding {opts}.
   *These examples will get autocommands matching ALL the given
   *criteria: >
   *  -- Matches all criteria
   *  autocommands = vim.api.nvim_get_autocmds({
   *    group = "MyGroup",
   *    event = {"BufEnter", "BufWinEnter"},
   *    pattern = {"*.c", "*.h"}
   *  })
   *
   *  -- All commands from one group
   *  autocommands = vim.api.nvim_get_autocmds({
   *    group = "MyGroup",
   *  })
   *
   *<
   *NOTE: When multiple patterns or events are provided, it will
   *find all the autocommands that match any combination of them.
   */
  nvim_get_autocmds: (opts: any) => any
  /**
   *Gets information about a channel.
   */
  nvim_get_chan_info: (chan: any) => any
  /**
   *Returns the 24-bit RGB value of a |nvim_get_color_map()| color
   *name or "#rrggbb" hexadecimal string.
   *@example >
   *    :echo nvim_get_color_by_name("Pink")
   *    :echo nvim_get_color_by_name("#cbcbcb")
   *
   *<
   */
  nvim_get_color_by_name: (name: any) => any
  /**
   *Returns a map of color names and RGB values.
   *Keys are color names (e.g. "Aqua") and values are 24-bit RGB
   *color values (e.g. 65535).
   */
  nvim_get_color_map: () => any
  /**
   *Gets a map of global (non-buffer-local) Ex commands.
   *Currently only |user-commands| are supported, not builtin Ex
   *commands.
   */
  nvim_get_commands: (opts: any) => any
  /**
   *Gets a map of the current editor state.
   */
  nvim_get_context: (opts: any) => any
  /**
   *Gets the current buffer.
   */
  nvim_get_current_buf: () => any
  /**
   *Gets the current line.
   */
  nvim_get_current_line: () => any
  /**
   *Gets the current tabpage.
   */
  nvim_get_current_tabpage: () => any
  /**
   *Gets the current window.
   */
  nvim_get_current_win: () => any
  /**
   *Gets a highlight definition by id. |hlID()|
   */
  nvim_get_hl_by_id: (hl_id: any, rgb: any) => any
  /**
   *Gets a highlight definition by name.
   */
  nvim_get_hl_by_name: (name: any, rgb: any) => any
  /**
   *Gets a highlight group by name
   *similar to |hlID()|, but allocates a new ID if not present.
   */
  nvim_get_hl_id_by_name: (name: any) => any
  /**
   *Gets a list of global (non-buffer-local) |mapping|
   *definitions.
   */
  nvim_get_keymap: (mode: any) => any
  /**
   *Return a tuple (row, col, buffer, buffername) representing the
   *position of the uppercase\/file named mark. See |mark-motions|.
   *Marks are (1,0)-indexed. |api-indexing|
   *
   *Note:
   *    fails with error if a lowercase or buffer local named mark
   *    is used.
   *
   */
  nvim_get_mark: (name: any, opts: any) => any
  /**
   *Gets the current mode. |mode()| "blocking" is true if Nvim is
   *waiting for input.
   */
  nvim_get_mode: () => any
  /**
   *Gets existing, non-anonymous namespaces.
   */
  nvim_get_namespaces: () => any
  /**
   *Gets the global value of an option.
   */
  nvim_get_option: (name: any) => any
  /**
   *Gets the option information for one option
   *Resulting dictionary has keys:
   *• name: Name of the option (like 'filetype')
   *• shortname: Shortened name of the option (like 'ft')
   *• type: type of option ("string", "number" or "boolean")
   *• default: The default value for the option
   *• was_set: Whether the option was set.
   *• last_set_sid: Last set script id (if any)
   *• last_set_linenr: line number where option was set
   *• last_set_chan: Channel where option was set (0 for local)
   *• scope: one of "global", "win", or "buf"
   *• global_local: whether win or buf option has a global value
   *• commalist: List of comma separated values
   *• flaglist: List of single char flags
   *
   */
  nvim_get_option_info: (name: any) => any
  /**
   *Gets the value of an option. The behavior of this function
   *matches that of |:set|: the local value of an option is
   *returned if it exists; otherwise, the global value is
   *returned. Local values always correspond to the current buffer
   *or window, unless "buf" or "win" is set in {opts}.
   */
  nvim_get_option_value: (name: any, opts: any) => any
  /**
   *Gets info describing process `pid`.
   */
  nvim_get_proc: (pid: any) => any
  /**
   *Gets the immediate children of process `pid`.
   */
  nvim_get_proc_children: (pid: any) => any
  /**
   *Find files in runtime directories
   *'name' can contain wildcards. For example
   *nvim_get_runtime_file("colors\/*.vim", true) will return all
   *color scheme files. Always use forward slashes (\/) in the
   *search pattern for subdirectories regardless of platform.
   *It is not an error to not find any files. An empty array is
   *returned then.
   */
  nvim_get_runtime_file: (name: any, all: any) => any
  /**
   *Gets a global (g:) variable.
   */
  nvim_get_var: (name: any) => any
  /**
   *Gets a v: variable.
   */
  nvim_get_vvar: (name: any) => any
  /**
   *Queues raw user-input. Unlike |nvim_feedkeys()|, this uses a
   *low-level input buffer and the call is non-blocking (input is
   *processed asynchronously by the eventloop).
   *On execution error: does not fail, but updates v:errmsg.
   *
   *Note:
   *    |keycodes| like <CR> are translated, so "<" is special. To
   *    input a literal "<", send <LT>.
   *
   *Note:
   *    For mouse events use |nvim_input_mouse()|. The pseudokey
   *    form "<LeftMouse><col,row>" is deprecated since
   *    |api-level| 6.
   *
   */
  nvim_input: (keys: any) => any
  /**
   *Send mouse event from GUI.
   *Non-blocking: does not wait on any result, but queues the
   *event to be processed soon by the event loop.
   *
   *Note:
   *    Currently this doesn't support "scripting" multiple mouse
   *    events by calling it multiple times in a loop: the
   *    intermediate mouse positions will be ignored. It should be
   *    used to implement real-time mouse input in a GUI. The
   *    deprecated pseudokey form ("<LeftMouse><col,row>") of
   *    |nvim_input()| has the same limitation.
   *
   */
  nvim_input_mouse: (
    button: any,
    action: any,
    modifier: any,
    grid: any,
    row: any,
    col: any
  ) => any
  /**
   *Gets the current list of buffer handles
   *Includes unlisted (unloaded\/deleted) buffers, like `:ls!`. Use
   *|nvim_buf_is_loaded()| to check if a buffer is loaded.
   */
  nvim_list_bufs: () => any
  /**
   *Get information about all open channels.
   */
  nvim_list_chans: () => any
  /**
   *Gets the paths contained in 'runtimepath'.
   */
  nvim_list_runtime_paths: () => any
  /**
   *Gets the current list of tabpage handles.
   */
  nvim_list_tabpages: () => any
  /**
   *Gets a list of dictionaries representing attached UIs.
   */
  nvim_list_uis: () => any
  /**
   *Gets the current list of window handles.
   */
  nvim_list_wins: () => any
  /**
   *Sets the current editor state from the given |context| map.
   */
  nvim_load_context: (dict: any) => any
  /**
   *Notify the user with a message
   *Relays the call to vim.notify . By default forwards your
   *message in the echo area but can be overridden to trigger
   *desktop notifications.
   */
  nvim_notify: (msg: any, log_level: any, opts: any) => any
  /**
   *Open a terminal instance in a buffer
   *By default (and currently the only option) the terminal will
   *not be connected to an external process. Instead, input send
   *on the channel will be echoed directly by the terminal. This
   *is useful to display ANSI terminal sequences returned as part
   *of a rpc message, or similar.
   *Note: to directly initiate the terminal using the right size,
   *display the buffer in a configured window before calling this.
   *For instance, for a floating display, first create an empty
   *buffer using |nvim_create_buf()|, then display it using
   *|nvim_open_win()|, and then call this function. Then
   *|nvim_chan_send()| can be called immediately to process
   *sequences in a virtual terminal having the intended size.
   */
  nvim_open_term: (buffer: any, opts: any) => any
  /**
   *Open a new window.
   *Currently this is used to open floating and external windows.
   *Floats are windows that are drawn above the split layout, at
   *some anchor position in some other window. Floats can be drawn
   *internally or by external GUI with the |ui-multigrid|
   *extension. External windows are only supported with multigrid
   *GUIs, and are displayed as separate top-level windows.
   *For a general overview of floats, see |api-floatwin|.
   *Exactly one of `external` and `relative` must be specified.
   *The `width` and `height` of the new window must be specified.
   *With relative=editor (row=0,col=0) refers to the top-left
   *corner of the screen-grid and (row=Lines-1,col=Columns-1)
   *refers to the bottom-right corner. Fractional values are
   *allowed, but the builtin implementation (used by non-multigrid
   *UIs) will always round down to nearest integer.
   *Out-of-bounds values, and configurations that make the float
   *not fit inside the main editor, are allowed. The builtin
   *implementation truncates values so floats are fully within the
   *main screen grid. External GUIs could let floats hover outside
   *of the main window like a tooltip, but this should not be used
   *to specify arbitrary WM screen positions.
   *Example (Lua): window-relative float >
   *    vim.api.nvim_open_win(0, false,
   *      {relative='win', row=3, col=3, width=12, height=3})
   *
   *<
   *Example (Lua): buffer-relative float (travels as buffer is
   *scrolled) >
   *    vim.api.nvim_open_win(0, false,
   *      {relative='win', width=12, height=3, bufpos={100,10}})
   *
   *<
   */
  nvim_open_win: (buffer: any, enter: any, config: any) => any
  /**
   *Writes a message to the Vim output buffer. Does not append
   *"\n", the message is buffered (won't display) until a linefeed
   *is written.
   */
  nvim_out_write: (str: any) => any
  /**
   *Parse command line.
   *Doesn't check the validity of command arguments.
   */
  nvim_parse_cmd: (str: any, opts: any) => any
  /**
   *Parse a VimL expression.
   */
  nvim_parse_expression: (expr: any, flags: any, highlight: any) => any
  /**
   *Pastes at cursor, in any mode.
   *Invokes the `vim.paste` handler, which handles each mode
   *appropriately. Sets redo\/undo. Faster than |nvim_input()|.
   *Lines break at LF ("\n").
   *Errors ('nomodifiable', `vim.paste()` failure, …) are
   *reflected in `err` but do not affect the return value (which
   *is strictly decided by `vim.paste()`). On error, subsequent
   *calls are ignored ("drained") until the next paste is
   *initiated (phase 1 or -1).
   */
  nvim_paste: (data: any, crlf: any, phase: any) => any
  /**
   *Puts text at cursor, in any mode.
   *Compare |:put| and |p| which are always linewise.
   */
  nvim_put: (lines: any, type: any, after: any, follow: any) => any
  /**
   *Replaces terminal codes and |keycodes| (<CR>, <Esc>, ...) in a
   *string with the internal representation.
   */
  nvim_replace_termcodes: (str: any, from_part: any, do_lt: any, special: any) => any
  /**
   *Selects an item in the completion popupmenu.
   *If |ins-completion| is not active this API call is silently
   *ignored. Useful for an external UI using |ui-popupmenu| to
   *control the popupmenu with the mouse. Can also be used in a
   *mapping; use <cmd> |:map-cmd| to ensure the mapping doesn't
   *end completion mode.
   */
  nvim_select_popupmenu_item: (item: any, insert: any, finish: any, opts: any) => any
  /**
   *Self-identifies the client.
   *The client\/plugin\/application should call this after
   *connecting, to provide hints about its identity and purpose,
   *for debugging and orchestration.
   *Can be called more than once; the caller should merge old info
   *if appropriate. @example library first identifies the channel,
   *then a plugin using that library later identifies itself.
   *
   *Note:
   *    "Something is better than nothing". You don't need to
   *    include all the fields.
   *
   */
  nvim_set_client_info: (
    name: any,
    version: any,
    type: any,
    methods: any,
    attributes: any
  ) => any
  /**
   *Sets the current buffer.
   */
  nvim_set_current_buf: (buffer: any) => any
  /**
   *Changes the global working directory.
   */
  nvim_set_current_dir: (dir: any) => any
  /**
   *Sets the current line.
   */
  nvim_set_current_line: (line: any) => any
  /**
   *Sets the current tabpage.
   */
  nvim_set_current_tabpage: (tabpage: any) => any
  /**
   *Sets the current window.
   */
  nvim_set_current_win: (window: any) => any
  /**
   *Set or change decoration provider for a namespace
   *This is a very general purpose interface for having lua
   *callbacks being triggered during the redraw code.
   *The expected usage is to set extmarks for the currently
   *redrawn buffer. |nvim_buf_set_extmark| can be called to add
   *marks on a per-window or per-lines basis. Use the `ephemeral`
   *key to only use the mark for the current screen redraw (the
   *callback will be called again for the next redraw ).
   *Note: this function should not be called often. Rather, the
   *callbacks themselves can be used to throttle unneeded
   *callbacks. the `on_start` callback can return `false` to
   *disable the provider until the next redraw. Similarly, return
   *`false` in `on_win` will skip the `on_lines` calls for that
   *window (but any extmarks set in `on_win` will still be used).
   *A plugin managing multiple sources of decoration should
   *ideally only set one provider, and merge the sources
   *internally. You can use multiple `ns_id` for the extmarks
   *set\/modified inside the callback anyway.
   *Note: doing anything other than setting extmarks is considered
   *experimental. Doing things like changing options are not
   *expliticly forbidden, but is likely to have unexpected
   *consequences (such as 100% CPU consumption). doing
   *`vim.rpcnotify` should be OK, but `vim.rpcrequest` is quite
   *dubious for the moment.
   */
  nvim_set_decoration_provider: (ns_id: any, opts: any) => any
  /**
   *Sets a highlight group.
   *
   *Note:
   *    Unlike the `:highlight` command which can update a
   *    highlight group, this function completely replaces the
   *    definition. For example: `nvim_set_hl(0, 'Visual', {})`
   *    will clear the highlight group 'Visual'.
   *
   *Note:
   *    The fg and bg keys also accept the string values `"fg"` or
   *    `"bg"` which act as aliases to the corresponding
   *    foreground and background values of the Normal group. If
   *    the Normal group has not been defined, using these values
   *    results in an error.
   *
   */
  nvim_set_hl: (ns_id: any, name: any, val: any) => any
  /**
   *Sets a global |mapping| for the given mode.
   *To set a buffer-local mapping, use |nvim_buf_set_keymap()|.
   *Unlike |:map|, leading\/trailing whitespace is accepted as part
   *of the {lhs} or {rhs}. Empty {rhs} is |<Nop>|. |keycodes| are
   *replaced as usual.
   *@example >
   *    call nvim_set_keymap('n', ' <NL>', '', {'nowait': v:true})
   *
   *<
   *is equivalent to: >
   *    nmap <nowait> <Space><NL> <Nop>
   *
   *<
   */
  nvim_set_keymap: (mode: any, lhs: any, rhs: any, opts: any) => any
  /**
   *Sets the global value of an option.
   */
  nvim_set_option: (name: any, value: any) => any
  /**
   *Sets the value of an option. The behavior of this function
   *matches that of |:set|: for global-local options, both the
   *global and local value are set unless otherwise specified with
   *{scope}.
   *Note the options {win} and {buf} cannot be used together.
   */
  nvim_set_option_value: (name: any, value: any, opts: any) => any
  /**
   *Sets a global (g:) variable.
   */
  nvim_set_var: (name: any, value: any) => any
  /**
   *Sets a v: variable, if it is not readonly.
   */
  nvim_set_vvar: (name: any, value: any) => any
  /**
   *Calculates the number of display cells occupied by `text`.
   *Control characters including <Tab> count as one cell.
   */
  nvim_strwidth: (text: any) => any
  /**
   *Subscribes to event broadcasts.
   */
  nvim_subscribe: (event: any) => any
  /**
   *Removes a tab-scoped (t:) variable
   */
  nvim_tabpage_del_var: (tabpage: any, name: any) => any
  /**
   *Gets the tabpage number
   */
  nvim_tabpage_get_number: (tabpage: any) => any
  /**
   *Gets a tab-scoped (t:) variable
   */
  nvim_tabpage_get_var: (tabpage: any, name: any) => any
  /**
   *Gets the current window in a tabpage
   */
  nvim_tabpage_get_win: (tabpage: any) => any
  /**
   *Checks if a tabpage is valid
   */
  nvim_tabpage_is_valid: (tabpage: any) => any
  /**
   *Gets the windows in a tabpage
   */
  nvim_tabpage_list_wins: (tabpage: any) => any
  /**
   *Sets a tab-scoped (t:) variable
   */
  nvim_tabpage_set_var: (tabpage: any, name: any, value: any) => any
  /**
   *Activates UI events on the channel.
   *Entry point of all UI clients. Allows |--embed| to continue
   *startup. Implies that the client is ready to show the UI. Adds
   *the client to the list of UIs. |nvim_list_uis()|
   *
   *Note:
   *    If multiple UI clients are attached, the global screen
   *    dimensions degrade to the smallest client. E.g. if client
   *    A requests 80x40 but client B requests 200x100, the global
   *    screen has size 80x40.
   *
   */
  nvim_ui_attach: (width: any, height: any, options: any) => any
  /**
   *Deactivates UI events on the channel.
   *Removes the client from the list of UIs. |nvim_list_uis()|
   */
  nvim_ui_detach: () => any
  /**
   *Tells Nvim the geometry of the popumenu, to align floating
   *windows with an external popup menu.
   *Note that this method is not to be confused with
   *|nvim_ui_pum_set_height()|, which sets the number of visible
   *items in the popup menu, while this function sets the bounding
   *box of the popup menu, including visual elements such as
   *borders and sliders. Floats need not use the same font size,
   *nor be anchored to exact grid corners, so one can set
   *floating-point numbers to the popup menu geometry.
   */
  nvim_ui_pum_set_bounds: (width: any, height: any, row: any, col: any) => any
  /**
   *Tells Nvim the number of elements displaying in the popumenu,
   *to decide <PageUp> and <PageDown> movement.
   */
  nvim_ui_pum_set_height: (height: any) => any
  /**
   *
   */
  nvim_ui_set_option: (name: any, value: any, error: any) => any
  /**
   *
   */
  nvim_ui_try_resize: (width: any, height: any) => any
  /**
   *Tell Nvim to resize a grid. Triggers a grid_resize event with
   *the requested grid size or the maximum size if it exceeds size
   *limits.
   *On invalid grid handle, fails with error.
   */
  nvim_ui_try_resize_grid: (grid: any, width: any, height: any) => any
  /**
   *Unsubscribes to event broadcasts.
   */
  nvim_unsubscribe: (event: any) => any
  /**
   *Calls a function with window as temporary current window.
   */
  nvim_win_call: (window: any, fun: any) => any
  /**
   *Closes the window (like |:close| with a |window-ID|).
   */
  nvim_win_close: (window: any, force: any) => any
  /**
   *Removes a window-scoped (w:) variable
   */
  nvim_win_del_var: (window: any, name: any) => any
  /**
   *Gets the current buffer in a window
   */
  nvim_win_get_buf: (window: any) => any
  /**
   *Gets window configuration.
   *The returned value may be given to |nvim_open_win()|.
   *`relative` is empty for normal windows.
   */
  nvim_win_get_config: (window: any) => any
  /**
   *Gets the (1,0)-indexed cursor position in the window.
   *|api-indexing|
   */
  nvim_win_get_cursor: (window: any) => any
  /**
   *Gets the window height
   */
  nvim_win_get_height: (window: any) => any
  /**
   *Gets the window number
   */
  nvim_win_get_number: (window: any) => any
  /**
   *Gets a window option value
   */
  nvim_win_get_option: (window: any, name: any) => any
  /**
   *Gets the window position in display cells. First position is
   *zero.
   */
  nvim_win_get_position: (window: any) => any
  /**
   *Gets the window tabpage
   */
  nvim_win_get_tabpage: (window: any) => any
  /**
   *Gets a window-scoped (w:) variable
   */
  nvim_win_get_var: (window: any, name: any) => any
  /**
   *Gets the window width
   */
  nvim_win_get_width: (window: any) => any
  /**
   *Closes the window and hide the buffer it contains (like
   *|:hide| with a |window-ID|).
   *Like |:hide| the buffer becomes hidden unless another window
   *is editing it, or 'bufhidden' is `unload`, `delete` or `wipe`
   *as opposed to |:close| or |nvim_win_close|, which will close
   *the buffer.
   */
  nvim_win_hide: (window: any) => any
  /**
   *Checks if a window is valid
   */
  nvim_win_is_valid: (window: any) => any
  /**
   *Sets the current buffer in a window, without side effects
   */
  nvim_win_set_buf: (window: any, buffer: any) => any
  /**
   *Configures window layout. Currently only for floating and
   *external windows (including changing a split window to those
   *layouts).
   *When reconfiguring a floating window, absent option keys will
   *not be changed. `row`\/`col` and `relative` must be
   *reconfigured together.
   */
  nvim_win_set_config: (window: any, config: any) => any
  /**
   *Sets the (1,0)-indexed cursor position in the window.
   *|api-indexing| This scrolls the window even if it is not the
   *current one.
   */
  nvim_win_set_cursor: (window: any, pos: any) => any
  /**
   *Sets the window height.
   */
  nvim_win_set_height: (window: any, height: any) => any
  /**
   *Sets a window option value. Passing 'nil' as value deletes the
   *option(only works if there's a global fallback)
   */
  nvim_win_set_option: (window: any, name: any, value: any) => any
  /**
   *Sets a window-scoped (w:) variable
   */
  nvim_win_set_var: (window: any, name: any, value: any) => any
  /**
   *Sets the window width. This will only succeed if the screen is
   *split vertically.
   */
  nvim_win_set_width: (window: any, width: any) => any
}
/** @noSelf */
declare interface Vim {
  api: Api
}
