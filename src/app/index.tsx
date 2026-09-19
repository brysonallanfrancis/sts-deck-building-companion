import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { characters, type Character } from "../data/characters";

function CharacterTile({ character }: { character: Character }) {
  const router = useRouter();

  return (
    <Pressable style={styles.tile} onPress={() => router.push(`/${character.id}`)}>
      <ImageBackground
        source={character.image}
        style={styles.tileImage}
        contentFit="cover"
        transition={300}
      >
        <LinearGradient
          colors={["transparent", character.theme.secondary]}
          style={[
            styles.tileGradient,
            !character.image && { backgroundColor: character.theme.primary },
          ]}
        >
          <Text style={styles.tileName}>{character.name}</Text>
          <Ionicons name="chevron-forward" size={26} color={character.theme.accent} />
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

export default function CharacterSelect() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>STS2 Companion</Text>
      <FlatList
        data={characters}
        keyExtractor={(character) => character.id}
        renderItem={({ item }) => <CharacterTile character={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 20,
    backgroundColor: "#111014",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#f2f2f2",
    marginBottom: 20,
  },
  list: {
    gap: 16,
  },
  tile: {
    borderRadius: 18,
    overflow: "hidden",
    height: 180,
  },
  tileImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  tileGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  tileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f2f2f2",
  },
});
