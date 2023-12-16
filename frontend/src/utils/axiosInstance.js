// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-api-base-url.com',
  // You can also add other default configurations here, such as headers, timeout, etc.
});

export default instance;
