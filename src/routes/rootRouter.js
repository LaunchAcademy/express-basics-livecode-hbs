import express from "express"

const rootRouter = express.Router()

rootRouter.get("/", (req, res) => {
  res.redirect("/greetings")
})

// your code here
rootRouter.get("/greetings", (req, res) => {
  res.render("index.hbs")
})

rootRouter.get("/greetings/:name", (req, res) => {
  const name = req.params.name
  res.render("show.hbs", { name })
})


export default rootRouter