"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _defineProperty2=require("babel-runtime/helpers/defineProperty");var _defineProperty3=_interopRequireDefault(_defineProperty2);var _passport=require("passport");var _passport2=_interopRequireDefault(_passport);var _passportLocal=require("passport-local");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}exports.default=function(app){var models=app.models,ladderjs=app.ladderjs;var config=ladderjs.config;var _config$auth=config.auth,model=_config$auth.model,id=_config$auth.id,username=_config$auth.username,password=_config$auth.password;var idField=id;var usernameField=username;var passwordField=password;app.AuthModel=typeof model==="string"?models[model]:model;app.use(_passport2.default.initialize());app.use(_passport2.default.session());_passport2.default.use(new _passportLocal.Strategy({usernameField:usernameField,passwordField:passwordField},function(username,password,done){app.AuthModel.findOne({where:(0,_defineProperty3.default)({},usernameField,username)}).then(function(user){if(user==null){return done(null,false,{message:"Incorrect credentials"})}if(user.authenticate(password)){return done(null,user)}return done(null,false,{message:"Incorrect credentials."})})}));_passport2.default.serializeUser(function(user,done){done(null,user[idField])});_passport2.default.deserializeUser(function(id,done){app.AuthModel.findOne({where:(0,_defineProperty3.default)({},idField,id)}).then(function(user){done(null,user)})});app.login=function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return function(req,res,next){return _passport2.default.authenticate.apply(_passport2.default,["local"].concat(args))(req,res,next)}}};