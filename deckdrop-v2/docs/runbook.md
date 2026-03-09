# Runbook (Local)

## Prerequisites
- Docker
- Node.js 20+
- Python 3.11+

## Local startup
1. `cp .env.example .env`
2. `docker compose -f infra/docker/docker-compose.yml up -d`
3. `npm install`
4. `npm run dev --workspace @deckdrop/api`

## Health checks
- API: `GET http://localhost:4000/health`
- ML service (if started): `GET http://localhost:8000/health`

## Troubleshooting
- If DB fails, verify `DATABASE_URL` and container status.
- If API cannot start, validate env values in `.env`.
