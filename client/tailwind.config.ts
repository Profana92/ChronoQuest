import type { Config } from "tailwindcss";
import grainy from "./public/backgrounds/grainy.png";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Primary: "#534784",
        Secondary: "#927CEB",
        Tetriary: "#2C2444",
        "Neutral-Dark": "#0E0A21",
        "Neutral-White": "#FCFAF6",
        "Accent-Green": "#5DF1FC",
        "Accent-Pink": "#F4928D",
      },
      fontFamily: {
        lato: ["var(--font-lato)"],
        oswald: ["var(--font-oswald)"],
      },
      backgroundImage: {
        grainy: "url('/backgrounds/grainy.png')",

        indexPageHero: ["url('/backgrounds/indexPage/background.png')"],
      },
    },
  },
  plugins: [],
};
export default config;
