import session from 'express-session'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'

export default app => {
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
