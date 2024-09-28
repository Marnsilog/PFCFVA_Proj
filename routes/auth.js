const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });
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
                        userId: user.accountID
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

    router.get('/profile', (req, res) => {
        const username = req.session.user?.username;
    
        console.log('Logged in username:', username); 
    
        if (!username) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    
        const query = `
            SELECT 
                rfid, 
                CONCAT(firstname, ' ', lastname) AS fullName, 
                callSign, 
                dateOfBirth, 
                gender, 
                civilStatus, 
                nationality, 
                bloodType, 
                highestEducationalAttainment, 
                nameOfCompany, 
                yearsInService, 
                skillsTraining, 
                otherAffiliation, 
                emailAddress, 
                mobileNumber, 
                currentAddress, 
                emergencyContactPerson, 
                emergencyContactNumber, 
                dutyHours, 
                fireResponsePoints, 
                inventoryPoints, 
                activityPoints 
            FROM tbl_accounts 
            WHERE username = ?`;
    
        //console.log('Executing query for username:', username); // Log before executing query
    
        db.query(query, [username], (error, results) => {
            if (error) {
                console.error('Error fetching profile data:', error);
                return res.status(500).json({ success: false, message: 'Server error' });
            }
    
            //console.log('Query Results:', results); // Log the results of the query
    
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: 'Profile not found' });
            }
    
            // Print the result of the database query
            //console.log('Profile data:', results[0]);
    
            res.json({ success: true, data: results[0] });
        });
    });

    // Route to get the logged-in username
    router.get('/getUsername', (req, res) => {
        if (req.session && req.session.user && req.session.user.username) {
            // Return the username from the session
            res.json({ username: req.session.user.username });
        } else {
            res.status(401).json({ error: 'User not logged in' });
        }
    });
    
    
    
    return router;
};

