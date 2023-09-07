git clone https://github.com/albbus-stack/kit-stack.git
cd kit-stack
rm -rf .git LICENSE
mv .env.local.example .env.local
pnpm install
pnpm db:generate
pnpm env:sync
git init