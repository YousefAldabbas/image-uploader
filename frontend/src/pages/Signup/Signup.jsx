import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";
import SignupForm from "./SignupForm";
function Signup() {
  const { isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    return () => {
      if (isSuccess !== null) dispatch(reset());
    };
  }, [isSuccess]);
  return (
    <div>
      <SignupForm />
    </div>
  );
}

export default Signup;
