import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { characters } from "../../data/characters";
import { getCardName } from "../../data/cards";
import { useDeck } from "../../context/DeckContext";

export default function ViewDeckModal() {
  const { characterId } = useLocalSearchParams<{ characterId: string }>();
  const character = characters.find((item) => item.id === characterId);
  const { deck, removeCard } = useDeck();
  const router = useRouter();

  const counts = new Map<string, number>();
  for (const cardId of deck) {
    counts.set(cardId, (counts.get(cardId) ?? 0) + 1);
  }
  const groupedDeck = Array.from(counts, ([cardId, count]) => ({ cardId, count }));

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Deck</Text>
        <Pressable onPress={() => router.dismiss()} hitSlop={12}>
          <Ionicons name="close" size={24} color="#f2f2f2" />
        </Pressable>
      </View>

      {deck.length === 0 ? (
        <Text style={styles.empty}>Your deck is empty. Add some cards to get started.</Text>
      ) : (
        <FlatList
          data={groupedDeck}
          keyExtractor={(entry) => entry.cardId}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cardName}>
                {getCardName(item.cardId)} {item.count > 1 ? `x ${item.count}` : ""}
              </Text>
              <Pressable
                style={[styles.removeButton, { backgroundColor: character?.theme.primary ?? "#444" }]}
                onPress={() => removeCard(item.cardId)}
                hitSlop={8}
              >
                <Ionicons name="remove" size={18} color="#f2f2f2" />
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111014",
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f2f2f2",
  },
  empty: {
    fontSize: 14,
    color: "#9a9a9a",
  },
  list: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1c1b20",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cardName: {
    fontSize: 16,
    color: "#f2f2f2",
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
