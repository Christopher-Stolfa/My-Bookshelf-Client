import Axios from "axios";
import { endPoints, controllers } from "../config";

const signIn = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.signIn}`,
    inputData
  );
};

const signUp = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.signUp}`,
    inputData
  );
};

const signOut = async () => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.signOut}`
  );
};

const getSession = async () => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.checkSession}`
  );
};

const getFavoritedBooks = async () => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.getFavoritedBooks}`
  );
};

const saveFavoritedBook = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.saveFavoritedBook}`,
    inputData
  );
};

const removeFavoritedBook = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.delete(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.removeFavoritedBook}`,
    inputData
  );
};

const sendPasswordReset = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.forgotPassword}`,
    inputData
  );
};

const checkResetToken = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.checkResetToken}`,
    inputData
  );
};

const updatePasswordWithToken = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.put(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.updatePasswordWithToken}`,
    inputData
  );
};

export const userService = {
  signOut,
  signUp,
  signIn,
  getSession,
  saveFavoritedBook,
  removeFavoritedBook,
  getFavoritedBooks,
  sendPasswordReset,
  checkResetToken,
  updatePasswordWithToken,
};
