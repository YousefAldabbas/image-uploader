import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { login } from "../../features/auth/authSlice";
// Define the validation schema using yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string()
    .min(4, "Password must be at least 8 characters")
    .required("Password is required"),
});

function LoginFrom() {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(login(values));
      }}
    >
      {({ isSubmitting }) => (
        <div className="flex flex-col  justify-center h-[100vh] items-center">
          <Form className="w-full max-w-sm p-6 rounded shadow-xl border  border-purple-500 ">
            <div className="mb-4">
              <div className="md:w-1/3 flex justify-center">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4 text-2xl"
                  htmlFor="inline-full-name"
                >
                  Sign in
                </label>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Username
                </label>
              </div>
              <div className="md:w-2/3">
                <Field
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="username"
                  type="text"
                  name="username"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-username"
                >
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <Field
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="password"
                  type="password"
                  name="password"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-2 flex justify-center flex-col items-center gap-3">
              <button
                type="submit"
                className="group relative h-12 w-48 overflow-hidden rounded bg-white text-lg border-[1px]"
              >
                <div className="absolute inset-0 w-3 bg-purple-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-black font-semibold group-hover:text-white">
                  sign in
                </span>
              </button>
              <div>
                doesn't have an account?{" "}
                <Link to="/sign-up">
                  {" "}
                  <span> Signup now</span>{" "}
                </Link>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default LoginFrom;
