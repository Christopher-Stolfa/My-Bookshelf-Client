import { uiTypes } from "../types/uiTypes";

export const startAction = (name, params) => ({
  type: uiTypes.START_ACTION,
  payload: {
    action: { name, params },
  },
});

export const stopAction = (name, params) => ({
  type: uiTypes.STOP_ACTION,
  payload: {
    action: { name, params },
  },
});

export const refreshActionStart = (refreshAction) => ({
  type: uiTypes.REFRESH_ACTION_START,
  payload: { refreshAction },
});

export const refreshActionStop = (refreshAction) => ({
  type: uiTypes.REFRESH_ACTION_STOP,
  payload: { refreshAction },
});
