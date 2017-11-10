var createProject = require('./helpers').createProject

module.exports = function(dir, answers) {
  return Promise.all([createProject(dir, answers)])
}
