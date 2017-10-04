const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')

module.exports = app => {
  app.use(cookieParser())

  app.use(
    session({
      secret: process.env.SESSION_TOKEN || '4564f6s4fdsfdfd',
      resave: true,
      saveUninitialized: true,
      store: new (require('session-file-store')(session))(),
    })
  )

  app.use(flash())
}
