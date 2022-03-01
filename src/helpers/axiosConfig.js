// First we need to import axios.js
import Axios from 'axios';
// Next we make an 'instance' of it
const axios = Axios.create({
// .. where we make our configurations
    baseURL: `http://${process.env.REACT_APP_API_IP}`
});

Axios.defaults.withCredentials = true;

export default axios;