const express = require('express')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const indexHandler =
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
  req.on('data', chunk => chunks.push(chunk))
  req.on('end', () => {
    res.render('index', {
      method: req.method,
      headers: JSON.stringify(req.headers),
      params: JSON.stringify(req.params),
      body: Buffer.concat(chunks)
    })
  })
})

app.get('/link', (req, res) => {
  res.render('index', {message: `POST: ${req.headers} ${req.params} ${req.body}`})
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})


