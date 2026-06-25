# GKG Notary London — Website Redesign 🖋️

A modern, high-performance React frontend designed as a proposal to replace the legacy WordPress site for GKG Notary London. Built with a focus on premium aesthetics ("The Chambers" design system), smooth animations, and a seamless remote notarisation (e-Notary) experience.

## ✨ Key Features

- **Premium UI/UX:** Built with a bespoke design system featuring a Midnight Navy and Brass Gold palette.
- **High Performance:** Heavily optimized Framer Motion animations and CSS-driven transitions for silky-smooth 60fps scrolling and routing.
- **Remote Notarisation Portal:** A multi-step form wizard allowing clients to securely upload documents and submit applications for e-signatures.
- **Backend-Ready Architecture:** Clean separation of concerns with a dedicated API service layer. Easily swap out the local JSON data for live API endpoints.
- **Responsive Design:** Flawless experience across desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Animations:** Framer Motion (Optimized with `useMotionValue` and CSS reveals)
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Styling:** Vanilla CSS with Custom Properties (Design Tokens)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/gkg-notary-redesign.git
   cd gkg
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## 🔌 Backend Integration

This frontend is designed to be completely backend-agnostic. Currently, the site loads data from local JSON files in `src/data/`.

To connect this frontend to your real API (e.g., Node.js, Python, or Go), please refer to the comprehensive [Backend Integration Guide](BACKEND_INTEGRATION.md).

The guide details:
- How to set the `BASE_URL`.
- Expected API JSON schemas.
- How the `multipart/form-data` endpoint works for the Remote Notary feature.

## 📁 Project Structure

```text
src/
├── api/            # API client and endpoint mappings
├── assets/         # Images, SVG, static media
├── components/     # Reusable UI elements (Buttons, Navbar, FileUpload)
├── data/           # Mock JSON data (Remove when API is live)
├── hooks/          # Custom React hooks
├── pages/          # Full page layouts (Home, Services, RemoteNotary)
└── styles/         # CSS design tokens, resets, and global utilities
```

## 📜 License

Private and proprietary. Designed exclusively for GKG Notary London.
