import React from "react";
import MovieList from "./components/MovieList/MovieList";
// react-router-dom
import { Route, Routes } from "react-router-dom";
import UserTemplate from "./templates/UserTemplate/UserTemplate";

function App() {
  return (
    <>
      <Routes>
        <Route element={<UserTemplate />} path="/"></Route>
      </Routes>
    </>
  );
}

export default App;
