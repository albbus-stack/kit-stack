#!/bin/bash
folderName=$1

if [ -z $folderName ]
then folderName="kit-stack"
fi

echo
echo -e " _     _  _          _                 _\n| | __(_)| |_   ___ | |_   __ _   ___ | | __ \n| |/ /| || __| / __|| __| / _\` | / __|| |/ / \n|   < | || |_  \__ \| |_ | (_| || (__ |   <  \n|_|\_\|_| \__| |___/ \__| \__,_| \___||_|\_\\" 
echo
echo -e "\033[1;32m🐙 Cloning into $folderName\033[0m"
echo 

git clone https://github.com/albbus-stack/kit-stack.git $folderName
cd $folderName

echo
echo -e "\033[1;32m🗑️\x20 Cleaning up files\033[0m"
echo 

rm -rf .git LICENSE install.sh install.ps1
mv .env.local.example .env.local

echo
echo -e "\033[1;32m🥯 Installing dependencies\033[0m"
echo 

bun install

echo
echo -e "\033[1;32m⚙️\x20 Running setup scripts\033[0m"
echo

bun db:generate
bun lang:build
bun env:sync
git init

echo
echo -e "\033[1;32m✔️\x20 Setup completed!\033[1;33m Cd into $folderName, fill in your Supabase env keys and run \`bun dev\`\033[0m"
echo
