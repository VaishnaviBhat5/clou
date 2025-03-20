//Filename:table.js
const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'Student'
});

con.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to the database!");
});

// Create students table
const studentsTable = `
    CREATE TABLE IF NOT EXISTS students (
        student_id INT(5) PRIMARY KEY,
        name VARCHAR(50),
        roll_no VARCHAR(20),
        usn VARCHAR(20) UNIQUE,
        dob DATE,
        address TEXT
    )
`;

con.query(studentsTable, (err) => {
    if (err) {
        console.error("Error creating 'students' table:", err);
        return;
    }
    console.log("'students' table created or already exists!");

    // Insert entries into the students table
    const studentsEntries = `
        INSERT IGNORE INTO students (student_id, name, roll_no, usn, dob, address)
        VALUES 
            (1, 'Alice', '1001', 'USN001', '2002-01-15', '123 Main St, City A'),
            (2, 'Bob', '1002', 'USN002', '2001-05-22', '456 Elm St, City B'),
            (3, 'Charlie', '1003', 'USN003', '2000-08-30', '789 Oak St, City C'),
            (4, 'David', '1004', 'USN004', '2003-03-12', '101 Pine St, City D'),
            (5, 'Emma', '1005', 'USN005', '2002-07-25', '202 Maple St, City E')
    `;

    con.query(studentsEntries, (err) => {
        if (err) {
            console.error("Error inserting into 'students' table:", err);
            return;
        }
        console.log("5 entries inserted into 'students' table!");

        // Create courses table
        const coursesTable = `
            CREATE TABLE IF NOT EXISTS courses (
                course_id INT(5) PRIMARY KEY,
                course_name VARCHAR(50),
                credits INT(3)
            )
        `;

        con.query(coursesTable, (err) => {
            if (err) {
                console.error("Error creating 'courses' table:", err);
                return;
            }
            console.log("'courses' table created or already exists!");

            // Insert entries into the courses table
            const coursesEntries = `
                INSERT IGNORE INTO courses (course_id, course_name, credits)
                VALUES
                    (101, 'Database Management', 4),
                    (102, 'Data Structures', 3),
                    (103, 'Operating Systems', 4),
                    (104, 'Computer Networks', 3),
                    (105, 'Software Engineering', 3)
            `;

            con.query(coursesEntries, (err) => {
                if (err) {
                    console.error("Error inserting into 'courses' table:", err);
                    return;
                }
                console.log("5 entries inserted into 'courses' table!");

                // Create enrollments table (to link students and courses)
                const enrollmentsTable = `
                    CREATE TABLE IF NOT EXISTS enrollments (
                        enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
                        student_id INT(5),
                        course_id INT(5),
                        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
                        FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
                    )
                `;

                con.query(enrollmentsTable, (err) => {
                    if (err) {
                        console.error("Error creating 'enrollments' table:", err);
                        return;
                    }
                    console.log("'enrollments' table created or already exists!");

                    // Insert sample enrollments
                    const enrollmentsEntries = `
                        INSERT IGNORE INTO enrollments (student_id, course_id)
                        VALUES
                            (1, 101),
                            (2, 102),
                            (3, 103),
                            (4, 104),
                            (5, 105)
                    `;

                    con.query(enrollmentsEntries, (err) => {
                        if (err) {
                            console.error("Error inserting into 'enrollments' table:", err);
                            return;
                        }
                        console.log("5 entries inserted into 'enrollments' table!");
                        con.end();
                    });
                });
            });
        });
    });
});