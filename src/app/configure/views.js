import moment from 'moment'
import randomID from 'random-id'

export default app => {
  app.set('view engine', 'pug')
  app.set('views', [
    `${process.cwd()}${app.ladderjs.config.viewsPath}`,
    __dirname + '/../../../views',
  ])
  app.locals = {
    ...app.locals,
    moment: moment,
    compileDebug: process.env.NODE_ENV !== 'production',
    cache: process.env.NODE_ENV === 'production',
    loadingElement: '',
    errorElement: '',
    ainclude: (
      route,
      id,
      loadingElement = app.locals.loadingElement,
      errorElement = app.locals.errorElement
    ) => {
      let generate = false
      if (!id) {
        id = randomID(10)
        generate = true
      }
      return `${generate ? `<div id="${id}"></div>` : ''}
      <script type="text/javascript">
      $(function(){
        $('#${id}').html('${loadingElement}')
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
    },
  }
}
