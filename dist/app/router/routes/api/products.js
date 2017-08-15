"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    "description": "Create or update if single product exists",
    "method": "get",
    "prefix": "apiv1",
    "url": "/product",
    "controller": "api/ProductController",
    "action": "createOrUpdate",
    "auth": "isWebsite"
}, {
    "description": "Create or update if multiple products exists",
    "method": "get",
    "prefix": "apiv1",
    "url": "/products",
    "controller": "api/ProductController",
    "action": "bulkCreateOrUpdate",
    "auth": "isWebsite"
}];