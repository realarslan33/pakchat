import palette from "../theme/palette";

export const colorPresets = [
  // DEFAULT PRESET
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE PRESET
  {
    name: "purple",
    lighterFaded: "#4C1D9540",
    lighter: "#E9D5FF",
    light: "#C084FC",
    main: "#9333EA",
    dark: "#6B21A8",
    darker: "#3B0764",
    contrastText: "#fff",
  },
  // CYAN PRESET
  {
    name: "cyan",
    lighterFaded: "#0F766E40",
    lighter: "#CCFBF1",
    light: "#5EEAD4",
    main: "#0D9488",
    dark: "#115E59",
    darker: "#042F2E",
    contrastText: palette.light.grey[800],
  },
  // YELLOW PRESET
  {
    name: "blue",
    lighterFaded: "#A1620740",
    lighter: "#FEF3C7",
    light: "#FDE047",
    main: "#CA8A04",
    dark: "#A16207",
    darker: "#422006",

    contrastText: palette.light.grey[800],
  },
  // ORANGE PRESET
  {
    name: "orange",
    lighterFaded: "#C2410C40",
    lighter: "#FFEDD5",
    light: "#FDBA74",
    main: "#EA580C",
    dark: "#C2410C",
    darker: "#431407",
    contrastText: palette.light.grey[800],
  },
  // RED PRESET
  {
    name: "red",
    lighterFaded: "#BE123C40",
    lighter: "#FFE4E6",
    light: "#FDA4AF",
    main: "#E11D48",
    dark: "#BE123C",
    darker: "#4C0519",
    contrastText: "#fff",
  },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];

export default function getColorPresets(presetsKey) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    default: defaultPreset,
  }[presetsKey];
}
