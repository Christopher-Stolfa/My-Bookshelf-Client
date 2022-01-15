import {
  START_ACTION,
  STOP_ACTION,
  REFRESH_ACTION_START,
  REFRESH_ACTION_STOP,
} from "../actions/types";

const initialState = {
  loader: {
    actions: [],
    refreshing: [],
  },
};

const uiReducer = (state = initialState, { type, payload }) => {
  const { loader } = state;
  const { actions, refreshing } = loader;
  switch (type) {
    case START_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: [...actions, payload.action],
        },
      };
    case STOP_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: actions.filter((action) => {
            if (action.name !== payload.action.name) {
              return true;
            } else if (action.params !== payload.action.params) {
              return true;
            } else {
              return false;
            }
          }),
        },
      };
    case REFRESH_ACTION_START:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: [...refreshing, payload.refreshAction],
        },
      };
    case REFRESH_ACTION_STOP:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: refreshing.filter(
            (refresh) => refresh !== payload.refreshAction
          ),
        },
      };
    default:
      return state;
  }
};

export default uiReducer;
