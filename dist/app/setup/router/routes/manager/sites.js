"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    "description": "Sites list",
    "method": "get",
    "prefix": "manager",
    "url": "/mes-sites",
    "controller": "SiteController",
    "action": "index",
    "view": "sites",
    "auth": "isAuthenticated"
}, {
    "description": "Create a site",
    "method": "post",
    "prefix": "manager",
    "url": "/mes-sites",
    "controller": "SiteController",
    "action": "create",
    "auth": "isAuthenticated"
}, {
    "description": "View a site",
    "method": "get",
    "prefix": "manager",
    "url": "/mes-sites/:id",
    "controller": "SiteController",
    "action": "view",
    "view": "sites/view",
    "auth": "isAuthenticated"
}, {
    "description": "Update a site",
    "method": "post",
    "prefix": "manager",
    "url": "/mes-sites/:id",
    "controller": "SiteController",
    "action": "update",
    "auth": "isAuthenticated"
}];