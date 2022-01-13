import Axios from "axios";
import { endPoints, controllers } from "../config";

const signIn = async inputData => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.signIn}`,
    inputData
  );
};

const signUp = async inputData => {
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

export const userService = {
  signOut,
  signUp,
  signIn,
  getSession
};
