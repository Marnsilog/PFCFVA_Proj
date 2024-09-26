const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Pass db object from app.js to auth.js
module.exports = (db) => {
    // Register Route
    router.post('/register', (req, res) => {
        const {
            rfid,
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

                    // If all details are unique, proceed with registration
                    bcrypt.hash(password, 10, (hashErr, hash) => {
                        if (hashErr) {
                            console.error('Error hashing password:', hashErr);
                            res.status(500).send('Error hashing password');
                            return;
                        }

                        const sql = `INSERT INTO tbl_accounts (
                            rfid,
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
                            rfid,
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
        });
    });

    // Login Route
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
                    req.session.rfid = user.rfid;
                    req.session.fullName = `${user.firstName} ${user.middleInitial} ${user.lastName}`;
                    req.session.callSign = user.callSign;
                    req.session.dateOfBirth = user.dateOfBirth;
                    req.session.gender = user.gender;
                    req.session.civilStatus = user.civilStatus;
                    req.session.nationality = user.nationality;
                    req.session.bloodType = user.bloodType;
                    req.session.emailAddress = user.emailAddress;
                    req.session.mobileNumber = user.mobileNumber;
                    req.session.currentAddress = user.currentAddress;
                    req.session.accountType = user.accountType;

                    res.status(200).json({ message: 'Login successful', accountType: user.accountType });
                } else {
                    res.status(401).send('Invalid username or password');
                }
            });
        });
    });

    // Profile Route
    router.get('/profile', (req, res) => {
        if (req.session.loggedin) {
            res.json({
                rfid: req.session.rfid,
                fullName: req.session.fullName,
                lastName: req.session.lastName,
                firstName: req.session.firstName,
                middleName: req.session.middleName,
                callSign: req.session.callSign,
                dateOfBirth: req.session.dateOfBirth,
                gender: req.session.gender,
                civilStatus: req.session.civilStatus,
                nationality: req.session.nationality,
                bloodType: req.session.bloodType,
                emailAddress: req.session.emailAddress,
                mobileNumber: req.session.mobileNumber,
                currentAddress: req.session.currentAddress,
                emergencyContactPerson: req.session.emergencyContactPerson,
                emergencyContactNumber: req.session.emergencyContactNumber,
                accountType: req.session.accountType,
                username: req.session.username
            });
        } else {
            res.status(401).send('Not logged in');
        }
    });

    return router;
};
