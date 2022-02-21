import Axios from "axios";
import { endPoints, controllers } from "../config";

const searchBook = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.searchBook}`,
    { params: inputData }
  );
};

const searchBookById = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.searchBookById}`,
    { params: inputData }
  );
};

const getFavoritedBooks = async () => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.getFavoritedBooks}`
  );
};

const saveFavoritedBook = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.saveFavoritedBook}`,
    inputData
  );
};

const removeFavoritedBook = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.delete(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.removeFavoritedBook}`,
    inputData
  );
};

export const bookService = {
  searchBook,
  searchBookById,
  saveFavoritedBook,
  removeFavoritedBook,
  getFavoritedBooks,
};
