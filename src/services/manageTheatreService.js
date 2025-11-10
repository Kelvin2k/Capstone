import { https } from "./configServ";
import React from "react";

const manageTheatreService = {
  getAllTheater: () => {
    // in methods
    return https.get("/movie/upcoming?language=en-US&page=1");
  },
};

export default manageTheatreService;
