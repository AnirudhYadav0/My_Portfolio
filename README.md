# NEONVERSE — Anirudh Yadav's Interactive Portfolio

> "Don't Browse My Portfolio. Explore My Universe."

[![Live Demo](https://img.shields.io/badge/Live%20Demo-neonverse--portfolio.onrender.com-brightgreen?style=for-the-badge&logo=render&logoColor=white)](https://neonverse-portfolio.onrender.com)

🌐 **Live URL:** [https://neonverse-portfolio.onrender.com](https://neonverse-portfolio.onrender.com)

An immersive 3D interactive developer portfolio built with React, Vite, and Three.js. Visitors explore a futuristic digital universe to discover projects, skills, experience, and contact information.

---

## Features

- **Interactive 3D Universe** — Six explorable planetary destinations built with React Three Fiber, custom orbital geometries, and procedural particle field
- **Boot Sequence** — Minimal cinematic terminal-style boot sequence with skip intro and reduced-motion detection
- **Developer Terminal** — Signature command-line shell with command history (Up/Down arrows), quick-command chips, autoscrolling, and real universe navigation
- **Interactive TripNexus Simulator** — Built-in simulated AI itinerary generator with customizable destinations, durations, travel styles, and budget tiers (clearly labeled demo mode)
- **EnterSkill Hub Architecture Visualizer** — Interactive system layer breakdown showing React + Vite, JWT Authentication header flow, Express API middleware, and MongoDB Atlas ODM
- **Recruiter Mode** — High-contrast, single-page professional view with dedicated About, Education, Skills, Projects, Experience, and Contact sections
- **Skill Constellation** — Explorable frontend, backend, database, and DevOps skill clusters with usage descriptions and keyboard accessibility
- **Contact Portal** — Fully validated form with real-time feedback, transparent email copy / composer fallback, and direct clipboard utilities
- **Centralized Configuration** — Clean data separation in `src/data/` allowing zero-3D-code updates
- **Performance & Accessibility** — Dynamic device quality scaling, semantic ARIA elements, graceful non-WebGL fallback, and zero heavy dependencies

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Configuration

All personal information is centralized in `src/data/`:

| File | Purpose |
|------|---------|
| `src/data/profile.js` | Name, bio, education, GitHub, LinkedIn, email, resume |
| `src/data/projects.js` | Project details, stack, live demo URLs, GitHub links |
| `src/data/skills.js` | Skill groups and technology descriptions |
| `src/data/experience.js` | Internship and certifications |

### Required Configuration

Before going live, update these fields in `src/data/profile.js`:

```js
export const profile = {
  email: 'your@email.com',        // Contact form delivery
  linkedin: 'https://linkedin.com/in/your-profile', // LinkedIn link
  resume: '/resume.pdf',           // Place resume.pdf in /public/
};
```

For TripNexus in `src/data/projects.js`:

```js
liveDemo: 'https://tripnexus.your-domain.com', // When available
github: 'https://github.com/AnirudhYadav0/TripNexus',
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `` ` `` | Open/close developer terminal |
| `Escape` | Close active panel / return to universe |
| `R` | Reset camera |

### Terminal Commands

```
help           — Show all commands
about          — About Anirudh
projects       — List projects
skills         — Show skills
experience     — View experience
github         — Open GitHub profile
contact        — Open contact portal
hire           — Why hire Anirudh?
open <world>   — Navigate to a destination
home           — Return to universe
clear          — Clear terminal
```

---

## Production Build

```bash
npm run build
npm run preview
```

The build outputs to `dist/`. Code is split into chunks for Three.js, React Three Fiber, and React core.

---

## Deployment

### Render (Active Live Deployment)
The project is configured for continuous deployment on [Render](https://render.com) using [`render.yaml`](./render.yaml).

- **Live URL:** [https://neonverse-portfolio.onrender.com](https://neonverse-portfolio.onrender.com)
- **Runtime:** Static Site
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `./dist`
- **SPA Rewrites:** `/*` → `/index.html`

### Vercel
1. Push the repository to GitHub.
2. Import the project on [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite — no configuration needed.
4. Click **Deploy**.

The `dist/` directory is automatically deployed.

### Environment Variables

No secrets or API keys are required. All data is statically configured in `src/data/`.

---

## Project Structure

```
src/
  components/
    BootSequence.jsx       — Cinematic boot animation
    UniverseScene.jsx      — React Three Fiber 3D scene
    UniverseNavigation.jsx — HUD overlays and nav controls
    HUDPanel.jsx           — Sliding info panels
    DeveloperTerminal.jsx  — Interactive terminal
    RecruiterMode.jsx      — Clean recruiter view
    WebGLFallback.jsx      — Non-WebGL fallback
  data/
    profile.js             — Personal information
    projects.js            — Project details
    skills.js              — Technical skills
    experience.js          — Internship and certs
  hooks/
    useReducedMotion.js    — Accessibility hook
    useDeviceQuality.js    — Performance quality hook
  styles/
    global.css             — Design system and tokens
  App.jsx                  — Application root
  main.jsx                 — Entry point
public/
  favicon.svg              — Custom favicon
  resume.pdf               — (Add your resume here)
```

---

## Tech Stack

- **React 18** + **Vite 5** — Core framework
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Three.js helpers and abstractions
- **Three.js** — 3D graphics engine
- **Lucide React** — Icon library

---

## License

MIT — Free to use and modify for personal portfolio use.
