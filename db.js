//Filename:db.js

const mysql = require('mysql');
require('dotenv').config(); // Load environment variables

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
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

