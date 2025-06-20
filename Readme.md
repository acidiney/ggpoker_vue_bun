
## Project Overview

The application consists of two main components:

- **Frontend**: A Vue 3 application with TypeScript, Tailwind CSS( Flowbite )
- **Backend**: A Hono-based API server running on Bun

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/acidiney/ggpoker_vue_bun.git
cd ggpoker_vue_bun
```

### Starting the Application

```bash
docker compose -f compose.yml -d
```

This will:
1. Build the frontend and backend Docker images
2. Start the frontend container on port 80
3. Start the backend container on port 3000
4. Create a Docker network for communication between services

Once the containers are running, you can access:
- Frontend: http://localhost
- Backend API: http://localhost:3000


## Project Structure

```
├── web/                  # Frontend
│   ├── src/              
│   ├── public/           
│   ├── Dockerfile        # Frontend Docker configuration
│   └── package.json      
│
├── backend/              # Backend
│   ├── index.ts          # Entry point
│   ├── db.ts             # Database operations
│   ├── Dockerfile        # Backend Docker configuration
│   └── package.json      
│
├── compose.yml           # Docker Compose configuration
└── Readme.md             # This file
```

## Technologies

### Frontend
- Vue 3.5.13
- TypeScript
- Tailwind CSS 4.1.10
- Pinia 3.0.1
- Vue Router 4.5.0
- Vite 6.2.4

### Backend
- Hono 4.7.11
- Bun
- TypeScript
