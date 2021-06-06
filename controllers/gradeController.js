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

exports.addForm = (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, user) => {
    db.query('SELECT * from lecturers', (err, lecturers) => {
      db.query('SELECT * from subjects', (err, subjects) => {
        const { alert } = req.query
        res.render('addGrade', { user, lecturers, subjects, alert })
        console.log(user)
      })
    })
  })
}

exports.addGrade = (req, res) => {
  const { user, lecturer, subject, grade } = req.body
  db.query('INSERT INTO grades SET user = ?, lecturer = ?, grade = ?, subject = ?', [user, lecturer, grade, subject], (err) => {
    if (!err) {
      res.redirect(`/grade/add/${user}/?alert=Grade+successfully+added`)
    } 
  }) 
}

exports.deleteGrade = (req, res) => {
  db.query('DELETE from grades WHERE id_grade = ?', [req.params.id], (err) => {
    res.redirect(`/user/view/${req.query.usrid}`)
  })
}