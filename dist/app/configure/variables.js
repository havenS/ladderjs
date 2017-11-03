"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, config) {
  var apiPrefix = config.apiPrefix,
      controllersPath = config.controllersPath,
      modelsPath = config.modelsPath;


  app.ladderjs = {
    apiPrefix: apiPrefix,
    getUrl: function getUrl(url) {
      return apiPrefix ? "" + apiPrefix + url : url;
    },
    config: config
  };
  app.controllersPath = "" + process.cwd() + controllersPath;
  app.modelsPath = "" + process.cwd() + modelsPath;
};