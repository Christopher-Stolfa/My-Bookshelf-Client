import { createSelector } from "reselect";
// selector
const getSearchState = state => state.searchState.searchResults;
const getSelectedBookState = state =>
  state.searchState.searchResults.selectedBookData;
const getBookSearchState = state =>
  state.searchState.searchResults.bookSearchData;
// reselect function
export const getSearchSelector = createSelector(
  [getSearchState],
  searchResults => searchResults
);

export const getSelectedBookSelector = createSelector(
  [getSelectedBookState],
  selectedBookData => selectedBookData
);

export const getResultsTotalSelector = createSelector(
  [getBookSearchState],
  bookSearchData => bookSearchData.length
);
