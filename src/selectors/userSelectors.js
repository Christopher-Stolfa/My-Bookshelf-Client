import { createSelector } from "reselect";
// selector
const getUserState = state => state.userState.user;
// reselect function
export const getUserSelector = createSelector([getUserState], user => user);

export default getUserSelector;
