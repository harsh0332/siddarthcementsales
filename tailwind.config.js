/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#C8102E',
        'brand-red-dark': '#9E0C24',
        'accent-yellow': '#FFC72C',
        'surface-base': '#FAFAF7',
        'surface-muted': '#F0EFEA',
        'surface-card': '#FFFFFF',
        'surface-dust': '#E8E6DF',
        'surface-dark': '#1A1A1A',
        'whatsapp': '#25D366',
        'text-primary': '#1A1A1A',
        'text-body': '#2D2D2D',
        'text-muted': '#6B6B6B',
        'text-inverse': '#FFFFFF',
        'border-default': '#D6D2C8',
        'divider-default': '#D6D2C8',
      },
      fontFamily: {
        display: ['Oswald', 'Bebas Neue', 'Anton', 'sans-serif'],
        ui: ['Inter', 'Manrope', 'sans-serif'],
        body: ['Roboto', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'industrial': 'rgba(0,0,0,0.16) 0px 3px 6px, rgba(0,0,0,0.23) 0px 3px 6px',
        'lift': '0 12px 28px rgba(0,0,0,0.12)',
      },
      transitionDuration: {
        'instant': '150ms',
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      }
    },
  },
  plugins: [],
}
