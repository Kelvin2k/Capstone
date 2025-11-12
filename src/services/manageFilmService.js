import { https } from "./configServ";

export const manageFilmService = {
  getAllBanner: () => {
    // in https method there will be two input values, 1 is epoint string, 2 is data upload
    return https.get("/movie/popular?language=en-US&page=1");
  },
  getAllMovie: () => {
    return https.get("/movie/popular?language=en-US&page=2");
  },
};
