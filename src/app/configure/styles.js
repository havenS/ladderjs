import {static as exstatic} from 'express'
import expressLess from 'express-less'
import sassMiddleware from 'node-sass-middleware'

export default app => {
  const {config} = app.ladderjs
  if (config.stylesProcessor === 'sass') {
    app.use(
      sassMiddleware({
        src: `${process.cwd()}${config.stylesPath}`,
        dest: `${process.cwd()}${config.publicPath}/styles`,
        debug: false,
        outputStyle:
          process.env.NODE_ENV === 'production' ? 'compressed' : 'extended',
        prefix: '/styles',
      })
    )
    app.use('/styles', exstatic(`${process.cwd()}${config.publicPath}/styles`))

    app.use(
      sassMiddleware({
        src: `${__dirname}/../../../styles/sass`,
        dest: `${__dirname}/styles/css`,
        debug: false,
        outputStyle:
          process.env.NODE_ENV === 'production' ? 'compressed' : 'extended',
        prefix: '/styles',
      })
    )
    app.use('/styles', exstatic(`${__dirname}/public/styles`))
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
    ])
  }
}
