import axios from "../helpers/axiosConfig";
import { endPoints, controllers } from "../config";

const signIn = async (inputData) => axios.post(
    `${controllers.users}/${endPoints.signIn}`,
    inputData
  );


const signUp = async (inputData) => axios.post(
    `${controllers.users}/${endPoints.signUp}`,
    inputData
  );


const signOut = async () => axios.post(
    `${controllers.users}/${endPoints.signOut}`
  );


const getSession = async () => axios.get(
    `${controllers.users}/${endPoints.checkSession}`
  );


const sendPasswordReset = async (inputData) => axios.post(
    `${controllers.users}/${endPoints.forgotPassword}`,
    inputData
  );


const checkResetToken = async (inputData) => axios.get(
    `${controllers.users}/${endPoints.checkResetToken}`,
    inputData
  );


const updatePasswordWithToken = async (inputData) => axios.put(
    `${controllers.users}/${endPoints.updatePasswordWithToken}`,
    inputData
  );


const updatePassword = async (inputData) => axios.put(
    `${controllers.users}/${endPoints.updatePassword}`,
    inputData
  );


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
