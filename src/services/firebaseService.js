// Firebase Service
// This file contains all Firebase-related API calls
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../Firebase/init";

// Collection reference
const MOVIES_COLLECTION = "movies";

/**
 * Fetch all movies from Firestore
 * @returns {Promise<Array>} Array of movie objects
 */
export const getAllMovies = async () => {
  try {
    console.log("DB instance", db);

    const moviesCollection = collection(db, MOVIES_COLLECTION);
    const movieSnapshot = await getDocs(moviesCollection);
    console.log("movieSnapshot", movieSnapshot);

    const movieList = movieSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("check");
    console.log(movieList);

    return movieList;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

/**
 * Add a new movie to Firestore
 * @param {Object} movieData - Movie object to add
 * @returns {Promise<string>} Document ID of the added movie
 */
export const addMovie = async (movieData) => {
  try {
    const moviesCollection = collection(db, MOVIES_COLLECTION);
    const docRef = await addDoc(moviesCollection, movieData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};
