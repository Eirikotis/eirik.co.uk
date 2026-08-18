# Eirik Otis — conversational professional website

An AI-native personal website built with Next.js, TypeScript, the App Router, OpenRouter and PostgreSQL.

The public interface is intentionally minimal. Professional background material lives in `content/eirik` and is loaded only by the server-side assistant.

## Local development

1. Copy `.env.example` to `.env.local` and provide a PostgreSQL connection, an OpenRouter API key and admin credentials.
2. Run `npm install`.
3. Run `npm run db:migrate`.
4. Run `npm run dev` and open `http://localhost:3000`.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run db:migrate
```

## Production

The public application requires a persistent PostgreSQL database and the environment variables documented in `.env.example`. Run the migration before starting the Next.js server. `/admin/conversations` is protected with HTTP Basic authentication configured only through server-side environment variables.
