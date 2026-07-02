/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        optical: '#050505',
        phosphor: '#c084fc', // Cosmic Purple
        project: '#E0E0E0', // Original white/grey for Project section
        target: '#FF003C',
        radar: '#FFB000',
        sensor: '#00E5FF'
      },
      fontFamily: {
        sans: ['Share Tech Mono', 'monospace'],
        heading: ['Michroma', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      cursor: {
        crosshair: 'crosshair',
      }
    },
  },
  plugins: [],
}

