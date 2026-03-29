import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          night: "#1a1410",
          walnut: "#2b1d15",
          mahogany: "#5a3922",
          amber: "#d4af37",
          candle: "#f6df97",
          parchment: "#f4ebd7",
          blush: "#d8ba8b"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(212, 175, 55, 0.35)",
        panel: "0 20px 60px rgba(10, 6, 3, 0.35)"
      },
      backgroundImage: {
        "vault-radial":
          "radial-gradient(circle at 20% 20%, rgba(246,223,151,0.18), transparent 38%), radial-gradient(circle at 80% 10%, rgba(212,175,55,0.25), transparent 30%), linear-gradient(135deg, rgba(46,28,19,0.98), rgba(16,11,8,1))",
        "parchment-panel":
          "linear-gradient(180deg, rgba(248,240,224,0.98), rgba(239,229,206,0.92))",
        "gold-button":
          "linear-gradient(180deg, #f9e7a4 0%, #e5c964 40%, #c9982e 100%)"
      },
      fontFamily: {
        display: ["Cinzel Decorative", "Baskerville Old Face", "Palatino Linotype", "Georgia", "serif"],
        body: ["Cormorant Garamond", "Times New Roman", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
