#!/usr/bin/env pwsh
param([string]$folderName)

if ($folderName -eq "") {
    $folderName = "kit-stack"
}

git clone https://github.com/albbus-stack/kit-stack.git $folderName
cd $folderName
Remove-Item -Force -Recurse .git LICENSE install.sh install.ps1
Move-Item -Force .env.local.example .env.local
pnpm install
pnpm db:generate
pnpm env:sync
git init