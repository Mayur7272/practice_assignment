const mysql = require('mysql2')

const openConnection = () => {
  const connection = mysql.createConnection({
   // uri: "mysql://db:3306",
   host:'mydb1',
    user: 'root',
    password: 'root',
    database: 'mydb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })

  connection.connect()

  return connection
}

module.exports = {
  openConnection,
}