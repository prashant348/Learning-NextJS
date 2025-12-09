# Intro to NextJS

- Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.

# Installation

1. Create a new Next.js app named `my-app`
2. `cd my-app` and start the dev server.
3. Visit `http://localhost:3000`

Terminal: 
```
npm create next-app@latest my-app --yes
cd my-app
npm run dev
```

- `--yes` skips prompts using saved preferences or defaults. The default setup enables TypeScript, Tailwind, ESLint, App Router, and Turbopack, with import alias @/*.


### Create with the CLI

The quickest way to create a new Next.js app is using `create-next-app`, which sets up everything automatically for you. To create a project, run:

Terminal: 
```
npx create-next-app@latest
```
On installation, you'll see the following prompts:
```
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
    No, reuse previous settings
    No, customize settings - Choose your own preferences
```
If you choose to `customize settings`, you'll see the following prompts:
```
Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

After the prompts, `create-next-app` will create a folder with your project name and install the required dependencies.