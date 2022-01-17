import { snackbarTypes } from "../types/snackbarTypes";

const initialState = {
  notifications: [],
};

const snackbarReducer = (state = initialState, action) => {
  // debugger
  switch (action.type) {
    case snackbarTypes.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.payload.key,
            ...action.payload.notification,
          },
        ],
      };

    case snackbarTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.payload.dismissAll || notification.key === action.payload.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case snackbarTypes.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.payload.key
        ),
      };

    default:
      return state;
  }
};

export default snackbarReducer;
