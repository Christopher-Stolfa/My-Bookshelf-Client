import { createSelector } from "reselect";

const getSelectedBook = (state) => state.bookState.selectedBook;
const getFavoriteBooks = (state) => state.bookState.favorites;
const getTotalFavoriteBooks = (state) => state.bookState.favorites.length;
const getSearchResultBooks = (state) => state.bookState.searchResultBooks;
const getTotalSearchResultBooks = (state) =>
  state.bookState.searchResultBooks.length;

export const getSelectedBookSelector = createSelector(
  [getSelectedBook],
  (selectedBook) => selectedBook
);

export const getFavoritesSelector = createSelector(
  [getFavoriteBooks],
  (favorites) => favorites
);

export const getSearchResultsSelector = createSelector(
  [getSearchResultBooks],
  (searchResultBooks) => searchResultBooks
);

export const getTotalFavoritesSelector = createSelector(
  [getTotalFavoriteBooks],
  (totalFavorites) => totalFavorites
);

export const getTotalSearchResultsSelector = createSelector(
  [getTotalSearchResultBooks],
  (totalSearchResults) => totalSearchResults
);
