const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let students = [];

// Get Attendance
app.get("/api/students", (req, res) => {
    res.json(students);
});

// Add Student
app.post("/api/students", (req, res) => {
    const { name } = req.body;

    const student = {
        id: Date.now(),
        name,
        status: "Absent"
    };

    students.push(student);

    res.json(student);
});

// Mark Attendance
app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    students = students.map(student => {
        if (student.id === id) {
            student.status =
                student.status === "Present"
                    ? "Absent"
                    : "Present";
        }
        return student;
    });

    res.json({ message: "Attendance Updated" });
});

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});