const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const lecturer = require('../controllers/lecturerController')
const grade = require('../controllers/gradeController')
const dashboard = require('../controllers/dashboardController')


//USERS / STUDENTS 
router.get('/', user.viewUsers)

//Add user form
router.get('/user/add', user.addUserForm)

//Add user
router.post('/user/add', user.addUser)

//Edit user
router.get('/edit-user/:id', user.editUser)

//Delete user
router.get('/user/delete/:id', user.deleteUser)

//View specific user
router.get('/user/view/:id', user.viewUser)



//LECTURERS
router.get('/lecturers', lecturer.viewLecturers)

//Add lecturer form
router.get('/lecturer/add', lecturer.addForm)

//Add lecturer
router.post('/lecturer/add', lecturer.addLecturer)

//Delete lecturer
router.get('/lecturer/delete/:id', lecturer.deleteLecturer)



//GRADES
router.get('/grade/add/:id', grade.addForm)

//Add grade
router.post('/grade/add', grade.addGrade)

//Delete grade 
router.get('/grade/delete/:id', grade.deleteGrade)


//Admin Dashboard 
router.get('/dashboard', dashboard.viewDash)


module.exports = router