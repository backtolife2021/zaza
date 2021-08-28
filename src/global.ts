import * as utils from '@zaza/utils'

dump = utils.dump

vim.g.mapleader = ' '

/**
 * @see https://github.com/asvetliakov/vscode-neovim/issues/768#issuecomment-962465509
 * @see https://github.com/nanotee/nvim-lua-guide#caveats-4
 */
vim.g.is_vscode = vim.g.vscode === 1
