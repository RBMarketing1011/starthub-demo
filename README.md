# StartHub Academy

A high-performance, SEO-optimized course platform built with Next.js 16, featuring dynamic metadata, JSON-LD structured data, and MongoDB integration.

## Features

- ⚡ **Next.js 16** with App Router and Turbopack
- 🎨 **Tailwind CSS v4** with shadcn/ui components
- 📊 **MongoDB** with Mongoose ODM
- 🔍 **SEO Optimized** - Dynamic metadata and JSON-LD schemas
- 🖼️ **Image Optimization** - Next.js Image with LCP optimization
- 📱 **Responsive Design** - Mobile-first approach
- ♿ **Accessible** - WCAG compliant

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/starthub

# Site URL (used for absolute URLs in metadata and JSON-LD)
NEXT_PUBLIC_SITE_URL=https://starthub.academy
```

**MongoDB Options:**

- **Local:** `mongodb://localhost:27017/starthub`
- **MongoDB Atlas:** `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/starthub`

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Seed the Database

With the dev server running, seed the database with sample courses:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or visit `http://localhost:3000/api/seed` and use a REST client to send a POST request.

## Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm run start` | Start production server                 |
| `npm run lint`  | Run ESLint                              |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/seed/          # Database seeding endpoint
│   ├── courses/           # Course pages
│   │   ├── [slug]/        # Dynamic course detail page
│   │   └── page.tsx       # Course listing page
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/
│   ├── course/            # Course-specific components
│   ├── seo/               # JSON-LD components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── data/              # Static config (site.config.ts)
│   ├── db/                # Database layer
│   │   ├── client/        # Client-side API functions
│   │   ├── models/        # Mongoose schemas
│   │   ├── server/        # Server-only data functions
│   │   └── mongodb.ts     # MongoDB connection
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions (JSON-LD generators)
├── styles/
│   └── globals.css        # Global styles
└── public/
    └── logo.svg           # Site logo
```

## SEO Features

- **Dynamic Metadata** - Title, description, Open Graph, Twitter Cards
- **JSON-LD Schemas** - Course, VideoObject, Organization, WebSite, ItemList
- **Canonical URLs** - Proper URL canonicalization
- **Sitemap Ready** - Static generation with `generateStaticParams`

## Performance

Targeting 90+ Lighthouse score with:

- Server-side rendering (SSR)
- Static generation (SSG) for course pages
- Optimized images with `next/image`
- LCP optimization with `priority` and `fetchPriority="high"`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Mongoose](https://mongoosejs.com/docs)
- [Schema.org Course](https://schema.org/Course)
