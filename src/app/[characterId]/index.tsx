import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { characters } from "../../data/characters";
import { getCardsForCharacter, type Card } from "../../data/cards";
import { getCategoryGaps, getSuggestedCards, getSynergyScore } from "../../data/synergy";
import { useDeck } from "../../context/DeckContext";
import { ThemedButton } from "../../components/ThemedButton";
import { SectionCard } from "../../components/SectionCard";

export default function DeckScreen() {
  const { characterId } = useLocalSearchParams<{ characterId: string }>();
  const character = characters.find((item) => item.id === characterId);
  const { deck, addCard, setCharacterId, resetDeck } = useDeck();
  const router = useRouter();
  const [cardName, setCardName] = useState("");

  const query = cardName.trim().toLowerCase();
  const suggestions: Card[] = query
    ? getCardsForCharacter(characterId ?? "").filter((card) => card.name.toLowerCase().includes(query))
    : [];

  function handleSelectSuggestion(card: Card) {
    addCard(card.id);
    setCardName("");
  }

  function handleAddCard() {
    const trimmed = cardName.trim();
    if (!trimmed) return;
    const exactMatch = getCardsForCharacter(characterId ?? "").find(
      (card) => card.name.toLowerCase() === trimmed.toLowerCase()
    );
    addCard(exactMatch ? exactMatch.id : trimmed);
    setCardName("");
  }

  const synergyScore = getSynergyScore(deck);
  const suggestedCards = getSuggestedCards(characterId ?? "", deck);
  const categoryGaps = getCategoryGaps(characterId ?? "", deck);

  useEffect(() => {
    if (characterId) {
      setCharacterId(characterId);
    }
  }, [characterId]);

  if (!character) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Character not found.</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[character.theme.primary, character.theme.secondary]}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View>
          <Pressable style={styles.backButton} hitSlop={12} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#f2f2f2" />
          </Pressable>
          <Text style={styles.name}>{character.name}</Text>
        </View>

        <SectionCard style={styles.statsCard}>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>{deck.length}</Text>
            <Text style={styles.statLabel}>Cards</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>{synergyScore}</Text>
            <Text style={styles.statLabel}>Synergy Score</Text>
          </View>
        </SectionCard>

        <View style={styles.actions}>
          <ThemedButton
            label="View Deck"
            icon="albums-outline"
            color={character.theme.primary}
            onPress={() => router.push(`/${character.id}/deck`)}
          />
          <ThemedButton
            label="Reset Deck"
            icon="refresh"
            color="rgba(0,0,0,0.3)"
            onPress={resetDeck}
          />
        </View>

        <SectionCard style={styles.addCardSection}>
          <Text style={styles.suggestedTitle}>Add a Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Card name..."
            placeholderTextColor="#9a9a9a"
            value={cardName}
            onChangeText={setCardName}
            onSubmitEditing={handleAddCard}
            returnKeyType="done"
          />
          {suggestions.length > 0 && (
            <View style={styles.autocompleteList}>
              {suggestions.slice(0, 5).map((card) => (
                <ThemedButton
                  key={card.id}
                  label={card.name}
                  icon="add"
                  iconPosition="right"
                  variant="row"
                  color="transparent"
                  onPress={() => handleSelectSuggestion(card)}
                  style={styles.autocompleteRow}
                />
              ))}
            </View>
          )}
          <ThemedButton
            label="Add to Deck"
            icon="add-circle-outline"
            color={character.theme.primary}
            onPress={handleAddCard}
          />
        </SectionCard>

        <SectionCard style={styles.suggestedSection}>
          <Text style={styles.suggestedTitle}>Suggested Cards</Text>
          {suggestedCards.length === 0 ? (
            <Text style={styles.suggestedEmpty}>
              {deck.length === 0
                ? "Add cards to your deck to see synergy suggestions."
                : "No strong synergy picks yet — add more cards to your deck."}
            </Text>
          ) : (
            suggestedCards.map((card) => (
              <ThemedButton
                key={card.id}
                label={card.name}
                icon="add"
                iconPosition="right"
                variant="row"
                color="rgba(0,0,0,0.2)"
                onPress={() => addCard(card.id)}
              />
            ))
          )}

          {categoryGaps.length > 0 && (
            <Text style={styles.gapsText}>Lacking: {categoryGaps.join(", ")}</Text>
          )}
        </SectionCard>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 20,
    gap: 24,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  name: {
    fontSize: 32,
    fontWeight: "700",
    color: "#f2f2f2",
  },
  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 24,
  },
  statBlock: {
    alignItems: "center",
    minWidth: 96,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#f2f2f2",
  },
  statLabel: {
    fontSize: 13,
    color: "#d0d0d0",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  actions: {
    gap: 12,
  },
  addCardSection: {
    gap: 10,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#f2f2f2",
    fontSize: 15,
  },
  autocompleteList: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    overflow: "hidden",
  },
  autocompleteRow: {
    borderRadius: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.15)",
  },
  suggestedSection: {
    gap: 8,
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f2f2f2",
  },
  suggestedEmpty: {
    fontSize: 13,
    color: "#d0d0d0",
  },
  gapsText: {
    fontSize: 13,
    color: "#f2b84b",
    marginTop: 4,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111014",
  },
  notFoundText: {
    color: "#f2f2f2",
    fontSize: 16,
  },
});
