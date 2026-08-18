# Eirik Otis — conversational professional website

An AI-native personal website built with Next.js, TypeScript, the App Router, OpenRouter and PostgreSQL.

The public interface is intentionally minimal. Professional background material lives in `content/eirik` and is loaded only by the server-side assistant. A compact `profile.md` is supplied on every request; deterministic routing adds at most three relevant evidence documents instead of resending the complete corpus.

The complete transcript is stored in PostgreSQL. Model input is separately bounded to the ten most recent messages, with a short extractive list of older visitor topics only after that limit is reached. OpenRouter's authoritative token, cost and cache accounting is stored on assistant messages and shown in the private transcript viewer.

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
