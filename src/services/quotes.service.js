import Axios from "axios";
import { endPoints, controllers } from "../config";

const fetchRandomQoute = async () => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.quotes}/${endPoints.getRandomQod}`
  );
};

export const quoteService = {
  fetchRandomQoute,
};
