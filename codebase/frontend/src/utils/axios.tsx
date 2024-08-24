import axios from "axios";
import getAuth from "./authHeader";
const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;
console.log(serverURL);
const instance = axios.create({
  baseURL: serverURL,
  withCredentials: true,
});

// Set the token in the request headers
instance.interceptors.request.use(async (config) => {
  const data = await getAuth();
  if (data != null) {
    const token = data.token;
    if (token) {
      config.headers.set("x-access-token", token);
    }
  }

  return config;
});

export default instance;
