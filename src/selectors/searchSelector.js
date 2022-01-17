import { createSelector } from "reselect";
// selector
const getSearchState = (state) => state.searchState.searchResults;
// reselect function
export const getSearchSelector = createSelector(
  [getSearchState],
  (searchResults) => searchResults
);

export default getSearchSelector;
