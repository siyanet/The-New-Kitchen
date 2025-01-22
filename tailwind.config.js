/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  
  ],
  theme: {
    extend: {
      colors: {
        red : '#F3274C',
        yellow: '#FFD40D',
        black: '#222222',
        gray: {
          100: "#D6D6D6",
          300: "#ECECEC",
        }
        },
      fontFamily:{
        fredoka: ['Fredoka One', 'sans-serif'],
        epilogue: ['Epilogue', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      fontWeight:
      {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold:700,
        extrabold: 800,
      },
      fontSize: {
        'xs': '0.75rem',  
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem', 
        '5xl': '3rem',    
        '6xl': '3.75rem', 
        '7xl': '4.5rem',  
        '8xl': '6rem', 
      },
    },
  
  plugins: [],
}}