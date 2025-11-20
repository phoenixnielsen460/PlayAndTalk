# Play & Speak — React PWA Starter (v0.2)

This version adds:
- Editable AAC boards saved to IndexedDB (persistent & offline)
- Parent Settings with PIN lock
- Bubble Pop and Letter Sound games
- Improved service worker caching for offline usage
- Cross-platform: iPad, iPhone, Android, desktop browsers

Quick start:
1. Install Node.js 18+.
2. In project folder run:
   npm install
   npm run dev
3. Open http://localhost:5173 (or your dev hostname) and test.
4. To create a production build: npm run build
5. Host the `dist` folder (Netlify, Vercel, GitHub Pages with adapters, etc.)

Notes:
- Uploaded button images are stored as data URLs inside IndexedDB so boards persist offline.
- Settings PIN is stored in IndexedDB.
- This is a PWA: users can Add to Home Screen on iOS and Android for a full-screen app-like experience.
