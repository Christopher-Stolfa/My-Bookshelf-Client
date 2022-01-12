import { createSelector } from "reselect";
// selector
const getSnackbarState = state => state.snackbarState.notifications;
// reselect function
export const getSnackbarSelector = createSelector(
  [getSnackbarState],
  notifications => notifications
);

export default getSnackbarSelector;
