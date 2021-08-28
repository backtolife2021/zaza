/* eslint-disable @typescript-eslint/ban-types */
/** @noSelf */
interface Lsp {
  /**
   *Add the folder at path to the workspace folders. If {path} is
   *not provided, the user will be prompted for a path using
   *|input()|.
   */
  add_workspace_folder: (workspace_folder: any) => any
  /**
   *Applies a `TextDocumentEdit`, which is a list of changes to a
   *single document.
   */
  apply_text_document_edit: (
    text_document_edit: any,
    index: any,
    offset_encoding: any
  ) => any
  /**
   *Applies a list of text edits to a buffer.
   */
  apply_text_edits: (text_edits: any, bufnr: any, offset_encoding: any) => any
  /**
   *Applies a `WorkspaceEdit`.
   */
  apply_workspace_edit: (workspace_edit: any, offset_encoding: any) => any
  /**
   *Implements the `textDocument\/did…` notifications required to
   *track a buffer for any language server.
   *Without calling this, the server won't be notified of changes
   *to a buffer.
   */
  buf_attach_client: (bufnr: any, client_id: any) => any
  /**
   *Removes document highlights from a buffer.
   */
  buf_clear_references: (bufnr: any) => any
  /**
   *Detaches client from the specified buffer. Note: While the
   *server is notified that the text document (buffer) was closed,
   *it is still able to send notifications should it ignore this
   *notification.
   */
  buf_detach_client: (bufnr: any, client_id: any) => any
  /**
   *Shows a list of document highlights for a certain buffer.
   */
  buf_highlight_references: (bufnr: any, references: any, offset_encoding: any) => any
  /**
   *Checks if a buffer is attached for a particular client.
   */
  buf_is_attached: (bufnr: any, client_id: any) => any
  /**
   *Send a notification to a server
   */
  buf_notify: (bufnr: any, method: any, params: any) => any
  /**
   *Sends an async request for all active clients attached to the
   *buffer.
   */
  buf_request: (bufnr: any, method: any, params: any, handler: any) => any
  /**
   *Sends an async request for all active clients attached to the
   *buffer. Executes the callback on the combined result.
   *Parameters are the same as |vim.lsp.buf_request()| but the
   *return result and callback are different.
   */
  buf_request_all: (bufnr: any, method: any, params: any, callback: any) => any
  /**
   *Sends a request to all server and waits for the response of
   *all of them.
   *Calls |vim.lsp.buf_request_all()| but blocks Nvim while
   *awaiting the result. Parameters are the same as
   *|vim.lsp.buf_request()| but the return result is different.
   *Wait maximum of {timeout_ms} (default 1000) ms.
   */
  buf_request_sync: (bufnr: any, method: any, params: any, timeout_ms: any) => any
  /**
   *Returns the UTF-32 and UTF-16 offsets for a position in a
   *certain buffer.
   */
  character_offset: (buf: any, row: any, col: any, offset_encoding: any) => any
  /**
   *Removes document highlights from current buffer.
   */
  clear_references: () => any
  /**
   *LSP client object. You can get an active client object via
   *|vim.lsp.get_client_by_id()| or
   *|vim.lsp.get_active_clients()|.
   *
   *• Methods:
   *  • request(method, params, [handler], bufnr) Sends a request
   *    to the server. This is a thin wrapper around
   *    {client.rpc.request} with some additional checking. If
   *    {handler} is not specified, If one is not found there,
   *    then an error will occur. Returns: {status},
   *    {[client_id]}. {status} is a boolean indicating if the
   *    notification was successful. If it is `false`, then it
   *    will always be `false` (the client has shutdown). If
   *    {status} is `true`, the function returns {request_id} as
   *    the second result. You can use this with
   *    `client.cancel_request(request_id)` to cancel the request.
   *  • request_sync(method, params, timeout_ms, bufnr) Sends a
   *    request to the server and synchronously waits for the
   *    response. This is a wrapper around {client.request}
   *    Returns: { err=err, result=result }, a dictionary, where
   *    `err` and `result` come from the |lsp-handler|. On
   *    timeout, cancel or error, returns `(nil, err)` where `err`
   *    is a string describing the failure reason. If the request
   *    was unsuccessful returns `nil`.
   *  • notify(method, params) Sends a notification to an LSP
   *    server. Returns: a boolean to indicate if the notification
   *    was successful. If it is false, then it will always be
   *    false (the client has shutdown).
   *  • cancel_request(id) Cancels a request with a given request
   *    id. Returns: same as `notify()`.
   *  • stop([force]) Stops a client, optionally with force. By
   *    default, it will just ask the server to shutdown without
   *    force. If you request to stop a client which has
   *    previously been requested to shutdown, it will
   *    automatically escalate and force shutdown.
   *  • is_stopped() Checks whether a client is stopped. Returns:
   *    true if the client is fully stopped.
   *  • on_attach(client, bufnr) Runs the on_attach function from
   *    the client's config if it was defined. Useful for
   *    buffer-local setup.
   *
   *• Members
   *  • {id} (number): The id allocated to the client.
   *  • {name} (string): If a name is specified on creation, that
   *    will be used. Otherwise it is just the client id. This is
   *    used for logs and messages.
   *  • {rpc} (table): RPC client object, for low level
   *    interaction with the client. See |vim.lsp.rpc.start()|.
   *  • {offset_encoding} (string): The encoding used for
   *    communicating with the server. You can modify this in the
   *    `config`'s `on_init` method before text is sent to the
   *    server.
   *  • {handlers} (table): The handlers used by the client as
   *    described in |lsp-handler|.
   *  • {requests} (table): The current pending requests in flight
   *    to the server. Entries are key-value pairs with the key
   *    being the request ID while the value is a table with
   *    `type`, `bufnr`, and `method` key-value pairs. `type` is
   *    either "pending" for an active request, or "cancel" for a
   *    cancel request.
   *  • {config} (table): copy of the table that was passed by the
   *    user to |vim.lsp.start_client()|.
   *  • {server_capabilities} (table): Response from the server
   *    sent on `initialize` describing the server's capabilities.
   *
   *
   */
  client: () => any
  /**
   *Checks whether a client is stopped.
   */
  client_is_stopped: (client_id: any) => any
  /**
   *Selects a code action available at the current cursor
   *position.
   */
  code_action: (options: any) => any
  /**
   *Retrieves the completion items at the current cursor position.
   *Can only be called in Insert mode.
   */
  completion: (context: any) => any
  /**
   *Returns the range table for the difference between prev and
   *curr lines
   */
  compute_diff: (
    prev_lines: any,
    curr_lines: any,
    firstline: any,
    lastline: any,
    new_lastline: any,
    offset_encoding: any,
    line_ending: any
  ) => any
  /**
   *Converts any of `MarkedString` | `MarkedString[]` |
   *`MarkupContent` into a list of lines containing valid
   *markdown. Useful to populate the hover window for
   *`textDocument\/hover`, for parsing the result of
   *`textDocument\/signatureHelp`, and potentially others.
   */
  convert_input_to_markdown_lines: (input: any, contents: any) => any
  /**
   *Converts `textDocument\/SignatureHelp` response to markdown
   *lines.
   */
  convert_signature_help_to_markdown_lines: (
    signature_help: any,
    ft: any,
    triggers: any
  ) => any
  /**
   *Jumps to the declaration of the symbol under the cursor.
   *Note:
   *    Many servers do not implement this method. Generally, see
   *    |vim.lsp.buf.definition()| instead.
   *
   */
  declaration: (options: any) => any
  /**
   *Jumps to the definition of the symbol under the cursor.
   */
  definition: (options: any) => any
  /**
   *Display the lenses using virtual text
   */
  display: (lenses: any, bufnr: any, client_id: any) => any
  /**
   *Send request to the server to resolve document highlights for
   *the current text document position. This request can be
   *triggered by a key mapping or by events such as `CursorHold`,
   *e.g.:
   *>
   *autocmd CursorHold  <buffer> lua vim.lsp.buf.document_highlight()
   *autocmd CursorHoldI <buffer> lua vim.lsp.buf.document_highlight()
   *autocmd CursorMoved <buffer> lua vim.lsp.buf.clear_references()
   *
   *<
   *Note: Usage of |vim.lsp.buf.document_highlight()| requires the
   *following highlight groups to be defined or you won't be able
   *to see the actual highlights. |LspReferenceText|
   *|LspReferenceRead| |LspReferenceWrite|
   */
  document_highlight: () => any
  /**
   *Lists all symbols in the current buffer in the quickfix
   *window.
   */
  document_symbol: () => any
  /**
   *Executes an LSP server command.
   */
  execute_command: (command_params: any) => any
  /**
   *Can be used to extract the completion items from a `textDocument\/completion` request, which may return one of `CompletionItem[]` , `CompletionList` or null.
   */
  extract_completion_items: (result: any) => any
  /**
   *Invokes a function for each LSP client attached to a buffer.
   */
  for_each_buffer_client: (bufnr: any, fn: any) => any
  /**
   *Formats a buffer using the attached (and optionally filtered)
   *language server clients.
   */
  format: (options: any) => any
  /**
   *Constructs an error message from an LSP error object.
   */
  format_rpc_error: () => any
  /**
   *Provides an interface between the built-in client and a
   *`formatexpr` function.
   *Currently only supports a single client. This can be set via
   *`setlocal formatexpr=v:lua.vim.lsp.formatexpr()` but will
   *typically or in `on_attach` via
   *`vim.api.nvim_buf_set_option(bufnr, 'formatexpr',
   *'v:lua.vim.lsp.formatexpr(#{timeout_ms:250})')`.
   */
  formatexpr: (opts: any) => any
  /**
   *Formats the current buffer.
   */
  formatting: (options: any) => any
  /**
   *Formats the current buffer by sequentially requesting
   *formatting from attached clients.
   *Useful when multiple clients with formatting capability are
   *attached.
   *Since it's synchronous, can be used for running on save, to
   *make sure buffer is formatted prior to being saved.
   *{timeout_ms} is passed on to the |vim.lsp.client| `request_sync` method. @example >
   *
   * vim.api.nvim_command[[autocmd BufWritePre <buffer> lua vim.lsp.buf.formatting_seq_sync()]]
   *
   *<
   */
  formatting_seq_sync: (options: any, timeout_ms: any, order: any) => any
  /**
   *Performs |vim.lsp.buf.formatting()| synchronously.
   *Useful for running on save, to make sure buffer is formatted
   *prior to being saved. {timeout_ms} is passed on to
   *|vim.lsp.buf_request_sync()|. @example
   *>
   *
   * autocmd BufWritePre <buffer> lua vim.lsp.buf.formatting_sync()
   *
   *<
   */
  formatting_sync: (options: any, timeout_ms: any) => any
  /**
   *Return all lenses for the given buffer
   */
  get: (bufnr: any) => any
  /**
   *Get active clients.
   */
  get_active_clients: (filter: any) => any
  /**
   *Returns list of buffers attached to client_id.
   */
  get_buffers_by_client_id: (client_id: any) => any
  /**
   *Gets a client by id, or nil if the id is invalid. The returned
   *client may not yet be fully initialized.
   */
  get_client_by_id: (client_id: any) => any
  /**
   *Returns indentation size.
   */
  get_effective_tabstop: (bufnr: any) => any
  /**
   *Returns the log filename.
   */
  get_filename: () => any
  /**
   *Gets the current log level.
   */
  get_level: () => any
  /**
   *Gets the path of the logfile used by the LSP client.
   */
  get_log_path: () => any
  /**
   *Get the diagnostic namespace associated with an LSP client
   *|vim.diagnostic|.
   */
  get_namespace: (client_id: any) => any
  /**
   *|lsp-handler| for the method "textDocument\/hover" >
   *
   * vim.lsp.handlers["textDocument\/hover"] = vim.lsp.with(
   *   vim.lsp.handlers.hover, {
   *     -- Use a sharp border with `FloatBorder` highlights
   *     border = "single"
   *   }
   * )
   *
   *<
   */
  hover: (_: any, result: any, ctx: any, config: any) => any
  /**
   *Lists all the implementations for the symbol under the cursor
   *in the quickfix window.
   */
  implementation: () => any
  /**
   *Lists all the call sites of the symbol under the cursor in the
   *|quickfix| window. If the symbol can resolve to multiple
   *items, the user can pick one in the |inputlist|.
   */
  incoming_calls: () => any
  /**
   *Jumps to a location.
   */
  jump_to_location: (location: any, offset_encoding: any, reuse_win: any) => any
  /**
   *List workspace folders.
   */
  list_workspace_folders: () => any
  /**
   *Returns the items with the byte position calculated correctly
   *and in sorted order, for display in quickfix and location
   *lists.
   *The result can be passed to the {list} argument of
   *|setqflist()| or |setloclist()|.
   */
  locations_to_items: (locations: any, offset_encoding: any) => any
  /**
   *Helper function to return nested values in language server
   *settings
   */
  lookup_section: (settings: any, section: any) => any
  /**
   *Gets a new ClientCapabilities object describing the LSP client
   *capabilities.
   */
  make_client_capabilities: () => any
  /**
   *Creates a table with sensible default options for a floating
   *window. The table can be passed to |nvim_open_win()|.
   */
  make_floating_popup_options: (width: any, height: any, opts: any) => any
  /**
   *Creates a `DocumentFormattingParams` object for the current
   *buffer and cursor position.
   */
  make_formatting_params: (options: any) => any
  /**
   *Using the given range in the current buffer, creates an object
   *that is similar to |vim.lsp.util.make_range_params()|.
   */
  make_given_range_params: (
    start_pos: any,
    end_pos: any,
    bufnr: any,
    offset_encoding: any
  ) => any
  /**
   *Creates a `TextDocumentPositionParams` object for the current
   *buffer and cursor position.
   */
  make_position_params: (window: any, offset_encoding: any) => any
  /**
   *Using the current position in the current buffer, creates an
   *object that can be used as a building block for several LSP
   *requests, such as `textDocument\/codeAction`,
   *`textDocument\/colorPresentation`,
   *`textDocument\/rangeFormatting`.
   */
  make_range_params: (window: any, offset_encoding: any) => any
  /**
   *Creates a `TextDocumentIdentifier` object for the current
   *buffer.
   */
  make_text_document_params: (bufnr: any) => any
  /**
   *Create the workspace params
   */
  make_workspace_params: (added: any, removed: any) => any
  /**
   *Sends a notification to the LSP server.
   */
  notify: (method: any, params: any) => any
  /**
   *Implements 'omnifunc' compatible LSP completion.
   */
  omnifunc: (findstart: any, base: any) => any
  /**
   *|lsp-handler| for the method `textDocument\/codeLens`
   */
  on_codelens: (result: any, ctx: any, _: any) => any
  /**
   *|lsp-handler| for the method "textDocument\/publishDiagnostics"
   *See |vim.diagnostic.config()| for configuration options.
   *Handler-specific configuration can be set using
   *|vim.lsp.with()|: >
   *
   * vim.lsp.handlers["textDocument\/publishDiagnostics"] = vim.lsp.with(
   *   vim.lsp.diagnostic.on_publish_diagnostics, {
   *     -- Enable underline, use default values
   *     underline = true,
   *     -- Enable virtual text, override spacing to 4
   *     virtual_text = {
   *       spacing = 4,
   *     },
   *     -- Use a function to dynamically turn signs off
   *     -- and on, using buffer local variables
   *     signs = function(namespace, bufnr)
   *       return vim.b[bufnr].show_signs == true
   *     end,
   *     -- Disable a feature
   *     update_in_insert = false,
   *   }
   * )
   *
   *<
   */
  on_publish_diagnostics: (_: any, result: any, ctx: any, config: any) => any
  /**
   *Shows contents in a floating window.
   */
  open_floating_preview: (contents: any, syntax: any, opts: any) => any
  /**
   *Lists all the items that are called by the symbol under the
   *cursor in the |quickfix| window. If the symbol can resolve to
   *multiple items, the user can pick one in the |inputlist|.
   */
  outgoing_calls: () => any
  /**
   *Parses snippets in a completion entry.
   */
  parse_snippet: (input: any) => any
  /**
   *Previews a location in a floating window
   *behavior depends on type of location:
   *• for Location, range is shown (e.g., function definition)
   *• for LocationLink, targetRange is shown (e.g., body of
   *  function definition)
   *
   */
  preview_location: (location: any, opts: any) => any
  /**
   *Performs |vim.lsp.buf.code_action()| for a given range.
   */
  range_code_action: (context: any, start_pos: any, end_pos: any) => any
  /**
   *Formats a given range.
   */
  range_formatting: (options: any, start_pos: any, end_pos: any) => any
  /**
   *Lists all the references to the symbol under the cursor in the
   *quickfix window.
   */
  references: (context: any) => any
  /**
   *Refresh the codelens for the current buffer
   *It is recommended to trigger this using an autocmd or via
   *keymap.
   *>
   *  autocmd BufEnter,CursorHold,InsertLeave <buffer> lua vim.lsp.codelens.refresh()
   *
   *<
   */
  refresh: () => any
  /**
   *Remove the folder at path from the workspace folders. If
   *{path} is not provided, the user will be prompted for a path
   *using |input()|.
   */
  remove_workspace_folder: (workspace_folder: any) => any
  /**
   *Rename old_fname to new_fname
   */
  rename: (old_fname: any, new_fname: any, opts: any) => any
  /**
   *Sends a request to the LSP server and runs {callback} upon
   *response.
   */
  request: (method: any, params: any, callback: any, notify_reply_callback: any) => any
  /**
   *Creates a normalized object describing LSP server
   *capabilities.
   */
  resolve_capabilities: (server_capabilities: any) => any
  /**
   *Creates an RPC response object\/table.
   */
  rpc_response_error: (code: any, message: any, data: any) => any
  /**
   *Run the code lens in the current line
   */
  run: () => any
  /**
   *Store lenses for a specific buffer and client
   */
  save: (lenses: any, bufnr: any, client_id: any) => any
  /**
   *Checks whether the language servers attached to the current
   *buffer are ready.
   */
  server_ready: () => any
  /**
   *Sets formatting function used to format logs
   */
  set_format_func: (handle: any) => any
  /**
   *Sets the current log level.
   */
  set_level: (level: any) => any
  /**
   *Replaces text in a range with new text.
   *CAUTION: Changes in-place!
   */
  set_lines: (lines: any, A: any, B: any, new_lines: any) => any
  /**
   *Sets the global log level for LSP logging.
   *Levels by name: "TRACE", "DEBUG", "INFO", "WARN", "ERROR",
   *"OFF"
   *Level numbers begin with "TRACE" at 0
   *Use `lsp.log_levels` for reverse lookup.
   */
  set_log_level: (level: any) => any
  /**
   *Checks whether the level is sufficient for logging.
   */
  should_log: (level: any) => any
  /**
   *|lsp-handler| for the method "textDocument\/signatureHelp". The
   *active parameter is highlighted with
   *|hl-LspSignatureActiveParameter|. >
   *
   * vim.lsp.handlers["textDocument\/signatureHelp"] = vim.lsp.with(
   *   vim.lsp.handlers.signature_help, {
   *     -- Use a sharp border with `FloatBorder` highlights
   *     border = "single"
   *   }
   * )
   *
   *<
   */
  signature_help: (_: any, result: any, ctx: any, config: any) => any
  /**
   *Starts an LSP server process and create an LSP RPC client
   *object to interact with it. Communication with the server is
   *currently limited to stdio.
   */
  start: (cmd: any, cmd_args: any, dispatchers: any, extra_spawn_params: any) => any
  /**
   *Starts and initializes a client with the given configuration.
   *Parameter `cmd` is required.
   *The following parameters describe fields in the {config}
   *table.
   */
  start_client: (config: any) => any
  /**
   *Stops a client(s).
   *You can also use the `stop()` function on a |vim.lsp.client|
   *object. To stop all clients:
   *>
   *
   * vim.lsp.stop_client(vim.lsp.get_active_clients())
   *
   *<
   *By default asks the server to shutdown, unless stop was
   *requested already for this client, then force-shutdown is
   *attempted.
   */
  stop_client: (client_id: any, force: any) => any
  /**
   *Converts markdown into syntax highlighted regions by stripping
   *the code blocks and converting them into highlighted code.
   *This will by default insert a blank line separator after those
   *code block regions to improve readability.
   *This method configures the given buffer and returns the lines
   *to set.
   *If you want to open a popup with fancy markdown, use
   *`open_floating_preview` instead
   */
  stylize_markdown: (bufnr: any, contents: any, opts: any) => any
  /**
   *Converts symbols to quickfix list items.
   */
  symbols_to_items: (symbols: any, bufnr: any) => any
  /**
   *Provides an interface between the built-in client and
   *'tagfunc'.
   *When used with normal mode commands (e.g. |CTRL-]|) this will
   *invoke the "textDocument\/definition" LSP method to find the
   *tag under the cursor. Otherwise, uses "workspace\/symbol". If
   *no results are returned from any LSP servers, falls back to
   *using built-in tags.
   */
  tagfunc: (...args: any[]) => any
  /**
   *Turns the result of a `textDocument\/completion` request into
   *vim-compatible |complete-items|.
   */
  text_document_completion_list_to_complete_items: (result: any, prefix: any) => any
  /**
   *Removes empty lines from the beginning and end.
   */
  trim_empty_lines: (lines: any) => any
  /**
   *Accepts markdown lines and tries to reduce them to a filetype
   *if they comprise just a single code block.
   *CAUTION: Modifies the input in-place!
   */
  try_trim_markdown_code_blocks: (lines: any) => any
  /**
   *Jumps to the definition of the type of the symbol under the
   *cursor.
   */
  type_definition: (options: any) => any
  /**
   *Function to manage overriding defaults for LSP handlers.
   */
  with: (handler: any, override_config: any) => any
  /**
   *Lists all symbols in the current workspace in the quickfix
   *window.
   *The list is filtered against {query}; if the argument is
   *omitted from the call, the user is prompted to enter a string
   *on the command line. An empty string means no filtering is
   *done.
   */
  workspace_symbol: (query: any) => any
}
/** @noSelf */
declare interface Vim {
  lsp: Lsp
}
