import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center justify-between shadow-sm p-6">
      <div className="flex items-center  text-white mr-6">
        <span className="font-semibold text-xl text-[#272343]">
          Image Uploader
        </span>
      </div>

      <div>
        <a
          href="#"
          className="inline-block text-sm px-6 py-2 font-bold  bg-[#3328fa] leading-none border rounded text-white   hover:text-white hover:bg-purple-500 "
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
        </a>
        {!(pathname === "/images") ? (
          <a
            href="#"
            className="inline-block text-sm px-6 py-2 font-bold  bg-[#3328fa] leading-none border rounded text-white   hover:text-white hover:bg-purple-500 "
            onClick={() => {
              navigate("/images");
            }}
          >
            images
          </a>
        ) : (
          <a
            href="#"
            className="inline-block text-sm px-6 py-2 font-bold  bg-[#3328fa] leading-none border rounded text-white   hover:text-white hover:bg-purple-500 "
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
