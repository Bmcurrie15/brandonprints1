# 3D Print Portfolio - Setup Guide

## How to use this in Google AI Studio / Real World

### 1. Create the Google Sheet
Create a new Google Sheet with exactly these headers in Row 1:
- `slug`, `title`, `description`, `category`, `material`, `purpose`, `notes`, `featured`, `images`, `imageAlts`

### 2. Publish to Web
1. File > Share > Publish to web.
2. Select "Entire Document" and "Comma-separated values (.csv)".
3. Copy the link into `config.ts` -> `GOOGLE_SHEET_URL`.

### 3. Performance Optimization (Highly Recommended)
To prevent slow image loads from Google Drive and ensure a 100/100 performance score:
1. Create a free account at [Cloudinary](https://cloudinary.com/).
2. Copy your **Cloud Name** from the dashboard.
3. Paste it into `config.ts` -> `CLOUDINARY_CLOUD_NAME`.
4. The app will now automatically optimize, resize, and cache your images globally.

---

## Tech Stack
- React 19
- TypeScript
- Tailwind CSS
- Three.js (@react-three/fiber)
- Cloudinary Fetch API (Optimization)
- Google Sheets (CMS)