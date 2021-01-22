const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cookieParser())

app.get('/', (req, res) => {
  res.render('index', {
    method: req.method,
    headers: JSON.stringify(req.headers),
    params: JSON.stringify(req.params),
    body: req.body
  })
})

app.post('/', async (req, res) => {
  const chunks = []
  const random = Math.random().toString()
  req.on('data', chunk => chunks.push(chunk))
  req.on('end', () => {
    res.cookie('random', random, { maxAge: 1000000})
    res.render('index', {
      method: req.method,
      headers: JSON.stringify(req.headers),
      params: JSON.stringify(req.params),
      cookies: JSON.stringify(req.cookies),
      body: Buffer.concat(chunks)
    })
  })
})

app.get('/link', (req, res) => {
  res.render('index', {message: `POST: ${req.headers} ${req.params} ${req.body}`})
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})


