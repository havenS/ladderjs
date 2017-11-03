var path = require('path')
var ncp = require('ncp').ncp
var fs = require('fs')

var boilerplateFilePath = path.join(__dirname, 'boilerplate_files')
var appSrcPath = path.join(__dirname, 'src', 'app')

var publicPath = path.join(boilerplateFilePath, 'public')
var stylesSrc = path.join(__dirname, 'styles')
var stylesDest = path.join(publicPath, 'styles')
var imgSrc = path.join(__dirname, 'img')
var imgDest = path.join(publicPath, 'img')

var srcPath = path.join(boilerplateFilePath, 'src')
var modelsSrc = path.join(appSrcPath, 'models')
var modelsdest = path.join(srcPath, 'models')
var controllersSrc = path.join(appSrcPath, 'controllers')
var controllersDest = path.join(srcPath, 'controllers')
var routesSrc = path.join(appSrcPath, 'router', 'routes')
var routesDest = path.join(srcPath, 'routes')

var viewsSrc = path.join(__dirname, 'views')
var viewsDest = path.join(boilerplateFilePath, 'views')

// copy styles
var copyStyles = function() {
  return new Promise(function(resolve) {
    ncp(stylesSrc, stylesDest, resolve)
  })
}
// copy img
var copyImg = function() {
  return new Promise(function(resolve) {
    ncp(imgSrc, imgDest, resolve)
  })
}
// copy models
var copyModels = function() {
  return new Promise(function(resolve) {
    ncp(modelsSrc, modelsdest, resolve)
  })
}
// copy controllers
var copyControllers = function() {
  return new Promise(function(resolve) {
    ncp(controllersSrc, controllersDest, function() {
      // delete LAI controller
      var laiPath = path.join(controllersDest, 'LAIController.js')
      fs.unlinkSync(laiPath)
      resolve()
    })
  })
}
// copy routes
var copyRoutes = function() {
  return new Promise(function(resolve) {
    var authSrc = path.join(routesSrc, 'auth.json')
    var authDest = path.join(routesDest, 'auth.json')
    var data = fs.readFileSync(authSrc, 'utf-8')
    fs.writeFileSync(authDest, data)
    resolve()
  })
}
// copy views
var copyView = function() {
  return new Promise(function(resolve) {
    ncp(viewsSrc, viewsDest, resolve)
  })
}

process.stdout.write('Copying boilerplate files ... \n')
Promise.all([
  copyStyles(),
  copyImg(),
  copyModels(),
  copyControllers(),
  copyRoutes(),
  copyView(),
])
  .then(function() {
    process.stdout.write('Copying boilerplate files done. \n')
    process.exit()
  })
  .catch(function(err) {
    process.stdout.write('ERROR !!! \n')
    process.stdout.write(err)
  })
