// import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/*.{html,js,jsx,ts,tsx,css}",
    "./src/**/*.{html,js,jsx,ts,tsx,css}",
    "./index.html",
    "*.html",
    "*.php",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A3E4D7',    // menthe douce
        secondary: '#F9E79F',  // jaune pâle
        accent: '#F5B7B1',     // pêche
        background: '#FDFCFD', // blanc cassé
        text: '#2C3E50',       // bleu-gris foncé
        gradientStart: '#A3E4D7',
        gradientEnd: '#F5B7B1',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0,0,0,0.05)',
      },
    },
  },
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: "#A3E4D7", // menthe douce
  //       secondary: "#F9E79F", // jaune pâle
  //       accent: "#F5B7B1", // pêche
  //       background: "#FDFCFD", // blanc cassé
  //       text: "#2C3E50", // bleu-gris foncé
  //     },
  //     fontFamily: {
  //       sans: ["Poppins", "sans-serif"],
  //     },
      // fontFamily: {
      //   heading: ["var(--font-heading)", ...fontFamily.sans],
      //   body: ["var(--font-body)", ...fontFamily.sans],
      // },
      // colors: {
      //   border: "hsl(var(--border))",
      //   input: "hsl(var(--input))",
      //   ring: "hsl(var(--ring))",
      //   text: "#EAEAEA",
      //   background: "#1A1A1D",
      //   foreground: "#EAEAEA",
      //   primary: {
      //     DEFAULT: "hsl(var(--primary))",
      //     foreground: "hsl(var(--primary-foreground))",
      //   },
      //   secondary: {
      //     DEFAULT: "hsl(var(--secondary))",
      //     foreground: "hsl(var(--secondary-foreground))",
      //   },
      //   destructive: {
      //     DEFAULT: "hsl(var(--destructive))",
      //     foreground: "hsl(var(--destructive-foreground))",
      //   },
      //   muted: {
      //     DEFAULT: "hsl(var(--muted))",
      //     foreground: "#EAEAEA",
      //   },
      //   accent: {
      //     DEFAULT: "hsl(var(--accent))",
      //     foreground: "hsl(var(--accent-foreground))",
      //   },
      //   popover: {
      //     DEFAULT: "hsl(var(--popover))",
      //     foreground: "hsl(var(--popover-foreground))",
      //   },
      //   card: {
      //     DEFAULT: "hsl(var(--card))",
      //     foreground: "hsl(var(--card-foreground))",
      //   },
      // },
      // borderRadius: {
      //   xl: `calc(var(--radius) + 4px)`,
      //   lg: `var(--radius)`,
      //   md: `calc(var(--radius) - 2px)`,
      //   sm: `calc(var(--radius) - 4px)`,
      // },
      // keyframes: {
      //   "accordion-down": {
      //     from: { height: 0 },
      //     to: { height: "var(--radix-accordion-content-height)" },
      //   },
      //   "accordion-up": {
      //     from: { height: "var(--radix-accordion-content-height)" },
      //     to: { height: 0 },
      //   },
      //   wiggle: {
      //     "0%, 100%": { transform: "translateX(0)" },
      //     "50%": { transform: "translateX(-4px)" },
      //     wiggle: "wiggle 1s ease-in-out infinite",
      //   },
      // },
      // animation: {
      //   "accordion-down": "accordion-down 0.2s ease-out",
      //   "accordion-up": "accordion-up 0.2s ease-out",
      // },
  //   },
  // },
  plugins: [(await import("tailwindcss-animate")).default],
};
