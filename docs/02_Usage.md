# Usage

To start using **LadderJS** simply create an `index.js` file containing the following:

```js
import ladderjs from 'ladderjs'

const options = {}
const app = ladderjs()

app.start()

```
Then launch it use the command: 
```console
$ node .
```

You'll then have have a basic website, configured using all the default settings (check it in the **configuration** page). The basic app is using MaterializeCSS as CSS-JS framework, and shows a homepage, a login/signup pages, and a protected page.