import Cookies from "js-cookie";
import axios, { axiosPrivate } from "../../api/axios";

const URI = process.env.REACT_APP_URI;
const login = async (data) => {
  const config = {
    "Content-Type": "application/json",
  };
  console.log(data);
  const response = await axios.post("/auth/login", data, config);
  return response.data;
};

const signup = async (data) => {
  const config = {
    "Content-Type": "application/json",
  };
  console.log(data);
  const response = await axios.post("/auth/register", data, config);
  return response.data;
};

const refresh = async () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("refresh_token")}` },
  };
  console.log(config);
  const response = await axios.post("/auth/refresh", config);
  return response.data;
};

const me = async () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
  };
  console.log(config);
  const response = await axiosPrivate.get("auth/me", config);
  return response.data;
};
export const authService = {
  login,
  refresh,
  me,
  signup
};
