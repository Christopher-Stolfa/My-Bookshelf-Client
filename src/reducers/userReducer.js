import { userTypes } from "../types/userTypes";

const initialState = {};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.GET_SESSION_SUCCESS:
    case userTypes.GET_SIGNUP_SUCCESS:
    case userTypes.GET_SIGNOUT_SUCCESS:
    case userTypes.GET_SIGNIN_SUCCESS:
      return {
        ...state,
        user: {
          ...payload
        }
      };
    case userTypes.GET_SAVE_FAVORITED_BOOK_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          favorites: [...state.user.favorites, payload.favoritedBook]
        }
      };
    case userTypes.GET_REMOVE_FAVORITED_BOOK_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          favorites: [
            ...state.user.favorites.filter(
              book => book.googleBooksId !== payload.favoritedBook.googleBooksId
            )
          ]
        }
      };
    default:
      return state;
  }
};

export default userReducer;
