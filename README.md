<p align="center">
     <img src="https://svgshare.com/i/vcw.svg" height="250"/>
     </br> </br>
     A fullstack starter kit heavily inspired by <a href="https://create.t3.gg/">create-t3-app</a> with variuos added bonuses
     </br> </br>
     <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp;&nbsp;
     <img src="https://img.shields.io/badge/Supabase-2A9D69?style=for-the-badge&logo=supabase&logoColor=white"/>&nbsp;&nbsp;
     <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>&nbsp;&nbsp;
 </p>
  
## 📚 The Kit Stack
  
 🛠️ **SvelteKit**: Fullstack framework
  
 🗃️ **Prisma**: Database ORM
  
 🧹 **tRPC**: Typesafe API Calls
  
 🔐 **Supabase Auth**: Authentication

 💳 **Stripe**: Payments

 🎨 **DaisyUI**: Component Library
  
 📝 **Felte**: Form Validation
  
 📃 **Prettier & ESLint**: Code formatting
  
 🤖 **Vercel**: Deploy with CI
  
## 🔌 Features
  
- **Authentication**: Sign up, sign in, sign out, forgot password, change password, change email, change username, delete account
  
- **Authorization**: Protected routes, protected pages, protected endpoints
  
- **Database**: CRUD operations, relations, migrations

- **Payments**: Stripe integration
  
- **UI**: Design system, component library, icons and fonts
  
- **Forms**: Form validation, form submission, form errors
  
- **Deployment**: Easy and fast deployments with CI including database migrations
  
## Getting Started
  
 Run the following command in your terminal to clone the starter, create a new empty git repo and install the dependencies:

##### Unix

 ```bash
curl -l https://raw.githubusercontent.com/albbus-stack/kit-stack/main/install.sh | sudo bash
```

##### Windows

 ```bash
. { iwr -useb https://raw.githubusercontent.com/albbus-stack/kit-stack/main/install.ps1 } | iex; install
```
  
### ⚙️ Development
  
#### 🔒 Configure Supabase Auth
  
 1. Rename the `.env.local.example` file to `.env.local`, this is where you will store your environment variables.
  
 2. Generate the types for the environment variables:
  
 ```bash
 pnpm env:sync 
 ```
  
 3. Fill in `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` with your `Project URL` and Supabase credentials. You can find both of them in your Supabase Dashboard under `Project Settings > API > Project API keys`, linked [here](https://supabase.com/dashboard/project/_/settings/api).

#### 💳 Configure Stripe

 1. Create a Stripe account and get your API keys from the [dashboard](https://dashboard.stripe.com/test/apikeys).
  
 2. Fill in `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY` with your Stripe keys (publishable and secret).
  
#### 🔋 Configure Prisma
  
 For this step you can use any postgres database; my recommendations are Supabase, Vercel, Railway or Heroku.
  
 1. Fill in `DATABASE_URL` with your connection string. In a local evironment is preferable that you use a local postgres database, you can install postgres from [here](https://www.postgresql.org/download/) and use the default `postgres` user with the password you set during the installation. The connection string in this case would look like this:
  
 ```bash
 postgresql://postgres:password@localhost:5432/postgres 
 ```
  
 For the final deployment if you use Supabase you can find this URL under `Project Settings > Database > Connection string > URI`, linked [here](https://supabase.com/dashboard/project/_/settings/database). Make sure you insert the correct database password into the string, you can reset it on the same page.
  
 2. Once you are done with the configuration, create the database tables on your local postgres server:
  
 ```bash
 pnpm db:push 
 ```
  
 For any future changes to the database schema, you can run `pnpm db:migrate` to generate a new migration file while preserving the data, then Vercel will automatically run `pnpm db:deploy` on the server to apply the changes for every commit.
  
 3. Finally, start the development server:
  
 ```bash
 pnpm dev 
 ```
  
### 🚀 Production
  
#### Configure Vercel
  
 Head over to <https://vercel.com> and create an account. Then install the Vercel CLI:
  
 ```bash
 pnpm install -g vercel 
 ```
  
 Run `vercel login` and then `vercel .` from the root of the project to deploy your app using the preconfigured commands.

 Alternatively, you can use the [Vercel GitHub](https://vercel.com/docs/git-integrations) integration to deploy your app straight from your uploaded repo everytime you push to the `main` branch. (You can always add it later even if you use the CLI to deploy the first time)
  
 To set it up just create a new project on Vercel using the `Import Git repository` option and follow the instructions.

 In both cases you have to upload your environment variables under `Project Settings > Environment Variables`, linked [here](https://vercel.com/dashboard/). You can drag and drop your `.env.local` file. You should also change the `DATABASE_URL` variable with the connection string to your production database and all the other keys to production keys, not the test ones.

 If you need to change the prisma schema on your production database, you can run `vercel db:migrate` to generate a new migration file while preserving the data, then Vercel will automatically run `vercel db:deploy` on the server to apply the changes for every commit.

 Finally run another vercel build to apply the changes:
  
 ```bash
    vercel .
```
  
## 🖌️ Behind the design

### 🛠️ Svelte-kit

 Svelte-Kit was chosen as the full-stack framework, eliminating the need for a state management dependency and providing a faster and more robust development experience compared to Next.js.

### 🎨 DaisyUI

 For the design system, the stack uses Tailwind CSS with DaisyUI and Heroicons. Additionally, the project includes Fontsource for font management.

 Tailwind + DaisyUI + Heroicons: <https://github.com/JustinVoitel/svelte-hero-icons>

### 🧹 Prisma + tRPC

 Prisma, the database ORM, is combined with tRPC for typesafe API calls. Future plans include adding tRPC CRUD operations for the user model.

### 🔐 Supabase Auth

 Supabase Auth handles authentication, covering sign up, sign in, sign out, forgot password, change password, change email, change username, and account deletion. To further optimize the application, consideration is given to adding JWT validation to the tRPC server, reducing the number of requests to the Supabase API.

### 📝 Felte

 Felte is integrated into the stack for form validation, ensuring a smooth and robust experience when dealing with form submissions and errors.

### 🤖 Vercel

 Vercel is used for seamless deployment with continuous integration, making it easy to deploy the application with automatic database migrations.
