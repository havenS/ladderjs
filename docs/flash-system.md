# Flash sytem

A flash message system exists

`req.flash('KEY', 'MESSAGE')`

Add a message:

```js
req.flash('error', 'Your error message')
req.flash('success', 'Your success message')
```

Render the messages:

```jade
if messages
  each message in messages.error
    span.error= message
  each message in messages.success
    span.success= message
```



