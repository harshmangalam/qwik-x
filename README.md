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

### Step 1 - Clone the repo

```shell
git clone https://github.com/harshmangalam/qwik-x.git
```

### Step 2 - move to project

```shell
cd qwik-x
```

### Step 3 - Install dependencies

```shell
pnpm i
```

### Step 4 - Copy .env.example to .env

```shell
cp .env.example .env
```

## Configure Neon for Serverless PostgreSQL Database

Neon provides a serverless PostgreSQL that scales automatically and offers significant performance benefits. To integrate Neon with your Qwik-X app, follow these steps:

### Step 1: Create a Neon Account

- Sign up for a free tier account at [Neon](https://neon.tech/). Follow the prompts to set up your account.

### Step 2: Create Your Database

- Once logged in, create a new database. Choose the appropriate region closest to your user base to minimize latency.
- After creating your database, you will be provided with a database URL. This URL is used to connect your application to the Neon database.

### Step 3: Configure Your Application

- Open the `.env` file in your project’s root directory.
- Replace the existing database URL with the one provided by Neon in the `DRIZZLE_DATABASE_URL` variable:
  ```
  DRIZZLE_DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database}
  ```

### Step 4: Validate the Connection

- Ensure that your application can connect to the Neon database by running a simple test query or using the Drizzle ORM commands provided in your package scripts.

### Step 5: Schema Migration

- To create and sync the database schema:
  ```shell
  pnpm migration:push
  ```
- This command will align your PostgreSQL schema with the current state of your application models.

### Step 6: Start Your Development Server

- Once the database is configured and the schema is in place, start your development server:
  ```shell
  pnpm dev
  ```

### Troubleshooting

- If you encounter connection issues, verify the database URL and your internet connection.
- Ensure that your Neon account's security settings allow connections from your application’s IP address.

## PRs

- Always raise PR for base branch `dev`

## Optional Setup

### Interaction Analysis 🌏

#### Teck Stack Used🔥

- Python
- Streamlit
- Plotly

#### Code For Installing Packages 📦

```shell
cd analysis
```

```shell
pip install -r requirements.txt
```
