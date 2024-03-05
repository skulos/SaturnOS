import axios from 'axios';

// Create Axios instance
const http = axios.create({
  baseURL: 'http://localhost:8000', // Set your API base URL
  timeout: 20000, // Set request timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
});

export default http;