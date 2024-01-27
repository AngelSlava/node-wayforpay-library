"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPClientRegularPayments = exports.HTTPClientPurchase = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var HTTPClientRegularPayments = exports.HTTPClientRegularPayments = _axios["default"].create({
  baseURL: 'https://api.wayforpay.com'
});
var HTTPClientPurchase = exports.HTTPClientPurchase = _axios["default"].create({
  baseURL: 'https://secure.wayforpay.com'
});