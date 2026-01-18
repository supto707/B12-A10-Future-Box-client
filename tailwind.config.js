export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        sparkle: {
          '0%, 34%, 71%, 100%': { transform: 'scale(1)' },
          '17%': { transform: 'scale(1.2)' },
          '49%': { transform: 'scale(1.2)' },
          '83%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        sparkle: 'sparkle 1.5s linear 0.5s infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [],
}
