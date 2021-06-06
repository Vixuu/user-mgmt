const express = require('express')
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const mysql = require('mysql')

require('dotenv').config()

const app = express()

//Parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Static
app.use(express.static('public'))

//Template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Routes
const routes = require('./routes/router')
app.use('/', routes)


app.listen(3030, () => console.log("Server started"))