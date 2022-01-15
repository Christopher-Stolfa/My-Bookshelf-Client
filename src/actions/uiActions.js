import {
  START_ACTION,
  STOP_ACTION,
  REFRESH_ACTION_START,
  REFRESH_ACTION_STOP,
} from "./types";

export const startAction = (name, params) => ({
  type: START_ACTION,
  payload: {
    action: { name, params },
  },
});

export const stopAction = (name, params) => ({
  type: STOP_ACTION,
  payload: {
    action: { name, params },
  },
});

export const refreshActionStart = (refreshAction) => ({
  type: REFRESH_ACTION_START,
  payload: { refreshAction },
});

export const refreshActionStop = (refreshAction) => ({
  type: REFRESH_ACTION_STOP,
  payload: { refreshAction },
});
