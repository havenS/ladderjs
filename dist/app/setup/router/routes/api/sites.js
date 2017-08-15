"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    "description": "Get sites status",
    "method": "get",
    "prefix": "apiv1",
    "url": "/sites/status",
    "controller": "api/SiteController",
    "action": "getStatus",
    "auth": "isWebsite"
}];