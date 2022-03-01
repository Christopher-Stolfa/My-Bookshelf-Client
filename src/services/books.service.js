import axios from "../helpers/axiosConfig";
import { endPoints, controllers } from "../config";

const searchBook = (inputData) => axios.get(
    `${controllers.books}/${endPoints.searchBook}`,
    { params: inputData }
  );


const searchBookById = (inputData) => axios.get(
    `${controllers.books}/${endPoints.searchBookById}`,
    { params: inputData }
  );


const getFavoritedBooks = () => axios.get(
    `${controllers.books}/${endPoints.getFavoritedBooks}`
  );


const getFavoritedBook = (inputData) => axios.get(
    `${controllers.books}/${endPoints.getFavoritedBook}`,
    { params: inputData }
  );


const saveFavoritedBook = (inputData) => axios.post(
    `${controllers.books}/${endPoints.saveFavoritedBook}`,
    inputData
  );

const removeFavoritedBook = async (inputData) => axios.delete(
    `${controllers.books}/${endPoints.removeFavoritedBook}`,
    inputData
  );

const toggleReadingBook = async (inputData) => axios.put(
    `${controllers.books}/${endPoints.toggleReadingBook}`,
    inputData
  );

const setBookProgress = async (inputData) => axios.put(
    `${controllers.books}/${endPoints.setBookProgress}`,
    inputData
  );


const saveNote = async (inputData) => axios.post(
    `${controllers.books}/${endPoints.saveNote}`,
    inputData
  );


const editNote = async (inputData) => axios.put(
    `${controllers.books}/${endPoints.editNote}`,
    inputData
  );


const deleteNote = async (inputData) => axios.delete(
    `${controllers.books}/${endPoints.deleteNote}`,
    inputData
  );


const getNotes = async (inputData) => axios.get(
    `${controllers.books}/${endPoints.getNotes}`,
    { params: inputData }
  );


export const bookService = {
  searchBook,
  searchBookById,
  saveFavoritedBook,
  removeFavoritedBook,
  getFavoritedBooks,
  getFavoritedBook,
  toggleReadingBook,
  setBookProgress,
  saveNote,
  editNote,
  deleteNote,
  getNotes,
};
