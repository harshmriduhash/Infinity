# Infinity – AI-Native Modular SaaS Framework

Infinity is a full-stack, modular, AI-native application framework designed to help founders, solo builders, and engineering teams ship production-ready AI SaaS products fast.

It provides a clean, scalable architecture with separate modules for backend APIs, dashboard UI, public site, AI/AGI worker processes, and shared utilities — enabling you to build multiple SaaS products using a single unified codebase.

# 🚀 What is Infinity?

Infinity is a starter framework built for the next generation of agentic, AI-powered applications. It includes:

A TypeScript backend (APIs, auth, business logic)

A beautiful dashboard frontend

A public-facing marketing site

A worker engine for async jobs + AI execution

A shared code layer to prevent duplication and keep things DRY

One-command Docker-based deployment

Production-ready structure for scaling multiple AI SaaS MVPs

# 📦 Repository Structure

Infinity/
│
├── backend/               # REST APIs, auth, DB models, business logic
│   ├── src/
│   ├── prisma/
│   ├── ...               
│
├── dashboard-x/           # Admin dashboard / SaaS dashboard
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── ...
│
├── public-site/           # Marketing website / landing pages
│   ├── src/
│   ├── components/
│   ├── ...
│
├── worker/                # Async jobs + AI/LLM/Agentic worker
│   ├── src/
│   ├── jobs/
│   ├── services/
│   ├── ...
│
├── joengine-agi/          # Experimental AGI/LLM/Agent framework
│   ├── core/
│   ├── memory/
│   ├── agents/
│   ├── ...
│
├── shared/                # Shared utilities, types, constants
│   ├── utils/
│   ├── types/
│
├── docker-compose.yml     # One-command infra setup
├── SETUP_GUIDE.md         # Step-by-step setup instructions
├── TESTING_GUIDE.md       # Testing workflows
├── .env.example           # Environment variable template
├── architecture.png       # System architecture diagram
└── README.md

🧠 Core Philosophy
✔ Modular

Every major component lives in its own module (backend, dashboard, worker, public site).

✔ Scalable

Architecture supports multi-product expansion — ideal for building multiple SaaS tools.

✔ AI-Native

Workers + AGI engine folder are built for LLM workflows, vector search, agents, tool-calling, and async tasks.

✔ Deploy Anywhere

Docker + Render deployment configs give frictionless deployment on any cloud.

⚙️ Technology Stack
Backend

Node.js (TypeScript)

Express / Fastify (based on your structure)

Prisma ORM (if used)

PostgreSQL / MongoDB

Zod for validation

JWT / Session Auth

Frontend (Dashboard + Public Site)

React / Next.js

Tailwind CSS

ShadCN UI components

Vite or Next bundler

AI Worker

Node/Python hybrid support

OpenAI / Anthropic / custom LLM integrations

Background job queue

Long-running agent loops

Tool calling engines

DevOps

Docker + Docker Compose

Render deployment files

Static hosting + server containers

🔧 Getting Started
1. Clone the Repository
git clone https://github.com/harshmriduhash/Infinity.git
cd Infinity

2. Install Dependencies

Install all module dependencies:

cd backend && npm install
cd ../dashboard-x && npm install
cd ../public-site && npm install
cd ../worker && npm install
cd ..

3. Environment Variables

Copy .env.example to .env in each module where required.

cp backend/.env.example backend/.env
cp worker/.env.example worker/.env


Common variables include:

DATABASE_URL=""
JWT_SECRET=""
OPENAI_API_KEY=""
REDIS_URL=""

4. Start Development Environment
Option A — Using Docker

Easiest for full environment:

docker-compose up --build


This will spin up:

Backend API server

Dashboard

Public site

Worker service

Database

Redis (if configured)

Option B — Without Docker

Run modules individually:

cd backend
npm run dev

cd dashboard-x
npm run dev

cd public-site
npm run dev

cd worker
npm run dev

🔥 Key Features
✔ Unified monorepo architecture

One repo powering:

Backend

Dashboard

Public site

Workers

AI engine

✔ Worker-first AI execution model

Background LLM tasks

Agent loops

Vector embedding pipelines

Rate-limiting + retries

✔ SaaS-ready dashboard

Auth

Usage metrics

Project settings

Team management (optional)

✔ Public marketing site

Plug-and-play landing page templates for launching fast.

✔ Shared code layer

Types

Error handlers

Utils

Token helpers

✔ Deployment ready

Works on Docker, Render, Railway, AWS, etc.

📐 System Architecture

The system follows a service-modular architecture:

           ┌────────────────────┐
           │   Public Website   │
           └─────────┬──────────┘
                     │
                     ▼
             ┌─────────────┐
             │   Backend    │◄───────────┐
             └──────┬──────┘            │
                    │                   │
                    ▼                   │
              ┌────────┐          ┌───────────┐
              │Worker  │─────────▶│ AGI Engine│
              └────────┘          └───────────┘
                    ▲
                    │
           ┌────────┴────────┐
           │   Shared Utils   │
           └──────────────────┘

🧪 Testing

Refer to TESTING_GUIDE.md for:

Unit testing strategy

API testing

Worker job testing

Mocking LLM models

End-to-end workflows

🛠 Planned Improvements

Add CLI for project scaffolding

Integrate Pinecone / ChromeDB vector DB

Add built-in error monitoring

Add rate-limiting and audit logs

Multi-tenant SaaS support out of the box

💼 Use Cases

Infinity is perfect for building:

AI SaaS Dashboards

Agentic Workflow Platforms

Code Assistants / RAG Tools

CRM/Automation SaaS

Analytics & Monitoring tools

Any AI-first B2B product

🧑‍💻 For Contributors

Want to contribute?

Fork the repo

Create a feature branch

Submit a PR with clear documentation

All contributions are welcome.

📩 Support

For ideas, issues, or requests:
Open a GitHub Issue on the repo.