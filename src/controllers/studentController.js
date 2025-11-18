const StudentModel = require('../models/studentModel');

class StudentController {
  // Get all students
  static async getAllStudents(req, res) {
    try {
      const students = await StudentModel.getAllStudents();
      
      // Log to console for testing
      console.log('📊 Students fetched from database:');
      console.log('Total students:', students.length);
      students.forEach(student => {
        console.log(`ID: ${student.id}, Name: ${student.first_name} ${student.last_name}, Email: ${student.email}`);
      });
      
      res.json({
        success: true,
        data: students,
        count: students.length
      });
    } catch (error) {
      console.error('❌ Error fetching students:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get student by ID
  static async getStudentById(req, res) {
    try {
      const { id } = req.params;
      const student = await StudentModel.getStudentById(id);
      
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      console.log('📋 Student details:', student);
      
      res.json({
        success: true,
        data: student
      });
    } catch (error) {
      console.error('❌ Error fetching student:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Create new student
  static async createStudent(req, res) {
    try {
      const studentData = req.body;
      const studentId = await StudentModel.createStudent(studentData);
      
      console.log('✅ New student created with ID:', studentId);
      
      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: { id: studentId }
      });
    } catch (error) {
      console.error('❌ Error creating student:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update student
  static async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const studentData = req.body;
      
      const affectedRows = await StudentModel.updateStudent(id, studentData);
      
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      console.log('✏️ Student updated with ID:', id);
      
      res.json({
        success: true,
        message: 'Student updated successfully'
      });
    } catch (error) {
      console.error('❌ Error updating student:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete student
  static async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const affectedRows = await StudentModel.deleteStudent(id);
      
      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      console.log('🗑️ Student deleted with ID:', id);
      
      res.json({
        success: true,
        message: 'Student deleted successfully'
      });
    } catch (error) {
      console.error('❌ Error deleting student:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = StudentController;