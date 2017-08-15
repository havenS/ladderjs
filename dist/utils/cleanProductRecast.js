"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.recast.ai",
  "port": null,
  "path": "/v2/users/poulks/bots/greeter/gazettes/product_search/synonyms/",
  "headers": {
    "authorization": "Token b3ba8e93e22c0673b5960c3997074ecc",
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "b52192c7-7b90-9b5e-95f8-602e96ff5597"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var response = JSON.parse(body.toString());
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(response.results), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        result = _step.value;

        console.log(result.slug);
        var http = require("https");

        var options = {
          "method": "DELETE",
          "hostname": "api.recast.ai",
          "port": null,
          "path": "/v2/users/poulks/bots/greeter/gazettes/product_search/synonyms/" + result.slug,
          "headers": {
            "authorization": "Token b3ba8e93e22c0673b5960c3997074ecc",
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "fb1b4f94-fe32-dc8b-d098-bd74d4137d26"
          }
        };

        var req = http.request(options, function (res) {
          var chunks = [];

          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
          });
        });

        req.write((0, _stringify2.default)({ value: 'bidule', language: { isocode: 'fr' } }));
        req.end();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
});

req.write((0, _stringify2.default)({ value: 'bidule', language: { isocode: 'fr' } }));
req.end();