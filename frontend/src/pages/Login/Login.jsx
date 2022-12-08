import { useEffect } from "react";
import { auth } from "../../utils/auth";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import LoginFrom from "./LoginFrom";
import { useNavigate } from "react-router-dom";
// Define the validation schema using yup

function Login() {
  const { isSuccess, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  // useEffect(() => {
  //   if(isSuccess){
  //     navigate("/")
  //   }
  //   // return () => {
  //   //   cleanup
  //   // };
  // }, [isSuccess]);

  useEffect(() => {
    if (isAuthenticated || (auth.checkAuth() && !isLoading)) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <LoginFrom />
    </div>
  );
}

export default Login;
