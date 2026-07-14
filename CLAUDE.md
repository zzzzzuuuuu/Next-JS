# CLAUDE.md

## Project

Gangneung public library user site

## Rules

- Respond in Korean.
- Use Yarn only.
- Do not modify unrelated files.
- Do not commit or push unless explicitly requested.
- Preserve architecture and naming conventions.
- Ask before adding dependencies.
- Run the smallest meaningful validation after changes.

## Commands

- yarn dev
- yarn build
- yarn lint

## Architecture

- Next.js 16 App Router
- React 19
- JWT authentication
- Authentication is centralized in auth.ts
- Server Components protect pages using await auth()

## Environment

Required variables:

- AUTH_SECRET
- AUTH_EMAIL
- AUTH_PASSWORD
- TMDB_KEY
