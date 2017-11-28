import session from 'express-session'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'

export default app => {
  const sessionConfig = app.ladderjs.config.session
  app.use(cookieParser())

  app.use(
    session({
      resave: true,
      saveUninitialized: false,
      ...sessionConfig,
      store: new (require('nedb-session-store')(session))({
        filename: 'sessions/sessions.db',
        defaultExpiry: sessionConfig.defaultExpiry,
      }),
    })
  )

  app.use(flash())
}
