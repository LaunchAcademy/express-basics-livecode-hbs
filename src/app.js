import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import hbsMiddleware from 'express-handlebars'

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(new URL('../public', import.meta.url).pathname))

app.set('views', new URL('../views', import.meta.url).pathname)
app.engine(
  'hbs',
  hbsMiddleware({
    extname: '.hbs'
  })
)
app.set('view engine', 'hbs')


//your code here
app.get('/', (req, res) => {
  res.redirect('/geeting')
})

app.get('/greeting', (req,res) => {
  res.render('index.hbs')
})

app.get('/greeting/:name', (req,res) => {
  let name = req.params.name 
  let language = req.query.lang
  let greeting
  if (language && language.toLowerCase() ==="fr") {
    greeting = "bonjour"
    res.render(`show.hbs`, {name, greeting})
  }
  else if (language && language.toLowerCase() === "es"){
    greeting = "Hola"
    res.render(`show.hbs`,{ name, greeting })
  } else if (language) {
    res.status(404).send("We don't support that language")
  } else {
    res.render('show.hbs', {name:name, greeting:"Hey There"})
  }
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is listening...')
})

export default app
