# DeckDrop v2 Architecture

## Services
1. Web App (`apps/web`): customer storefront + admin panel.
2. API (`apps/api`): auth, catalog, cart, orders, reviews endpoints.
3. Worker (`apps/worker`): async jobs (emails, recommendation refresh, sentiment backfills).
4. ML Service (`apps/ml-service`): sentiment analysis and recommendation model endpoints.

## Data Layer
- PostgreSQL: transactional source of truth.
- Redis: queue/caching/session rate-limit backing store.

## Reliability Practices
- Environment schema validation at startup.
- DB retry with exponential/backoff-ready pattern.
- Health endpoint for service probes.
- Structured logging and centralized error handling.

## Security Practices
- Helmet + CORS in API.
- JWT access + refresh token rotation (to implement next phase).
- RBAC for admin endpoints.
- Audit logging for sensitive actions.
