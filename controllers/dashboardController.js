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

exports.viewDash = (req, res) => {
  db.query('SELECT * FROM news, authors, category, status WHERE news.idAuthor = authors.id AND news.idCategory = category.id AND news.idStatus = status.id', (err, result) => {
    if (err) return
    res.render('./admin-panel/dashboard', {result})    
  }) 
}

exports.search = (req, res) => {
  const {search} = req.body
  db.query(`SELECT * FROM news, authors, status, category WHERE (content OR title LIKE '${search}') AND (news.idAuthor = authors.id AND news.idStatus = status.id AND news.idCategory = category.id) `, (err, result) => {
    res.render('./admin-panel/dashboard', {result})
  })
}

exports.addPostForm = (req, res) => {
  db.query('SELECT * from status', (err, status) => {
    if (err) return
    db.query('SELECT * from authors', (err, authors) => {
      if (err) return
      db.query('SELECT * from category', (err, category) => {
        let danger = false
        if (err) return
        const { alert } = req.query
        if (alert) {
          danger = true
        }
        res.render('./admin-panel/addPost', {status, authors, category, alert, danger})
      })
    })
  })
}

exports.addPost = (req, res) => {
  const { title, content, authors, status, category } = req.body
  if (!title || !content || !authors, !status || !category) {
    res.redirect('/dashboard/add/post/?alert=Incorret+information')
  }
  db.query('INSERT into news SET idAuthor = ?, idStatus = ?, idCategory = ?, Content = ?, Title = ?', [authors, status, category, content, title], (err) => {
    if (err) {
      console.log(err)
      return
    }
    res.redirect('/dashboard/add/post')
  })
}

exports.updateStatus = (req, res) => {
  db.query('UPDATE news SET idStatus = !idStatus WHERE idNews = ?', [req.params.id], (err) => {
    if(err) return
    res.redirect('/dashboard')
  })
}


