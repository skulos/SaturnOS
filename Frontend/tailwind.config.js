/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      colors: {
        'tactivion-blue': 'rgba(25, 47, 89, 0.8)',
        // '#192F59'
        // rgba(25, 47, 89, 0.8),
        // 'scissors-yellow': '#FFF017',
        // Aureolin
        // 'onboarding': '#6184D8'
        Cobalt: '#1f2937'
      }
    }
  },
  plugins: []
}
