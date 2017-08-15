'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeScreenshot = exports.getPublicUrl = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _stream = require('stream');

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

var _webshot = require('webshot');

var _webshot2 = _interopRequireDefault(_webshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = (0, _storage2.default)({
  projectId: _config2.default.googleStorage.project,
  keyFilename: _config2.default.googleStorage.key
});
var bucket = storage.bucket(_config2.default.googleStorage.bucket);

var getPublicUrl = exports.getPublicUrl = function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + _config2.default.googleStorage.bucket + '/' + filename;
};

var makeScreenshot = exports.makeScreenshot = function makeScreenshot(url, name) {
  return new _promise2.default(function (resolve, reject) {
    var file = bucket.file(name);
    var renderStream = (0, _webshot2.default)(url);
    var buffer = new Buffer('');

    renderStream.on('data', function (data) {
      buffer = Buffer.concat([buffer, data]);
    });

    renderStream.on('end', function () {
      var gstream = file.createWriteStream({
        metadata: {
          contentType: 'image/png'
        }
      });

      gstream.on('error', function (err) {
        reject(err);
      });

      gstream.on('finish', function () {
        file.makePublic().then(function () {
          resolve(getPublicUrl(name));
        });
      });

      gstream.end(buffer);
    });
  });
};