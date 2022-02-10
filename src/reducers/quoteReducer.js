import { GET_RANDOM_QUOTE_SUCCESS } from "../types/quoteTypes";

const initialState = {
  message: "",
  selectedQuote: { text: "", author: "" },
};

const quoteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RANDOM_QUOTE_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default quoteReducer;
