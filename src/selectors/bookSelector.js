import { createSelector } from "reselect";
// selector
const getBookState = state => state.bookState.books;
// reselect function
export const getBookSelector = createSelector([getBookState], books => books);

export default getBookSelector;
