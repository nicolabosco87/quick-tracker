import { MantineThemeOverride, Tuple, DefaultMantineColor } from "@mantine/core";

type ExtendedCustomColors = "light-green" | "ocean-blue" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

export const theme: MantineThemeOverride = {
  primaryColor: "ocean-blue",
  colors: {
    "light-green": [
      "#F7FBE9",
      "#EAF5C2",
      "#DCEE9A",
      "#CEE873",
      "#C0E14C",
      "#B3DB24",
      "#8FAF1D",
      "#6B8316",
      "#47580E",
      "#242C07",
    ],
    green: [
      "#EDF7F5",
      "#CDEAE2",
      "#ADDCCF",
      "#8CCFBC",
      "#6CC1A9",
      "#4CB396",
      "#3D8F78",
      "#2D6C5A",
      "#1E483C",
      "#0F241E",
    ],
    "ocean-blue": [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
  },
};
