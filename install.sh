#!/bin/bash
folderName=$1

if [ -z $folderName ]
then folderName="kit-stack"
fi

git clone https://github.com/albbus-stack/kit-stack.git $folderName
cd $folderName
rm -rf .git LICENSE install.sh install.ps1
mv .env.local.example .env.local
pnpm install
pnpm db:generate
pnpm env:sync
git init