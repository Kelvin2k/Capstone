import axios from "axios";

// export const https = axios.create({
// baseURL defines the common base URL prefix used for all API requests.
// This avoids repeating the full URL in every request and makes it easy to switch environments (e.g., dev vs. prod).
// Example: If baseURL is 'https://api.example.com', a request to '/users' will hit 'https://api.example.com/users'.
// baseURL: "https://api.example.com", // Replace with your actual API base URL

// timeout sets the maximum time (in milliseconds) to wait for a response before aborting the request.
// This prevents hanging requests and improves user experience.
// timeout: 10000, // 10 seconds

// headers define default headers sent with every request, such as authentication or content type.
// headers: {
//   accept: "application/json",
//   Authorization:
//     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2YwYzExMThhNWI4MjIxZDc1MTRkZGMwMzc1ZTVkMiIsIm5iZiI6MTc2MjA5MzEyOC4wNzEsInN1YiI6IjY5MDc2ODQ4NGUwMzU5MmY2MDA4MTVjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2rLzGZw4WW0Vm5M4aHXnerindIalyONSyDnUFBM4i6U",
// Add authorization if needed: 'Authorization': `Bearer ${token}`
//   },
// });

// Example function to fetch characters data
export const https = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 15000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_MOVIEDB_API_READ_ACESS_TOKEN}`,
  },
});
