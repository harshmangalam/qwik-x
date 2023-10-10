# Qwik-X ⚡️

Social media web app like Twitter build with Qwikcity

## Tech Stack

- Qwikcity
- Typescript
- Drizzle ORM
- Neon
- Postgresql
- Node/Express server
- Tailwindcss
- daisyui

> Note: copy .env.example inside .env

## Setup

Step 1 - Clone the repo

```shell
git clone https://github.com/harshmangalam/qwik-x.git
```

Step 2 - move to project

```shell
cd qwik-x
```

Step 3 - Install dependencies

```shell
pnpm i
```

Step 4 - Copy .env.example to .env

```shell
cp .env.example .env
```

Step 5 - Update .env variables value
provide `DRIZZLE_DATABASE_URL` value. make sure your postgres is setup in local.

Step 6 - Create postgres database with the same name provided in `DRIZZLE_DATABASE_URL` i.e `qwikx`

Step 7 - Create and sync schema in your database

```shell
pnpm migration:push
```

Step 7 - Now start your dev server

```shell
pnpm dev
```

# Interaction Analysis 🌏

## Teck Stack Used🔥

- Python
- Streamlit
- Plotly

## Code For Installing Packages 📦

```shell
cd analysis
```

```shell
pip install -r requirements.txt
```

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.ts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.ts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `pnpm build.server` and `pnpm build.client`:

```shell
pnpm build
```

[Read the full guide here](https://github.com/BuilderIO/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
pnpm deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.
