import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./styles/**/*.css"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      spacing: {
        xs: "4px",
        sm: "8px",
        "sm-plus": "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px"
      },
      inset: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      fontFamily: {
        sans: ['"Onest"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Adamina", "serif"],
        jersey: ['"Jersey 10"', "sans-serif"],
        jersey25: ['"Jersey 25"', "sans-serif"]
      },
      colors: {
        "surface-bg": "hsl(var(--surface-bg))",
        "surface-card": "hsl(var(--surface-card))",
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        accent: "hsl(var(--accent))",
        "accent-hover": "hsl(var(--accent-hover))",
        border: "hsl(var(--border))",
        "shadow-hard": "hsl(var(--shadow-hard))",
        success: "hsl(var(--success))",
        error: "hsl(var(--error))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        crtRect: {
          "0%,50%": { transform: "scaleY(0.01) scaleX(1)", borderRadius: "0" },
          "70%": { transform: "scaleY(.7) scaleX(1)", borderRadius: "1rem" },
          "80%": { transform: "scaleY(.8) scaleX(.6)", borderRadius: "1rem" },
          "100%": { transform: "scaleY(0.75) scaleX(0.7)", borderRadius: "1rem" }
        },
        crtRectMobile: {
          "0%,50%": { transform: "scaleY(0.01) scaleX(1)", borderRadius: "0" },
          "70%": { transform: "scaleY(.7) scaleX(1)", borderRadius: "1rem" },
          "80%": { transform: "scaleY(.95) scaleX(.8)", borderRadius: "1rem" },
          "100%": { transform: "scaleY(0.9) scaleX(0.9)", borderRadius: "1rem" }
        },
        crtRectReverse: {
          "0%": { transform: "scaleY(0.75) scaleX(0.7)", borderRadius: "1rem" },
          "20%": { transform: "scaleY(0.8) scaleX(0.6)", borderRadius: "1rem" },
          "30%": { transform: "scaleY(0.7) scaleX(1)", borderRadius: "1rem" },
          "80%,100%": {
            transform: "scaleY(0.01) scaleX(1)",
            borderRadius: "0"
          }
        },
        crtRectReverseMobile: {
          "0%": { transform: "scaleY(0.75) scaleX(0.7)", borderRadius: "1rem" },
          "20%": { transform: "scaleY(0.8) scaleX(0.6)", borderRadius: "1rem" },
          "30%": { transform: "scaleY(0.7) scaleX(1)", borderRadius: "1rem" },
          "80%,100%": {
            transform: "scaleY(0.01) scaleX(1)",
            borderRadius: "0"
          }
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        crtContentFadeIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        scan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 4px" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        crtRect: "crtRect 300ms ease-out forwards",
        crtRectMobile: "crtRectMobile 300ms ease-out forwards",
        crtRectReverse: "crtRectReverse 150ms ease-out forwards",
        crtRectReverseMobile: "crtRectReverseMobile 150ms ease-out forwards",
        crtContentFadeIn: "crtContentFadeIn 150ms cubic-bezier(0.8, 0, 1, 1) forwards",
        fadeIn: "fadeIn 200ms ease-out 550ms both",
        scan: "scan 1s linear infinite"
      },
      backgroundImage: {
        scanlines:
          "repeating-linear-gradient(0deg, rgba(255,255,0,0.08) 0px, rgba(255,255,0,0.08) 2px, transparent 2px, transparent 4px)"
      }
    }
  },
  plugins: [animatePlugin, typography]
};

export default config;