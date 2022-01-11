import Axios from "axios";
import { endPoints, controllers } from "../config";

const signIn = async formData => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.signIn}`,
    {
      email: formData.get("email"),
      password: formData.get("password")
    }
  );
};

const signUp = async formData => {
  Axios.defaults.withCredentials = true;
  return await Axios.post(
    `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.signUp}`,
    {
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      displayName: formData.get("displayName")
    }
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
