"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    "description": "Create or update if single category exists",
    "method": "get",
    "prefix": "apiv1",
    "url": "/category",
    "controller": "api/CategoryController",
    "action": "createOrUpdate",
    "auth": "isWebsite"
}, {
    "description": "Create or update if multiple categories exists",
    "method": "get",
    "prefix": "apiv1",
    "url": "/categories",
    "controller": "api/CategoryController",
    "action": "bulkCreateOrUpdate",
    "auth": "isWebsite"
}];