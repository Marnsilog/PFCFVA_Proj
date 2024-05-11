const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pfcfva'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

const app = express();

//create table
// app.get('/createuserstable', (req, res) =>{
//     let sql = 'CREATE TABLE users1(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), primary key (id))';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('users table created');
//     })
// });

// app.get("/", function(req,res){
//     res.sendFile(__dirname + "/public/register_test.html");
// })


// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

//Register route (test)
// app.post('/register', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'INSERT INTO tbl_temp_users (username, password) VALUES (?, ?)';
//     db.query(sql, [username, password], (err, result) => {
//         if (err) {
//             res.status(500).send('Error registering user');
//             return;
//         }
//         res.status(200).send('User registered successfully');
//     });
// });

// Assuming you have already configured 'db' for database connection

app.post('/register', (req, res) => {
    const {
        username,
        password,
        accountType,
        lastName,
        firstName,
        middleName,
        middleInitial,
        callSign,
        currentAddress,
        dateOfBirth,
        civilStatus,
        gender,
        nationality,
        bloodType,
        mobileNumber,
        emailAddress,
        emergencyContactPerson,
        emergencyContactNumber,
        highestEducationalAttainment,
        nameOfCompany,
        yearsInService,
        skillsTraining,
        otherAffiliation,
        bioDataChecked,
        interviewChecked,
        fireResponsePoints,
        activityPoints,
        inventoryPoints,
        dutyHours
    } = req.body;

    const sql = `INSERT INTO tbl_accounts (
        username,
        password,
        accountType,
        lastName,
        firstName,
        middleName,
        middleInitial,
        callSign,
        currentAddress,
        dateOfBirth,
        civilStatus,
        gender,
        nationality,
        bloodType,
        mobileNumber,
        emailAddress,
        emergencyContactPerson,
        emergencyContactNumber,
        highestEducationalAttainment,
        nameOfCompany,
        yearsInService,
        skillsTraining,
        otherAffiliation,
        bioDataChecked,
        interviewChecked,
        fireResponsePoints,
        activityPoints,
        inventoryPoints,
        dutyHours
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        username,
        password,
        accountType,
        lastName,
        firstName,
        middleName,
        middleInitial,
        callSign,
        currentAddress,
        dateOfBirth,
        civilStatus,
        gender,
        nationality,
        bloodType,
        mobileNumber,
        emailAddress,
        emergencyContactPerson,
        emergencyContactNumber,
        highestEducationalAttainment,
        nameOfCompany,
        yearsInService,
        skillsTraining,
        otherAffiliation,
        bioDataChecked,
        interviewChecked,
        fireResponsePoints,
        activityPoints,
        inventoryPoints,
        dutyHours
    ], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
            return;
        }
        res.status(200).send('User registered successfully');
    });
});



// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM tbl_temp_users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(500).send('Error logging in');
            return;
        }
        if (result.length > 0) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});


//port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
