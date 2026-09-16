/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gov: {
          navy:      '#0B2545',
          'navy-light': '#1A3A5C',
          blue:      '#1D5F9E',
          'blue-mid':'#2E6DA4',
          'blue-light':'#E8F0F8',
          saffron:   '#E07B39',
          'saffron-light': '#FEF3EC',
          white:     '#FFFFFF',
          'off-white': '#F4F6F9',
          'gray-100': '#EEF0F3',
          'gray-200': '#D8DCE2',
          'gray-400': '#8B94A3',
          'gray-600': '#4A5568',
          'gray-800': '#1A202C',
          green:     '#276749',
          'green-light': '#EBF5EE',
          red:       '#C0392B',
          'red-light': '#FDEDEC',
          amber:     '#B7791F',
          'amber-light': '#FFFBEB',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans"', '"Segoe UI"', 'Arial', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      boxShadow: {
        'gov-card': '0 1px 4px rgba(11,37,69,0.08), 0 0 0 1px rgba(11,37,69,0.05)',
        'gov-card-hover': '0 4px 16px rgba(11,37,69,0.12), 0 0 0 1px rgba(11,37,69,0.08)',
        'gov-dropdown': '0 8px 24px rgba(11,37,69,0.14)',
      },
      borderRadius: {
        'gov': '4px',
        'gov-md': '6px',
        'gov-lg': '8px',
      },
      animation: {
        'count-up': 'countUp 1.2s ease-out forwards',
        'bar-fill': 'barFill 1s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out',
      },
      keyframes: {
        countUp: { from: { opacity: 0 }, to: { opacity: 1 } },
        barFill: { from: { width: '0%' }, to: {} },
        fadeUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
