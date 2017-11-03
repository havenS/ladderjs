# Usage {#usage}

## Configure database {#configure-database}

To use **LadderJS **you need a Postgre SQL database.

First, create a Postgre SQL database:

```
$ createdb <DATABASE_NAME>
```

Then, add a `.env` file at the root of your project:

**/.env**

\# The database connection string

```
DATABASE_URL=postgres://<USER>:<PASSWORD>@<DATABASE>
```



\# Enable the Sequelize logging, disabled by default

DATABASE\_LOGGING=true



## Create LadderJS instance {#create-ladderjs-instance}

To start using **LadderJS **simply create an`index.js`file containing the following:

```
const ladderjs = require('ladderjs')


const options = {}


const app = ladderjs(options)
app.start()

```

Then launch it use the command:

```
$ node .

```

You'll then have have a basic website, configured using all the default settings \(check it in the **configuration **page\). The basic app is using MaterializeCSS as CSS-JS framework, and shows a homepage, a login/signup pages, and a protected page.

## NB {#nb}

If you use Nodemon or any other file monitor, be sure tu exclude the`sessions`folder and the`*.log`files:

```
$ nodemon . -i sessions -i *.log
```



