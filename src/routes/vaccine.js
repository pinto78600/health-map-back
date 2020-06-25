const express = require('express')
const { connection } = require('../helper/config.js')

const Router = express.Router()

Router.get('/' , (req, res) => {
    const sql = 'SELECT * FROM hackathon2.vaccine v JOIN hackathon2.country c ON v.country_id = c.id JOIN hackathon2.instru i ON v.instru_id = i.id ;'
    const sql2 = 'SELECT i.id, c.name, v.vaccine , v2.vaccine AS Hépatite , v3.vaccine AS Hépatite, v4.vaccine AS Rage , v5.vaccine AS Typhoïde, v6.vaccine AS Paludisme, v7.vaccine AS Encé , v8.vaccine AS Encéphatite FROM hackathon2.instruction i JOIN hackathon2.country c ON  c.id = i.country_id JOIN hackathon2.vaccine v ON v.id = i.Hépatite_A JOIN hackathon2.vaccine v2 ON v2.id = i.Hépatite_B JOIN hackathon2.vaccine v3 ON v3.id = i.Fièvre_jaune JOIN hackathon2.vaccine v4 ON v4.id = i.Rage JOIN hackathon2.vaccine v5 ON v5.id = i.Typhoĩde JOIN hackathon2.vaccine v6 ON v6.id = i.Paludisme JOIN hackathon2.vaccine v7 ON v7.id = i.Encéphatite_japonaise JOIN hackathon2.vaccine v8 ON v8.id = i.Encéphatite_tiques'
    connection.query(sql , (err, result) => {
        if(err) throw err
        return res.status(200).send(result)
    })
})

module.exports = Router