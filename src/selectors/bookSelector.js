import { createSelector } from "reselect";

const getSelectedBook = state => state.bookState.selectedBook;
const getFavoriteBooks = state => state.bookState.favorites;
const getTotalFavoriteBooks = state => state.bookState.favorites.length;

export const getSelectedBookSelector = createSelector(
  [getSelectedBook],
  selectedBook => selectedBook
);

export const getFavoritesSelector = createSelector(
  [getFavoriteBooks],
  favorites => favorites
);

export const getTotalFavoritesSelector = createSelector(
  [getTotalFavoriteBooks],
  totalFavorites => totalFavorites
);
