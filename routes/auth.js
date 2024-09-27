const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: './.env' });
const router = express.Router();



module.exports = (db) => {
    // Middleware to check if user is logged in and a volunteer
    const ensureVolunteerAuthenticated = (req, res, next) => {
        if (req.session.loggedin && req.session.accountType === 'Volunteer') {
            return next(); // User is authenticated and a volunteer
        } else {
            res.redirect('/index.html'); // Redirect to index.html if not authenticated
        }
    };

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
    router.post('/login', (req, res) => {
        const { username, password } = req.body;
    
        try {
            const sql = 'SELECT * FROM tbl_accounts WHERE username = ?';
            db.query(sql, [username], async (error, results) => {
                if (error) {
                    console.error('Error fetching user:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
    
                if (results.length === 0) {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
    
                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);
    
                if (isMatch) {
                    // Set the user in the session
                    req.session.user = { 
                        username: user.username,  
                        accountType: user.accountType 
                    };
    
                    //let redirectUrl = '/supervisor_dashboard'; // Default redirect
                    if (user.accountType === 'Admin') {
                        redirectUrl = '/admin_dashboard';
                    } else if (user.accountType === 'Supervisor') {
                        redirectUrl = '/supervisor_dashboard';
                    } else if (user.accountType === 'Volunteer') {
                        redirectUrl = '/volunteer_dashboard';
                    }
    
                    res.status(200).json({ message: 'Login successful!', redirectUrl });
                } else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            });
        } catch (err) {
            console.error('Error processing login:', err);
            res.status(500).json({ message: 'Error processing login' });
        }
    });

    router.get('/volunteer/profile', ensureVolunteerAuthenticated, (req, res) => {
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
    });

    // Logout route
    router.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error during logout:', err);
                return res.status(500).send('Unable to log out');
            }
            res.redirect('/index.html'); // Redirect to index.html after logout
        });
    });

    return router;
};

