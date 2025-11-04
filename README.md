# Excalidraw Clone - Production-Grade Frontend

This project is a production-ready, enterprise-grade scaffold for a collaborative virtual whiteboard application, similar to Excalidraw. It is built with Next.js (App Router), TypeScript, and styled with shadcn/ui and Tailwind CSS.

## ✨ Features

- **Modern Tech Stack**: Next.js 14 (App Router), React 18, TypeScript.
- **Styling**: Tailwind CSS with the incredible shadcn/ui component library.
- **State Management**: Zustand for lightweight, scalable global state.
- **Code Quality**: Enforced with ESLint, Prettier, and pre-commit hooks via Husky & lint-staged.
- **Type Safety**: End-to-end type safety, including type-safe environment variables with Zod.
- **Core Functionality**: A basic but functional drawing canvas with tool selection, color/size options, and undo/redo.
- **Deployment Ready**: Configured for seamless deployment to Vercel.
- **CI/CD**: Automated build, lint, and deployment pipeline using GitHub Actions.
- **Containerization**: Multi-stage Dockerfile for optimized, secure production images.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.x or later)
- [npm](https://www.npmjs.com/) (v10.x or later) or another package manager like pnpm/yarn.
- [Docker](https://www.docker.com/products/docker-desktop/) (for containerized development/deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/girish-kor/excalidraw-clone.git
cd excalidraw-clone
```

### 2. Install Dependencies

This project uses `npm` as the default package manager.

```bash
npm install
```

### 3. Set Up Environment Variables

Create a local environment file by copying the example:

```bash
cp .env.example .env.local
```

Update `.env.local` with your local development URL:

```
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production-ready build.
- `npm run start`: Starts the production server (requires a build first).
- `npm run lint`: Lints the codebase using ESLint.
- `npm run lint:fix`: Automatically fixes linting issues.
- `npm run format`: Formats code with Prettier.

## 🐳 Docker

This project includes a multi-stage `Dockerfile` for building an optimized production image.

### Build the Docker Image

```bash
docker build -t excalidraw-clone . --build-arg NEXT_PUBLIC_APP_URL=https://your-production-url.com
```

### Run the Docker Container

```bash
docker run -p 3000:3000 excalidraw-clone
```

The application will be available at `http://localhost:3000`.

A `docker-compose.yml` file is also provided for convenience:

```bash
docker-compose up -d
```

## ☁️ Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/).

### Vercel Deployment

1.  **Push to GitHub**: Push your repository to GitHub.
2.  **Import Project**: Go to your Vercel dashboard and import the project from your GitHub repository.
3.  **Configure Environment Variables**: Add the `NEXT_PUBLIC_APP_URL` environment variable in the Vercel project settings, pointing to your production domain.
4.  **Deploy**: Vercel will automatically build and deploy your application. Subsequent pushes to the `main` branch will trigger automatic redeployments via the configured GitHub Action.

### CI/CD with GitHub Actions

The `.github/workflows/ci-cd.yml` file contains a pipeline that automates deployment to Vercel.

**Setup Steps:**

1.  **Install Vercel CLI**: `npm i -g vercel`
2.  **Link Project**: In your local repository, run `vercel link` to connect to your Vercel project.
3.  **Set Secrets**: Add the following secrets to your GitHub repository's settings (`Settings > Secrets and variables > Actions`):
    - `VERCEL_ORG_ID`: Your Vercel organization ID.
    - `VERCEL_PROJECT_ID`: Your Vercel project ID. (Both can be found in the `.vercel/project.json` file after linking).
    - `VERCEL_TOKEN`: A Vercel Access Token. Create one at [vercel.com/account/tokens](https://vercel.com/account/tokens).

Now, every push to the `main` branch will automatically build and deploy the project to production on Vercel.

## 📂 Project Structure

```
src
├── app/          # Next.js App Router: pages, layouts, API routes
├── components/     # Reusable React components (core, providers, UI)
├── config/         # Site-wide configuration
├── hooks/          # Custom React hooks
├── lib/            # Utility functions, env validation, logger
├── store/          # Zustand state management stores
├── styles/         # Global CSS and Tailwind directives
└── types/          # TypeScript type definitions
```
"# excalidraw-clone" 
