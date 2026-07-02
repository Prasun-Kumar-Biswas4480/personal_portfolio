# Product Requirements Document (PRD)
**Project Name:** Personal Engineering Portfolio
**Target Audience:** Recruiters, Engineering Managers, Collaborators, and Peers.
**Core Objective:** To showcase a unique blend of skills across Aerospace Engineering, Hardware & Embedded Systems, and AI/Software Development through an immersive, high-performance web experience.

---

## 1. Product Overview
The portfolio is a single-page, highly interactive React application. It uses a modern dark-mode aesthetic with neon accents and an immersive 3D background. The goal is to immediately establish technical credibility while providing a seamless, easily navigable user experience to explore projects, skills, and contact information.

---

## 2. Technical Stack
- **Frontend Framework:** React.js powered by Vite (for fast builds and HMR)
- **Styling:** Tailwind CSS (utility-first styling for rapid UI development)
- **Animations:** Framer Motion (for smooth 2D transitions, scrolling effects, and modal pop-ups)
- **3D Graphics:** Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Icons:** Lucide React & React Icons
- **Deployment:** Configured for GitHub Pages

---

## 3. Design System & Aesthetics
- **Theme:** Dark mode default.
- **Color Palette:** Deep blacks and dark greys/blues for backgrounds (`#000000`, `#010205`). Accent colors include vibrant neon cyan (`#00E5FF`) and striking red/orange (`#FF003C`) to mimic aerospace telemetry and cyberpunk aesthetics.
- **Typography:** Clean, sans-serif technical fonts (e.g., Inter or Roboto).
- **Vibe:** Technical, engineering-focused, futuristic but clean.

---

## 4. Core Features & Sections

### 4.1. AeroLoader (Initial Loading Screen)
- **Purpose:** Provide an engaging loading sequence while the 3D assets load.
- **Features:** 
  - Aerospace-themed UI with aircraft animations or flight telemetry aesthetics.
  - Progress bar with simulated system status updates (e.g., "Initializing core systems...", "Loading 3D canvas...").
  - Should last roughly 3 seconds or until the 3D canvas is fully initialized.

### 4.2. Immersive 3D Hero Section (`Hero3D.jsx`)
- **Purpose:** The "Wow Factor" landing area.
- **Features:**
  - **Background Canvas:** Renders a 3D environment behind the main HTML content.
  - **Environment:** Dynamic deep-space setting with an animated Starfield and colorful Nebula.
  - **Asteroid Field:** 300 instanced floating asteroids drifting slowly to provide depth without sacrificing performance.
  - **Drone/Aircraft Model:** A 3D model that spawns when the page loads. As the user scrolls down the website, the drone continuously and slowly drifts across the screen, lingering to accompany the user before flying off as they reach the bottom of the page.
  - **Text Overlay:** 
    - Headline with the user's name.
    - Sub-headline detailing core titles (e.g., "B.Tech Aerospace Engineering | Hardware & Embedded Systems | AI Developer").
    - Call-To-Action (CTA) buttons: "View My Work" (smooth scroll to Projects) and "Download Resume".

### 4.3. About Me Section
- **Purpose:** Personal background and engineering philosophy.
- **Features:**
  - Short biographical text highlighting educational background.
  - "Core Philosophy" section focusing on building from the ground up and bridging mechanical design with intelligent software.
  - Visual breakdown of the 3 main pillars: Aerospace, Hardware, Software & AI.

### 4.4. Projects Showcase
- **Purpose:** Displaying concrete evidence of engineering capabilities.
- **Features:**
  - **Filter Navigation:** Buttons to filter the projects by category (All, Aerospace, Hardware, Software & AI).
  - **Project Cards:** Grid of cards. Each card displays:
    - Project Title
    - Brief description
    - Technology tags (e.g., React, Python, C++)
    - GitHub/Link icons
  - **Interactive Modals:** Clicking on a project card opens a detailed modal overlaid on the screen. The modal contains:
    - Expanded images or videos.
    - Deep dive into the "Problem/Challenge".
    - Explanation of the "Solution/Outcome".
    - Modal should support smooth fade-in/out via Framer Motion and close when clicking outside of it.

### 4.5. Skills Arsenal
- **Purpose:** A scannable list of technical proficiencies.
- **Features:**
  - Responsive grid layout categorizing skills into 4 buckets:
    1. Hardware & Embedded (e.g., Arduino, Raspberry Pi, PCB Design)
    2. Software Development (e.g., Python, C++, React)
    3. Engineering Tools (e.g., CATIA V5, Ansys, MATLAB)
    4. AI & Security (e.g., Machine Learning, NIDS, Ollama)
  - Visual icons for each skill to make the grid easily readable.

### 4.6. Contact Section & Footer
- **Purpose:** Facilitating communication and networking.
- **Features:**
  - **Contact Form:** Inputs for Name, Email, Subject, and Message.
  - **Form Validation:** Prevents empty submissions and checks for valid email structures.
  - **Feedback System:** Displays success messages upon sending or error messages if it fails.
  - **Fallback:** Direct `mailto:` link if the user prefers standard email clients.
  - **Footer:** Social links (GitHub, LinkedIn), and copyright text.

### 4.7. Global Navigation
- **Purpose:** Easy access to all sections.
- **Features:**
  - Sticky top navigation bar.
  - Smooth scrolling to anchor links (`#about`, `#projects`, etc.).
  - Hamburger menu for mobile devices, expanding into a full-screen or slide-out mobile menu.

---

## 5. Performance & Technical Requirements
- **3D Optimization:** 
  - Use `instancedMesh` for the asteroid field to ensure a single draw call.
  - Cap the pixel ratio in `@react-three/fiber` to `1` or `1.5` for consistent framerates across mobile and high-DPI desktop screens.
- **Responsiveness:** All layouts (especially the Project Grid and Skills Grid) must collapse gracefully from 3+ columns on desktop to 1 column on mobile devices.
- **Accessibility:** Ensure sufficient color contrast between text and the dark backgrounds. Provide `alt` text for project images.

---

## 6. Future / Optional Features
- Advanced project sorting and search functionality.
- Dark/Light mode toggle (currently hardcoded to Dark mode due to 3D aesthetic).
- Lazy loading for images inside the Project Modals.
- Integration with analytics (e.g., Google Analytics or Vercel Analytics) to track portfolio traffic.
