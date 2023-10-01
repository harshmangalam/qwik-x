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
pnpm run migration:push
```

Step 7 - Now start your dev server

```shell
pnpm run dev
```

# Interaction Analysis 🌏

## Teck Stack Used🔥

- Python
- Streamlit
- Plotly

## Code For Installing Packages 📦

```shell
     pip install -r requirements.txt
```
