# PlayPower Labs — Airbnb Clone

A pixel-perfect, clean-room React + TypeScript + Vite implementation of the Airbnb listing page experience.

![Airbnb Clone](/assets/images/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg)

## Features
- **Desktop Listing Page**: High-fidelity recreation of the Airbnb listing interface.
- **Sticky Navigation**: Sub-header navigation bar (*Photos*, *Amenities*, *Reviews*, *Location*) with price and rating summary that appears on scroll.
- **Hero Photo Gallery**: 5-image responsive grid with "Show all photos" trigger.
- **Guest Favourite Badge**: Laurel-framed badge with star ratings and reviews metrics.
- **Interactive Photo Tour**: Full category-filtered photo gallery modal (*All*, *Living room*, *Bedrooms*, *Full bathroom*, *Kitchen*, *Exterior*).
- **Lightbox Viewer**: High-resolution image viewer with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), focus trapping, and scroll locking.
- **Rating Breakdown**: 6-category rating progress bars (*Cleanliness*, *Accuracy*, *Check-in*, *Communication*, *Location*, *Value*).
- **Host Info & Neighborhood Map**: Detailed host statistics and location highlights map interface.

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 7
- **Styling**: Pure Vanilla CSS (CSS variables, modern grid & flex layout)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Local Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Download Reference Assets**:
   ```bash
   npm run assets:download
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

## Deploying on Vercel

1. Push code to your GitHub repository:
   ```bash
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the `Airbnb` repository.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

## License
MIT
