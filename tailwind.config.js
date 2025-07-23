/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#0a0a0a',
        'game-border': '#333333',
        'snake-green': '#00ff41',
        'food-red': '#ff0040',
        'score-text': '#ffffff',
        'button-bg': '#1a1a1a',
        'button-hover': '#2a2a2a',
      },
      fontFamily: {
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 2s infinite',
        'bounce-subtle': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}