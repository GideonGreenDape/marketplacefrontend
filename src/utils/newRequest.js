import axios from "axios";

const newRequest = axios.create({
  baseURL: 'https://tmbackend-m22b.onrender.com',
  withCredentials: true,
});

export default newRequest;
