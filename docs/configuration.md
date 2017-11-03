# Configuration {#configuration}

## Configuration variables {#configuration-variables}

LadderJS need a set of variables to define its behaviours and thus make it suite your needs. We recommended using a`.env`file set the database url but you can also add it to the config object passed while instantiating LadderJS. You'll find below a table summarizing the available config properties and their environment variables counterparts.

| Property | Type | Default | Notes |
| :--- | :--- | :--- | :--- |
| port | STRING | INT | 8080 |
| stylesProcessor | STRING | 'less' | 'less' or 'sass' |
| loggerLevel | STRING | 'info' | 'info', 'warning' or 'fatal' |
| debugRoutes | BOOLEAN | false | Will log all the available routes on application start, usefully to debug |
| controllersPath | STRING | '/controllers' | The path used to find the controllers files |
| modelsPath | STRING | '/models' | The path used to find the models files |
| publicPath | STRING | '/public' | The path used to serve various files. It can be archives, documents or third party libraries. |
| stylesPath | STRING | '/styles' | The path used to find the styles files |
| viewsPath | STRING | '/views' | The path used to find the views Pug files |
| auth | OBJECT | null | If you want to use an already existing user model, pass a Sequelize model, the name of the username field and the name of the password field |
| routes | ARRAY\[OBJECT\] | \[\] | An array of the routes you need to define. You'll find further information on the Routing documentation page |
| policies | OBJECT\[FUNCTION\] | \[\] | An object of policies used in routes |
| disabledRoutes | ARRAY\[STRING\] | \[\] | If you need to disable a default route provided by the framework, you can pass the url of the route in this array |

## Operating modes {#operating-modes}

LadderJS offers you 2 operating modes, feel free to choose which one you want to use.

### Minimum impact {#minimum-impact}

First, you can choose to use LadderJS as a completely hidden framework. That's the easiest and the quickest to bootstrap a project. That's the default mode.

### Hands-on {#hands-on}

You can use the command line to copy all the files from the framework. This method allows you to edit the controllers, models and views to fine tune them.

## Database seeds {#database-seeds}



