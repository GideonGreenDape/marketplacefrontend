import axios from "axios";

const newRequest = axios.create({
  baseURL:`${import.meta.env.VITE_BaseUrl}/api/`,
  withCredentials: true,
});

export default newRequest;
