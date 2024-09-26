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

 // Fetch volunteer profile data
router.get('/volunteer/profile', (req, res) => {
    if (req.session.loggedin && req.session.accountType === 'Volunteer') {
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
            const fullName = `${user.lastName}, ${user.firstName} ${user.middleName || ''}`;
            const formattedDate = new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            res.json({
                rfid: user.rfid,
                fullName: fullName.trim(),
                callSign: user.callSign,
                dateOfBirth: formattedDate,
                gender: user.gender,
                civilStatus: user.civilStatus,
                nationality: user.nationality,
                bloodType: user.bloodType,
                highestEducationalAttainment: user.highestEducationalAttainment,
                nameOfCompany: user.nameOfCompany,
                yearsInService: user.yearsInService,
                skillsTraining: user.skillsTraining,
                otherAffiliation: user.otherAffiliation,
                emailAddress: user.emailAddress,
                mobileNumber: user.mobileNumber,
                currentAddress: user.currentAddress,
                emergencyContactPerson: user.emergencyContactPerson,
                emergencyContactNumber: user.emergencyContactNumber,
                dutyHours: user.dutyHours,
                fireResponsePoints: user.fireResponsePoints,
                inventoryPoints: user.inventoryPoints,
                activityPoints: user.activityPoints,
                accountType: user.accountType
            });
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});



    return router;
};
