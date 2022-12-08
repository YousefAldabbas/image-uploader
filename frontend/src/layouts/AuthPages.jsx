import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth } from "../utils/auth";
function AuthPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isSuccess, user } = useSelector(
    (state) => state.auth
  );
  const { pathname } = useLocation();
  //   check if user authenticated and navigate to home page
  //   useEffect(() => {
  //     if (pathname === "login" && isAuthenticated) {
  //       navigate("/");
  //     }
  //   }, [dispatch, pathname, isAuthenticated]);
  useEffect(() => {
    if (!isAuthenticated ) {
      navigate("/login");
    }
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div className="bg-#fffffe">
        <Outlet />
      </div>
    </>
  );
}

export default AuthPages;
