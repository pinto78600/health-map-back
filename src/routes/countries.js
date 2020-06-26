const express = require('express')
const { connection } = require('../helper/config.js')

const Router = express.Router()

Router.get('/', (req, res) => {
  const sql = 'SELECT * FROM country'
  connection.query(sql, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
})

module.exports = Router
