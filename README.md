# kit-stack

A fullstack starter kit heavily inspired by create-t3-app with some added bonuses.

## The Kit Stack

- [x] **Pnpm**: Package manager 📦

- [x] **SvelteKit**: Fullstack framework 🛠️

- [x] **DaisyUI**: Component Library 🎨

- [x] **Prisma**: Database ORM 🗃️

- [x] **TRPC**: Typesafe API Calls 🧹

- [ ] **Supabase Auth**: Authentication 🔐

- [ ] **CI Scripts**: Lint & Deploy 🤖

- [ ] **Cloudflare D1**: Serverless Database 📃

- [ ] **Cloudflare pages**: Deployment with <https://kit.svelte.dev/docs/adapter-cloudflare> 🚀

## Features

- **Authentication**: Sign up, sign in, sign out, forgot password, change password, change email, change username, delete account

- **Authorization**: Protected routes, protected pages, protected endpoints

- **Database**: CRUD operations, relations, migrations, seeds

- **UI**: Design system, component library, icons

- **Deployment**: CI scripts, Cloudflare D1, Cloudflare Pages

## Getting Started

### TODO: CLI Installation Tool

- [ ] Add the CLI tool to the same repo and divide the workspaces with pnpm, remove the cli folder and pnpm-workspace.yml from the repo.

### TODO: Configure Supabase

### TODO: Configure Cloudflare

### TODO: Configure Github

## Behind the design

### 📦 Pnpm

By using pnpm we can take advantage of the workspaces feature to create a monorepo. This allows us to share code between the frontend and backend.

### 🛠️ Svelte-Kit

This cuts out the need for a state management dependency and provides a faster and stronger development experience.

### 🎨 DaisyUI

Tailwind + DaisyUI + Heroicons: <https://github.com/JustinVoitel/svelte-hero-icons>

### 🗃️ Prisma

### 🧹 TRPC

### 🔐 Supabase Auth

### 📃 Cloudflare D1 & Pages
