/* eslint-disable @typescript-eslint/ban-types */
/** @noSelf */
interface Languagetree {
  LanguageTree: Languagetree
  Query: Query
  TSHighlighter: Tshighlighter
  /**
   *Adds a child language to this tree.
   *If the language already exists as a child, it will first be
   *removed.
   */
  add_child: (self: any, lang: any) => any
  /**
   *Returns a map of language to child tree.
   */
  children: (self: any) => any
  /**
   *Determines whether {range} is contained in this language tree
   */
  contains: (self: any, range: any) => any
  /**
   *Destroys this language tree and all its children.
   *Any cleanup logic should be performed here.
   *Note: This DOES NOT remove this tree from a parent. Instead, `remove_child` must be called on the parent to remove it.
   */
  destroy: (self: any) => any
  /**
   *Invokes the callback for each LanguageTree and it's children
   *recursively
   */
  for_each_child: (self: any, fn: any, include_self: any) => any
  /**
   *Invokes the callback for each treesitter trees recursively.
   *Note, this includes the invoking language tree's trees as
   *well.
   */
  for_each_tree: (self: any, fn: any) => any
  /**
   *Gets the set of included regions
   */
  included_regions: (self: any) => any
  /**
   *Invalidates this parser and all its children
   */
  invalidate: (self: any, reload: any) => any
  /**
   *Determines whether this tree is valid. If the tree is invalid,
   *call `parse()` . This will return the updated tree.
   */
  is_valid: (self: any) => any
  /**
   *Gets the language of this tree node.
   */
  lang: (self: any) => any
  /**
   *Gets the appropriate language that contains {range}
   */
  language_for_range: (self: any, range: any) => any
  /**
   *Parses all defined regions using a treesitter parser for the
   *language this tree represents. This will run the injection
   *query for this language to determine if any child languages
   *should be created.
   */
  parse: (self: any) => any
  /**
   *Registers callbacks for the parser.
   */
  register_cbs: (self: any, cbs: any) => any
  /**
   *Removes a child language from this tree.
   */
  remove_child: (self: any, lang: any) => any
  /**
   *Sets the included regions that should be parsed by this
   *parser. A region is a set of nodes and\/or ranges that will be
   *parsed in the same context.
   *For example, `{ { node1 }, { node2} }` is two separate
   *regions. This will be parsed by the parser in two different
   *contexts... thus resulting in two separate trees.
   *`{ { node1, node2 } }` is a single region consisting of two
   *nodes. This will be parsed by the parser in a single
   *context... thus resulting in a single tree.
   *This allows for embedded languages to be parsed together
   *across different nodes, which is useful for templating
   *languages like ERB and EJS.
   *Note, this call invalidates the tree and requires it to be
   *parsed again.
   */
  set_included_regions: (self: any, regions: any) => any
  /**
   *Returns the source content of the language tree (bufnr or
   *string).
   */
  source: (self: any) => any
  /**
   *Returns all trees this language tree contains. Does not
   *include child languages.
   */
  trees: (self: any) => any
}
/** @noSelf */
interface Query {
  LanguageTree: Languagetree
  Query: Query
  TSHighlighter: Tshighlighter
  /**
   *Iterate over all captures from all matches inside {node}
   *{source} is needed if the query contains predicates, then the
   *caller must ensure to use a freshly parsed tree consistent
   *with the current text of the buffer (if relevant). {start_row}
   *and {end_row} can be used to limit matches inside a row range
   *(this is typically used with root node as the node, i e to get
   *syntax highlight matches in the current viewport). When
   *omitted the start and end row values are used from the given
   *node.
   *The iterator returns three values, a numeric id identifying
   *the capture, the captured node, and metadata from any
   *directives processing the match. The following example shows
   *how to get captures by name:
   *>
   *
   * for id, node, metadata in query:iter_captures(tree:root(), bufnr, first, last) do
   *   local name = query.captures[id] -- name of the capture in the query
   *   -- typically useful info about the node:
   *   local type = node:type() -- type of the captured node
   *   local row1, col1, row2, col2 = node:range() -- range of the capture
   *   ... use the info here ...
   * end
   *
   *<
   */
  iter_captures: (self: any, node: any, source: any, start: any, stop: any) => any
  /**
   *Iterates the matches of self on a given range.
   *Iterate over all matches within a node. The arguments are the
   *same as for |query:iter_captures()| but the iterated values
   *are different: an (1-based) index of the pattern in the query,
   *a table mapping capture indices to nodes, and metadata from
   *any directives processing the match. If the query has more
   *than one pattern the capture table might be sparse, and e.g.
   *`pairs()` method should be used over `ipairs`. Here an example
   *iterating over all captures in every match:
   *>
   *
   * for pattern, match, metadata in cquery:iter_matches(tree:root(), bufnr, first, last) do
   *   for id, node in pairs(match) do
   *     local name = query.captures[id]
   *     -- `node` was captured by the `name` capture in the match
   *
   *     local node_data = metadata[id] -- Node level metadata
   *
   *     ... use the info here ...
   *   end
   * end
   *
   *<
   */
  iter_matches: (self: any, node: any, source: any, start: any, stop: any) => any
}
/** @noSelf */
interface Tshighlighter {
  LanguageTree: Languagetree
  Query: Query
  TSHighlighter: Tshighlighter
  /**
   *Removes all internal references to the highlighter
   */
  destroy: (self: any) => any
  /**
   *Gets the query used for
   */
  get_query: (self: any, lang: any) => any
}
/** @noSelf */
interface Treesitter {
  LanguageTree: Languagetree
  Query: Query
  TSHighlighter: Tshighlighter
  /**
   *Adds a new directive to be used in queries
   *Handlers can set match level data by setting directly on the
   *metadata object `metadata.key = value`, additionally, handlers
   *can set node level data by using the capture id on the
   *metadata table `metadata[capture_id].key = value`
   */
  add_directive: (name: any, handler: any, force: any) => any
  /**
   *Adds a new predicate to be used in queries
   */
  add_predicate: (name: any, handler: any, force: any) => any
  /**
   *Gets the text corresponding to a given node
   */
  get_node_text: (node: any, source: any) => any
  /**
   *Gets the parser for this bufnr \/ ft combination.
   *If needed this will create the parser. Unconditionally attach
   *the provided callback
   */
  get_parser: (bufnr: any, lang: any, opts: any) => any
  /**
   *Returns the runtime query {query_name} for {lang}.
   */
  get_query: (lang: any, query_name: any) => any
  /**
   *Gets the list of files used to make up a query
   */
  get_query_files: (lang: any, query_name: any, is_included: any) => any
  /**
   *Gets a string parser
   */
  get_string_parser: (str: any, lang: any, opts: any) => any
  /**
   *Inspects the provided language.
   *Inspecting provides some useful information on the language
   *like node names, ...
   */
  inspect_language: (lang: any) => any
  /**
   *Lists the currently available directives to use in queries.
   */
  list_directives: () => any
  /**
   *
   */
  list_predicates: () => any
  /**
   *Represents a single treesitter parser for a language. The
   *language can contain child languages with in its range, hence
   *the tree.
   */
  new: (source: any, lang: any, opts: any) => any
  /**
   *Parse {query} as a string. (If the query is in a file, the
   *caller should read the contents into a string before calling).
   *Returns a `Query` (see |lua-treesitter-query|) object which
   *can be used to search nodes in the syntax tree for the
   *patterns defined in {query} using `iter_*` methods below.
   *Exposes `info` and `captures` with additional context about {query}.
   *• `captures` contains the list of unique capture names defined
   *  in {query}. -`info.captures` also points to `captures`.
   *• `info.patterns` contains information about predicates.
   *
   */
  parse_query: (lang: any, query: any) => any
  /**
   *Asserts that the provided language is installed, and
   *optionally provide a path for the parser
   *Parsers are searched in the `parser` runtime directory.
   */
  require_language: (lang: any, path: any, silent: any) => any
  /**
   *Sets the runtime query {query_name} for {lang}
   *This allows users to override any runtime files and\/or
   *configuration set by plugins.
   */
  set_query: (lang: any, query_name: any, text: any) => any
}
/** @noSelf */
declare interface Vim {
  treesitter: Treesitter
}
