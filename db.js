//Filename:db.js

const mysql = require('mysql');
require('dotenv').config(); // Load environment variables

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
    console.log("Connected to MySQL successfully!");
});

con.query('CREATE DATABASE IF NOT EXISTS Student', (err) => {
    if (err) {
        console.error("Error creating database:", err);
        return;
    }
    console.log("Database 'Student' created or already exists!");
    con.end();
});

