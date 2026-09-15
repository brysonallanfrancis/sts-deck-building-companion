## About

A Slay the Spire 2 deck-building companion app. Pick a character, build out your current run's deck, and get suggested cards that synergize with what you've already picked up.

## Planned Screens

- **Character Select** — list of characters (Ironclad, Silent, Regent, Necrobinder, Defect); tapping one opens their deck screen
- **Deck** — shows current deck, card count, and synergy score for the selected character; theme is styled to match the chosen character
- **Add Card** (modal) — search/select a card to add to the current deck
- **View Deck** (modal) — lists cards in the current deck with a `(-)` to remove any
- **View Suggested** (modal) — table of suggested cards ranked by synergy score, with quick-add support

## Decisions So Far

- Synergy scoring will be a simple tag-based rule set (no ML/backend), since it's not graded
- Modals are implemented as expo-router routes (not component state), so they can pass data like normal screens
- Character + current deck state is shared via React Context, since multiple modals read/mutate the same deck
- Each character has its own theme (colors) passed down to style the deck screen

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
