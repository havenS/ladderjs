'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  'description': 'View login',
  'method': 'get',
  'url': '/login',
  'view': 'auth/login'
}, {
  'description': 'Process login form and redirect if successful',
  'method': 'post',
  'url': '/login',
  'controller': 'AuthController',
  'action': 'login'
}, {
  'description': 'View signup',
  'method': 'get',
  'url': '/create-account',
  'view': 'auth/signup'
}, {
  'description': 'Process signup and redirect',
  'method': 'post',
  'url': '/create-account',
  'controller': 'AuthController',
  'action': 'signup'
}, {
  'description': 'Process logout and redirect',
  'method': 'get',
  'url': '/logout',
  'controller': 'AuthController',
  'action': 'logout'
}];