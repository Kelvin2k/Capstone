const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// Initialize Firebase Admin
admin.initializeApp();

// Get Firestore instance
const db = admin.firestore();

exports.getMovie = onRequest({ region: 'asia-east1' }, (request, response) => {
  cors(request, response, async () => {
    try {
      const movieId = request.query.id;

      if (!movieId) {
        return response.status(400).json({
          success: false,
          message: "Movie ID is required"
        });
      }

      const movieDoc = await db.collection("movies").doc(movieId).get();

      if (!movieDoc.exists) {
        return response.status(404).json({
          success: false,
          message: "Movie not found"
        });
      }

      response.status(200).json({
        success: true,
        content: {
          id: movieDoc.id,
          ...movieDoc.data()
        }
      });

    } catch (error) {
      logger.error("Error fetching movie", error);
      response.status(500).json({
        success: false,
        message: "Error fetching movie",
        error: error.message
      });
    }
  });
});