/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",      // Azul moderno
        secondary: "#f1f5f9",    // Cinza claro
        accent: "#22d3ee",       // Azul claro/acento
        muted: "#e5e7eb",        // Cinza neutro
        dark: "#0f172a",         // Azul escuro
        white: "#ffffff",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}

