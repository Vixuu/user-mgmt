const mysql = require('mysql')

//Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usermgmt'
})

db.connect((err) => {
  if (err) {
    throw (err)
  }
  console.log('DB connected')
})

exports.viewDash = (req, res) => {
  db.query('SELECT * FROM news, authors, category, status WHERE news.idAuthor = authors.id AND news.idCategory = category.id AND news.idStatus = status.id', (err, result) => {
    if (err) return
    res.render('./admin-panel/dashboard', {result})    
  })
  
}