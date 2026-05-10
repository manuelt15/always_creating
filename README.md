# alwayscreating

A curated platform for discovering creatives — built for artists who exist beyond a single discipline.

## Stack

- **Framework** — Next.js 15 (App Router)
- **Database** — MongoDB Atlas via Mongoose
- **Styling** — Tailwind CSS
- **Hosting** — Vercel

## Features

- Artist directory with profile cards and overlay previews
- Contact form saved to MongoDB
- Newsletter subscription list
- Dark / light mode
- Fully responsive

## Getting started

```bash
npm install
npm run dev
```

Create a `.env.local` file at the root:

```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deploy

Hosted on Vercel. Add `MONGODB_URI` and `NEXT_PUBLIC_SITE_URL` as environment variables in the Vercel dashboard before deploying.

Make sure your MongoDB Atlas cluster has `0.0.0.0/0` under Network Access so Vercel can connect.
