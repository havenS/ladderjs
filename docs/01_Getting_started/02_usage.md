# Getting Started

```js
import ladderjs from 'ladderjs'

const options = {
  debugRoutes: false,
  port: 8080,
  routes: [],
  publicPath: '/public',
  stylesPath: '/public/styles',
  controllersPath: '/controllers',
  modelsPath: '/models',
  viewsPath: '/views',
  styleProcessor: 'less'
}

const app = ladderjs({
  port: 3000,
  debugRoutes: false,
  routes
})

app.start()
```