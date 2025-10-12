import axios from "axios";

const newRequest = axios.create({
  baseURL:`${import.meta.env.BaseUrl}/api/`,
  withCredentials: true,
});

export default newRequest;
