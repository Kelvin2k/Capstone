import axios from "axios";

export const https = axios.create({
  // baseURL defines the common base URL prefix used for all API requests.
  // This avoids repeating the full URL in every request and makes it easy to switch environments (e.g., dev vs. prod).
  // Example: If baseURL is 'https://api.example.com', a request to '/users' will hit 'https://api.example.com/users'.
  baseURL: "https://api.example.com", // Replace with your actual API base URL

  // timeout sets the maximum time (in milliseconds) to wait for a response before aborting the request.
  // This prevents hanging requests and improves user experience.
  timeout: 10000, // 10 seconds

  // headers define default headers sent with every request, such as authentication or content type.
  headers: {
    TokenCybersoft: "",
    // Add authorization if needed: 'Authorization': `Bearer ${token}`
  },
});

// Example function to fetch characters data
