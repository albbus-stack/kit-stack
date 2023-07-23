# kit-stack

A fullstack starter kit heavily inspired by create-t3-app with some added bonuses.

## The Kit Stack

- [x] **Pnpm**: Package manager 📦

- [x] **SvelteKit**: Fullstack framework 🛠️

- [x] **Prisma**: Database ORM 🗃️

- [x] **tRPC**: Typesafe API Calls 🧹

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

Run the following commands in your terminal to clone the starter, create a new repo and install the dependencies:

```bash
git clone https://github.com/albbus-stack/kit-stack.git
cd kit-stack && rm -rf .git
git init
pnpm install
```

### Configure Supabase Auth & Prisma

Rename the `.env.local.example` file to `.env.local`, this is where you will store your environment variables. You can use it in the future for any other pnpm script with `pnpm with-env <script>`.

❗ Sync with `pnpm sync-env` to generate the types for the environment variables.

Fill in `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` with your `Project URL` and Supabase credentials. You can find both of them in your Supabase Dashboard under `Project Settings > API > Project API keys`.

You can use any postgres database for this step but my recommendations are Supabase, Railway or Heroku.

Fill in `DATABASE_URL` with the connection string under `Project Settings > Database > Connection string > URI`. Make sure you insert the correct database password into the string or reset it on the same page.

❗ You also have to change the `provider` to `postgresql` in the `schema.prisma` file, it is currently set to `sqlite` to provide a faster development experience on your local machine.

Once you are done with the configuration, run `pnpm db:push` to create the database tables on your server. For any future changes to the database schema, you can run `pnpm db:migrate` to generate a new migration file while preserving the data, then `pnpm db:push` to push the changes.

### Configure Vercel

Head over to <https://vercel.com> and create an account. Then install the Vercel CLI:

```bash
pnpm install -g vercel
```

Run `vercel login` and then `vercel .` from the root of the project to deploy your app using the preconfigured commands.

Alternatively, you can use the Vercel GitHub integration to deploy your app straight from your uploaded repo.

## Behind the design

### 🛠️ Svelte-Kit

This cuts out the need for a state management dependency and provides a faster and stronger development experience in comparison to Next.js.

### 🎨 DaisyUI

Tailwind + DaisyUI + Heroicons: <https://github.com/JustinVoitel/svelte-hero-icons> + Fontsource

### 🧹 Prisma + tRPC

TODO: Add tRPC CRUD operations for the user model.

TODO: Add `prisma migrate deploy` for the vercel CI and use `prisma migrate dev` to generate the local migration file.

### 🔐 Supabase Auth

TODO: Add JWT validation to the tRPC server to reduce the number of requests to the Supabase API.

### 📝 Felte

TODO: Add form validation and submission example to the signup & login forms.

### 🤖 Vercel
