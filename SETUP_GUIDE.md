InfinityX Platform – Complete Setup Guide
🎯 Overview

InfinityX is a free, open-source AI platform that automatically builds websites, applications, and e-commerce stores using artificial intelligence.

✨ Key Features

🎨 Website Builder – Modern and attractive sites

📱 App Builder – Interactive web applications

🛒 Store Builder – Full e-commerce stores

🚀 Auto Deployment – On Cloudflare Pages

🤖 AI-Powered – Uses OpenAI GPT-4

💯 100% Free – Built on free tools

📋 Requirements
1. Free Accounts Needed

✅ MongoDB Atlas – database

✅ Render – Backend + Worker hosting

✅ Cloudflare – Frontend hosting + deployment

✅ OpenAI – AI engine (requires some credit)

✅ GitHub – code management

2. Required API Keys

MONGO_URI – from MongoDB Atlas

OPENAI_API_KEY – from OpenAI Platform

CLOUDFLARE_ACCOUNT_ID – from Cloudflare Dashboard

CLOUDFLARE_API_TOKEN – from Cloudflare Dashboard

🚀 Setup Steps
Phase 1: Database (MongoDB Atlas)

Create a free cluster

Go to cloud.mongodb.com

Log in or create an account

Click “Build a Database”

Choose M0 Free tier

Select your region

Click Create Cluster

Create a Database User

Go to Database Access

Click Add New Database User

Choose Password authentication

Username: future-admin

Password: younes2025 (or any strong password)

Privileges: Atlas admin

Click Add User

Allow access from anywhere

Go to Network Access

Click Add IP Address

Choose Allow Access from Anywhere (0.0.0.0/0)

Confirm

Get the connection string

Go back to Database

Click Connect next to your cluster

Choose Connect your application

Copy the connection string:

mongodb+srv://future-admin:younes2025@cluster-future.xxxxx.mongodb.net/?appName=Cluster-future

Phase 2: OpenAI API Key

Go to https://platform.openai.com/api-keys

Log in

Create a new secret key

Copy the key (sk-proj-...)

IMPORTANT: Add at least $5 credit in Billing

Phase 3: Cloudflare (for auto deployment)

Account ID

Log in to Cloudflare

From sidebar → click your account

Copy Account ID

API Token

Visit: https://dash.cloudflare.com/profile/api-tokens

Click Create Token

Choose Edit Cloudflare Workers template

Or create custom token with:

Permissions: Account → Cloudflare Pages → Edit

Resources: Include → Your Account

Create token

Copy the token

Phase 4: Deploy Backend on Render

Fork the repo

Visit: https://github.com/yasoo2/Infinity-x-platform

Click Fork

Create Web Service

In Render → New → Web Service

Repo: Infinity-x-platform

Name: infinityx-backend

Region: Oregon

Branch: main

Root Directory: backend

Runtime: Node

Build: npm install --legacy-peer-deps

Start: npm start

Plan: Free

Add Environment Variables

MONGO_URI=...
DB_NAME=future_system
OPENAI_API_KEY=sk-proj-xxxx
NODE_ENV=production


Deploy

Click Create Web Service

Phase 5: Deploy Worker on Render

Create Background Worker

New → Background Worker

Repo: same

Name: infinityx-worker

Root Directory: worker

Build: npm install

Start: node worker-enhanced.mjs

Plan: Free

Environment Variables

MONGO_URI=...
DB_NAME=future_system
OPENAI_API_KEY=sk-proj-xxxx
CLOUDFLARE_ACCOUNT_ID=xxxx
CLOUDFLARE_API_TOKEN=xxxx
PROJECTS_DIR=/tmp/infinity-projects
NODE_ENV=production


Deploy

Phase 6: Deploy Frontend on Cloudflare Pages

Create Project

Cloudflare → Workers & Pages → Create Application

Choose Pages

Select repo

Name: xelitesolutions (or anything)

Build:

Preset: Vite

Command:
cd dashboard-x && npm install && npm run build

Output: dashboard-x/dist

Environment variable

VITE_API_URL=https://infinityx-backend.onrender.com


Deploy

You’ll get a link like:
https://xelitesolutions.pages.dev

Optional: Custom domain

Add domain → xelitesolutions.com

🎉 Testing
1. Login

Visit your site and log in:

Email: info.auraaluxury@gmail.com

Password: younes2025

2. Build a Project

Go to Build

Choose project type

Enter title + description

Click Build with AI

Wait 1–2 minutes

Your site will deploy automatically 🎉

🔧 Troubleshooting
Worker not running

Cause: Projects stuck in "QUEUED"
Fix:

Check Render logs

Ensure OpenAI key works + has credit

Verify Mongo URI

Restart Worker

Cloudflare deployment fails

Fix:

Check Account ID and API token

Ensure token has “Cloudflare Pages → Edit” permissions

Check Worker logs

OpenAI Errors

Fix:

Check Usage page

Add credit

Verify API key

💰 Costs
Service	Free Plan	Expected Cost
MongoDB Atlas	512MB	$0
Render Backend	750 hrs/mo	$0
Render Worker	750 hrs/mo	$0
Cloudflare Pages	Unlimited	$0
OpenAI API	Pay-as-you-go	~$0.01–0.05 per project

Total: ~$1–5/month (OpenAI only)

📚 Resources

MongoDB, Render, Cloudflare, OpenAI documentation links included.

🤝 Contributing

Open-source project—PRs and issues welcome!

📄 License

MIT License

Built with ❤️ using AI