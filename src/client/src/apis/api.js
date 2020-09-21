import axios from "axios";

// Later move this to a config file
const baseURL = "http://localhost:3000/api";
export default axios.create({
    baseURL
  });