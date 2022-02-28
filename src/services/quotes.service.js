import Axios from "axios";
import { endPoints, controllers } from "../config";

const fetchRandomQuote = async () => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.API_URI}/${controllers.quotes}/${endPoints.getRandomQuote}`
  );
};

export const quoteService = {
  fetchRandomQuote,
};
