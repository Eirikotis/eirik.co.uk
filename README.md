# Eirik Otis — Personal Website

A single-page editorial portfolio built with Next.js, TypeScript, the App Router and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Production

Run the production server locally with:

```bash
npm run build
npm run start
```

For Vercel, import the repository and use the detected Next.js defaults. For any other Node host, deploy the repository, run `npm install && npm run build`, then start it with `npm run start`.
