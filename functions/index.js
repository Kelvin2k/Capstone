/**
 * Cloud Functions for Firebase - Movies API
 * This function serves as a backend API to fetch movies from Firestore
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// Initialize Firebase Admin
admin.initializeApp();

// Get Firestore instance
const db = admin.firestore();

/**
 * GET Movies API
 * Deployed in Asia East 1 (Taiwan) region
 * 
 * This replaces your third-party API (TokenCybersoft)
 * Returns all movies from Firestore database
 */
exports.getMovies = onRequest("./movies/getMovies").getMovies

/**
 * GET Single Movie by ID
 * Deployed in Asia East 1 (Taiwan) region
 */
exports.getMovie = onRequest("./movies/getMovie").getMovie
