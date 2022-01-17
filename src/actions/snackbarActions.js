import Button from "@mui/material/Button";
import { snackbarTypes } from "../types/snackbarTypes";

const setSnackbarError = (error, dispatch) => {
  return dispatch(
    enqueueSnackbar({
      notification: {
        message: error.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "error",
          action: (key) => (
            <Button onClick={() => dispatch(closeSnackbar(key))}>
              dismiss
            </Button>
          ),
        },
      },
    })
  );
};

const setSnackbarSuccess = (data, dispatch) => {
  return dispatch(
    enqueueSnackbar({
      notification: {
        message: data.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
          action: (key) => (
            <Button onClick={() => dispatch(closeSnackbar(key))}>
              dismiss
            </Button>
          ),
        },
      },
    })
  );
};

const enqueueSnackbar = (data) => {
  const key = data.notification.options && data.notification.options.key;
  return {
    type: snackbarTypes.ENQUEUE_SNACKBAR,
    payload: {
      ...data,
      key: key,
    },
  };
};

const closeSnackbar = (key) => ({
  type: snackbarTypes.CLOSE_SNACKBAR,
  payload: {
    dismissAll: !key, // dismiss all if no key has been defined
    key,
  },
});

const removeSnackbar = (key) => {
  return { type: snackbarTypes.REMOVE_SNACKBAR, payload: { key: key } };
};

export const snackbarActions = {
  setSnackbarSuccess,
  setSnackbarError,
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar,
};
