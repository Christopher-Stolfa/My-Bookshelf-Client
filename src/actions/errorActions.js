import { GET_ERRORS } from "./types";

export const getError = error => ({
  type: GET_ERRORS,
  payload: error
});

export default getError;
