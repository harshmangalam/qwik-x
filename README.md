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

## Configure Neon for serverless postgresql db

Create free tier account https://neon.tech/
and use the db url in DRIZZLE_DATABASE_URL

Step 7 - Create and sync schema in your database

```shell
pnpm migration:push
```

Step 7 - Now start your dev server

```shell
pnpm dev
```

## PRs

- Always raise PR for base branch `dev`

## Interaction Analysis 🌏

### Teck Stack Used🔥

- Python
- Streamlit
- Plotly

### Code For Installing Packages 📦

```shell
cd analysis
```

```shell
pip install -r requirements.txt
```
