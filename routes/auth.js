// const express = require('express');
// const bcrypt = require('bcrypt');
// const path = require('path'); // Required for serving the HTML file
// const router = express.Router();

// module.exports = (db) => {

//     // Register route
//     router.post('/register', (req, res) => {
//         const {
//             rfid, username, password, accountType, lastName, firstName, middleName, middleInitial,
//             callSign, currentAddress, dateOfBirth, civilStatus, gender, nationality, bloodType,
//             mobileNumber, emailAddress, emergencyContactPerson, emergencyContactNumber,
//             highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining,
//             otherAffiliation, bioDataChecked, interviewChecked, fireResponsePoints, activityPoints,
//             inventoryPoints, dutyHours
//         } = req.body;

//         // Check if the username already exists in the database
//         const checkUsernameQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE username = ?';
//         db.query(checkUsernameQuery, [username], (checkUsernameErr, checkUsernameResult) => {
//             if (checkUsernameErr) {
//                 console.error('Error checking username:', checkUsernameErr);
//                 res.status(500).send('Error checking username');
//                 return;
//             }

//             if (checkUsernameResult[0].count > 0) {
//                 res.status(400).send('Username already exists');
//                 return;
//             }

//             // Check if the RFID already exists in the database
//             const checkRfidQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE rfid = ?';
//             db.query(checkRfidQuery, [rfid], (checkRfidErr, checkRfidResult) => {
//                 if (checkRfidErr) {
//                     console.error('Error checking RFID:', checkRfidErr);
//                     res.status(500).send('Error checking RFID');
//                     return;
//                 }

//                 if (checkRfidResult[0].count > 0) {
//                     res.status(400).send('RFID already exists');
//                     return;
//                 }

//                 // Check if the email already exists in the database
//                 const checkEmailQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE emailAddress = ?';
//                 db.query(checkEmailQuery, [emailAddress], (checkEmailErr, checkEmailResult) => {
//                     if (checkEmailErr) {
//                         console.error('Error checking email:', checkEmailErr);
//                         res.status(500).send('Error checking email');
//                         return;
//                     }

//                     if (checkEmailResult[0].count > 0) {
//                         res.status(400).send('Email already exists');
//                         return;
//                     }

//                     // Hash the password and register the user
//                     bcrypt.hash(password, 10, (hashErr, hash) => {
//                         if (hashErr) {
//                             console.error('Error hashing password:', hashErr);
//                             res.status(500).send('Error hashing password');
//                             return;
//                         }

//                         const sql = `
//                             INSERT INTO tbl_accounts (
//                                 rfid, username, password, accountType, lastName, firstName, middleName,
//                                 middleInitial, callSign, currentAddress, dateOfBirth, civilStatus, gender,
//                                 nationality, bloodType, mobileNumber, emailAddress, emergencyContactPerson,
//                                 emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
//                                 yearsInService, skillsTraining, otherAffiliation, bioDataChecked, interviewChecked,
//                                 fireResponsePoints, activityPoints, inventoryPoints, dutyHours
//                             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//                         `;

//                         db.query(sql, [
//                             rfid, username, hash, accountType, lastName, firstName, middleName, middleInitial,
//                             callSign, currentAddress, dateOfBirth, civilStatus, gender, nationality, bloodType,
//                             mobileNumber, emailAddress, emergencyContactPerson, emergencyContactNumber,
//                             highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining,
//                             otherAffiliation, bioDataChecked, interviewChecked, fireResponsePoints, activityPoints,
//                             inventoryPoints, dutyHours
//                         ], (err, result) => {
//                             if (err) {
//                                 console.error('Error registering user:', err);
//                                 res.status(500).send('Error registering user');
//                                 return;
//                             }
//                             res.status(200).send('User registered successfully');
//                         });
//                     });
//                 });
//             });
//         });
//     });

//     // Login route
//     router.post('/login', (req, res) => {
//         const { username, password } = req.body;
//         const sql = 'SELECT * FROM tbl_accounts WHERE username = ?';
//         db.query(sql, [username], (err, result) => {
//             if (err) {
//                 res.status(500).send('Error logging in');
//                 return;
//             }
//             if (result.length === 0) {
//                 res.status(401).send('Invalid username or password');
//                 return;
//             }
//             const hashedPassword = result[0].password;
//             bcrypt.compare(password, hashedPassword, (compareErr, compareResult) => {
//                 if (compareErr) {
//                     res.status(500).send('Error comparing passwords');
//                     return;
//                 }
//                 if (compareResult) {
//                     const user = result[0];
//                     req.session.loggedin = true;
//                     req.session.username = user.username;
//                     req.session.rfid = user.rfid;

//                     // Store user info in the session
//                     req.session.fullName = `${user.firstName} ${user.middleInitial} ${user.lastName}`;
//                     req.session.lastName = user.lastName;
//                     req.session.firstName = user.firstName;
//                     req.session.middleName = user.middleName;
//                     req.session.callSign = user.callSign;
//                     req.session.dateOfBirth = user.dateOfBirth;
//                     req.session.gender = user.gender;
//                     req.session.civilStatus = user.civilStatus;
//                     req.session.nationality = user.nationality;
//                     req.session.bloodType = user.bloodType;
//                     req.session.highestEducationalAttainment = user.highestEducationalAttainment;
//                     req.session.nameOfCompany = user.nameOfCompany;
//                     req.session.yearsInService = user.yearsInService;
//                     req.session.skillsTraining = user.skillsTraining;
//                     req.session.otherAffiliation = user.otherAffiliation;
//                     req.session.emailAddress = user.emailAddress;
//                     req.session.mobileNumber = user.mobileNumber;
//                     req.session.currentAddress = user.currentAddress;
//                     req.session.emergencyContactPerson = user.emergencyContactPerson;
//                     req.session.emergencyContactNumber = user.emergencyContactNumber;
//                     req.session.dutyHours = user.dutyHours;
//                     req.session.fireResponsePoints = user.fireResponsePoints;
//                     req.session.inventoryPoints = user.inventoryPoints;
//                     req.session.activityPoints = user.activityPoints;
//                     req.session.accountType = user.accountType;

//                     res.status(200).json({ message: 'Login successful', accountType: user.accountType });
//                 } else {
//                     res.status(401).send('Invalid username or password');
//                 }
//             });
//         });
//     });

//     // Volunteer route
//     router.get('/volunteer', (req, res) => {
//         if (req.session.loggedin) {
//             res.sendFile(path.join(__dirname, '../public', 'volunteer_dashboard.html')); // Adjust path as needed
//         } else {
//             res.redirect('/');
//         }
//     });

//     // Profile route
//     router.get('/profile', (req, res) => {
//         if (req.session.loggedin) {
//             res.json({
//                 rfid: req.session.rfid,
//                 fullName: req.session.fullName,
//                 lastName: req.session.lastName,
//                 firstName: req.session.firstName,
//                 middleName: req.session.middleName,
//                 callSign: req.session.callSign,
//                 dateOfBirth: req.session.dateOfBirth,
//                 gender: req.session.gender,
//                 civilStatus: req.session.civilStatus,
//                 nationality: req.session.nationality,
//                 bloodType: req.session.bloodType,
//                 highestEducationalAttainment: req.session.highestEducationalAttainment,
//                 nameOfCompany: req.session.nameOfCompany,
//                 yearsInService: req.session.yearsInService,
//                 skillsTraining: req.session.skillsTraining,
//                 otherAffiliation: req.session.otherAffiliation,
//                 emailAddress: req.session.emailAddress,
//                 mobileNumber: req.session.mobileNumber,
//                 currentAddress: req.session.currentAddress,
//                 emergencyContactPerson: req.session.emergencyContactPerson,
//                 emergencyContactNumber: req.session.emergencyContactNumber,
//                 dutyHours: req.session.dutyHours,
//                 fireResponsePoints: req.session.fireResponsePoints,
//                 inventoryPoints: req.session.inventoryPoints,
//                 activityPoints: req.session.activityPoints,
//                 accountType: req.session.accountType,
//                 username: req.session.username
//             });
//         } else {
//             res.status(401).send('Not logged in');
//         }
//     });

//     // Return the router to be used in app.js
//     return router;
// };



const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path'); // Required for serving the HTML file
const router = express.Router();

module.exports = (db) => {

    // Register route
    router.post('/register', (req, res) => {
        const {
            rfid, username, password, accountType, lastName, firstName, middleName, middleInitial,
            callSign, currentAddress, dateOfBirth, civilStatus, gender, nationality, bloodType,
            mobileNumber, emailAddress, emergencyContactPerson, emergencyContactNumber,
            highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining,
            otherAffiliation, bioDataChecked, interviewChecked, fireResponsePoints, activityPoints,
            inventoryPoints, dutyHours
        } = req.body;

        // Check if the username already exists in the database
        const checkUsernameQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE username = ?';
        db.query(checkUsernameQuery, [username], (checkUsernameErr, checkUsernameResult) => {
            if (checkUsernameErr) {
                console.error('Error checking username:', checkUsernameErr);
                res.status(500).send('Error checking username');
                return;
            }

            if (checkUsernameResult[0].count > 0) {
                res.status(400).send('Username already exists');
                return;
            }

            // Check if the RFID already exists in the database
            const checkRfidQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE rfid = ?';
            db.query(checkRfidQuery, [rfid], (checkRfidErr, checkRfidResult) => {
                if (checkRfidErr) {
                    console.error('Error checking RFID:', checkRfidErr);
                    res.status(500).send('Error checking RFID');
                    return;
                }

                if (checkRfidResult[0].count > 0) {
                    res.status(400).send('RFID already exists');
                    return;
                }

                // Check if the email already exists in the database
                const checkEmailQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE emailAddress = ?';
                db.query(checkEmailQuery, [emailAddress], (checkEmailErr, checkEmailResult) => {
                    if (checkEmailErr) {
                        console.error('Error checking email:', checkEmailErr);
                        res.status(500).send('Error checking email');
                        return;
                    }

                    if (checkEmailResult[0].count > 0) {
                        res.status(400).send('Email already exists');
                        return;
                    }

                    // Hash the password and register the user
                    bcrypt.hash(password, 10, (hashErr, hash) => {
                        if (hashErr) {
                            console.error('Error hashing password:', hashErr);
                            res.status(500).send('Error hashing password');
                            return;
                        }

                        const sql = `
                            INSERT INTO tbl_accounts (
                                rfid, username, password, accountType, lastName, firstName, middleName,
                                middleInitial, callSign, currentAddress, dateOfBirth, civilStatus, gender,
                                nationality, bloodType, mobileNumber, emailAddress, emergencyContactPerson,
                                emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
                                yearsInService, skillsTraining, otherAffiliation, bioDataChecked, interviewChecked,
                                fireResponsePoints, activityPoints, inventoryPoints, dutyHours
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;

                        db.query(sql, [
                            rfid, username, hash, accountType, lastName, firstName, middleName, middleInitial,
                            callSign, currentAddress, dateOfBirth, civilStatus, gender, nationality, bloodType,
                            mobileNumber, emailAddress, emergencyContactPerson, emergencyContactNumber,
                            highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining,
                            otherAffiliation, bioDataChecked, interviewChecked, fireResponsePoints, activityPoints,
                            inventoryPoints, dutyHours
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
        });
    });

    // Login route
    router.post('/login', (req, res) => {
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
            const user = result[0];
            const hashedPassword = user.password;

            bcrypt.compare(password, hashedPassword, (compareErr, compareResult) => {
                if (compareErr) {
                    res.status(500).send('Error comparing passwords');
                    return;
                }
                if (compareResult) {
                    // Store only essential information in the session
                    req.session.loggedin = true;
                    req.session.accountID = user.accountID;
                    req.session.username = user.username;
                    req.session.accountType = user.accountType;

                    // Log session data to the console to confirm it's working
                    console.log('Session data:', req.session);

                    res.status(200).json({ message: 'Login successful', accountType: user.accountType });
                } else {
                    res.status(401).send('Invalid username or password');
                }
            });
        });
    });

    // Volunteer route (e.g., dashboard access)
    router.get('/volunteer', (req, res) => {
        if (req.session.loggedin && req.session.accountType === 'Volunteer') {
            res.sendFile(path.join(__dirname, '../public', 'volunteer_dashboard.html')); // Adjust path as needed
        } else {
            res.redirect('/');
        }
    });

    // Profile route: fetch user data based on accountID
    router.get('/profile', (req, res) => {
        if (req.session.loggedin) {
            const sql = 'SELECT * FROM tbl_accounts WHERE accountID = ?';
            db.query(sql, [req.session.accountID], (err, result) => {
                if (err) {
                    res.status(500).send('Error fetching profile data');
                    return;
                }
                if (result.length === 0) {
                    res.status(404).send('Profile not found');
                    return;
                }
                const user = result[0];
                res.json({
                    fullName: `${user.firstName} ${user.middleInitial}. ${user.lastName}`,
                    callSign: user.callSign,
                    emailAddress: user.emailAddress,
                    mobileNumber: user.mobileNumber,
                    accountType: user.accountType,
                    // Add other fields here as needed
                });
            });
        } else {
            res.status(401).send('Not logged in');
        }
    });

    return router;
};
