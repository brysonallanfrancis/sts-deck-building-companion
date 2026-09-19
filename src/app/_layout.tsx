import { Stack } from "expo-router";

import { DeckProvider } from "../context/DeckContext";

export default function RootLayout() {
  return (
    <DeckProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </DeckProvider>
  );
}
