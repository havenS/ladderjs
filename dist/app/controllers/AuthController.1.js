'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.signup = exports.logout = exports.login = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = _passport2.default.authenticate('local', {
	successRedirect: '/manager',
	failureRedirect: '/login',
	failureFlash: true
});

var logout = exports.logout = function logout(req, res) {
	req.logout();
	res.redirect('/');
};

var signup = exports.signup = function signup(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var password_confirmation = req.body.password_confirmation;

	if (!email || !password || !password_confirmation) {
		req.flash('error', "All fields are required");
		return res.redirect('/create-account');
	}

	var salt = _bcrypt2.default.genSaltSync(10);
	var hashedPassword = _bcrypt2.default.hashSync(password, salt);

	var newUser = {
		email: email,
		password: password,
		password_confirmation: password_confirmation
	};

	_models.User.create(newUser).then(function () {
		res.redirect('/login');
		_passport2.default.authenticate('local', {
			successRedirect: '/manager'
		})({
			body: { email: email, password: password }
		});
	}).catch(function (error) {
		var message = void 0;
		switch (error.name) {
			case 'SequelizeUniqueConstraintError':
				message = 'An account using this email address already exists';
				break;
			default:
				message = error.message;
				break;
		}
		req.flash('error', message);
		res.redirect('/create-account');
	});
};