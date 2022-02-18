import express from "express"

const rootRouter = express.Router()

rootRouter.get("/", (req, res) => {
  res.redirect("/greetings")
})

// your code here



export default rootRouter