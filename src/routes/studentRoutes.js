const express = require('express');
const StudentController = require('../controllers/studentController');

const router = express.Router();

// Student routes
router.get('/students', StudentController.getAllStudents);
router.get('/students/:id', StudentController.getStudentById);
router.post('/students', StudentController.createStudent);
router.put('/students/:id', StudentController.updateStudent);
router.delete('/students/:id', StudentController.deleteStudent);

module.exports = router;