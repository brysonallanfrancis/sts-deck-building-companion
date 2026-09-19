import type { ImageSourcePropType } from "react-native";

export type CharacterTheme = {
  primary: string;
  secondary: string;
  accent: string;
};

export type Character = {
  id: string;
  name: string;
  theme: CharacterTheme;
  /** Character portrait shown behind the tile/theme gradient. Drop art into assets/images/characters and require it here. */
  image?: ImageSourcePropType;
};

export const characters: Character[] = [
  {
    id: "ironclad",
    name: "Ironclad",
    theme: { primary: "#b02e2e", secondary: "#3a1a1a", accent: "#e8b84b" },
    image: require("../../assets/images/ironclad.jpeg"),
  },
  {
    id: "silent",
    name: "Silent",
    theme: { primary: "#2e7d4f", secondary: "#173322", accent: "#c9d96b" },
    image: require("../../assets/images/silent.jpeg"),
  },
  {
    id: "regent",
    name: "Regent",
    theme: { primary: "#d9772e", secondary: "#1c2c4a", accent: "#f2b84b" },
    image: require("../../assets/images/regent.jpeg"),
  },
  {
    id: "necrobinder",
    name: "Necrobinder",
    theme: { primary: "#6a3fb0", secondary: "#211730", accent: "#c9a6f2" },
    image: require("../../assets/images/necro.jpeg"),
  },
  {
    id: "defect",
    name: "Defect",
    theme: { primary: "#2e6fb0", secondary: "#152535", accent: "#7fe0f2" },
    image: require("../../assets/images/defect.jpg"),
  },
];
