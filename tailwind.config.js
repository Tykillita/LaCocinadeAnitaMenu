module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#228b22',
        secondary: '#c41e3a',
        accent: '#4ecdc4',
        background: '#1a1a1a',
        foreground: '#ffffff',
        amber: {
          50: '#fff8f0',
          100: '#ffe9c7',
          200: '#ffd79e',
          300: '#fcc575',
          400: '#f9b34c',
          500: '#f6a123',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
    },
  },
  plugins: [],
}