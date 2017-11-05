# Routing {#routing}

## Prefix {#prefix}

## Get prefixed url in Pug {#get-prefixed-url-in-pug}

## Async rendering {#async-rendering}

### Async include filter AKA `ainclude()` {#async-include-filter}

`ainclude(route, targetId, loadingElement, errorElement)`

| parameter | required | default | description |
| :--- | :--- | :--- | :--- |
| route | true | null | The route defined in the route configuration passed to LadderJS instantiation. |
| targetId | false | null | If specified, the result of the async call will be injected into that element. If none provided, a&lt;div/&gt;will be created to received the async result. |
| loadingElement | false | '' | An element to display while the call is processing. The element can also be defined globally \(see below\). |
| errorElement | false | '' | An element to display if the call failed. The element can also be defined globally \(see below\). |

```
// JS part
app.locals.loadingElement = '<img src="/img/loader.svg" />'
app.locals.errorElement = '<img src="/img/error.svg" />'
```

And then use it in your template:

```
div!=ainclude('/mycontroller/my-async-data')
```

This call will generate a div with a random `id`.

Or this way, which also generate a random `id`.

```
div!=ainclude('/mycontroller/my-async-data', null, '<img src="/img/loader.svg" />', '<img src="/img/error.svg" />')
```

### Async route configuration {#async-route-configuration}

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



