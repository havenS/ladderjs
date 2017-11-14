import session from 'express-session'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'

export default app => {
  app.use(cookieParser())

  app.use(
    session({
      secret: app.ladderjs.config.sessionToken,
      resave: true,
      saveUninitialized: false,
      store: new (require('nedb-session-store')(session))({
        filename: 'sessions/sessions.db',
      }),
    })
  )

  app.use(flash())
}
