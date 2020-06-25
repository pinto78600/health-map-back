const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { port } = require('./src/helper/config')
const indexRoutes = require('./src/routes/indexRoutes')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/vaccine', indexRoutes.Vaccine)
//app.use('/user', indexRoutes,User)

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad just happened...')
  }
  console.log(`Server is listening on ${port}`)
})