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
app.get('/',(req,res) => {
  res.redirect('/greeting')
})

app.get('/greeting',(req,res) => {
  res.render('index.hbs')
})

app.get('/greeting/:name', (req,res) => {
  let lang=req.query.lang
  let name = req.params.name
  if (lang && lang.toLowerCase() === 'fr'){
    res.render('show.hbs',{name:name, greeting:'Bonjour Patrice'})
  } else if (lang === 'es') {
    res.render('show.hbs', {name:name, greeting:'Hola, Paco'})
  } else if (lang && (lang !== 'fr' && lang !== 'es')) {
    res.status(404).send("We don't currently support that language")
  }
   else {
    res.render('show.hbs', {name:name, greeting:"Hey there"})
  }
})

app.get('/favorite-colors/:name', (req,res) => {
  let name = req.params.name
  let favoriteColor
  if (name === "Sam"){
    favoriteColor = "Red"
  } else if (name === "John") {
    favoriteColor = "Green"
  }

  res.send(`<h2>${name}'s favorite color is ${favoriteColor}`)
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is listening...')
})

export default app
