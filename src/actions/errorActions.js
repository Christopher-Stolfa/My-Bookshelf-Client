import { GET_ERRORS } from "./types";

export const getError = error => {
  return {
    type: GET_ERRORS,
    payload: error
  };
};

export default getError;
