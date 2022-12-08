import React, { useState } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthPages from "./layouts/AuthPages";
import Error404 from "./pages/Error404";
import Images from "./pages/Images";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <Routes>
      <Route element={<AuthPages />}>
        <Route path="/" element={<Home />} />
        <Route path="/images" element={<Images />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
export default App;
