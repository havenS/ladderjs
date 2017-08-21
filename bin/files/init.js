module.exports = function (verbose, framework) {
  console.log(framework)
  if (!framework) {
    console.warn('No framework option passed, using MaterializeCSS')
  }
}
  