import randomID from 'random-id'

module.exports = (app, config) => {
  app.set('view engine', 'pug')
  app.set('views', [
    `${process.cwd()}${config.viewsPath}`,
    __dirname + '/../../../views',
  ])
  app.locals.compileDebug = process.env.NODE_ENV !== 'production'
  app.locals.cache = process.env.NODE_ENV === 'production'
  app.locals.loadingElement = ''
  app.locals.errorElement = ''
  app.locals.ainclude = (
    route,
    loadingElement = app.locals.loadingElement,
    errorElement = app.locals.errorElement
  ) => {
    console.log(route, loadingElement, errorElement)
    const id = randomID(10)
    return `<div id="${id}">${loadingElement}</div>
      <script type="text/javascript">
        $(function(){
          $.post('/lai', {route: '${route}'})
            .done(function(data){
              $('#${id}').html(data)
            })
            .error(function(){
              $('#${id}').html('${errorElement}')
            })
        })
      </script>
      `
  }
}
