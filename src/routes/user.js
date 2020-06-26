const express = require('express')
const bcrypt = require('bcrypt')

const { connection } = require('../helper/config')

const Router = express.Router()

Router.get('/doc-view', (req, res) => {
    const sql = 'SELECT id, pseudo, account_creation_date, mail FROM user'
    connection.query(sql, (err, result) => {
      if (err) throw err
      return res.status(200).send(result)
    })
})

  const dataValidation = (req , res , next) => {
      const noUndefValues = Object.keys(req.body).map(key => req.body[key] !== undefined).filter(Boolean).length === Object.keys(req.body).length
      if (noUndefValues) {
          next()
      }else {
          res.status(400).send('Bad request')
      }
}
const checkIfUserExists = (req, res, next) => {
    const { name } = req.body
    const sql = 'SELECT COUNT(*) count FROM user u WHERE 1!=1 OR u.pseudo = ?'
    connection.query(sql, name, (err, result) => {
      if (err) throw err
      if (result[0].count !== 0) {
        res.status(409).send('User already exists')
      } else {
        next()
      }
    })
  }
  
  const createUser = (req, res) => {
    const time = new Date().toISOString().replace('T', ' ').substr(0, 19)
    const { name, password } = req.body
  
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err
      const sql = 'INSERT INTO utilisateur (pseudo, mot_de_passe, date_entree) VALUES (?,?,?,?,?)'
      const values = [name, hash, time]
  
      connection.query(sql, values, (err, result) => {
        if (err) throw err
        return res.status(201).send('L\'utilisateur a bien été ajouté.')
      })
    })
  }
  
  Router.post('/', dataValidation, checkIfUserExists, createUser)
  
  Router.delete('/:id', (req, res) => {
    const idUser = req.params.id
    connection.query('DELETE FROM utilisateur WHERE id = ?', [idUser], err => {
      if (err) {
        res.status(500).send('Erreur lors de la suppression d\'un utilisateur')
      } else {
        res.status(200).send('L\'utilisateur a bien été supprimé')
      }
    })
  })
  
  module.exports = Router
  