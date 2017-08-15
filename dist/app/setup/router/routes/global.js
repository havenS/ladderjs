"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    "description": "home",
    "method": "get",
    "url": "/",
    "controller": null,
    "action": null,
    "role": null,
    "view": "index"
}, {
    "description": "Documentations",
    "method": "get",
    "url": "/docs/:uid?",
    "controller": "ContentController",
    "action": "index",
    "role": null,
    "view": "documentation"
}];