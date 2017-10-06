# Routing

## Prefix

## Get prefixed url in Pug

## Async rendering

### Async include filter
ainclude(route, loadingElement = '', errorElement = '')
```
  div!=ainclude('/lai/test')
```

```
app.locals.loadingElement = '<img src="/img/loader.svg"/>'
app.locals.errorElement = '<img src="/img/error.svg"/>'
```
or
```
  div!=ainclude('/lai/test', '<img src="/img/loader.svg"/>', '<img src="/img/error.svg"/>')
```
### Async route configuration
```
{
  description: 'LAI - test route',
  method: 'get',
  url: '/lai/test',
  controller: 'LaiController',
  action: 'testAsync',
  view: 'testAsync',
},
```