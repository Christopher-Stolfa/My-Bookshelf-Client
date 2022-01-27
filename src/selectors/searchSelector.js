import { createSelector } from "reselect";
// selector
const getSearchState = (state) => state.searchState.searchResults;
const getSelectedBookState = (state) =>
  state.searchState.searchResults.selectedBookData;
// reselect function
export const getSearchSelector = createSelector(
  [getSearchState],
  (searchResults) => searchResults
);

export const getSelectedBookSelector = createSelector(
  [getSelectedBookState],
  (selectedBookData) => selectedBookData
);
