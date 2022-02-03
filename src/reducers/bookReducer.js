import { bookTypes } from "../types/bookTypes";

const initialState = {
  selectedBook: {},
  favorites: []
};

const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case bookTypes.GET_SELECT_BOOK:
      return {
        ...state,
        selectedBook: {
          ...payload
        }
      };
    default:
      return state;
  }
};

export default bookReducer;
