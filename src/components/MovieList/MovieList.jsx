import React, { useState, useEffect } from 'react';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('firestore'); // 'firestore' or 'cloudFunction'

  // Method 1: Fetch from Firestore directly (Client SDK)
  const fetchFromFirestore = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { getAllMovies } = await import('../../services/firebaseService');
      const movieList = await getAllMovies();
      
      setMovies(movieList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching from Firestore:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Method 2: Fetch from Cloud Function (Backend API)
  const fetchFromCloudFunction = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using Asia East 1 (Taiwan) Cloud Function
      const response = await fetch(
        'https://asia-east1-project-movie-40343.cloudfunctions.net/getMovies'
      );
      
      const data = await response.json();
      
      if (data.success) {
        setMovies(data.content);
      } else {
        throw new Error(data.message);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching from Cloud Function:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (source === 'firestore') {
      fetchFromFirestore();
    } else {
      fetchFromCloudFunction();
    }
  }, [source]);

  const switchSource = (newSource) => {
    setSource(newSource);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <header className="header">
        <h1>🎬 Movie Database</h1>
        <p className="subtitle">
          Fetching from: <strong>{source === 'firestore' ? 'Firestore (Client SDK)' : 'Cloud Function (Backend API)'}</strong>
        </p>
        
        <div className="source-toggle">
          <button 
            className={source === 'firestore' ? 'active' : ''}
            onClick={() => switchSource('firestore')}
          >
            📦 Firestore Direct
          </button>
          <button 
            className={source === 'cloudFunction' ? 'active' : ''}
            onClick={() => switchSource('cloudFunction')}
          >
            ☁️ Cloud Function API
          </button>
        </div>
      </header>

      <div className="movie-count">
        Total Movies: <strong>{movies.length}</strong>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-poster">
              <img src={movie.poster} alt={movie.title} />
              <div className="rating-badge">{movie.rating}</div>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="year-genre">{movie.year} • {movie.genre}</p>
              <p className="director">Directed by {movie.director}</p>
              <p className="description">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
