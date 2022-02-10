import { createSelector } from "reselect";

const getSelectedQuote = (state) => state.quoteState.selectedQuote;

export const getSelectedQuoteSelector = createSelector(
  [getSelectedQuote],
  (selectedQuote) => selectedQuote
);
