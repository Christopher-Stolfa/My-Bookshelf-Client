import { bookTypes } from "../types/bookTypes";
import { userTypes } from "../types/userTypes";

const initialState = {
  selectedBook: {},
  favorites: []
};

const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.GET_FAVORITED_BOOKS_SUCCESS:
      return {
        ...state,
        ...payload
      };
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
