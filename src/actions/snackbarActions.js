import Button from "@mui/material/Button";
import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from "./types";

const setSnackbarError = (error, dispatch) => {
  return dispatch(
    enqueueSnackbar({
      notification: {
        message: error.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "error",
          action: key => (
            <Button onClick={() => dispatch(closeSnackbar(key))}>
              dismiss me
            </Button>
          )
        }
      }
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
          action: key => (
            <Button onClick={() => dispatch(closeSnackbar(key))}>
              dismiss me
            </Button>
          )
        }
      }
    })
  );
};

const enqueueSnackbar = data => {
  const key = data.notification.options && data.notification.options.key;
  return {
    type: ENQUEUE_SNACKBAR,
    payload: {
      ...data,
      key: key
    }
  };
};

const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  payload: {
    dismissAll: !key, // dismiss all if no key has been defined
    key
  }
});

const removeSnackbar = key => {
  return { type: REMOVE_SNACKBAR, payload: { key: key } };
};

export const snackbarActions = {
  setSnackbarSuccess,
  setSnackbarError,
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar
};
