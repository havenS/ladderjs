var global = require('./global')
var database = require('./database')

// module.exports = global.splice(0, 1)
module.exports = [].concat(global).concat(database)
