"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    "description": "Create or update if single attribute exists",
    "method": "get",
    "prefix": "apiv1",
    "url": "/attribute",
    "controller": "api/AttributeController",
    "action": "createOrUpdate",
    "auth": "isWebsite"
}, {
    "description": "Create or update if multiple attributes exists",
    "method": "get",
    "prefix": "apiv1",
    "url": "/attributes",
    "controller": "api/AttributeController",
    "action": "bulkCreateOrUpdate",
    "auth": "isWebsite"
}];