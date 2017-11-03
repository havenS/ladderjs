import session from 'express-session'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'

export default app => {
  app.use(cookieParser())

  app.use(
    session({
      secret: app.ladderjs.config.sessionToken,
      resave: true,
      saveUninitialized: true,
      store: new (require('session-file-store')(session))(),
    })
  )

  app.use(flash())
}
