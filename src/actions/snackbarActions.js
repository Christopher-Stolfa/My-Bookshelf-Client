import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from "./types";

const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  };
};

const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key
});

export const snackbarActions = {
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar
};
