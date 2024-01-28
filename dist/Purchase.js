"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Purchase = /*#__PURE__*/function () {
  function Purchase(credentials) {
    _classCallCheck(this, Purchase);
    this.credentials = credentials;
  }
  _createClass(Purchase, [{
    key: "generatePurchaseData",
    value: function generatePurchaseData(data) {
      var signaturePayload = {
        merchantAccount: this.credentials.merchantAccount,
        merchantDomainName: this.credentials.merchantDomainName,
        orderReference: data.orderReference,
        orderDate: Math.floor(Date.now() / 1000),
        amount: data.amount,
        currency: 'USD',
        productName: data.productName,
        productCount: 1,
        productPrice: data.amount
      };
      var merchantSignature = this.generateSignature(signaturePayload);
      return _objectSpread(_objectSpread({}, signaturePayload), {}, {
        language: data.language,
        clientEmail: data.clientEmail,
        returnUrl: this.credentials.returnUrl,
        serviceUrl: this.credentials.serviceUrl,
        merchantSignature: merchantSignature
      });
    }
  }, {
    key: "generateSignature",
    value: function generateSignature(payload) {
      var str = Object.values(payload).join(';');
      var hmac = _crypto["default"].createHmac('md5', this.credentials.merchantSecret);
      console.log(str);
      hmac.update(str);
      return hmac.digest('hex');
    }
  }, {
    key: "generateVerifyData",
    value: function generateVerifyData(data) {
      var merchantSignature = this.generateSignature({
        merchantAccount: this.credentials.merchantAccount,
        merchantDomainName: this.credentials.merchantDomainName,
        orderReference: data.orderReference,
        amount: data.amount,
        currency: data.currency
      });
      return {
        merchantAccount: this.credentials.merchantAccount,
        merchantDomainName: this.credentials.merchantDomainName,
        merchantAuthType: 'SimpleSignature',
        merchantSignature: merchantSignature,
        orderReference: data.orderReference,
        amount: data.amount,
        currency: data.currency,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone,
        returnUrl: this.credentials.returnUrl,
        serviceUrl: this.credentials.serviceUrl,
        language: data.language
      };
    }
  }]);
  return Purchase;
}();
var _default = exports["default"] = Purchase;