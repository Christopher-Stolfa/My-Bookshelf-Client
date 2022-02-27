import Button from "@mui/material/Button";
import { snackbarTypes } from "../types/snackbarTypes";

/**
 * Callback used by setSnackbarError and setSnackbarSuccess.
 * @callback dispatch
 * @param {string} type
 * @param {object} payload
 */

/**
 * @param {error} error - An error object that has a message received from an api response.
 * @param {dispatch} dispatch - A callback dispatch used to pass the return value of closeSnackbar to the uiActions reducer.
 * @returns {dispatch} - The dispatch callback taking in the enqueue snackbarFunction.
 */
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

/**
 * @param {object} data - A data object that has a message received from an api response.
 * @param {dispatch} dispatch - A callback dispatch used to pass the return value of closeSnackbar to the uiActions reducer.
 * @returns {dispatch} - The dispatch callback taking in the enqueue snackbarFunction.
 */
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

/**
 * This is what triggers the error and success messages that pop up on the bottom left of a users screen.
 * @param {object} data - An object containing notification data object with an options object containing a random key, a success or error variant and an action button.
 * @returns {object} - An object containing the type of snackbar, payload data and the key associated with it.
 */
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

/**
 * This function triggers closing a snackbar that has popped up on a users screen.
 * @param {number} key - A key associated with the snackbar message so the reducer knows which message to remove.
 * @returns {object} - An object containing the snackbar type and a payload containing the key as well as a dismissAll boolean.
 */
const closeSnackbar = (key) => ({
  type: snackbarTypes.CLOSE_SNACKBAR,
  payload: {
    dismissAll: !key, // dismiss all if no key has been defined
    key,
  },
});

/**
 * This function triggers when a certain amount of time has passed or a user has triggered closeSnackbar
 * @param {number} key - A key associated with the snackbar message so the reducer knows which message to remove.
 * @returns {object} - Containing a type and a payload so that the reducer knows what to remove.
 */
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
