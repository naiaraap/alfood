import axios from "axios";
const http_v1 = axios.create({
  baseURL: 'http://localhost:8000/api/v1/'
});

export default http_v1;