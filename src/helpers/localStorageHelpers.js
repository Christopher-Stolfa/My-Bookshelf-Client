import { LOCAL_STORAGE_KEY } from "../config";

export const saveToLocalStorage = state => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serialisedState === null)
      return {
        userState: { user: { message: "No session exists.", loggedIn: false } }
      };
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
