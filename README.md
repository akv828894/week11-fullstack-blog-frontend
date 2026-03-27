# Week 11 Fullstack Blog Frontend

React + Vite frontend for the Week 11 MERN integration task.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
copy .env.example .env
```

3. Start the frontend:

```bash
npm run dev
```

The app reads the backend API from `VITE_API_URL`.
Development uses `http://localhost:5000` and production uses the live Week 11 API URL.

## Deployment Notes

### Frontend Deployment

Deploy this project on Vercel.

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

### API Configuration

This repo already includes:

- `.env.development` for local work
- `.env.production` for the live Week 11 API

If your API URL changes later, you can still override it in Vercel:

```env
VITE_API_URL=https://your-week11-api-url.onrender.com
```

## Demo Checklist

Before recording the final Week 11 demo:

1. Open the deployed frontend
2. Create a new post
3. Refresh the page
4. Show the post still visible
5. Delete the post
