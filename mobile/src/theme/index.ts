import { useColorScheme } from "react-native";

/**
 * «Тихие воды» — палитра по Пс 22:2 («водит меня к водам тихим»).
 * Светлая тема — рассвет над водой (пергамент, глубокая вода, свеча).
 * Тёмная тема — ночное озеро (для ночной тревоги и бессонницы).
 */
const light = {
  bg: "#F5F0E6",
  surface: "#FFFDF8",
  surfaceAlt: "#EFE7D8",
  ink: "#1E2A33",
  inkSoft: "#55626C",
  inkFaint: "#8A9298",
  water: "#2F5D6E",
  waterDeep: "#1C3A47",
  waterMist: "#DCE7E6",
  sage: "#6F8F7E",
  sageMist: "#E3EBE3",
  gold: "#B08442",
  goldMist: "#F1E6CF",
  rose: "#A8604F",
  roseMist: "#F3E1DA",
  line: "#E4DACA",
  skyTop: "#F7E7CF",
  skyBottom: "#F5F0E6",
  wave1: "#CFDCD9",
  wave2: "#A9C2C0",
  wave3: "#6E9798",
  onWater: "#FFFDF8",
};

const dark: typeof light = {
  bg: "#0D1419",
  surface: "#141F27",
  surfaceAlt: "#1A2731",
  ink: "#ECE6DA",
  inkSoft: "#AEB6BA",
  inkFaint: "#78838A",
  water: "#83B6C3",
  waterDeep: "#2C5868",
  waterMist: "#1A2C35",
  sage: "#9DB9A9",
  sageMist: "#1C2A25",
  gold: "#D9B676",
  goldMist: "#2A2519",
  rose: "#DE9C8C",
  roseMist: "#2D1F1C",
  line: "#22303A",
  skyTop: "#121D2A",
  skyBottom: "#0D1419",
  wave1: "#16252F",
  wave2: "#1C3240",
  wave3: "#25475A",
  onWater: "#0D1419",
};

export type Palette = typeof light;

export const fonts = {
  serif: "PTSerif_400Regular",
  serifItalic: "PTSerif_400Regular_Italic",
  serifBold: "PTSerif_700Bold",
  sans: "Manrope_400Regular",
  sansMedium: "Manrope_500Medium",
  sansSemi: "Manrope_600SemiBold",
  sansBold: "Manrope_700Bold",
};

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 };
export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };

export function useTheme() {
  const scheme = useColorScheme();
  const c = scheme === "dark" ? dark : light;
  return { c, dark: scheme === "dark", fonts, space, radius };
}
