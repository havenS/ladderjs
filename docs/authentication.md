# Authentication {#authentication}

auth config object

```JSON
{ 
    model
    email field
    password field
}
```

redirect on login

```jade
input(name="returnTo", value="/")
```

redirect on logout, use the `returnTo` query param:

```jade
a(href="/logout?returnTo=/") Logout
```



