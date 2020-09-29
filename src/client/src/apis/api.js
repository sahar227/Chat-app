import axios from "axios";
import {URL} from '../configs';

export default axios.create({
    baseURL: `${URL}/api`,
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true
    }
  });