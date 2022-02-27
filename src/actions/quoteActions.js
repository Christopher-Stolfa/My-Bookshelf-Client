import {
  GET_RANDOM_QUOTE_FETCH,
  GET_RANDOM_QUOTE_SUCCESS,
} from "../types/quoteTypes";
import { startAction, stopAction } from "./uiActions";
import { quoteService } from "../services/quotes.service";

/**
 * This action is triggered when a user reaches the HomePage component.
 */
const getRandomQuote = () => async (dispatch) => {
  try {
    dispatch(startAction(GET_RANDOM_QUOTE_FETCH));
    const { data } = await quoteService.fetchRandomQuote();
    dispatch({
      type: GET_RANDOM_QUOTE_SUCCESS,
      payload: data,
    });
  } finally {
    dispatch(stopAction(GET_RANDOM_QUOTE_FETCH));
  }
};

export const quoteActions = {
  getRandomQuote,
};
