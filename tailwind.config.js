/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ethica: {
          dark: '#0B0F19',
          card: '#1A2235',
          accent: '#3B82F6',
          danger: '#EF4444',
          success: '#10B981'
        }
      }
    },
  },
  plugins: [],
}
