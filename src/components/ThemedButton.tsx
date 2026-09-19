import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ThemedButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
  textColor?: string;
  iconPosition?: "left" | "right";
  /** "action" = big centered button (View Deck, Add to Deck). "row" = list-item style button (suggestions, autocomplete). */
  variant?: "action" | "row";
  style?: StyleProp<ViewStyle>;
};

export function ThemedButton({
  label,
  icon,
  onPress,
  color = "#333333",
  textColor = "#f2f2f2",
  iconPosition = "left",
  variant = "action",
  style,
}: ThemedButtonProps) {
  return (
    <Pressable
      style={[styles.button, styles[variant], { backgroundColor: color }, style]}
      onPress={onPress}
    >
      {iconPosition === "left" && <Ionicons name={icon} size={20} color={textColor} />}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      {iconPosition === "right" && <Ionicons name={icon} size={18} color={textColor} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
  },
  action: {
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
