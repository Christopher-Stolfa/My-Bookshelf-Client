import {
  GET_RANDOM_QUOTE_FETCH,
  GET_RANDOM_QUOTE_SUCCESS,
} from "../types/quoteTypes";
import { startAction, stopAction } from "./uiActions";
import { quoteService } from "../services/quotes.service";

const getRandomQoute = () => async (dispatch) => {
  try {
    dispatch(startAction(GET_RANDOM_QUOTE_FETCH));
    const { data } = await quoteService.fetchRandomQoute();
    dispatch({
      type: GET_RANDOM_QUOTE_SUCCESS,
      payload: data,
    });
  } finally {
    dispatch(stopAction(GET_RANDOM_QUOTE_FETCH));
  }
};

export const quoteActions = {
  getRandomQoute,
};
