# Infinity — InfinityX Platform

Infinity is a modular, AI-first monorepo for building AI-powered SaaS products. It groups services for the API backend, dashboard UI, public marketing site, background workers (LLM/agent execution), and shared utilities so teams can iterate fast and deploy production-ready systems.

Key goals:
- Modular services you can run independently or with Docker
- Worker-first architecture for LLM, embedding, and agent workflows
- Ready-to-deploy configs for common hosts (Render, Cloudflare Pages)

## Repository layout

- `backend/` — Node.js API server (Express), auth, MongoDB integrations, admin routes.
- `dashboard-x/` — React + Vite dashboard UI (admin/product dashboard).
- `public-site/` — Marketing / landing pages for customers.
- `worker/` — AI worker processes, background jobs, agent loops.
- `joengine-agi/` — Experimental AGI/agent engine and tooling.
- `shared/` — Cross-service utilities, constants and types.
- `docker-compose.yml` — Local multi-service orchestration.
- `SETUP_GUIDE.md`, `TESTING_GUIDE.md` — Helpful docs for deploy and testing.

## Quick start (local)

Prerequisites: Node.js 18+, Git, Docker (optional).

1. Clone the repo

```powershell
git clone https://github.com/harshmriduhash/Infinity.git
cd "Infinity-x-platform"
```

2. Install per-service dependencies (or use your preferred package manager)

```powershell
cd backend
npm install
cd ../dashboard-x
npm install
cd ../worker
npm install
cd ../joengine-agi
npm install
cd ..
```

3. Copy environment templates and edit values

```powershell
copy backend\env.example backend\.env
```

Minimum useful env vars (examples):

- `MONGO_URI` / `MONGODB_URI` — MongoDB connection string
- `OPENAI_API_KEY` — OpenAI API key (or other LLM credentials)
- `JWT_SECRET` — application JWT/session secret
- `REDIS_URL` — optional Redis URL for cache/queues

4. Run modules individually

- Backend

```powershell
cd backend
npm run dev
```

- Dashboard (development)

```powershell
cd ../dashboard-x
npm run dev
```

- Worker

```powershell
cd ../worker
npm run dev
```

- JOEngine (experimental)

```powershell
cd ../joengine-agi
npm run dev
```

Alternatively, start the full stack with Docker Compose (recommended for full integration):

```powershell
docker-compose up --build
```

## Notable scripts

- `backend/package.json`
  - `start` — `node server.mjs`
  - `dev` — same as `start` (server entrypoint)
- `dashboard-x/package.json`
  - `dev` — `vite`
  - `build` — `vite build`
  - `preview` — `vite preview`
- `worker/package.json`
  - `start` — `node worker-enhanced.mjs`
  - `dev` — `node --watch worker-enhanced.mjs`
- `joengine-agi/package.json`
  - `start` — `node index.mjs`
  - `dev` — `node --watch index.mjs`

## Backend details

- The backend is a Node/Express service in `backend/server.mjs`. It expects a MongoDB URI and optionally a Redis instance. Key routes include auth (`/api/auth`), dashboard data (`/api/dashboard`), factory and job endpoints, and worker stats (`/api/worker/stats`).
- The backend includes utilities for creating a bootstrap super-admin (`/api/auth/bootstrap-super`) and standard email/phone login flows.

## Worker & AGI engine

- The `worker/` folder contains background processes that run agent loops, LLM calls, and project generation tasks. The worker integrates with OpenAI and Google generative APIs when credentials are provided.
- `joengine-agi/` provides experimental agent and reasoning engines (LangChain, Playwright, etc.). Treat this as experimental and isolated from production traffic unless you explicitly wire it in.

## Deployment notes

- Render: the repo was designed to be compatible with Render Web Services and Background Workers. Use the service-specific `package.json` and point the Render service root to the appropriate folder (`backend`, `worker`, etc.).
- Cloudflare Pages: build the dashboard with Vite and publish `dashboard-x/dist` as the Pages output.
- Secrets: do not commit secrets. Use host/service environment variables for `MONGO_URI`, `OPENAI_API_KEY`, `JWT_SECRET`, `CLOUDFLARE_API_TOKEN`, etc.

## Environment examples

- See `backend/env.example` for a starter set of variables used by the backend (ports, OAuth values, CORS origins).

## Testing

- Refer to `TESTING_GUIDE.md` for unit, integration, and worker testing recommendations, including mocking LLMs during CI runs.

## Contributing

- Fork → feature branch → PR with description and tests
- Follow code style in each package and keep changes scoped to one service where possible

## License

MIT
