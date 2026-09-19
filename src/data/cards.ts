import ironclad from "./cards/ironclad.json";
import silent from "./cards/silent.json";
import defect from "./cards/defect.json";
import regent from "./cards/regent.json";
import necrobinder from "./cards/necro.json";
import colorless from "./cards/colorless.json";

export type Card = {
  id: string;
  name: string;
  character: string;
  type: "attack" | "skill" | "power";
  rarity: "basic" | "common" | "uncommon" | "rare";
  cost: string;
  description: string;
  categories: string[];
  synergyTags: string[];
  /** How many copies of this card are in the character's starting deck. Defaults to 1. */
  quantity?: number;
};

export const cards: Card[] = [
  ...(ironclad.cards as Card[]),
  ...(silent.cards as Card[]),
  ...(defect.cards as Card[]),
  ...(regent.cards as Card[]),
  ...(necrobinder.cards as Card[]),
  ...(colorless.cards as Card[]),
];

export function getCardsForCharacter(characterId: string): Card[] {
  return cards.filter((card) => card.character === characterId || card.character === "colorless");
}

export function getStartingDeck(characterId: string): Card[] {
  const basics = cards.filter((card) => card.character === characterId && card.rarity === "basic");
  return basics.flatMap((card) => Array(card.quantity ?? 1).fill(card));
}

export function getCardName(cardId: string): string {
  return cards.find((card) => card.id === cardId)?.name ?? cardId;
}
