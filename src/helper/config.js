const dotenv = require('dotenv')
dotenv.config()

// Back info
const port = process.env.PORT

// MySQL data
const mysql = require('mysql2')
const databaseCredentials = {
  host: process.env.HOST,
  user: process.env.ACCOUNT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}
const connection = mysql.createConnection(databaseCredentials)


// Export
module.exports = {
  port, // Possible to pass object (port : process.env.PORT)
  connection,
  
}
