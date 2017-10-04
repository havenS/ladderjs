'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  'description': 'home',
  'method': 'get',
  'url': '/',
  'view': 'index'
}, {
  'description': 'Dashboard',
  'method': 'get',
  'url': '/manager',
  'auth': 'isAuthenticated',
  'view': 'manager'
}];