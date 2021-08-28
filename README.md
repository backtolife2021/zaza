## Usage

Backup
```zsh
mv ~/.config/nvim ~/.config/nvim.bak
```

Clone Repo

```zsh
git clone https://github.com/backtolife2021/zaza.git ~/.config/nvim
cd ~/.config/nvim
```

Install dependencies

```zsh
pnpm install
```

Build
```zsh
pnpm build:all
```

Init Packer
```zsh
nvim +'hi NormalFloat guibg=#1e222a' +PackerSync
```

Open File
```zsh
nvim ~/.config/nvim/src/index.ts
```







