// First we need to import axios.js
import Axios from "axios";
// Next we make an 'instance' of it
const axios = Axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

Axios.defaults.withCredentials = true;

export default axios;
