import { uiTypes } from "../types/uiTypes";

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
    case uiTypes.START_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: [...actions, payload.action],
        },
      };
    case uiTypes.STOP_ACTION:
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
    case uiTypes.REFRESH_ACTION_START:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: [...refreshing, payload.refreshAction],
        },
      };
    case uiTypes.REFRESH_ACTION_STOP:
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
