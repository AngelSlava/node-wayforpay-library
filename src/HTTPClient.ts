import axios from 'axios';

export const HTTPClientRegularPayments = axios.create({
  baseURL: 'https://api.wayforpay.com',
});

export const HTTPClientPurchase = axios.create({
  baseURL: 'https://secure.wayforpay.com',
});
