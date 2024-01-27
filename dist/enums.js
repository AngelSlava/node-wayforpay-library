"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestType = exports.regularMode = void 0;
var regularMode = exports.regularMode = /*#__PURE__*/function (regularMode) {
  regularMode["ONCE"] = "once";
  regularMode["DAILY"] = "daily";
  regularMode["WEEKLY"] = "weekly";
  regularMode["QUARTERLY"] = "quarterly";
  regularMode["MONTHLY"] = "monthly";
  regularMode["HALFYEARLY"] = "halfyearly";
  regularMode["YEARLY"] = "yearly";
  return regularMode;
}({});
var requestType = exports.requestType = /*#__PURE__*/function (requestType) {
  requestType["CREATE"] = "CREATE";
  requestType["STATUS"] = "STATUS";
  requestType["SUSPEND"] = "SUSPEND";
  requestType["RESUME"] = "RESUME";
  requestType["REMOVE"] = "REMOVE";
  requestType["CHANGE"] = "CHANGE";
  return requestType;
}({});