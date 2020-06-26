const express = require('express')
const { connection } = require('../helper/config.js')

const Router = express.Router()

Router.get('/' , (req, res) => {
    const sql = `SELECT v.id, c.name, v.disease, i.value 
    FROM hackathon2.vaccine v JOIN hackathon2.instru i ON v.instru_id = i.id 
    JOIN hackathon2.country c ON v.country_id = c.id `
    connection.query(sql , (err, result) => {
        if(err) throw err
        return res.status(200).send(result)
    })
})

module.exports = Router