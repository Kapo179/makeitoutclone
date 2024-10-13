import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // You can link this to your dynamic CSS variables
        foreground: "var(--foreground)",
        primary: "#00115e", // Coolors palette dark blue
        secondary: "#002254", // A lighter blue for accents
        accent: "#007621", // Green for action buttons like 'Host Room'
        textPrimary: "#ffffff", // White text
        textSecondary: "#cbd5e0", // Gray text for secondary content
      },
      boxShadow: {
        '3xl': '0 10px 60px rgba(0, 0, 0, 0.2)', // Deeper shadows for modern UI look
      },
      animation: {
        bounceSlow: 'bounce 3s infinite', // Slower bounce effect
        pulseFast: 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Faster pulsing effect
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Custom Google font 'Inter'
      },
    },
  },
  plugins: [],
};

export default config;
