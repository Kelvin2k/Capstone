const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// Initialize Firebase Admin
admin.initializeApp();

// Get Firestore instance
const db = admin.firestore();

exports.getMovies = onRequest({ region: 'asia-east1' }, (request, response) => {
  // Enable CORS
  cors(request, response, async () => {
    try {
      // Log the request
      logger.info("getMovies API called", { structuredData: true });

      // Fetch all movies from Firestore
      const moviesSnapshot = await db.collection("movies").get();
      
      // Transform documents to array
      const movies = [];
      moviesSnapshot.forEach((doc) => {
        movies.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Sort by rating (highest first)
      movies.sort((a, b) => b.rating - a.rating);

      // Return success response
      response.status(200).json({
        success: true,
        statusCode: 200,
        message: "Movies fetched successfully",
        content: movies,
        totalCount: movies.length
      });

    } catch (error) {
      // Log error
      logger.error("Error fetching movies", error);
      
      // Return error response
      response.status(500).json({
        success: false,
        statusCode: 500,
        message: "Error fetching movies",
        error: error.message
      });
    }
  });
});
