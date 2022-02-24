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

const getFavoritedBook = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.getFavoritedBook}`,
    { params: inputData }
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

const toggleReadingBook = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.put(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.toggleReadingBook}`,
    inputData
  );
};

const saveNote = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.saveNote}`,
    inputData
  );
};

const editNote = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.put(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.editNote}`,
    inputData
  );
};

const deleteNote = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.delete(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.deleteNote}`,
    inputData
  );
};

const getNotes = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.books}/${endPoints.getNotes}`,
    { params: inputData }
  );
};

export const bookService = {
  searchBook,
  searchBookById,
  saveFavoritedBook,
  removeFavoritedBook,
  getFavoritedBooks,
  getFavoritedBook,
  toggleReadingBook,
  saveNote,
  editNote,
  deleteNote,
  getNotes,
};
