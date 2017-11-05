# Authentication {#authentication}

auth config object 

```
{ 
    model
    email field
    password field
}
```

redirect on login

```
<input name="returnTo" value="/" />
```

redirect on logout, use the `returnTo` query param: 

```
<a href="/logout?returnTo=/">Logout</a>
```



