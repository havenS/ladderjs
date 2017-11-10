"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _defineProperty2=require("babel-runtime/helpers/defineProperty"),_defineProperty3=_interopRequireDefault(_defineProperty2),_passport=require("passport"),_passport2=_interopRequireDefault(_passport),_passportLocal=require("passport-local");exports.default=function(e){e.use(_passport2.default.initialize()),e.use(_passport2.default.session());var r=e.models,t=e.ladderjs,s=t.config,n=s.auth,a=n.model,u=n.id,o=n.username,i=n.password,l=r[a],p=u,d=o,f=i;_passport2.default.use(new _passportLocal.Strategy({usernameField:d,passwordField:f},function(e,r,t){l.findOne({where:(0,_defineProperty3.default)({},d,e)}).then(function(e){return null==e?t(null,!1,{message:"Incorrect credentials"}):e.authenticate(r)?t(null,e):t(null,!1,{message:"Incorrect credentials."})})})),_passport2.default.serializeUser(function(e,r){r(null,e[p])}),_passport2.default.deserializeUser(function(e,r){l.findOne({where:(0,_defineProperty3.default)({},p,e)}).then(function(e){r(null,e)})})};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _sequelize=require("sequelize"),_sequelize2=_interopRequireDefault(_sequelize);exports.default=function(e){var i=e.ladderjs,r=new _sequelize2.default(i.config.dbUrl,{logging:"true"===i.config.dbLogging&&e.logger.info,operatorsAliases:i.config.sequelizeOperatorsAliases});e.db=r,e.models={},e.registerModel=function(i){var r=this;i(this.db,function(){e.models=r.db.models})}};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _winston=require("winston"),_winston2=_interopRequireDefault(_winston);exports.default=function(e){var n=new _winston2.default.Logger({level:e.ladderjs.config.loggerLevel,transports:[new _winston2.default.transports.Console({handleExceptions:!0,json:!1,colorize:!0,timestamp:function(){var e=new Date;return e.toISOString()}}),new _winston2.default.transports.File({filename:process.cwd()+"/ladderjs.log",maxsize:5242880})]});e.logger=n};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _express=require("express");exports.default=function(e,s){e.use("/",[(0,_express.static)(""+process.cwd()+s.publicPath),(0,_express.static)(__dirname+"/../../..")]),e.use("/img",[(0,_express.static)(""+process.cwd()+s.publicPath+"/img"),(0,_express.static)(__dirname+"/../../../img")])};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _keys=require("babel-runtime/core-js/object/keys"),_keys2=_interopRequireDefault(_keys);exports.default=function(e,t){if(t.debugRoutes){var r=e._router.stack.filter(function(e){return e.route}).map(function(e){return""+(0,_keys2.default)(e.route.methods).map(function(e){return e.toUpperCase()+" - "})+e.route.path});e.logger.info(r)}};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(e){e.use(function(e,t){t.status(404).render("404")}),e.use(function(t,r,s){e.logger.error(t),s.status(500).render("500")})};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _assets=require("./assets"),_assets2=_interopRequireDefault(_assets),_ladderjs=require("./ladderjs"),_ladderjs2=_interopRequireDefault(_ladderjs),_parsers=require("./parsers"),_parsers2=_interopRequireDefault(_parsers),_errors=require("./errors"),_errors2=_interopRequireDefault(_errors),_debugRoutes=require("./debugRoutes"),_debugRoutes2=_interopRequireDefault(_debugRoutes),_viewVariables=require("./viewVariables"),_viewVariables2=_interopRequireDefault(_viewVariables);exports.default=function(e){var r=e.ladderjs.config;(0,_assets2.default)(e,r),e.use(_parsers2.default),e.use((0,_ladderjs2.default)(e)),e.use(_viewVariables2.default),(0,_errors2.default)(e),(0,_debugRoutes2.default)(e,r)};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(e){return function(t,r,d){t.ladderjs=e.ladderjs,d()}};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _bodyParser=require("body-parser"),_bodyParser2=_interopRequireDefault(_bodyParser);exports.default=[_bodyParser2.default.json({strict:!1}),_bodyParser2.default.urlencoded({extended:!0})];
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=require("babel-runtime/helpers/extends"),_extends3=_interopRequireDefault(_extends2);exports.default=function(e,r,s){r.locals=(0,_extends3.default)({},r.locals,{messages:{error:e.flash("error"),success:e.flash("success")},user:e.user,currentUrl:e.originalUrl,getUrl:e.ladderjs.getUrl}),s()};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _expressSession=require("express-session"),_expressSession2=_interopRequireDefault(_expressSession),_connectFlash=require("connect-flash"),_connectFlash2=_interopRequireDefault(_connectFlash),_cookieParser=require("cookie-parser"),_cookieParser2=_interopRequireDefault(_cookieParser);exports.default=function(e){e.use((0,_cookieParser2.default)()),e.use((0,_expressSession2.default)({secret:e.ladderjs.config.sessionToken,resave:!0,saveUninitialized:!0,store:new(require("session-file-store")(_expressSession2.default))})),e.use((0,_connectFlash2.default)())};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _express=require("express"),_expressLess=require("express-less"),_expressLess2=_interopRequireDefault(_expressLess),_nodeSassMiddleware=require("node-sass-middleware"),_nodeSassMiddleware2=_interopRequireDefault(_nodeSassMiddleware);exports.default=function(e){var s=e.ladderjs.config;"sass"===s.stylesProcessor?(e.use((0,_nodeSassMiddleware2.default)({src:""+process.cwd()+s.stylesPath,dest:""+process.cwd()+s.publicPath+"/styles",debug:!1,outputStyle:"production"===process.env.NODE_ENV?"compressed":"extended",prefix:"/styles"})),e.use("/styles",(0,_express.static)(""+process.cwd()+s.publicPath+"/styles")),e.use((0,_nodeSassMiddleware2.default)({src:__dirname+"/../../../styles/sass",dest:__dirname+"/styles/css",debug:!1,outputStyle:"production"===process.env.NODE_ENV?"compressed":"extended",prefix:"/styles"})),e.use("/styles",(0,_express.static)(__dirname+"/public/styles"))):e.use("/styles",[(0,_expressLess2.default)(__dirname+"/../../../styles/less",{cache:"production"===process.env.NODE_ENV,compress:"production"===process.env.NODE_ENV}),(0,_expressLess2.default)(""+process.cwd()+s.stylesPath,{cache:"production"===process.env.NODE_ENV,compress:"production"===process.env.NODE_ENV})])};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(e,t){var r=t.apiPrefix,o=t.controllersPath,l=t.modelsPath;e.ladderjs={apiPrefix:r,getUrl:function(e){return r?""+r+e:e},config:t},e.controllersPath=o,e.modelsPath=l};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=require("babel-runtime/helpers/extends"),_extends3=_interopRequireDefault(_extends2),_moment=require("moment"),_moment2=_interopRequireDefault(_moment),_randomId=require("random-id"),_randomId2=_interopRequireDefault(_randomId);exports.default=function(e){e.set("view engine","pug"),e.set("views",[""+process.cwd()+e.ladderjs.config.viewsPath,__dirname+"/../../../views"]),e.locals=(0,_extends3.default)({},e.locals,{moment:_moment2.default,compileDebug:"production"!==process.env.NODE_ENV,cache:"production"===process.env.NODE_ENV,loadingElement:"",errorElement:"",ainclude:function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.locals.loadingElement,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e.locals.errorElement,i=!1;return t||(t=(0,_randomId2.default)(10),i=!0),(i?'<div id="'+t+'"></div>':"")+'\n      <script type="text/javascript">\n      $(function(){\n        $(\'#'+t+"').html('"+r+"')\n        $.post('/lai', {route: '"+n+"'})\n        .done(function(data){\n          $('#"+t+"').html(data)\n        })\n        .error(function(){\n          $('#"+t+"').html('"+o+"')\n        })\n      })\n      </script>\n      "}})};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.signup=exports.logout=exports.login=void 0;var _passport=require("passport"),_passport2=_interopRequireDefault(_passport),_models=require("../models"),login=exports.login=function(e,r,o){var t=e.body.returnTo,s=e.session.returnTo,a=s||t||"/";delete e.session.returnTo,_passport2.default.authenticate("local",function(t,s){return t?(e.flash("error","An error occured, please try again"),void r.redirect(e.ladderjs.getUrl("/login"))):s?void e.logIn(s,function(t){return t?(e.flash("error","Invalid email or password"),void o(t)):void r.redirect(e.ladderjs.getUrl(a))}):(e.flash("error","Invalid email or password"),void r.redirect(e.ladderjs.getUrl("/login")))})(e,r,o)},logout=exports.logout=function(e,r){e.logout();var o=e.params.returnTo||"/login";r.redirect(e.ladderjs.getUrl(o))},signup=exports.signup=function(e,r){var o=e.body.email,t=e.body.password,s=e.body.password_confirmation;if(!o||!t||!s)return e.flash("error","All fields are required"),r.redirect(e.ladderjs.getUrl("/create-account"));var a={email:o,password:t,password_confirmation:s};_models.User.create(a).then(function(){r.redirect(e.ladderjs.getUrl("/login")),_passport2.default.authenticate("local",{successRedirect:e.ladderjs.getUrl("/manager")})({body:{email:o,password:t}})}).catch(function(o){var t=void 0;switch(o.name){case"SequelizeUniqueConstraintError":t="An account using this email address already exists";break;default:t=o.message}e.flash("error",t),r.redirect(e.ladderjs.getUrl("/create-account"))})};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.deleteEntity=exports.updateEntity=exports.viewEntity=exports.createEntity=exports.newEntity=exports.indexEntity=void 0;var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_asyncToGenerator2=require("babel-runtime/helpers/asyncToGenerator"),_asyncToGenerator3=_interopRequireDefault(_asyncToGenerator2),indexEntity=exports.indexEntity=function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(t,n,r,i){var o;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i.info("CRUD - index"),e.next=3,r.findAll();case 3:return o=e.sent,e.abrupt("return",{entities:o});case 5:case"end":return e.stop()}},e,void 0)}));return function(t,n,r,i){return e.apply(this,arguments)}}(),newEntity=exports.newEntity=function(){return{}},createEntity=exports.createEntity=function(e,t,n,r){r.info("CRUD - create")},viewEntity=exports.viewEntity=function(e,t,n,r){r.info("CRUD - view")},updateEntity=exports.updateEntity=function(e,t,n,r){r.info("CRUD - update")},deleteEntity=exports.deleteEntity=function(e,t,n,r){r.info("CRUD - delete")};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var render=exports.render=function(e,r){var t=e.body.route;return r.redirect(t)};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _User=require("./User.js"),_User2=_interopRequireDefault(_User);exports.default=function(e){e.registerModel(function(e,r){(0,_User2.default)(e),r()})};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise);exports.default=function(e){var t=e.define("users",attributes,options);return t.beforeCreate(function(e,t,r){if(e.email=e.email.toLowerCase(),e.password)return hasSecurePassword(e,t,r)}),t.beforeUpdate(function(e,t,r){if(e.email=e.email.toLowerCase(),e.password)return hasSecurePassword(e,t,r)}),t.prototype.authenticate=function(e){return!!_bcrypt2.default.compareSync(e,this.password_digest)&&this},t};var _sequelize=require("sequelize"),_sequelize2=_interopRequireDefault(_sequelize),_bcrypt=require("bcrypt"),_bcrypt2=_interopRequireDefault(_bcrypt),attributes={email:{type:_sequelize2.default.STRING,allowNull:!1,unique:!0,validate:{isEmail:!0}},role:{type:_sequelize2.default.ENUM(["ADMIN","USER"])},firstName:{type:_sequelize2.default.STRING},lastName:{type:_sequelize2.default.STRING},password:{type:_sequelize2.default.VIRTUAL,allowNull:!1,validate:{notEmpty:!0}},password_confirmation:{type:_sequelize2.default.VIRTUAL},password_digest:{type:_sequelize2.default.STRING,validate:{notEmpty:!0}}},options={freezeTableName:!0,indexes:[{unique:!0,fields:["email"]}]},hasSecurePassword=function(e){return new _promise2.default(function(t,r){if(e.password!=e.password_confirmation)throw new Error("Le mot de passe et sa confirmation doivent être identiques");_bcrypt2.default.hash(e.password,10,function(i,s){i&&r(i),e.password_digest=s,t()})})};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _isAuthenticated=require("./isAuthenticated");Object.defineProperty(exports,"isAuthenticated",{enumerable:!0,get:function(){return _interopRequireDefault(_isAuthenticated).default}});
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(e,t,r){return e.isAuthenticated()?r():(e.session.returnTo=e.path,e.flash("error","You have to be logged in to access the page."),void t.redirect(e.ladderjs.getUrl("/login")))};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.processCrudRoute=void 0;var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_extends2=require("babel-runtime/helpers/extends"),_extends3=_interopRequireDefault(_extends2),_asyncToGenerator2=require("babel-runtime/helpers/asyncToGenerator"),_asyncToGenerator3=_interopRequireDefault(_asyncToGenerator2),_keys=require("babel-runtime/core-js/object/keys"),_keys2=_interopRequireDefault(_keys),_shared=require("./shared"),getCrudRoutes=function(e){return{index:{url:e,method:"get"},new:{url:e+"/new",method:"get"},create:{url:e+"/create",method:"post"},view:{url:e+"/:id",method:"get"},edit:{url:e+"/:id",method:"get"},update:{url:e+"/:id",method:"post"},delete:{url:e+"/:id",method:"delete"}}},getCrudFields=function(e){var r=void 0,t=e.attributes,u=(0,_keys2.default)(t).map(function(e){return e.primaryKey&&(r=t[e]),{name:e,type:t[e].type.key,auto:!!t[e]._autoGenerated,primary:!!t[e].primaryKey,allowNull:t[e].allowNull}}).filter(function(e){return!e.primary});return{primaryField:r,fields:u}},processCrud=function(e,r,t,u){var n=r.model,a=r.url,o=r.view;return function(){var r=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function r(d,l){var i,s,c;return _regenerator2.default.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return i=require("../controllers/CrudController")[e+"Entity"],s=(0,_shared.getView)(o,a,e),r.next=4,i(d,l,u);case 4:if(c=r.sent,!c){r.next=10;break}return c=(0,_extends3.default)({modelName:n,newUrl:t.new.url,createUrl:t.create.url},getCrudFields(u),c),r.abrupt("return",l.render(s,c));case 10:return r.abrupt("return",l.redirect(d.ladderjs.getUrl(t.index.url,d.ladderjs)));case 11:case"end":return r.stop()}},r,void 0)}));return function(e,t){return r.apply(this,arguments)}}()},processCrudRoute=exports.processCrudRoute=function(e,r){var t=getCrudRoutes(r.url);(0,_keys2.default)(t).forEach(function(u){var n=t[u],a=n.url,o=n.method,d=require(e.modelsPath+"/"+r.model),l=d.default?d.default(e.db):d(e.db);e[o](e.ladderjs.getUrl(a),function(t,u,n){return(0,_shared.authenticateUrl)(r.auth,e.policies)(t,u,n,r)},processCrud(u,r,t,l))})};
"use strict";function _interopRequireDefault(r){return r&&r.__esModule?r:{default:r}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.processRoute=void 0;var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_asyncToGenerator2=require("babel-runtime/helpers/asyncToGenerator"),_asyncToGenerator3=_interopRequireDefault(_asyncToGenerator2),_shared=require("./shared"),processUrl=function(r,e){var t=r.action,n=r.controller,a=r.url,o=r.view;return function(){var r=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function r(u,s,c){var i,p,l;return _regenerator2.default.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!u.error){r.next=2;break}return r.abrupt("return",(0,_shared.respond)(s,null,u.error));case 2:if(i=(0,_shared.getView)(o,a),n){r.next=5;break}return r.abrupt("return",s.render(i));case 5:p=void 0,r.prev=6,p=require(e.controllersPath+"/"+n),r.next=20;break;case 10:r.prev=10,r.t0=r.catch(6),r.prev=12,p=require("../controllers/"+n),r.next=20;break;case 16:return r.prev=16,r.t1=r.catch(12),e.logger.error(r.t0),r.abrupt("return",s.status(500).render("500",{error:String(r.t0)}));case 20:return r.prev=20,r.next=23,p[t](u,s,c);case 23:if(l=r.sent,!l){r.next=26;break}return r.abrupt("return",o?s.render(i,l):(0,_shared.respond)(s,l));case 26:return r.abrupt("return",l);case 29:return r.prev=29,r.t2=r.catch(20),e.logger.error(r.t2),r.abrupt("return",s.status(500).render("500",{error:String(r.t2)}));case 33:case"end":return r.stop()}},r,void 0,[[6,10],[12,16],[20,29]])}));return function(e,t,n){return r.apply(this,arguments)}}()},processRoute=exports.processRoute=function(r,e){r[e.method](r.ladderjs.getUrl(e.url,r),function(t,n,a){return(0,_shared.authenticateUrl)(e.auth,r.policies)(t,n,a,e)},processUrl(e,r))};
"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getView=exports.respond=exports.authenticateUrl=exports.getRoutes=void 0;var _stringify=require("babel-runtime/core-js/json/stringify"),_stringify2=_interopRequireDefault(_stringify),_extends2=require("babel-runtime/helpers/extends"),_extends3=_interopRequireDefault(_extends2),_toConsumableArray2=require("babel-runtime/helpers/toConsumableArray"),_toConsumableArray3=_interopRequireDefault(_toConsumableArray2),_policies=require("../../policies"),defaultPolicies=_interopRequireWildcard(_policies),_routes=require("../routes"),_routes2=_interopRequireDefault(_routes),getRoutes=exports.getRoutes=function(e){return[].concat((0,_toConsumableArray3.default)(_routes2.default.filter(function(r){return!e.ladderjs.config.disabledRoutes.includes(r.url)})),(0,_toConsumableArray3.default)(e.ladderjs.config.routes||[]))},authenticateUrl=exports.authenticateUrl=function(e,r){if(!e)return function(e,r,t){return t()};var t=(0,_extends3.default)({},defaultPolicies,r);return t[e]},respond=exports.respond=function(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e.setHeader("Content-Type","application/json"),e.status(t?400:200),e.send((0,_stringify2.default)({error:t,data:r||{}}))},getView=exports.getView=function(e,r,t){return e?t?e+"/"+t:e:t?"crud/"+t:r.replace("/","")};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _shared=require("./config/shared"),_crud=require("./config/crud"),_regular=require("./config/regular");exports.default=function(r){return(0,_shared.getRoutes)(r).forEach(function(e){return e.crud?(0,_crud.processCrudRoute)(r,e):(0,_regular.processRoute)(r,e)}),r};
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _toConsumableArray2=require("babel-runtime/helpers/toConsumableArray"),_toConsumableArray3=_interopRequireDefault(_toConsumableArray2),_auth=require("./auth.json"),_auth2=_interopRequireDefault(_auth),_global=require("./global.json"),_global2=_interopRequireDefault(_global),_lai=require("./lai.json"),_lai2=_interopRequireDefault(_lai);exports.default=[].concat((0,_toConsumableArray3.default)(_auth2.default),(0,_toConsumableArray3.default)(_global2.default),(0,_toConsumableArray3.default)(_lai2.default));
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.app=void 0;var _extends2=require("babel-runtime/helpers/extends"),_extends3=_interopRequireDefault(_extends2),_dotenv=require("dotenv"),_dotenv2=_interopRequireDefault(_dotenv),_logger=require("./app/configure/logger"),_logger2=_interopRequireDefault(_logger),_database=require("./app/configure/database"),_database2=_interopRequireDefault(_database),_models=require("./app/models"),_models2=_interopRequireDefault(_models),_variables=require("./app/configure/variables"),_variables2=_interopRequireDefault(_variables),_views=require("./app/configure/views"),_views2=_interopRequireDefault(_views),_styles=require("./app/configure/styles"),_styles2=_interopRequireDefault(_styles),_session=require("./app/configure/session"),_session2=_interopRequireDefault(_session),_request=require("./app/configure/request"),_request2=_interopRequireDefault(_request),_auth=require("./app/configure/auth"),_auth2=_interopRequireDefault(_auth),_router=require("./app/router"),_router2=_interopRequireDefault(_router),express=require("express");_dotenv2.default.config({path:process.cwd()+"/.env"});var defaultOptions={apiPrefix:process.env.API_PREFIX||"",routes:[],disabledRoutes:[],dbUrl:process.env.DATABASE_URL||"",dbLogging:process.env.DATABASE_LOGGING||!1,sequelizeOperatorsAliases:!1,loggerLevel:"info",auth:{model:"users",id:"id",username:"email",password:"password"},debugRoutes:!1,port:process.env.PORT||3e3,controllersPath:"/controllers",modelsPath:"/models",publicPath:"/public",viewsPath:"/views",stylesPath:"/public/styles",stylesProcessor:"less",sessionToken:process.env.SESSION_TOKEN||"4564f6s4fdsfdfd"},ladder={},ladderjs=function(e){ladder=express();var r=(0,_extends3.default)({},defaultOptions,e);return(0,_variables2.default)(ladder,r),(0,_logger2.default)(ladder),(0,_session2.default)(ladder),""!==r.dbUrl&&((0,_database2.default)(ladder),(0,_models2.default)(ladder),(0,_auth2.default)(ladder)),(0,_styles2.default)(ladder),(0,_router2.default)(ladder),(0,_request2.default)(ladder),(0,_views2.default)(ladder),ladder.start=function(){var e=r.port;this.listen(e),this.logger.info("LadderJS server started on port "+e)},ladder};exports.default=ladderjs;var app=exports.app=ladder;module.exports=ladderjs,module.exports.app=ladder;

