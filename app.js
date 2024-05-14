const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

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



// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

//session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//url body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//register route (test-hash)
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

    // Check if the username already exists in the database
    const checkUsernameQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE username = ?';
    db.query(checkUsernameQuery, [username], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking username:', checkErr);
            res.status(500).send('Error checking username');
            return;
        }

        // If username already exists, send an error response
        if (checkResult[0].count > 0) {
            res.status(400).send('Username already exists');
            return;
        }

        // If username does not exist, proceed with registration
        bcrypt.hash(password, 10, (hashErr, hash) => {
            if (hashErr) {
                console.error('Error hashing password:', hashErr);
                res.status(500).send('Error hashing password');
                return;
            }

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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            db.query(sql, [
                username,
                hash, // Store the hashed password 
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
    });
});





// Login route (test-hash)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM tbl_accounts WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            res.status(500).send('Error logging in');
            return;
        }
        if (result.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }
        const hashedPassword = result[0].password;
        bcrypt.compare(password, hashedPassword, (compareErr, compareResult) => {
            if (compareErr) {
                res.status(500).send('Error comparing passwords');
                return;
            }
            if (compareResult) {
                const user = result[0];
                req.session.loggedin = true;
                req.session.username = user.username;
                req.session.fullName = `${user.firstName} ${user.middleInitial +"."} ${user.lastName}`; //add middle initial
                req.session.callSign = user.callSign;

                res.status(200).json({ message: 'Login successful', accountType: user.accountType });
            } else {
                res.status(401).send('Invalid username or password');
            }
        });
    });
});

app.get('/volunteer', (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname, 'public', 'volunteer.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/profile', (req, res) => {
    if (req.session.loggedin) {
        res.json({ fullName: req.session.fullName, callSign: req.session.callSign });
    } else {
        res.status(401).send('Not logged in');
    }
});




//port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
