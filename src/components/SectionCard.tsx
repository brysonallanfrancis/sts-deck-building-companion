import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import type { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function SectionCard({ children, style }: SectionCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    padding: 16,
  },
});
