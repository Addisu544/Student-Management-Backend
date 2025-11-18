const pool = require('../config/database');

class StudentModel {
  // Get all students
  static async getAllStudents() {
    try {
      const [rows] = await pool.execute('SELECT * FROM students ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw new Error('Error fetching students: ' + error.message);
    }
  }

  // Get student by ID
  static async getStudentById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error fetching student: ' + error.message);
    }
  }

  // Create new student
  static async createStudent(studentData) {
    const {
      student_id,
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      address,
      course
    } = studentData;

    try {
      const [result] = await pool.execute(
        `INSERT INTO students 
        (student_id, first_name, last_name, email, phone, date_of_birth, address, course) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [student_id, first_name, last_name, email, phone, date_of_birth, address, course]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Error creating student: ' + error.message);
    }
  }

  // Update student
  static async updateStudent(id, studentData) {
    const {
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      address,
      course
    } = studentData;

    try {
      const [result] = await pool.execute(
        `UPDATE students 
        SET first_name = ?, last_name = ?, email = ?, phone = ?, 
            date_of_birth = ?, address = ?, course = ? 
        WHERE id = ?`,
        [first_name, last_name, email, phone, date_of_birth, address, course, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw new Error('Error updating student: ' + error.message);
    }
  }

  // Delete student
  static async deleteStudent(id) {
    try {
      const [result] = await pool.execute('DELETE FROM students WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (error) {
      throw new Error('Error deleting student: ' + error.message);
    }
  }
}

module.exports = StudentModel;