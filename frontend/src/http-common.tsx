import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});
