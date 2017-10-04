# Routing

## Prefix

## Get prefixed url in Pug

## Async rendering

### Async include filter
```
  :async-include(route='/lai/test')
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