import { store } from "../app/store";
import Cookies from "js-cookie";
import { userInfo } from "../features/auth/authSlice";

const checkAuth = () => {
  if (Cookies.get("access_token") !== undefined && Cookies.get("refresh_token") !== undefined) {
     store.dispatch(userInfo());
    return true;
  }else
  return false;
};

export const auth = {checkAuth};

// function isAuthenticated() {
//   return !!getToken();
// }

// function getToken() {
//   return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
// }

// async function login({ username, password, rememberMe }) {
//   const { token, user } = await signin({ username, password });

//   if (rememberMe) {
//     localStorage.setItem(TOKEN_KEY, token);
//   } else {
//     sessionStorage.setItem(TOKEN_KEY, token);
//   }

//   return { token, user };
// }

// async function logout() {
//   await signout();
//   sessionStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem(TOKEN_KEY);
// }
