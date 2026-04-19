# ⚡ Anandhu Anil Kumar — Neo-Kyoto Tech Hub Portfolio

> A high-fidelity, anime-VFX-inspired developer portfolio built with React + Vite. Features glassmorphism UI, particle animations, smooth scroll transitions, dark/light mode, and a fully responsive layout.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Component Breakdown](#component-breakdown)
- [Custom Hook](#custom-hook)
- [Data Layer](#data-layer)
- [Styling System](#styling-system)
- [Features](#features)
- [Theming — Dark & Light Mode](#theming--dark--light-mode)
- [Responsive Design](#responsive-design)
- [Deployment](#deployment)
- [Customization Guide](#customization-guide)
- [Dependencies](#dependencies)

---

## Project Overview

This is a **single-page React portfolio website** designed with a "Neo-Kyoto Tech Hub" aesthetic — combining sleek MERN stack engineering with anime-inspired VFX visuals. The design uses deep obsidian backgrounds, glowing cyan/violet accents, glassmorphism panels, and butter-smooth Framer Motion animations.

The site showcases:
- Personal introduction and hero section
- Three featured projects with live demos
- Interactive skill rings (particle-accelerator style)
- Animated vertical timeline for education and work experience
- Contact form with live validation
- Dark/Light mode toggle

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Animation | Framer Motion 12 |
| Particles | @tsparticles/react + @tsparticles/slim |
| Styling | Pure CSS (CSS Variables + BEM methodology) |
| Fonts | Orbitron, Rajdhani, Share Tech Mono (Google Fonts) |
| Linting | ESLint 9 |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
anandhus-portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Fixed top nav with scroll detection + hamburger
│   │   ├── Hero.jsx            # Landing section with typewriter effect
│   │   ├── Projects.jsx        # 3-card project showcase with hover VFX
│   │   ├── Skills.jsx          # Rotating ring skill visualizer
│   │   ├── Timeline.jsx        # Vertical timeline for education & work
│   │   ├── Contact.jsx         # Contact form + social links
│   │   ├── Footer.jsx          # Footer with links
│   │   └── ParticleBackground.jsx  # Full-screen animated particle canvas
│   ├── hooks/
│   │   └── useScrollAnimation.js   # IntersectionObserver-based scroll hook
│   ├── data/
│   │   └── portfolioData.js    # All personal data — single source of truth
│   ├── App.jsx                 # Root component — loader, theme, layout
│   ├── index.css               # Complete stylesheet (CSS vars, BEM, responsive)
│   └── main.jsx                # React DOM entry point
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Anandhu9255/anandhus-portfolio.git

# 2. Navigate into the project
cd anandhus-portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | Production build to `dist/` folder |
| Preview | `npm run preview` | Preview the production build locally |
| Lint | `npm run lint` | Run ESLint across the project |

---

## Component Breakdown

### `App.jsx`
The root component. Manages two pieces of global state:
- `loading` (boolean) — controls the boot loader animation
- `isDark` (boolean) — controls dark/light theme

Applies the `light` class to `document.documentElement` via `useEffect` when theme toggles. Renders: `ParticleBackground → Navbar → Hero → Projects → Skills → Timeline → Contact → Footer + ThemeToggle button`.

**Key patterns used:** `useState`, `useEffect`, `AnimatePresence`, conditional rendering.

---

### `Navbar.jsx`
Fixed top navigation bar.

- Detects scroll position via `useEffect` + `window.addEventListener` to apply `.navbar--scrolled` glassmorphism style
- Smooth scrolls to section IDs via `scrollIntoView({ behavior: 'smooth' })`
- Mobile hamburger menu toggled with `menuOpen` state
- Logo and links animated with `motion` stagger on mount

**State:** `scrolled`, `menuOpen`

---

### `Hero.jsx`
The landing / "awakening" section.

- **Typewriter effect:** `charIndex` state incremented via `useEffect` + `setTimeout` to animate the title text character by character
- **Aura orbs:** Three absolutely-positioned blurred radial gradients animated with CSS `@keyframes auraPulse`
- **Scroll CTA:** Button smooth-scrolls to `#projects`
- **Staggered entry:** `variants` object with `staggerChildren` used for cascading animation of all child elements

**State:** `displayText`, `charIndex`

---

### `Projects.jsx`
Showcases 3 projects in a responsive grid.

Each `ProjectCard` component manages:
- `hovered` state — reveals project description with `AnimatePresence` height animation
- `ripple` state — triggers `rippleEffect` CSS keyframe animation on mouse leave (kinetic energy discharge effect)
- MERN letters orbit the card corner using `motion` with `rotate: 360` animation
- Tech tags colored individually via `techColors` map
- CSS custom property `--card-color` passed per-card for themed borders/glows

**State per card:** `hovered`, `ripple`

---

### `Skills.jsx`
Displays skills as concentric animated rings (particle-accelerator aesthetic).

- 4 rings (Database, Backend, Frontend, Tools) rotate continuously via `framer-motion` `animate: { rotate: ±360 }` with `repeat: Infinity`
- Alternate rings rotate in opposite directions for visual depth
- Clicking a ring or layer header sets `activeLayer` — highlights the ring and expands the skill group panel
- Clicking a skill tag sets `activeSkill`
- Right panel shows skill groups as glassmorphism cards; active group glows with a "light ray" span element

**State:** `activeLayer`, `activeSkill`

---

### `Timeline.jsx`
Vertical alternating timeline for education and work history.

- Center energy line animated with `scaleY: 0 → 1` on scroll into view
- Each item alternates left/right using `index % 2` — on mobile, all collapse to right-aligned
- Clicking a node sets `activeNode` — expands detail text with `AnimatePresence` height animation and triggers a "LEVEL UP" floating text animation
- Pulse ring on active node uses `scale: 0.8 → 2.5, opacity: 1 → 0` repeat animation
- Certificates section below uses a CSS grid with glassmorphism cards

**State:** `activeNode`

---

### `Contact.jsx`
Two-column contact section with info panel and form.

- `form` state object holds `name`, `email`, `message` fields
- `focused` state tracks which field is active — applies `.contact__field--focused` class for glowing label effect
- `status` state cycles through `null → 'sending' → 'success'` (or `'error'` on validation fail)
- Simulated async submit with `setTimeout` (replace with real API/EmailJS for production)
- All inputs use controlled components with `onChange` handlers

**State:** `form`, `status`, `focused`

---

### `ParticleBackground.jsx`
Full-screen particle canvas fixed behind all content.

- Uses `initParticlesEngine` with `loadSlim` (performance-optimized tsParticles bundle)
- `init` state gates rendering until engine is ready
- Particle config: cyan/violet/green colors, linked particles, repulse on hover, push on click
- Mixed shapes: circles and triangles
- Opacity and size both have continuous animation for organic feel
- `useMemo` wraps the config object to prevent re-renders

**State:** `init`

---

### `Footer.jsx`
Simple branded footer with logo, tech credit, nav links, and copyright. No state — pure presentational component.

---

## Custom Hook

### `useScrollAnimation(threshold = 0.15)`
**File:** `src/hooks/useScrollAnimation.js`

A custom hook wrapping the native `IntersectionObserver` API.

```js
const { ref, isVisible } = useScrollAnimation();
```

**How it works:**
1. Creates a `ref` to attach to the target DOM element
2. Creates `isVisible` state (default `false`) and `hasAnimated` guard flag
3. On mount, attaches an `IntersectionObserver` to the ref element
4. When the element enters the viewport (past the `threshold`), sets `isVisible: true`
5. `hasAnimated` flag ensures the animation only fires **once** — it won't re-trigger on scroll up/down
6. Observer is properly cleaned up on unmount via the `useEffect` return function

**Used in:** `Projects`, `Skills`, `Timeline`, `Contact` — all use it to gate their section header animation.

---

## Data Layer

### `src/data/portfolioData.js`
Single source of truth for all personal content. **Edit this file to update any personal information without touching components.**

```
portfolioData
├── name, title, location, email, phone
├── github, linkedin (URLs)
├── projects[]
│   └── id, title, description, tech[], live (URL), color (hex)
├── skills{}
│   └── Database[], Backend[], Frontend[], Tools[]
├── timeline[]
│   └── year, title, subtitle, detail, type ('education' | 'work')
└── certificates[]
```

---

## Styling System

The entire stylesheet lives in `src/index.css`. It uses:

### CSS Custom Properties (Variables)
All colors, fonts, and effects are defined as CSS variables on `:root` (dark mode) and `:root.light` (light mode). This enables the theme toggle to work with zero JavaScript beyond toggling one class.

### BEM Naming Convention
Classes follow Block__Element--Modifier pattern:
- `.project-card` (block)
- `.project-card__title` (element)
- `.project-card--ripple` (modifier)

### Glassmorphism Implementation
The `.glass-panel` utility class uses:
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(20px);
border: 1px solid rgba(0, 245, 255, 0.15);
```
The gradient border effect uses a CSS `mask` + `padding` trick on a `::before` pseudo-element to create a multi-color glowing border without extra DOM elements.

### Typography
| Font | Variable | Usage |
|---|---|---|
| Orbitron | `--font-display` | Headings, logo, buttons, labels |
| Rajdhani | `--font-body` | Body text, paragraphs |
| Share Tech Mono | `--font-mono` | Code-style labels, tags, terminal text |

---

## Features

| Feature | Implementation |
|---|---|
| Boot loader with progress bar | `useState` + `setInterval` in `App.jsx` |
| Particle background | `@tsparticles/react` with `loadSlim` engine |
| Smooth scroll navigation | `scrollIntoView({ behavior: 'smooth' })` |
| Typewriter effect | `useEffect` + `setTimeout` character loop |
| Scroll-triggered animations | Custom `useScrollAnimation` hook (IntersectionObserver) |
| Staggered entrance animations | Framer Motion `variants` + `staggerChildren` |
| 3D card hover tilt | `whileHover: { rotateX: 2, rotateY: 2 }` + `transform-style: preserve-3d` |
| Ripple on mouse leave | CSS `@keyframes rippleEffect` triggered via state class |
| Rotating skill rings | Framer Motion `animate: { rotate: 360 }` + `repeat: Infinity` |
| Animated timeline line | `scaleY` animation gated by `useScrollAnimation` |
| Holographic glass panels | CSS `backdrop-filter` + gradient border mask trick |
| Hover-revealed project desc | `AnimatePresence` + `height: 0 → auto` animation |
| Dark / Light mode | CSS variable swap via `:root.light` class toggle |
| Mobile hamburger menu | `useState` + conditional CSS class |
| Responsive layout | CSS Grid + `@media` breakpoints at 900px and 640px |

---

## Theming — Dark & Light Mode

Theme is controlled by toggling the `light` class on `<html>`:

```js
// App.jsx
useEffect(() => {
  if (isDark) {
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.add("light");
  }
}, [isDark]);
```

In CSS, all dark-mode values are on `:root` and all light-mode overrides are on `:root.light`. Every color in the project uses a CSS variable, so the entire site re-themes with zero additional JavaScript.

The toggle button is fixed to the **bottom-right corner** of the screen (z-index: 2000) and shows ☀️ in dark mode and 🌙 in light mode.

---

## Responsive Design

| Breakpoint | Changes |
|---|---|
| `> 900px` | Full desktop layout — 2-column skills, 2-column contact, alternating timeline |
| `≤ 900px` | Skills stack vertically, contact stacks vertically, timeline collapses to left-aligned |
| `≤ 640px` | Navbar hamburger menu, single-column project grid, smaller theme toggle, reduced section padding |

---

## Deployment

### Vercel (Recommended)

```bash
# 1. Build the project
npm run build

# 2. Install Vercel CLI (if not installed)
npm i -g vercel

# 3. Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic deployments on every push.

### Netlify

```bash
npm run build
# Drag and drop the dist/ folder to Netlify dashboard
# Or use: netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# Add to vite.config.js:
# base: '/your-repo-name/'

npm run build
# Push the dist/ folder to gh-pages branch
```

---

## Customization Guide

### Update Personal Info
Edit **only** `src/data/portfolioData.js`:
- Change `name`, `email`, `phone`, `location`
- Update `github` and `linkedin` URLs
- Add/remove projects in the `projects` array
- Add skills to any category in `skills`
- Add timeline entries in `timeline`
- Add certificates to `certificates`

### Add a New Project
```js
// In src/data/portfolioData.js → projects array
{
  id: 4,
  title: "Your Project Name",
  description: "What it does...",
  tech: ["React.js", "Node.js"],
  live: "https://your-project.vercel.app",
  color: "#ff6b6b",   // Pick any accent hex color
}
```

### Change the Color Palette
Edit the CSS variables in `src/index.css` under `:root`:
```css
--accent-cyan: #00f5ff;    /* Primary accent */
--accent-violet: #7c3aed;  /* Secondary accent */
--accent-green: #06d6a0;   /* Tertiary accent */
```

### Connect a Real Contact Form
Replace the `setTimeout` simulation in `Contact.jsx → handleSubmit` with a real service:
- **EmailJS** — `emailjs.send(serviceId, templateId, form)`
- **Formspree** — `fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: JSON.stringify(form) })`
- **Resend / Nodemailer** — via your own backend API

---

## Dependencies

### Production
| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.1.0 | UI framework |
| `react-dom` | ^19.1.0 | React DOM renderer |
| `framer-motion` | ^12.38.0 | Animations and transitions |
| `@tsparticles/react` | ^3.0.0 | React wrapper for tsParticles |
| `@tsparticles/slim` | ^3.9.1 | Optimized particle engine bundle |

### Development
| Package | Version | Purpose |
|---|---|---|
| `vite` | ^7.0.4 | Build tool and dev server |
| `@vitejs/plugin-react` | ^4.6.0 | React fast refresh for Vite |
| `eslint` | ^9.30.1 | Code linting |
| `eslint-plugin-react-hooks` | ^5.2.0 | Hooks linting rules |
| `eslint-plugin-react-refresh` | ^0.4.20 | Fast refresh linting |

---

## Author

**Anandhu Anil Kumar**
- 📧 contactmeanandhuanilkumar@gmail.com
- 📱 9495450152
- 📍 Adoor, Kerala
- 🐙 [github.com/Anandhu9255](https://github.com/Anandhu9255)
- 💼 [linkedin.com/in/anandhuanilkumar-web-developer](https://linkedin.com/in/anandhuanilkumar-web-developer)

---

*Built with React + Framer Motion — Neo-Kyoto Tech Hub*
