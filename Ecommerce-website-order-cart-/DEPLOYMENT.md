# Deployment Configuration

## Backend (Render)

### Settings in Render Dashboard:

- **Root Directory**: `/` (empty, means root)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV=production`
  - `DATABASE_URL=your_database_url`
  - `JWT_SECRET=your_jwt_secret`
  - `CLOUDINARY_NAME=your_cloudinary_name`
  - `CLOUDINARY_API_KEY=your_api_key`
  - `CLOUDINARY_API_SECRET=your_api_secret`
  - `RAZORPAY_KEY_ID=your_key`
  - `RAZORPAY_KEY_SECRET=your_secret`
  - `SUPABASE_URL=your_supabase_url`
  - `SUPABASE_KEY=your_supabase_key`
  - `CORS_ORIGIN=your_frontend_url` (e.g., https://yourfrontend.vercel.app)

### How It Works:

- Root `package.json` has `"start": "node src/app.js"`
- Render installs dependencies and runs the start command
- The app runs from the root, with src/ containing the actual backend code

---

## Frontend (Vercel)

### Settings in Vercel Dashboard:

- **Framework**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (Vercel defaults to this)
- **Output Directory**: `.next` (Vercel defaults to this)
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL=your_backend_url` (e.g., https://yourbackend.onrender.com)

### How It Works:

- Vercel uses `frontend/package.json`
- Runs `npm run build` in the `frontend/` folder
- Deploys the Next.js app

---

## Repository Structure

```
eccomerce1/
├── package.json (Backend - Render)
├── render.yaml (Render config)
├── render-build.sh
├── prisma.config.ts
├── prisma/
│   └── schema.prisma
├── src/ (Backend source)
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── ...
└── frontend/ (Frontend - Vercel)
    ├── package.json
    ├── app/
    ├── components/
    ├── src/
    └── ...
```
