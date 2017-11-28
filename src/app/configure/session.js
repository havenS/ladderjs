import session from 'express-session'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'

export default app => {
  app.use(cookieParser())

  app.use(
    session({
      resave: true,
      saveUninitialized: false,
      store: new (require('nedb-session-store')(session))({
        filename: 'sessions/sessions.db',
      }),
      ...app.ladderjs.config.session,
    })
  )

  app.use(flash())
}
