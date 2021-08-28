/* eslint-disable unicorn/no-unused-properties */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const icons = {
  locker: '', // #f023
  confirm: '✓',
  page: '☰', // 2630
  line_number: '', // e0a1
  connected: '', // f817
  dos: '', // e70f
  unix: '', // f17c
  mac: '', // f179
  mathematical_L: '𝑳',
  vertical_bar: '┃',
  vertical_bar_thin: '│',
  left: '',
  right: '',
  block: '█',
  left_filled: '',
  right_filled: '',
  slant_left: '',
  slant_left_thin: '',
  slant_right: '',
  slant_right_thin: '',
  slant_left_2: '',
  slant_left_2_thin: '',
  slant_right_2: '',
  slant_right_2_thin: '',
  left_rounded: '',
  left_rounded_thin: '',
  right_rounded: '',
  right_rounded_thin: '',
  circle: '●',
}
const lsp_severity = vim.diagnostic.severity
/**
 * @see https://github.com/feline-nvim/feline.nvim/issues/5#issuecomment-837643914
 * @see https://stackoverflow.com/a/1113140/11791657
 * file=".config/nvim/lua/plugins/statusline/styles/vscode.lua";git checkout $(git rev-list -n 1 HEAD // "$file")~1 // "$file"
 */
export default {
  theme: {
    bg: '#68217A',
    fg: '#d4d4d4',
  },
  vi_mode_colors: {
    'NORMAL': '#579C4C',
    'OP': '#35CDAF',
    'INSERT': '#237AD3',
    'VISUAL': '#35CDAF',
    'BLOCK': '#35CDAF',
    'REPLACE': '#D7BA7D',
    'V-REPLACE': '#D7BA7D',
    'ENTER': '#35CDAF',
    'MORE': '#35CDAF',
    'SELECT': '#D16969',
    'COMMAND': '#D16969',
    'SHELL': '#237AD3',
    'TERM': '#237AD3',
    'NONE': 'default_fg',
  },
  components: {
    active: [
      [
        {
          provider: icons.circle,
          hl () {
            return {
              fg: (require('feline.providers.vi_mode') as {
                get_mode_color: (this: void) => any
              }).get_mode_color(),
            }
          },
          left_sep: ' ',
          right_sep: ' ',
        },
        {
          provider () {
            const dir = vim.fn.expand('%:p:h:t')
            const file = vim.fn.expand('%:t')
            return string.format('%s/%s', dir, file)
          },
          hl: { style: 'bold' },
          right_sep () {
            const val: Record<any, any> = { hl: { fg: '#56abe4' } }
            if (vim.bo.modifiable) {
              val.str = vim.bo.modified ? '  ' : ' '
            }
            return val
          },
        },
        {
          provider: icons.locker,
          hl: { fg: '#D16969' },
          enabled () {
            return vim.bo.readonly
          },
          left_sep: ' ',
        },
        {
          provider: 'git_branch',
          icon: '  ',
          hl: { fg: '#C586C0', style: 'bold' },
          right_sep: ' ',
        },
        {
          provider: 'git_diff_added',
          icon: ' ' + icons.circle,
          hl: { fg: '#579C4C' },
        },
        {
          provider: 'git_diff_changed',
          icon: ' ' + icons.circle,
          hl: { fg: '#D7BA7D' },
        },
        {
          provider: 'git_diff_removed',
          icon: ' ' + icons.circle,
          hl: { fg: '#D16969' },
        },
        {
          provider () {
            const line = vim.fn.line('.')
            const col = vim.fn.col('.')
            return string.format('%s %s:%s ', icons.line_number, line, col)
          },
          left_sep () {
            const val: Record<any, any> = { hl: { fg: 'fg' } }
            val.str = vim.b.gitsigns_status_dict ? '  ' : ' '
            return val
          },
        },
        {
          provider: 'line_percentage',
          left_sep: ' ',
        },
      ],
      [],
      [
        {
          provider: 'diagnostic_errors',
          enabled () {
            return (require('feline.providers.lsp') as {
              diagnostics_exist: (this: void, level: number) => boolean
            }).diagnostics_exist(lsp_severity.ERROR)
          },
          hl: { fg: '#D16969' },
        },
        {
          provider: 'diagnostic_warnings',
          enabled () {
            return (require('feline.providers.lsp') as {
              diagnostics_exist: (this: void, level: number) => boolean
            }).diagnostics_exist(lsp_severity.WARN)
          },
          hl: { fg: '#D7BA7D' },
        },
        {
          provider: 'diagnostic_info',
          enabled () {
            return (require('feline.providers.lsp') as {
              diagnostics_exist: (this: void, level: number) => boolean
            }).diagnostics_exist(lsp_severity.INFO)
          },
          hl: { fg: '#85DDFF' },
        },
        {
          provider: 'diagnostic_hints',
          enabled () {
            return (require('feline.providers.lsp') as {
              diagnostics_exist: (this: void, level: number) => boolean
            }).diagnostics_exist(lsp_severity.HINT)
          },
          hl: { fg: '#B5CEA8' },
        },
        {
          provider () {
            return string.upper(string.format('  %s', vim.bo.fileencoding))
          },
        },
        {
          provider () {
            const spaces = vim.api.nvim_buf_get_option(0, 'shiftwidth')
            return string.format('TAB: %s', spaces)
          },
          left_sep: '  ',
          right_sep: '  ',
        },
        {
          provider: 'file_type',
          hl: { style: 'bold' },
          right_sep: ' ',
        },
        {
          provider: icons.confirm,
          enabled () {
            return !vim.tbl_isempty(vim.lsp.buf_get_clients(0))
          },
          hl: { fg: '#b8bb26', style: 'bold' },
          right_sep: ' ',
        },
      ],
    ],
    inactive: [
      [
        {
          provider: icons.circle,
          hl () {
            return {
              fg: (require('feline.providers.vi_mode') as {
                get_mode_color: (this: void) => any
              }).get_mode_color(),
            }
          },
          left_sep: ' ',
          right_sep: ' ',
        },
        {
          provider: 'file_type',
          hl: {
            style: 'bold',
          },
        },
        {
          provider () {
            const line = vim.fn.line('.')
            const col = vim.fn.col('.')
            return string.format(' %s %s:%s ', icons.line_number, line, col)
          },
          hl: { style: 'bold' },
        },
      ],

      [],
      [
        {
          provider: 'line_percentage',
          hl: { style: 'bold' },
          right_sep: ' ',
        },
      ],
    ],
  },
}
