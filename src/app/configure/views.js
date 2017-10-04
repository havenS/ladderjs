import randomID from 'random-id'
module.exports = (app, config) => {
  app.set('view engine', 'pug')
  app.set('views', [
    `${process.cwd()}${config.viewsPath}`,
    __dirname + '/../../../views',
  ])
  app.locals.compileDebug = process.env.NODE_ENV !== 'production'
  app.locals.cache = process.env.NODE_ENV === 'production'
  app.locals.filters = {
    'async-include': (text, { route, view }) => {
      const id = randomID(10)
      return `<div id="${id}"></div>
        <script type="text/javascript">
          $(function(){
            $.post('/lai', {route: '${route}', view: '${view}'})
              .then(function(data){
                $('#${id}').html(data)
              })
          })
        </script>
        `
    },
  }
}
