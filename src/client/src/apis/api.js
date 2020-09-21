import axios from "axios";
import {URL} from '../configs';

export default axios.create({
    baseURL: `${URL}/api`
  });