import express from 'express';
import { listStudent } from './data.js';
const app = express();
// Middleware để cho phép express đọc dữ liệu gửi đến dưới dạng JSON
app.use(express.json());

// phương thức get với base API
app.get('', (req, res) => {
    res.end("Hello MindX!");
});

// GET all students
app.get('/students', (req, res) => {
    res.json(listStudent);
});

// GET a specific student by id
app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = listStudent.find(student => student.id === studentId);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
});

// POST a new student
app.post('/students', (req, res) => {
    const newStudent = req.body;
    listStudent.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT update a student by id
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const updateStudent = req.body;
    let studentIndex = listStudent.findIndex(student => student.id === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }
    listStudent[studentIndex] = { ...listStudent[studentIndex], ...updateStudent };
    res.json(listStudent[studentIndex]);
});

// DELETE a student by id
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = listStudent.findIndex(student => student.id === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }
    const deletedStudent = listStudent.splice(studentIndex, 1);
    res.json(deletedStudent);
});

app.listen(8080, () => {
    console.log('Server is running!');
});

