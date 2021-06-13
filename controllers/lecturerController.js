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

//View spec {
exports.viewSpec = (req, res) => {
  
}

//Displays lecturers
exports.viewLecturers = (req, res) => {
   db.query('SELECT * FROM lecturers WHERE status = "active"', (err, lecturers) => {
    if (!err) {
      res.render('./grade-system/lecturers', { lecturers })
    } else {
      console.log(err)
    }
  })
}

exports.addForm = (req, res) => {
  db.query('SELECT * FROM spec', (err, spec) => {
    if (!err) {
      res.render('./grade-system/addLecturer', { spec })
    }
  })
}

exports.addLecturer = (req, res) => {
  const { first_name, last_name, email, spec } = req.body

  if (!first_name || !last_name || !email || !spec || spec === "Specialization") {
    db.query('SELECT * FROM spec', (err, spec) => {
      if (!err) {
        res.render('./grade-system/addLecturer', { alert: "You provided incorrect information!", danger: true, spec })
      }
    })
    return
  }

  db.query(
    'INSERT INTO lecturers SET first_name = ?, last_name = ?, email = ?, spec = ?',
    [first_name, last_name, email, spec],
    (err) => {
      if (!err) {
        res.render('./grade-system/addLecturer', { alert: "Lecturer successfully added!" })
      } else {
        console.log(err)
      }
    }
  )
}

//Delete user
exports.deleteLecturer = (req, res) => {
  db.query('DELETE FROM lecturers WHERE id = ?', [req.params.id], (err) => {
    if (!err) {
      res.redirect('/lecturers')
    } else {
      console.log(err)
    }
  }
  )
}