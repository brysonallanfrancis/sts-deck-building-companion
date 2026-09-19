import { cards, getCardsForCharacter, type Card } from "./cards";

function resolveDeckCards(deckCardIds: string[]): Card[] {
  return deckCardIds
    .map((id) => cards.find((card) => card.id === id))
    .filter((card): card is Card => Boolean(card));
}

function countTags(deckCards: Card[]): Map<string, number> {
  const tagCounts = new Map<string, number>();
  for (const card of deckCards) {
    for (const tag of card.synergyTags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  return tagCounts;
}

/**
 * A tag shared by 2+ cards means those cards work together, so every card
 * sharing that tag contributes to the score. A tag only one card has
 * doesn't add anything, since there's nothing for it to synergize with.
 */
export function getSynergyScore(deckCardIds: string[]): number {
  const tagCounts = countTags(resolveDeckCards(deckCardIds));
  let score = 0;
  for (const count of tagCounts.values()) {
    if (count > 1) score += count;
  }
  return score;
}

/**
 * Ranks every card the character can pick up (not already in the deck) by
 * how many synergy tags it shares with cards already in the deck.
 */
export function getSuggestedCards(characterId: string, deckCardIds: string[], limit = 3): Card[] {
  const tagCounts = countTags(resolveDeckCards(deckCardIds));
  const deckIdSet = new Set(deckCardIds);

  return getCardsForCharacter(characterId)
    .filter((card) => !deckIdSet.has(card.id))
    .map((card) => ({
      card,
      overlap: card.synergyTags.reduce((sum, tag) => sum + (tagCounts.get(tag) ?? 0), 0),
    }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((entry) => entry.card);
}

/**
 * Categories present in the character's card pool that the current deck
 * has zero cards for — e.g. flags "no Defense cards" so the player knows
 * where their deck is weak.
 */
export function getCategoryGaps(characterId: string, deckCardIds: string[]): string[] {
  const pool = getCardsForCharacter(characterId);
  const allCategories = new Set(pool.flatMap((card) => card.categories));

  const deckCategoryCounts = new Map<string, number>();
  for (const card of resolveDeckCards(deckCardIds)) {
    for (const category of card.categories) {
      deckCategoryCounts.set(category, (deckCategoryCounts.get(category) ?? 0) + 1);
    }
  }

  return Array.from(allCategories).filter((category) => !deckCategoryCounts.get(category));
}
