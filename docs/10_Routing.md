# Routing

## Prefix

## Get prefixed url in Pug

## Async rendering

### Async include filter
ainclude(route, targetId, loadingElement = '', errorElement = '')

route = the route defined in the route configuration passed to LadderJS instanciation
targetId = If specified, the result of the async call will be injected into that element. If none provided, a `<div/>` will be created to received the async result.
loadingElement = An element to display while the call is processing. The element can also be defined in the JS part defining the `app.locals.loadingElement` variable.
errorElement = An element to display if the call failed. The element can also be defined in the JS part defining the `app.locals.errorElement` variable.
```
// JS part
app.locals.loadingElement = '<img src="/img/loader.svg"/>'
app.locals.errorElement = '<img src="/img/error.svg"/>'

//Template file
  div!=ainclude('/mycontroller/my-async-data')
```

or
```
  div!=ainclude('/mycontroller/my-async-data', null, '<img src="/img/loader.svg"/>', '<img src="/img/error.svg"/>')
```

### Async route configuration
```
{
  description: 'Heavy data fetching',
  method: 'get',
  url: '/mycontroller/my-async-data',
  controller: 'MyController',
  action: 'testAsync',
  view: 'testAsync',
},
```