import React, { useEffect, useState } from "react";
import { manageFilmService } from "../../../services/manageFilmService";

const MovieManager = () => {
  const [listMovie, setListMovie] = useState([]);
  useEffect(() => {
    manageFilmService
      .getAllMovie()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>MovieManager</div>;
};

export default MovieManager;
