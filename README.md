# KEW Electricals

A modern Next.js website for KEW Electricals - electrical switchgear, fusegear, controlgear and power distribution solutions from Kusum Engineering Works.

## Project Structure

This project follows a corporate Next.js folder structure:

```
kew-electricals/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # (moved to styles/)
├── components/            # React components
│   ├── home/             # Home page components
│   ├── three/            # 3D components (Three.js)
│   └── ui/               # shadcn/ui components
├── data/                 # Static data
│   └── products.ts       # Product data
├── hooks/                # Custom React hooks
│   └── use-mobile.ts     # Mobile detection hook
├── styles/               # Global styles
│   └── globals.css       # Global CSS
├── utils/                # Utility functions
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
├── public/               # Static assets
│   ├── images/           # Images
│   ├── models/           # 3D models
│   └── video/            # Videos
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── netlify.toml          # Netlify deployment configuration
```

## Prerequisites

- Node.js `>=18.0.0`
- npm or yarn or pnpm

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build

Build the project for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deployment to Netlify

This project is configured for Netlify deployment. The `.next` folder is the build output directory.

### Automatic Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Netlify will automatically detect the Next.js configuration and deploy

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `.next` folder to Netlify

The `netlify.toml` file includes the necessary configuration:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18
- Next.js plugin for optimal performance

## Tech Stack

- **Framework**: Next.js 16.3.4 (App Router)
- **React**: 19.2.6
- **Styling**: Tailwind CSS 4.2.1
- **UI Components**: shadcn/ui (61 components)
- **3D Graphics**: Three.js + React Three Fiber + @react-three/drei
- **Animations**: GSAP + ScrollTrigger
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Deployment**: Netlify

## Features

- Responsive design with mobile-first approach
- Interactive 3D product visualization
- Scroll-based GSAP animations
- Product showcase with tabbed navigation
- Company heritage timeline
- Events and exhibitions section
- Modern UI with shadcn/ui components

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

© 2024 Kusum Engineering Works. All rights reserved.
