import axios from 'axios';

const HTTPClient = axios.create({
  baseURL: 'https://api.wayforpay.com/',
});

export default HTTPClient;
