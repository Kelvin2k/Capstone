// Seed Movies Script
// This script populates Firestore with 10 sample movies
const admin = require('firebase-admin');
const serviceAccount = require('../functions/service-account-key.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Sample movie data
const movies = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    director: "Frank Darabont",
    rating: 9.3,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  {
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    director: "Francis Ford Coppola",
    rating: 9.2,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    director: "Christopher Nolan",
    rating: 9.0,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    director: "Quentin Tarantino",
    rating: 8.9,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
  },
  {
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
    director: "Robert Zemeckis",
    rating: 8.8,
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
    poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg"
  },
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    director: "Christopher Nolan",
    rating: 8.8,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
  },
  {
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    director: "Lana Wachowski, Lilly Wachowski",
    rating: 8.7,
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    director: "Christopher Nolan",
    rating: 8.6,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
  },
  {
    title: "The Lion King",
    year: 1994,
    genre: "Animation",
    director: "Roger Allers, Rob Minkoff",
    rating: 8.5,
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    poster: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg"
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action",
    director: "Anthony Russo, Joe Russo",
    rating: 8.4,
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
  }
];

// Seed function
async function seedMovies() {
  try {
    console.log('🎬 Starting to seed movies...\n');
    
    const moviesCollection = db.collection('movies');
    
    // Add each movie
    for (const movie of movies) {
      const docRef = await moviesCollection.add({
        ...movie,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Added: ${movie.title} (ID: ${docRef.id})`);
    }
    
    console.log('\n🎉 Successfully seeded 10 movies to Firestore!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding movies:', error);
    process.exit(1);
  }
}

// Run seed
seedMovies();
