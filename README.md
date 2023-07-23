# kit-stack

<center>
    <img src="https://svgshare.com/i/vcw.svg" height="200"/>
    </br> </br>
    A fullstack starter kit heavily inspired by <a href="https://create.t3.gg/">create-t3-app</a> with some added bonuses
</center>

## The Kit Stack

📦 **Pnpm**: Package manager

🛠️ **SvelteKit**: Fullstack framework

🗃️ **Prisma**: Database ORM

🧹 **tRPC**: Typesafe API Calls

🔐 **Supabase Auth**: Authentication

🎨 **DaisyUI**: Component Library

- [ ] **Felte**: Form Validation 📝

📃 **Prettier & ESLint**: Code formatting

🤖 **Vercel**: Deploy with CI

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

1. Rename the `.env.local.example` file to `.env.local`, this is where you will store your environment variables.

2. Sync with `pnpm env:sync` to generate the types for the environment variables.

3. Fill in `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` with your `Project URL` and Supabase credentials. You can find both of them in your Supabase Dashboard under `Project Settings > API > Project API keys`, linked [here](https://supabase.com/dashboard/project/_/settings/api).

You can use any postgres database for the next step but my recommendations are Supabase, Railway, Heroku or Vercel.

4. Fill in `DATABASE_URL` with the connection string under `Project Settings > Database > Connection string > URI`, linked [here](https://supabase.com/dashboard/project/_/settings/database). Make sure you insert the correct database password into the string or reset it on the same page.

In a local evironment is preferable that you use a local postgres database, you can install postgres [here](https://www.postgresql.org/download/) and use the default `postgres` user with the password that you set during the installation. The connection string in this case would look like this:

```bash
postgresql://postgres:password@localhost:5432/postgres
```

5. Once you are done with the configuration, run `pnpm db:push` to create the database tables on your server. For any future changes to the database schema, you can run `pnpm db:migrate` to generate a new migration file while preserving the data, then `pnpm db:push` to push the changes.

### Configure Vercel

Head over to <https://vercel.com> and create an account. Then install the Vercel CLI:

```bash
pnpm install -g vercel
```

Run `vercel login` and then `vercel .` from the root of the project to deploy your app using the preconfigured commands.

Alternatively, you can use the [Vercel GitHub](https://vercel.com/docs/git-integrations) integration to deploy your app straight from your uploaded repo everytime you push to the `main` branch.

To set it up just create a new project on Vercel using the `Import Git repository` option and follow the instructions, all the proper commands are already configured so you don't have to do anything else.

## Behind the design

### 🛠️ Svelte-Kit

This cuts out the need for a state management dependency and provides a faster and stronger development experience in comparison to Next.js.

### 🎨 DaisyUI

Tailwind + DaisyUI + Heroicons: <https://github.com/JustinVoitel/svelte-hero-icons> + Fontsource

### 🧹 Prisma + tRPC

TODO: Add tRPC CRUD operations for the user model.

### 🔐 Supabase Auth

TODO: Add JWT validation to the tRPC server to reduce the number of requests to the Supabase API??

### 📝 Felte

TODO: Add form validation and submission example to the signup & login forms.

### 🤖 Vercel
