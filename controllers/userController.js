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
    
  }
  console.log('DB connected')
})

//Display users
exports.viewUsers = (req, res) => {
  db.query('SELECT * FROM users WHERE status = "active" ', (err, users) => {
    if (!err) {
      const { alert } = req.query
      res.render('./grade-system/users', { users, alert })
    } else {
      console.log(err)
    }
  })
}

// Form render
exports.addUserForm = (req, res) => {
  res.render('./grade-system/addUser')
}

//Add user
exports.addUser = (req, res) => {
  const { first_name, last_name, email, comment } = req.body

  if (!first_name || !last_name || !email) {
    res.render('./grade-system/addUser', { alert: "You provided incorrent information!", danger: true })
    return
  }

  db.query(
    'INSERT INTO users SET first_name = ?, last_name = ?, email = ?, comments = ?',
    [first_name, last_name, email, comment],
    (err) => {
      if (!err) {
        res.render('./grade-system/adduser', { alert: "User successfully added!" })
      } else {
        console.log(err)
      }
    }
  )
}

//Delete user
exports.deleteUser = (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    db.query('DELETE FROM grades WHERE user = ?', [req.params.id], (err) => {
      res.redirect('/')
    })
  })
}

//Edit user
exports.editUser = (req, res) => {
  res.render('./grade-system/editUser')
}

exports.viewUser = (req, res) => {
  db.query('SELECT * from users WHERE id = ?', [req.params.id], (err, user) => {
    db.query('SELECT * FROM  grades, lecturers, subjects WHERE grades.lecturer = lecturers.id AND grades.subject = subjects.id AND user = ?', [req.params.id], (err, result) => {
      res.render('./grade-system/viewUser', { user, result })
      console.log()
    })
  })
  
}