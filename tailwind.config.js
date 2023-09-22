/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        move: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
          '100%': { transform: 'translateX(0)' },
        },
        popUpAnimation: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        move: 'move 1s ease-in-out infinite',
      }
    },
    boxShadow:{
      '3dshadow': "1px 2px 4px 0px rgba(0,0,0,0.25), inset 0 -3px 7px 0px rgba(0,0,0,0.30)",
    }
  },
  plugins: [],
}
