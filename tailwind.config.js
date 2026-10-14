/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#040711',
          card: 'rgba(11, 19, 38, 0.75)',
          panel: 'rgba(15, 27, 54, 0.85)',
          border: 'rgba(56, 189, 248, 0.2)',
          'border-bright': 'rgba(56, 189, 248, 0.45)',
          cyan: '#00F2FE',
          ice: '#7DD3FC',
          blue: '#0284C7',
          violet: '#8B5CF6',
          purple: '#A855F7',
          danger: '#F43F5E',
          warning: '#F59E0B',
          success: '#10B981',
          muted: '#94A3B8',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.3)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glow-danger': '0 0 25px -5px rgba(244, 63, 94, 0.3)',
        'cyber-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'cyber-grid': "radial-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
}
