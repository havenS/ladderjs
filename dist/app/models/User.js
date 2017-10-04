'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (sequelize) {
  var User = sequelize.define('users', attributes, options);

  User.beforeCreate(function (user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password) {
      return hasSecurePassword(user, options, callback);
    }
  });

  User.beforeUpdate(function (user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password) {
      return hasSecurePassword(user, options, callback);
    }
  });

  User.prototype.authenticate = function (value) {
    if (_bcrypt2.default.compareSync(value, this.password_digest)) {
      return this;
    } else {
      return false;
    }
  };

  return User;
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attributes = {
  email: {
    type: _sequelize2.default.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  role: {
    type: _sequelize2.default.ENUM(['ADMIN', 'USER'])
  },
  firstName: {
    type: _sequelize2.default.STRING
  },
  lastName: {
    type: _sequelize2.default.STRING
  },
  password: {
    type: _sequelize2.default.VIRTUAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password_confirmation: {
    type: _sequelize2.default.VIRTUAL
  },
  password_digest: {
    type: _sequelize2.default.STRING,
    validate: {
      notEmpty: true
    }
  }
};

var options = {
  freezeTableName: true,
  indexes: [{ unique: true, fields: ['email'] }]
};

var hasSecurePassword = function hasSecurePassword(user) {
  return new _promise2.default(function (resolve, reject) {
    if (user.password != user.password_confirmation) {
      throw new Error('Le mot de passe et sa confirmation doivent être identiques');
    }
    _bcrypt2.default.hash(user.password, 10, function (err, hash) {
      if (err) {
        reject(err);
      }
      user.password_digest = hash;
      resolve();
    });
  });
};