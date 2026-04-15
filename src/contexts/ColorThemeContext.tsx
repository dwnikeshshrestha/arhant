"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTheme } from "next-themes";

export type ColorThemeOption = {
  key: string;
  label: string;
  /** Hex color shown in the swatch */
  displayColor: string;
  /** Whether this theme uses a dark background */
  isDark: boolean;
  /** CSS custom-property overrides. null = use the built-in light/dark vars */
  vars: Record<string, string> | null;
};

export const COLOR_THEMES: ColorThemeOption[] = [
  {
    key: "light",
    label: "Light",
    displayColor: "#F5F7FA",
    isDark: false,
    vars: null,
  },
  {
    key: "dark",
    label: "Dark",
    displayColor: "#0A0A12",
    isDark: true,
    vars: null,
  },
  {
    // User-requested primary brand colour
    key: "navy",
    label: "Navy",
    displayColor: "#102859",
    isDark: true,
    vars: {
      "--background": "220 69% 21%",
      "--foreground": "210 40% 98%",
      "--card": "220 65% 25%",
      "--card-foreground": "210 40% 98%",
      "--popover": "220 65% 25%",
      "--popover-foreground": "210 40% 98%",
      "--secondary": "220 55% 28%",
      "--secondary-foreground": "210 40% 98%",
      "--muted": "220 55% 28%",
      "--muted-foreground": "210 30% 68%",
      "--accent": "220 55% 28%",
      "--accent-foreground": "210 40% 98%",
      "--border": "220 45% 33%",
      "--input": "220 45% 33%",
    },
  },
  {
    key: "slate",
    label: "Slate",
    displayColor: "#1a2332",
    isDark: true,
    vars: {
      "--background": "218 32% 15%",
      "--foreground": "210 40% 98%",
      "--card": "218 28% 19%",
      "--card-foreground": "210 40% 98%",
      "--popover": "218 28% 19%",
      "--popover-foreground": "210 40% 98%",
      "--secondary": "218 25% 22%",
      "--secondary-foreground": "210 40% 98%",
      "--muted": "218 25% 22%",
      "--muted-foreground": "218 20% 65%",
      "--accent": "218 25% 22%",
      "--accent-foreground": "210 40% 98%",
      "--border": "218 20% 28%",
      "--input": "218 20% 28%",
    },
  },
  {
    key: "forest",
    label: "Forest",
    displayColor: "#0d2b1e",
    isDark: true,
    vars: {
      "--background": "154 54% 11%",
      "--foreground": "150 40% 96%",
      "--card": "154 50% 15%",
      "--card-foreground": "150 40% 96%",
      "--popover": "154 50% 15%",
      "--popover-foreground": "150 40% 96%",
      "--secondary": "154 45% 18%",
      "--secondary-foreground": "150 40% 96%",
      "--muted": "154 45% 18%",
      "--muted-foreground": "150 25% 65%",
      "--accent": "154 45% 18%",
      "--accent-foreground": "150 40% 96%",
      "--border": "154 35% 25%",
      "--input": "154 35% 25%",
    },
  },
  {
    key: "crimson",
    label: "Crimson",
    displayColor: "#6b1a1a",
    isDark: true,
    vars: {
      "--background": "0 61% 26%",
      "--foreground": "0 40% 98%",
      "--card": "0 55% 30%",
      "--card-foreground": "0 40% 98%",
      "--popover": "0 55% 30%",
      "--popover-foreground": "0 40% 98%",
      "--secondary": "0 45% 33%",
      "--secondary-foreground": "0 40% 98%",
      "--muted": "0 45% 33%",
      "--muted-foreground": "0 20% 68%",
      "--accent": "0 45% 33%",
      "--accent-foreground": "0 40% 98%",
      "--border": "0 35% 38%",
      "--input": "0 35% 38%",
    },
  },
];

/** CSS custom properties we may override */
const OVERRIDABLE_VARS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--border",
  "--input",
] as const;

type ColorThemeContextValue = {
  colorTheme: string;
  setColorTheme: (key: string) => void;
  themes: ColorThemeOption[];
};

const ColorThemeContext = createContext<ColorThemeContextValue>({
  colorTheme: "light",
  setColorTheme: () => {},
  themes: COLOR_THEMES,
});

export function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorTheme, setColorThemeState] = useState("light");
  const { setTheme } = useTheme();

  const applyColorTheme = useCallback(
    (key: string) => {
      const option = COLOR_THEMES.find((t) => t.key === key);
      const root = document.documentElement;

      // Clear any previously applied overrides
      OVERRIDABLE_VARS.forEach((v) => root.style.removeProperty(v));

      // Apply this theme's custom properties (if any)
      if (option?.vars) {
        Object.entries(option.vars).forEach(([prop, val]) => {
          root.style.setProperty(prop, val);
        });
      }

      // Keep next-themes dark/light class in sync so dark: variants work
      setTheme(option?.isDark ? "dark" : "light");
    },
    [setTheme],
  );

  // Restore persisted theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("color-theme") ?? "light";
    setColorThemeState(saved);
    applyColorTheme(saved);
  }, [applyColorTheme]);

  const setColorTheme = useCallback(
    (key: string) => {
      setColorThemeState(key);
      localStorage.setItem("color-theme", key);
      applyColorTheme(key);
    },
    [applyColorTheme],
  );

  return (
    <ColorThemeContext.Provider
      value={{ colorTheme, setColorTheme, themes: COLOR_THEMES }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  return useContext(ColorThemeContext);
}
