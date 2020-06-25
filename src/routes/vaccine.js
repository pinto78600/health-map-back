const express = require('express')
const { connection } = require('../helper/config.js')

const Router = express.Router()

Router.get('/' , (req, res) => {
    const sql = 'SELECT c.id, c.name, v.vaccine, v.description FROM hackathon2.country c JOIN hackathon2.vaccine v ON v.id = c.vaccine_id '
    connection.query(sql , (err, result) => {
        if(err) throw err
        return res.status(200).send(result)
    })
})

module.exports = Router