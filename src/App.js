import React from "react";
import MovieList from "./components/MovieList/MovieList";
// react-router-dom
import { Route, Routes } from "react-router-dom";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import AdminTemplate from "./templates/adminTemplate/AdminTemplate";
import MovieManager from "./pages/Login/MovieManager/MovieManager";

function App() {
  return (
    <>
      <Routes>
        <Route element={<UserTemplate />} path="/">
          <Route element={<HomePage />} index></Route>
        </Route>
        <Route element={<Login />} path="login"></Route>
        <Route element={<AdminTemplate />} path="/admin">
          <Route index element={<MovieManager />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
