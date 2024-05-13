const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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



// //Register Route
// app.post('/register', (req, res) => {
//     const {
//         username,
//         password,
//         accountType,
//         lastName,
//         firstName,
//         middleName,
//         middleInitial,
//         callSign,
//         currentAddress,
//         dateOfBirth,
//         civilStatus,
//         gender,
//         nationality,
//         bloodType,
//         mobileNumber,
//         emailAddress,
//         emergencyContactPerson,
//         emergencyContactNumber,
//         highestEducationalAttainment,
//         nameOfCompany,
//         yearsInService,
//         skillsTraining,
//         otherAffiliation,
//         bioDataChecked,
//         interviewChecked,
//         fireResponsePoints,
//         activityPoints,
//         inventoryPoints,
//         dutyHours
//     } = req.body;

//     // Check if the username already exists in the database
//     const checkUsernameQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE username = ?';
//     db.query(checkUsernameQuery, [username], (checkErr, checkResult) => {
//         if (checkErr) {
//             console.error('Error checking username:', checkErr);
//             res.status(500).send('Error checking username');
//             return;
//         }

//         // If username already exists, send an error response
//         if (checkResult[0].count > 0) {
//             res.status(400).send('Username already exists');
//             return;
//         }

//         // If username does not exist, proceed with registration
//         const sql = `INSERT INTO tbl_accounts (
//             username,
//             password,
//             accountType,
//             lastName,
//             firstName,
//             middleName,
//             middleInitial,
//             callSign,
//             currentAddress,
//             dateOfBirth,
//             civilStatus,
//             gender,
//             nationality,
//             bloodType,
//             mobileNumber,
//             emailAddress,
//             emergencyContactPerson,
//             emergencyContactNumber,
//             highestEducationalAttainment,
//             nameOfCompany,
//             yearsInService,
//             skillsTraining,
//             otherAffiliation,
//             bioDataChecked,
//             interviewChecked,
//             fireResponsePoints,
//             activityPoints,
//             inventoryPoints,
//             dutyHours
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//         db.query(sql, [
//             username,
//             password,
//             accountType,
//             lastName,
//             firstName,
//             middleName,
//             middleInitial,
//             callSign,
//             currentAddress,
//             dateOfBirth,
//             civilStatus,
//             gender,
//             nationality,
//             bloodType,
//             mobileNumber,
//             emailAddress,
//             emergencyContactPerson,
//             emergencyContactNumber,
//             highestEducationalAttainment,
//             nameOfCompany,
//             yearsInService,
//             skillsTraining,
//             otherAffiliation,
//             bioDataChecked,
//             interviewChecked,
//             fireResponsePoints,
//             activityPoints,
//             inventoryPoints,
//             dutyHours
//         ], (err, result) => {
//             if (err) {
//                 console.error('Error registering user:', err);
//                 res.status(500).send('Error registering user');
//                 return;
//             }
//             res.status(200).send('User registered successfully');
//         });
//     });
// });


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


// // Login route
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT * FROM tbl_accounts WHERE username = ? AND password = ?';
//     db.query(sql, [username, password], (err, result) => {
//         if (err) {
//             res.status(500).send('Error logging in');
//             return;
//         }
//         if (result.length > 0) {
//             res.status(200).send('Login successful');
//         } else {
//             res.status(401).send('Invalid username or password');
//         }
//     });
// });


// // Login route
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT * FROM tbl_accounts WHERE username = ? AND password = ?';
//     db.query(sql, [username, password], (err, result) => {
//         if (err) {
//             res.status(500).send('Error logging in');
//             return;
//         }
//         if (result.length > 0) {
//             // Assuming 'accountType' is a column in your database table
//             const accountType = result[0].accountType;
//             res.status(200).json({ message: 'Login successful', accountType: accountType });
//         } else {
//             res.status(401).send('Invalid username or password');
//         }
//     });
// });

// // Server side route to retrieve account data for the currently logged-in user
// app.get('/getAccountData', (req, res) => {
//     // Check if the user is authenticated and their session contains user information
//     if (!req.session || !req.session.userId) {
//         // If the user is not logged in or session data is missing, return an error
//         res.status(401).send('User is not authenticated');
//         return;
//     }
    
//     // Retrieve the user ID from the session
//     const userId = req.session.userId;

//     // Perform a database query to retrieve account data based on the user ID
//     const sql = 'SELECT * FROM tbl_accounts WHERE id = ?'; // Adjust this query based on your database schema
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error('Error retrieving account data:', err);
//             res.status(500).send('Error retrieving account data');
//             return;
//         }
//         if (result.length === 0) {
//             // If no account data is found for the user ID, return a not found error
//             res.status(404).send('Account not found');
//             return;
//         }
//         // Send the retrieved account data as JSON response
//         const accountData = result[0]; // Assuming you're only retrieving one account
//         res.status(200).json(accountData);
//     });
// });

// // Login route (test-hash)
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
                const accountType = result[0].accountType;
                res.status(200).json({ message: 'Login successful', accountType: accountType });
            } else {
                res.status(401).send('Invalid username or password');
            }
        });
    });
});






// // Server side route to retrieve user data after login
// app.get('/getUserData', (req, res) => {
//     // Retrieve the user ID from the session or any other means of identification
//     const userId = req.session.userId; // Adjust this based on your authentication mechanism

//     // Perform a database query to retrieve user data based on the user ID
//     const sql = 'SELECT firstName, middleInitial, lastName, callSign FROM tbl_accounts WHERE id = ?'; // Adjust this query based on your database schema
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error('Error retrieving user data:', err);
//             res.status(500).send('Error retrieving user data');
//             return;
//         }
//         if (result.length === 0) {
//             // If no user data is found, return a not found error
//             res.status(404).send('User data not found');
//             return;
//         }
//         // Send the retrieved user data as JSON response
//         const userData = result[0]; // Assuming you're only retrieving one user's data
//         res.status(200).json(userData);
//     });
// });



// Login route (test-get profile)
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT firstName, middleInitial, lastName, callSign, accountType FROM tbl_accounts WHERE username = ?';
//     db.query(sql, [username], (err, result) => {
//         if (err) {
//             res.status(500).send('Error logging in');
//             return;
//         }
//         if (result.length === 0) {
//             res.status(401).send('Invalid username or password');
//             return;
//         }
//         const hashedPassword = result[0].password;
//         bcrypt.compare(password, hashedPassword, (compareErr, compareResult) => {
//             if (compareErr) {
//                 res.status(500).send('Error comparing passwords');
//                 return;
//             }
//             if (compareResult) {
//                 const userData = {
//                     firstName: result[0].firstName,
//                     middleInitial: result[0].middleInitial,
//                     lastName: result[0].lastName,
//                     callSign: result[0].callSign,
//                     accountType: result[0].accountType
//                 };
//                 res.status(200).json(userData);
//             } else {
//                 res.status(401).send('Invalid username or password');
//             }
//         });
//     });
// });




//port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
