export const render = (req, res) => {
  const { route } = req.body
  return res.redirect(route)
}

export const testAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ text: "Async Include Rendering test" })
    }, 2000)
  })
}
