# kit-stack

A fullstack starter kit heavily inspired by create-t3-app with some added bonuses.

## The Kit Stack

- [x] **Pnpm**: Package manager 📦

- [x] **SvelteKit**: Fullstack framework 🛠️

- [x] **Prisma**: Database ORM 🗃️

- [x] **TRPC**: Typesafe API Calls 🧹

- [x] **Supabase Auth**: Authentication 🔐

- [x] **DaisyUI**: Component Library 🎨

- [ ] **Felte**: Form Validation 📝

- [x] **Prettier & ESLint**: Code formatting 📃

- [x] **Vercel**: Deploy with CI 🤖

## Features

- **Authentication**: Sign up, sign in, sign out, forgot password, change password, change email, change username, delete account

- **Authorization**: Protected routes, protected pages, protected endpoints

- **Database**: CRUD operations, relations, migrations

- **UI**: Design system, component library, icons and fonts

- **Forms**: Form validation, form submission, form errors

- **Deployment**: Easy deployment with CI

## Getting Started

Run the following commands in your terminal to clone the starter and create a new empty repo:

```bash
git clone https://github.com/albbus-stack/kit-stack.git
cd kit-stack && rm -rf .git
git init
```

### Configure Supabase Auth & Prisma

Rename the `.env.local.example` file to `.env.local`, this is where you will store your environment variables. You can use it in the future for any other pnpm script with `pnpm with-env <script>`.

Sync it with `pnpm sync-env` to generate the types for the environment variables.

Fill in `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` with your `Project URL` and Supabase credentials. You can find both of them in your Supabase Dashboard under `Project Settings > API > Project API keys`.

Fill in `DATABASE_URL` with the connection string under `Project Settings > Database > Connection string`. Make sure you insert the correct database password into the string.

### Configure Vercel

Head over to <https://vercel.com> and create an account. Then install the Vercel CLI:

```bash
pnpm i -g vercel
```

Run `vercel login` and then `vercel .` from the root of the project to deploy your app using the preconfigured commands.

## Behind the design

### 📦 Pnpm

By using pnpm we can take advantage of the workspaces feature to create a monorepo. This allows us to share code between the frontend and backend.

### 🛠️ Svelte-Kit

This cuts out the need for a state management dependency and provides a faster and stronger development experience in comparison to Next.js.

### 🎨 DaisyUI

Tailwind + DaisyUI + Heroicons: <https://github.com/JustinVoitel/svelte-hero-icons> + Fontsource

### 🗃️ Prisma

### 🧹 TRPC

### 🔐 Supabase Auth

### 🤖 Vercel
