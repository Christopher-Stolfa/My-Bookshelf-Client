import Axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { GET_HOME_SUCCESS } from "./types";
import { endPoints, controllers } from "../config";
import { getError } from "./errorActions";

export const getHomeSuccess = home => ({
  type: GET_HOME_SUCCESS,
  payload: home
});

export const getHomeAction = () => async dispatch => {
  Axios.defaults.withCredentials = true;
  try {
    const { data } = await trackPromise(
      Axios.get(
        `${process.env.REACT_APP_API_URI}/${controllers.users}/${endPoints.signIn}`
      )
    );
    dispatch(getHomeSuccess(data));
  } catch (err) {
    dispatch(getError(err.response.data));
  }
};
