import { default as __axios } from "axios";

import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

// import { store } from "../app/store.js";

const BASE_URL = import.meta.env.VITE_API_URL;
console.log(BASE_URL);

export default __axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = __axios.create({
  baseURL: BASE_URL,
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    if (Cookies.get("access_token")) {
      const decodedToken = jwt_decode(Cookies.get("access_token"));
      console.log(decodedToken.exp * 1000, currentDate.getTime());
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        try {
          let config = {
            headers: {
              authorization: `Bearer ${Cookies.get("refresh_token")}`,
            },
          };
          __axios.defaults.headers["authorization"] = `Bearer ${Cookies.get(
            "refresh_token"
          )}`;

          const response = await __axios.post(
            BASE_URL + "auth/refresh",
            config
          );
          console.log(response);
          Cookies.set("access_token", response.data.access_token);
        } catch (error) {
          console.log(error);
        }

        if (config?.headers) {
          config.headers["authorization"] = `Bearer ${Cookies.get(
            "access_token"
          )}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
