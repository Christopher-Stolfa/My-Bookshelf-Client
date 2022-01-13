import Axios from "axios";
import { endPoints, controllers } from "../config";

const searchBook = async inputData => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.searchBook}`,
    { params: inputData }
  );
};

export const searchService = { searchBook };
