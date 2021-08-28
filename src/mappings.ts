/**
 * @see https://github.com/NvChad/NvChad/blob/main/lua/core/default_config.lua
 */
export const misc = {
  cheatsheet: '<leader>ch',
  close_buffer: '<leader>x',
  copy_whole_file: '<C-a>', // copy all contents of current buffer
  line_number_toggle: '<leader>n', // toggle line number
  update_nvchad: '<leader>uu',
  new_buffer: '<S-t>',
  new_tab: '<C-t>b',
  save_file: '<C-s>', // save file using :w
}

// navigation in insert mode, only if enabled in options

export const insert_nav = {
  backward: '<C-h>',
  end_of_line: '<C-e>',
  forward: '<C-l>',
  next_line: '<C-k>',
  prev_line: '<C-j>',
  beginning_of_line: '<C-a>',
}

// better window movement
export const window_nav = {
  moveLeft: '<C-h>',
  moveRight: '<C-l>',
  moveUp: '<C-k>',
  moveDown: '<C-j>',
}

// terminal related mappings
export const terminal = {
  // multiple mappings can be given for esc_termmode, esc_hide_termmode

  // get out of terminal mode
  esc_termmode: ['jk'],

  // get out of terminal mode and hide it
  esc_hide_termmode: ['JK'],
  // show & recover hidden terminal buffers in a telescope picker
  pick_term: '<leader>W',

  // spawn terminals
  new_horizontal: '<leader>h',
  new_vertical: '<leader>v',
  new_window: '<leader>w',
}

export const plugins = {
  bufferline: {
    next_buffer: '<TAB>',
    prev_buffer: '<S-Tab>',
  },
  comment: {
    toggle: '<leader>/',
  },
  float_terminal: {
    toggle: '<leader>tt',
  },
  dashboard: {
    bookmarks: '<leader>bm',
    new_file: '<leader>fn', // basically create a new buffer
    open: '<leader>db', // open dashboard
    session_load: '<leader>l',
    session_save: '<leader>s',
  },

  // map to <ESC> with no lag
  better_escape: {
    // <ESC> will still work
    esc_insertmode: ['jk'], // multiple mappings allowed
  },

  nvimtree: {
    toggle: '<C-n>',
    focus: '<leader>e',
  },

  telescope: {
    buffers: '<leader>fb',
    find_files: '<leader>ff',
    find_hiddenfiles: '<leader>fa',
    git_commits: '<leader>cm',
    git_status: '<leader>gt',
    help_tags: '<leader>fh',
    live_grep: '<leader>fw',
    oldfiles: '<leader>fo',
    themes: '<leader>th', // NvChad theme picker

    telescope_media: {
      media_files: '<leader>fp',
    },
  },
}

export const mappings = {
  plugins,
  terminal,
  window_nav,
  insert_nav,
  misc,
}

export default mappings
