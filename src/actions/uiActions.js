import { uiTypes } from "../types/uiTypes";

/**
 * This action is triggered when a component triggers the start of fetch request related action.
 * @param {string} name - The type of fetch in progress.
 * @param {object} params - Extra params associated with the action if needed.
 * @returns {object} - An object containing a type and payload to the reducers.
 */
export const startAction = (name, params) => ({
  type: uiTypes.START_ACTION,
  payload: {
    action: { name, params },
  },
});

/**
 * This action is triggered when a component triggers the end of fetch request related action.
 * @param {string} name - The type of fetch in progress.
 * @param {object} params - Extra params associated with the action if needed.
 * @returns {object} - An object containing a type and payload to the reducers.
 */
export const stopAction = (name, params) => ({
  type: uiTypes.STOP_ACTION,
  payload: {
    action: { name, params },
  },
});

/**
 * This action is triggered when a component triggers the start of a refresh related action.
 * @param {string} name - The type of fetch in progress.
 * @param {object} params - Extra params associated with the action if needed.
 * @returns {object} - An object containing a type and payload to the reducers.
 */
export const refreshActionStart = (refreshAction) => ({
  type: uiTypes.REFRESH_ACTION_START,
  payload: { refreshAction },
});

/**
 * This action is triggered when a component triggers the end of a refresh related action.
 * @param {string} name - The type of fetch in progress.
 * @param {object} params - Extra params associated with the action if needed.
 * @returns {object} - An object containing a type and payload to the reducers.
 */
export const refreshActionStop = (refreshAction) => ({
  type: uiTypes.REFRESH_ACTION_STOP,
  payload: { refreshAction },
});
