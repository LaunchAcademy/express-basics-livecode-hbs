import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import hbsMiddleware from 'express-handlebars'

import rootRouter from './routes/rootRouter.js'

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(new URL('../public', import.meta.url).pathname))

app.set('views', new URL('../views', import.meta.url).pathname)
app.engine(
  'hbs',
  hbsMiddleware.engine({
    defaultLayout: "default.hbs",
    extname: '.hbs'
  })
)
app.set('view engine', 'hbs')

app.use("/", rootRouter)

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is listening...')
})

export default app
