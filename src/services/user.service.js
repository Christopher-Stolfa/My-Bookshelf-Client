import Axios from "axios";
import { endPoints, controllers } from "../config";

const signIn = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.API_URI}/${controllers.users}/${endPoints.signIn}`,
    inputData
  );
};

const signUp = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.API_URI}/${controllers.users}/${endPoints.signUp}`,
    inputData
  );
};

const signOut = async () => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.API_URI}/${controllers.users}/${endPoints.signOut}`
  );
};

const getSession = async () => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.API_URI}/${controllers.users}/${endPoints.checkSession}`
  );
};

const sendPasswordReset = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.API_URI}/${controllers.users}/${endPoints.forgotPassword}`,
    inputData
  );
};

const checkResetToken = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.get(
    `${process.env.API_URI}/${controllers.users}/${endPoints.checkResetToken}`,
    inputData
  );
};

const updatePasswordWithToken = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.put(
    `${process.env.API_URI}/${controllers.users}/${endPoints.updatePasswordWithToken}`,
    inputData
  );
};

const updatePassword = async (inputData) => {
  Axios.defaults.withCredentials = true;
  return await Axios.put(
    `${process.env.API_URI}/${controllers.users}/${endPoints.updatePassword}`,
    inputData
  );
};

export const userService = {
  signOut,
  signUp,
  signIn,
  getSession,
  sendPasswordReset,
  checkResetToken,
  updatePasswordWithToken,
  updatePassword,
};
