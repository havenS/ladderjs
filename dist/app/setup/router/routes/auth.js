"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    "description": "View login",
    "method": "get",
    "url": "/connexion",
    "view": "auth/login"
}, {
    "description": "Process login form and redirect if successful",
    "method": "post",
    "url": "/connexion",
    "controller": "AuthController",
    "action": "login"
}, {
    "description": "View signup",
    "method": "get",
    "url": "/nouveau-compte",
    "view": "auth/signup"
}, {
    "description": "Process signup and redirect",
    "method": "post",
    "url": "/nouveau-compte",
    "controller": "AuthController",
    "action": "signup"
}, {
    "description": "Process logout and redirect",
    "method": "get",
    "url": "/deconnexion",
    "controller": "AuthController",
    "action": "logout"
}];