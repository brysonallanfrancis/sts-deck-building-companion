import { createContext, useContext, useState, type ReactNode } from "react";

import { getStartingDeck } from "../data/cards";

type DeckContextValue = {
  characterId: string | null;
  deck: string[];
  setCharacterId: (id: string) => void;
  addCard: (cardId: string) => void;
  removeCard: (cardId: string) => void;
  resetDeck: () => void;
};

const DeckContext = createContext<DeckContextValue | undefined>(undefined);

export function DeckProvider({ children }: { children: ReactNode }) {
  const [characterId, setCharacterIdState] = useState<string | null>(null);
  const [deck, setDeck] = useState<string[]>([]);

  function setCharacterId(id: string) {
    if (id === characterId) return;
    setCharacterIdState(id);
    setDeck(getStartingDeck(id).map((card) => card.id));
  }

  function addCard(cardId: string) {
    setDeck((prev) => [...prev, cardId]);
  }

  function removeCard(cardId: string) {
    setDeck((prev) => {
      const index = prev.indexOf(cardId);
      if (index === -1) return prev;
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  }

  function resetDeck() {
    if (!characterId) return;
    setDeck(getStartingDeck(characterId).map((card) => card.id));
  }

  return (
    <DeckContext.Provider
      value={{ characterId, deck, setCharacterId, addCard, removeCard, resetDeck }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDeck() {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return context;
}
