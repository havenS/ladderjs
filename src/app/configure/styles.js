const express = require('express')
const expressLess = require('express-less')
const sassMiddleware = require('node-sass-middleware')

module.exports = (app, config) => {
  if (config.stylesProcessor === 'sass') {
    app.use(sassMiddleware({
      src: `${process.cwd()}${config.stylesPath}`,
      dest: `${process.cwd()}${config.publicPath}/styles`,
      debug: false,
      outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'extended',
      prefix: '/styles',
    }));
    app.use('/styles', express.static(`${process.cwd()}${config.publicPath}/styles`))
    
    app.use(sassMiddleware({
      src: `${__dirname}/../../../styles/sass`,
      dest: `${__dirname}/styles/css`,
      debug: false,
      outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'extended',
      prefix: '/styles',
    }));
    app.use('/styles', express.static(`${__dirname}/public/styles`))
  } else {
    app.use('/styles', [
      expressLess(__dirname + '/../../../styles/less', {
        cache: process.env.NODE_ENV === 'production',
        compress: process.env.NODE_ENV === 'production',
      }),
      
      expressLess(`${process.cwd()}${config.stylesPath}`, {
        cache: process.env.NODE_ENV === 'production',
        compress: process.env.NODE_ENV === 'production',
      }), 
    ]);
  }
}
