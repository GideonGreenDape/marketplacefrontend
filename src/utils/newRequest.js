import axios from "axios";

const newRequest = axios.create({
  baseURL: 'https://marketplace-backend-uhjz.onrender.com/api/',
  withCredentials: true,
});

export default newRequest;
