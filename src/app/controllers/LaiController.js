export const render = (req, res) => {
  const {route} = req.body
  return res.redirect(route)
}
