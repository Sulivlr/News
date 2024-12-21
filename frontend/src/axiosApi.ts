import axios from 'axios';
import {API_URL} from "./config.ts";

const axiosApi = axios.create({
   baseURL: API_URL,
});

export default axiosApi;