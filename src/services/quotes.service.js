import axios from "../helpers/axiosConfig";
import { endPoints, controllers } from "../config";

const fetchRandomQuote = async () => axios.get(
    `${controllers.quotes}/${endPoints.getRandomQuote}`
  );


export const quoteService = {
  fetchRandomQuote,
};
