# DeckDrop v2 (Industry-Grade Rebuild)

A production-style monorepo for DeckDrop e-commerce with scalable architecture.

## Monorepo Apps
- `apps/web`: Next.js storefront + admin UI scaffold
- `apps/api`: Node.js TypeScript API scaffold (health/auth-ready structure)
- `apps/worker`: Background worker scaffold
- `apps/ml-service`: FastAPI scaffold for NLP/recommendation services

## Shared Packages
- `packages/ui`: shared UI components (placeholder)
- `packages/config`: shared lint/ts/jest config (placeholder)
- `packages/types`: shared contracts/types (placeholder)
- `packages/sdk`: typed API client placeholder

## Infrastructure
- `infra/docker/docker-compose.yml`: local postgres + redis + api
- `db/prisma/schema.prisma`: initial commerce schema
- `docs/architecture.md`: architecture and services
- `docs/implementation-plan.md`: step-by-step execution plan

## Quick Start
1. Copy env template:
   - `cp .env.example .env`
2. Start local infrastructure:
   - `docker compose -f infra/docker/docker-compose.yml up -d postgres redis`
3. Install dependencies (workspace):
   - `npm install`
4. Run API dev server:
   - `npm run dev --workspace @deckdrop/api`
5. Verify health:
   - `curl http://localhost:4000/health`

## Current Status
This commit provides a robust scaffold and initial foundational code. Next steps are to implement full auth, product catalog, cart, checkout, reviews, and recommendation pipelines as documented in `docs/implementation-plan.md`.
