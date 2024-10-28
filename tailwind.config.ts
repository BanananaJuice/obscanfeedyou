import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        beige: '#F0EAD2',
        lightGreen: '#DDE5B6',
        olive: '#ADC178',
        brown: '#A98467',
        darkBrown: '#6C584C',
        accent: '#dec0f1',
      },
      backgroundImage: {
        wave: "url('/layered-peaks-haikei.svg')",
      },
      animation: {
        flow: "flow 15s linear infinite", // Animation to create the flowing effect
      },
      keyframes: {
        flow: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
