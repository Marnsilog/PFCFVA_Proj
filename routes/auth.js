const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });
const multer = require('multer');
const sharp = require('sharp');
const upload = multer(); 
const router = express.Router();
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer'); 
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const util = require('util');


cloudinary.config({
    cloud_name: 'duhumw72j',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = (db, db2) => {
const query = util.promisify(db.query).bind(db);
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
                return res.status(500).send('Error checking username');
            }
    
            if (checkUsernameResult[0].count > 0) {
                return res.status(400).send('Username already exists');
            }
    
            // Check if the RFID already exists in the database
            const checkRfidQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE rfid = ?';
            db.query(checkRfidQuery, [rfid], (checkRfidErr, checkRfidResult) => {
                if (checkRfidErr) {
                    console.error('Error checking RFID:', checkRfidErr);
                    return res.status(500).send('Error checking RFID');
                }
    
                if (checkRfidResult[0].count > 0) {
                    return res.status(400).send('RFID already exists');
                }
    
                // Check if the email already exists in the database
                const checkEmailQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE emailAddress = ?';
                db.query(checkEmailQuery, [emailAddress], (checkEmailErr, checkEmailResult) => {
                    if (checkEmailErr) {
                        console.error('Error checking email:', checkEmailErr);
                        return res.status(500).send('Error checking email');
                    }
    
                    if (checkEmailResult[0].count > 0) {
                        return res.status(400).send('Email already exists');
                    }
    
                    // Hash the password and register the user
                    bcrypt.hash(password, 10, (hashErr, hash) => {
                        if (hashErr) {
                            console.error('Error hashing password:', hashErr);
                            return res.status(500).send('Error hashing password');
                        }
    
                        const sql = `
                            INSERT INTO tbl_accounts (
                                rfid, username, password, accountType, lastName, firstName, middleName,
                                middleInitial, callSign, currentAddress, dateOfBirth, civilStatus, gender,
                                nationality, bloodType, mobileNumber, emailAddress, emergencyContactPerson,
                                emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
                                yearsInService, skillsTraining, otherAffiliation, bioDataChecked, interviewChecked,
                                fireResponsePoints, activityPoints, inventoryPoints, cumulativeDutyHours
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;
    
                        let tomins = dutyHours * 60;
    
                        db.query(sql, [
                            rfid, username, hash, accountType, lastName, firstName, middleName, middleInitial,
                            callSign, currentAddress, dateOfBirth, civilStatus, gender, nationality, bloodType,
                            mobileNumber, emailAddress, emergencyContactPerson, emergencyContactNumber,
                            highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining,
                            otherAffiliation, bioDataChecked, interviewChecked, fireResponsePoints, activityPoints,
                            inventoryPoints, tomins
                        ], (err, result) => {
                            if (err) {
                                console.error('Error registering user:', err);
                                return res.status(500).send('Error registering user');
                            }
    
                            // Insert notification
                            const notificationQuery = `
                                INSERT INTO tbl_notification (detail, target, created_by, created_at)
                                VALUES ("New account created", ?, "Pfcfva System", NOW())
                            `;
                            db.query(notificationQuery, [username], (notifErr) => {
                                if (notifErr) {
                                    console.error('Error inserting notification:', notifErr);
                                    return res.status(500).send('User registered but notification failed');
                                }
    
                                res.status(200).send('User registered successfully');
                            });
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
                    req.session.user = { 
                        username: user.username, 
                        userId: user.accountID,
                        permission: user.accountType,
                        profilePicPath: user.idPicture 
                    };
                    console.log(`${user.username} has logged into the server`);
                    //console.log(user.idPicture);
                    let redirectUrl;
                    if (user.accountType === 'Admin') {
                        redirectUrl = '/admin_dashboard';
                    } else if (user.accountType === 'Supervisor') {
                        redirectUrl = '/supervisor_dashboard';
                    } else if (user.accountType === 'Volunteer') {
                        redirectUrl = '/volunteer_dashboard';
                    }
    
                    // Include the profilePicPath in the response
                    res.status(200).json({ 
                        message: 'Login successful!', 
                        redirectUrl,
                        profilePicPath: user.idPicture 
                    });
                } else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            });
        } catch (err) {
            console.error('Error processing login:', err);
            res.status(500).json({ message: 'Error processing login' });
        }
    });
    router.post('/loginAttendance', (req, res) => {
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
    
                // Check if the user is the admin
                if (isMatch && user.accountType === 'Admin') {
                    req.session.user = { 
                        username: user.username, 
                        userId: user.accountID,
                        permission: user.accountType,
                    };
                    console.log(`${user.username} has logged into the server`);
                    
                    // Redirect to the admin dashboard
                    return res.status(200).json({ 
                        message: 'Login successful!', 
                        redirectUrl: '/attendance_dashboard',
                    });
                } else {
                    res.status(401).json({ message: 'Access denied: only admins can log in' });
                }
            });
        } catch (err) {
            console.error('Error processing login:', err);
            res.status(500).json({ message: 'Error processing login' });
        }
    });
    
    router.get('/get-user-data', (req, res) => {
        const username = req.session.user?.username;
    
        if (!username) {
            return res.status(400).send('User not found in session');
        }
    
        const query = 'SELECT * FROM tbl_accounts WHERE username = ?';
        db.query(query, [username], (err, result) => {
            if (err) {
                console.error('Error fetching user data:', err);
                return res.status(500).send('Error fetching user data');
            }
            if (result.length === 0) {
                return res.status(404).send('User not found');
            }
    
            const { password, ...userData } = result[0]; // Exclude password
            res.json(userData); // Send user data without password
        });
    });
    router.get('/get-volunteer-data/:accountID', (req, res) => {
        const accountID = req.params.accountID; 
        console.log(`Fetching data for accountID: ${accountID}`);  // Add logging here
    
        if (!accountID) {
            return res.status(400).send('Volunteer account ID is required');
        }
    
        const query = 'SELECT * FROM tbl_accounts WHERE accountID = ?';
        db.query(query, [accountID], (err, result) => {
            if (err) {
                console.error('Error fetching volunteer data from DB:', err);
                return res.status(500).send('Error fetching volunteer data');
            }
            if (result.length === 0) {
                return res.status(404).send('Volunteer not found');
            }
    
            const { password, ...volunteerData } = result[0]; 
            //console.log('Fetched volunteer data:', volunteerData);  // Log the result
            res.json(volunteerData); 
        });
    });
    
    router.post('/edit-volunteer', async (req, res) => {
        try {
            const {
                accountType, username2, lastName, firstName, middleName, emailAddress, contactNumber,
                oldPassword, newPassword, civilStatus, nationality, bloodType,
                birthday, gender, currentAddress, emergencyContactPerson,
                emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
                yearsInService, skillsTraining, otherAffiliation, inventoryPoints, activityPoints, fireResponse, dutyHours
            } = req.body;
    
            const username = req.body.username;
    
            const checkUsernameQuery = 'SELECT * FROM tbl_accounts WHERE username = ?';
            db.query(checkUsernameQuery, [username], (checkUsernameErr, checkUsernameResult) => {
                if (checkUsernameErr) {
                    console.error('Error checking username:', checkUsernameErr);
                    return res.status(500).send({ success: false, message: 'Error checking username' });
                }
    
                if (checkUsernameResult.length === 0) {
                    return res.status(400).send({ success: false, message: 'User not found' });
                }
    
                const user = checkUsernameResult[0];
                let profilePicturePath = user.idPicture;
    
                // Handling password update
                if (oldPassword) {
                    bcrypt.compare(oldPassword, user.password, (compareErr, isMatch) => {
                        if (compareErr || !isMatch) {
                            return res.status(400).send({ success: false, message: 'Old password is incorrect' });
                        }
    
                        if (newPassword) {
                            bcrypt.hash(newPassword, 10, (hashErr, hash) => {
                                if (hashErr) {
                                    console.error('Error hashing new password:', hashErr);
                                    return res.status(500).send({ success: false, message: 'Error hashing new password' });
                                }
                                handleProfilePictureUpdate(hash);
                            });
                        } else {
                            handleProfilePictureUpdate(user.password);
                        }
                    });
                } else {
                    handleProfilePictureUpdate(user.password);
                }
    
                // Function to handle profile picture upload and update profile
                function handleProfilePictureUpdate(password) {
                    if (req.files && req.files.profilePicture) {
                        const profilePicture = req.files.profilePicture;
                        const uniqueFileName = `${username}_${Date.now()}_${profilePicture.name}`;
                        const uploadDir = path.join(__dirname, '../profilePicture');
                        const uploadPath = path.join(uploadDir, uniqueFileName);
    
                        // Ensure the directory exists
                        if (!fs.existsSync(uploadDir)) {
                            fs.mkdirSync(uploadDir, { recursive: true });
                        }
    
                        // Log and move the file
                        profilePicture.mv(uploadPath, (err) => {
                            if (err) {
                                console.error('Error moving file:', err);
                                return res.status(500).send({ success: false, message: 'Error saving profile picture' });
                            }
    
                            profilePicturePath = `profilePicture/${uniqueFileName}`;
                            updateUserDetails(password, profilePicturePath); // Update with new picture
                        });
                    } else {
                        updateUserDetails(password, profilePicturePath); // Update without new picture
                    }
                }
    
                const dutyHoursInMinutes = dutyHours ? Math.round(dutyHours * 60) : '';
                // Function to execute the update query
                function updateUserDetails(password, profilePicturePath) {
                    const updateQuery = `
                        UPDATE tbl_accounts SET accountType = ?, username = ?, lastName = ?, firstName = ?, 
                            middleName = ?, emailAddress = ?, 
                            mobileNumber = ?, password = ?, 
                            civilStatus = ?, nationality = ?, 
                            bloodType = ?, dateOfBirth = ?, 
                            gender = ?, currentAddress = ?, 
                            emergencyContactPerson = ?, emergencyContactNumber = ?, 
                            highestEducationalAttainment = ?, nameOfCompany = ?, 
                            yearsInService = ?, skillsTraining = ?, 
                            otherAffiliation = ?, idPicture = ?, 
                            cumulativeDutyHours = ROUND(?*60), fireResponsePoints = ?,
                            activityPoints = ?, inventoryPoints = ?
                        WHERE username = ?
                    `;
    
                    const values = [
                        accountType, username2, lastName, firstName, middleName, emailAddress, contactNumber,
                        password, civilStatus, nationality, bloodType,
                        birthday, gender, currentAddress, emergencyContactPerson,
                        emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
                        yearsInService, skillsTraining, otherAffiliation,
                        profilePicturePath, dutyHours, fireResponse, activityPoints, inventoryPoints,
                        username
                    ];
    
                    db.query(updateQuery, values, (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error('Error updating profile:', updateErr);
                            return res.status(500).send({ success: false, message: 'Error updating profile' });
                        }
                        res.redirect('/admin_volunteer_configuration');
                    });
                }
            });
        } catch (error) {
            console.error('Unexpected error:', error);
            res.status(500).send({ success: false, message: 'An unexpected error occurred' });
        }
    });
    
    router.post('/edit-profile', async (req, res) => {
        const {
            lastName, firstName, middleName, emailAddress, contactNumber,
            oldPassword, newPassword, civilStatus, nationality, bloodType,
            birthday, gender, currentAddress, emergencyContactPerson,
            emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
            yearsInService, skillsTraining, otherAffiliation
        } = req.body;
    
        const username = req.session.user?.username;
        if (!username) {
            return res.status(400).send('User not found in session');
        }
    
        const checkUsernameQuery = 'SELECT * FROM tbl_accounts WHERE username = ?';
        db.query(checkUsernameQuery, [username], (checkUsernameErr, checkUsernameResult) => {
            if (checkUsernameErr) {
                console.error('Error checking username:', checkUsernameErr);
                return res.status(500).send({ success: false, message: 'Error checking username' });
            }
    
            if (checkUsernameResult.length === 0) {
                return res.status(400).send({ success: false, message: 'User not found' });
            }
    
            const user = checkUsernameResult[0];
            let profilePicturePath = user.idPicture;
            if (oldPassword) {
                bcrypt.compare(oldPassword, user.password, (compareErr, isMatch) => {
                    if (compareErr || !isMatch) {
                        return res.status(400).send({ success: false, message: 'Old password is incorrect' });
                    }
    
                    if (newPassword) {
                        bcrypt.hash(newPassword, 10, (hashErr, hash) => {
                            if (hashErr) {
                                console.error('Error hashing new password:', hashErr);
                                return res.status(500).send({ success: false, message: 'Error hashing new password' });
                            }
                            handleProfilePictureUpdate(hash);
                        });
                    } else {
                        handleProfilePictureUpdate(user.password);
                    }
                });
            } else {
                handleProfilePictureUpdate(user.password);
            }
    
            async function handleProfilePictureUpdate(password) {
                if (req.files && req.files.profilePicture) {
                    const profilePicture = req.files.profilePicture;
                    const uniqueFileName = `${username}_${Date.now()}_${profilePicture.name}`;
                    const uploadDir = path.join(__dirname, '../profilePicture');
                    const uploadPath = path.join(uploadDir, uniqueFileName);
    
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, { recursive: true });
                    }
    
                    try {
                        await sharp(profilePicture.data)
                            .resize({ width: 500 }) 
                            .toFormat('jpeg', { quality: 60 })
                            .toFile(uploadPath);
                        
                        profilePicturePath = `profilePicture/${uniqueFileName}`;
                        updateUserDetails(password, profilePicturePath); // Update with new picture
                    } catch (err) {
                        console.error('Error processing image:', err);
                        return res.status(500).send({ success: false, message: 'Error processing image' });
                    }
                } else {
                    updateUserDetails(password, profilePicturePath); // Update without new picture
                }
            }
    
            // Function to execute the update query
            function updateUserDetails(password, profilePicturePath) {
                const updateQuery = `
                    UPDATE tbl_accounts SET 
                        lastName = ?, 
                        firstName = ?, 
                        middleName = ?, 
                        emailAddress = ?, 
                        mobileNumber = ?, 
                        password = ?, 
                        civilStatus = ?, 
                        nationality = ?, 
                        bloodType = ?, 
                        dateOfBirth = ?, 
                        gender = ?, 
                        currentAddress = ?, 
                        emergencyContactPerson = ?, 
                        emergencyContactNumber = ?, 
                        highestEducationalAttainment = ?, 
                        nameOfCompany = ?, 
                        yearsInService = ?, 
                        skillsTraining = ?, 
                        otherAffiliation = ?, 
                        idPicture = ? 
                    WHERE username = ?
                `;
    
                const values = [
                    lastName, firstName, middleName, emailAddress, contactNumber,
                    password, civilStatus, nationality, bloodType,
                    birthday, gender, currentAddress, emergencyContactPerson,
                    emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
                    yearsInService, skillsTraining, otherAffiliation,
                    profilePicturePath,
                    username
                ];
    
                db.query(updateQuery, values, (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error('Error updating profile:', updateErr);
                        return res.status(500).send({ success: false, message: 'Error updating profile' });
                    }
                    let accountType = req.session.user.permission;
                    if (accountType === 'Admin') {
                        res.redirect('/admin_main_profile');
                    } else if (accountType === 'Supervisor') {
                        res.redirect('/supervisor_main_profile');
                    } else if (accountType === 'Volunteer') {
                        res.redirect('/volunteer_main_profile');
                    }
                });
            }
        });
    });

    router.get('/get-profilePic', (req, res) => {
        const username = req.session.user?.username;
    
        if (!username) {
            return res.status(400).json({ success: false, message: "User not logged in." });
        }
    
        const query = 'SELECT idPicture AS profile_pic FROM tbl_accounts WHERE username = ?';
        db.query(query, [username], (error, results) => {
            if (error) {
                console.error('Error fetching user data:', error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
    
            const profilePicPath = results[0]?.profile_pic || 'img/user.png';
            res.json({ success: true, profilePicPath });
        });
    });
    router.get('/dashboard-data', (req, res) => {
    const username = req.session.user?.username;
    if (!username) {
        console.log('Unauthorized access attempt'); 
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const query = `SELECT accountType, CONCAT(firstname, ' ', lastname) AS fullName, 
                          FLOOR(cumulativeDutyHours / 60) AS dutyHours, fireResponsePoints, inventoryPoints, activityPoints
                   FROM tbl_accounts WHERE username = ?`;
    db.query(query, [username], (error, results) => {
        if (error) {
            console.error('Error fetching profile data:', error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        if (results.length === 0) {
            console.log('No profile found for username:', username); 
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        res.json({ success: true, data: results[0] });
    });
    });

    router.get('/profile', (req, res) => {
        const username = req.session.user?.username;
    
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
                FLOOR(cumulativeDutyHours / 60) AS dutyHours, -- Round down to the nearest hour
                fireResponsePoints, 
                inventoryPoints, 
                activityPoints,
                idPicture 
            FROM tbl_accounts 
            WHERE username = ?`;
    
        db.query(query, [username], (error, results) => {
            if (error) {
                console.error('Error fetching profile data:', error);
                return res.status(500).json({ success: false, message: 'Server error' });
            }
    
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: 'Profile not found' });
            }
            res.json({ success: true, data: results[0] });
        });
    });
    
    router.get('/getUsername', (req, res) => {
        if (req.session && req.session.user && req.session.user.username) {
            // Return the username from the session
            res.json({ username: req.session.user.username });
        } else {
            res.status(401).json({ error: 'User not logged in' });
        }
    });
    router.get('/volunteers', (req, res) => {
        const search = req.query.search || ''; 
        const query = `
            SELECT accountID AS id, firstName AS name, FLOOR(dutyHours / 60) AS points
            FROM tbl_accounts 
            WHERE firstName LIKE ? OR lastName LIKE ? OR accountID LIKE ? OR username LIKE ? OR accountType LIKE ? OR callSign LIKE ? OR gender LIKE ?
            ORDER BY dutyHours DESC
        `;
    
        // Prepare the search pattern for SQL LIKE
        const searchPattern = `%${search}%`;
    
        db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern], (err, results) => {
            if (err) {
                console.error('Error fetching volunteer data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    
    router.get('/volunteer/:id', (req, res) => {
        const volunteerId = req.params.id;
        if (isNaN(volunteerId)) {
            return res.status(400).json({ error: 'Invalid volunteer ID' });
        }
        const query = `
            SELECT accountID AS id, firstName AS name, FLOOR(dutyHours / 60) AS dutyHours, callSign,
                fireResponsePoints, inventoryPoints, activityPoints, 
                idPicture AS profile_pic FROM tbl_accounts WHERE accountID = ?`;
    
        db.query(query, [volunteerId], (err, results) => {
            if (err) {
                console.error('Error fetching volunteer details:', err);
                return res.status(500).json({ error: 'Error fetching details' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Volunteer not found' });
            }
            const profilePicPath = results[0]?.profile_pic
                ? `${results[0].profile_pic}`
                : 'img/user.png';
    
            // Send the volunteer details including the profile picture path
            const volunteerDetails = {
                id: results[0].id,
                name: results[0].name,
                dutyHours: results[0].dutyHours,
                fireResponsePoints: results[0].fireResponsePoints,
                inventoryPoints: results[0].inventoryPoints,
                activityPoints: results[0].activityPoints,
                callSign: results[0].callSign,
                image: profilePicPath  
            };
    
            res.json(volunteerDetails);
        });
    });
    
    router.get('/fireresponse', (req, res) => {
        const searchTerm = req.query.search || ''; // Get search term from query parameter
        const query = `
            SELECT accountID AS id, firstName AS name, fireResponsePoints AS points 
            FROM tbl_accounts 
            WHERE firstName LIKE ? OR lastName LIKE ? OR accountID LIKE ? OR username LIKE ? OR accountType LIKE ? OR callSign LIKE ? OR gender LIKE ?
            ORDER BY fireResponsePoints DESC
        `;
        
        const searchPattern = `%${searchTerm}%`; // Prepare the search pattern for SQL LIKE
    
        db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern], (err, results) => {
            if (err) {
                console.error('Error fetching fire response data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    
    router.get('/fireresponse/:id', (req, res) => {
        const volunteerId = req.params.id;
        if (isNaN(volunteerId)) {
            return res.status(400).json({ error: 'Invalid volunteer ID' });
        }
        const query = `
            SELECT accountID AS id, firstName AS name, FLOOR(dutyHours / 60) AS dutyHours, callSign,
                fireResponsePoints, inventoryPoints, activityPoints, 
                idPicture AS profile_pic FROM tbl_accounts WHERE accountID = ?`;
    
        db.query(query, [volunteerId], (err, results) => {
            if (err) {
                console.error('Error fetching volunteer details:', err); 
                return res.status(500).json({ error: 'Error fetching details' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Volunteer not found' });
            }
            const profilePicPath = results[0]?.profile_pic
                ? `${results[0].profile_pic}`
                : 'img/user.png';
    
            // Send the volunteer details including the profile picture path
            const volunteerDetails = {
                id: results[0].id,
                name: results[0].name,
                dutyHours: results[0].dutyHours,
                fireResponsePoints: results[0].fireResponsePoints,
                inventoryPoints: results[0].inventoryPoints,
                activityPoints: results[0].activityPoints,
                callSign: results[0].callSign,
                image: profilePicPath  
            };
    
            res.json(volunteerDetails);
        });
    });
    router.post('/add-vehicle', (req, res) => {
        const { vehicleName } = req.body;
    
        // SQL query to insert the vehicle name into the database
        const sql = 'INSERT INTO tbl_vehicles (vehicleName) VALUES (?)';
    
        db.query(sql, [vehicleName], (error, results) => {
            if (error) {
                console.error('Error inserting vehicle:', error);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            return res.status(200).json({ success: true, message: 'Vehicle added successfully' });
        });
    });

    //FOR VOLUNTEER
    router.get('/inventory', (req, res) => {
        const { sortVehicle } = req.query; // Get sorting option from query parameters
        let query = "SELECT itemID AS id, itemName AS name, itemImage, Status FROM tbl_inventory WHERE itemStatus = 'Available'";
    
        if (sortVehicle) {
            query += ` AND vehicleAssignment = '${sortVehicle}'`; // Filter by vehicle name if provided
        }
    
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching inventory data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    router.get('/inventory-search', (req, res) => {
        try {
            const search = req.query.search || ''; 
    
            const query = `
                SELECT itemID AS id, itemName AS name, itemImage, Status FROM tbl_inventory 
                WHERE itemName LIKE ? OR vehicleAssignment LIKE ? OR status LIKE ? OR itemStatus LIKE ?
            `;
    
            const searchParam = `%${search}%`; 
    
            db.query(query, [searchParam, searchParam, searchParam, searchParam], (err, results) => {
                if (err) {
                    console.error('Error fetching inventory:', err);
                    return res.status(500).json({ error: 'Failed to fetch inventory' });
                }
    
                res.json(results); 
            });
        } catch (error) {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    });
    
    router.post('/inventory/log', async (req, res) => {
        const items = req.body; 
        const username = req.session.user?.username; 
        let ischanged = false; // Use let since this is modified later
        let connection;
        
        try {
            connection = await db2.getConnection(); 
            await connection.beginTransaction();
            
            const [dateExpirationResult] = await connection.query(
                'SELECT dateinvExpiration FROM tbl_accounts WHERE username = ?', 
                [username]
            );
    
            let dateExpiration = dateExpirationResult[0]?.dateinvExpiration;
            //console.log('Date Expiration:', dateExpiration);
            const expirationDate = dateExpiration ? new Date(dateExpiration) : null;
            const currentTime = new Date();
            const twentyFourHoursAgo = new Date(currentTime.getTime() - 1 * 60 * 60 * 1000); 
            let vehicle = items[0].vehicleAssignment ? items[0].vehicleAssignment : 'All Vehicle';
            if (!dateExpiration || expirationDate <= twentyFourHoursAgo) {
                for (const item of items) {
                    const { itemID, status, remarks } = item;
                
                    const [currentStatusResult] = await connection.query(
                        'SELECT Status FROM tbl_inventory WHERE itemID = ?', 
                        [itemID]
                    );
    
                    const currentStatus = currentStatusResult[0]?.Status;
                    if ((status === 'damaged' || status === 'missing' || status === 'good') && currentStatus !== status) {
                        await connection.query(
                            `INSERT INTO tbl_inventory_logs (itemID, accountID, changeLabel, changeFrom, changeTo, dateAndTimeChecked, remarks, vehicleAssignment) 
                            VALUES (?, (SELECT accountID FROM tbl_accounts WHERE username = ?), 'change status', ?, ?, NOW(), ?, ?)`, 
                            [itemID, username, currentStatus, status, remarks, vehicle]
                        );
                        await connection.query(
                            'UPDATE tbl_inventory SET Status = ? WHERE itemID = ?', 
                            [status, itemID]
                        );
                        ischanged = true; // Set to true if any changes occur
                    }
                }
    
                if (!ischanged) {
                    await connection.query(
                        `INSERT INTO tbl_inventory_logs (accountID, changeLabel, dateAndTimeChecked, vehicleAssignment) 
                        VALUES ((SELECT accountID FROM tbl_accounts WHERE username = ?), 'All Equipment are good', NOW(), ?)`, 
                        [username, vehicle]
                    );
                    await connection.query(
                        'INSERT INTO tbl_notification (detail, target, created_by, created_at) VALUES ("All equipments are good", "Admin", (SELECT accountID FROM tbl_accounts WHERE username = ?), NOW())',
                        [username]
                    );
                }else{
                    await connection.query(
                        'INSERT INTO tbl_notification (detail, target, created_by, created_at) VALUES ("Equipment status changed", "Admin", (SELECT accountID FROM tbl_accounts WHERE username = ?), NOW())',
                        [username]
                    );
                }
                await connection.query( 
                    'UPDATE tbl_accounts SET inventoryPoints = inventoryPoints + 1, dateinvExpiration = NOW() WHERE username = ?', 
                    [username]
                );
    
                await connection.commit();
                res.json({ message: 'Inventory statuses updated and logs created where applicable.', redirect: '/volunteer_form_inv' });
            } else {
                // If 24 hours haven't passed, prevent further logs
                await connection.query(
                    'UPDATE tbl_accounts SET inventoryPoints = inventoryPoints + 1, dateinvExpiration = NOW() WHERE username = ?', 
                    [username]
                );
                res.status(403).json({ message: 'Please wait 24 hours before logging inventory again.' });
            }
            
        } catch (err) {
            console.error('Database error:', err);
            
            // Rollback the transaction if any operation fails
            if (connection) await connection.rollback();
            res.status(500).json({ message: 'Server error' });
        } finally {
            if (connection) connection.release(); // Ensure connection is released
        }
    });
    
    router.post('/markNotificationRead/:notificationId', (req, res) => {
        const notificationId = req.params.notificationId;
        const username = req.session.user?.username;
    
        if (!username) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    
        // Check if the notification log already exists
        const checkQuery = `SELECT * FROM tbl_notification_logs 
                            WHERE notification_id = ? 
                            AND accountID = (SELECT accountID FROM tbl_accounts WHERE username = ?)`;
    
        db.query(checkQuery, [notificationId, username], (err, results) => {
            if (err) {
                console.error('Error checking notification log:', err);
                return res.status(500).json({ success: false, message: 'Error checking notification log' });
            }
    
            // If the log exists, respond with success and do not insert
            if (results.length > 0) {
                return res.json({ success: true }); // No new log inserted, but success
            }
    
            // If the log does not exist, insert a new record
            const insertQuery = `INSERT INTO tbl_notification_logs (notification_id, accountID) 
                                 VALUES (?, (SELECT accountID FROM tbl_accounts WHERE username = ?))`;
            
            db.query(insertQuery, [notificationId, username], (err, results) => {
                if (err) {
                    console.error('Error marking notification as read:', err);
                    return res.status(500).json({ success: false, message: 'Error marking notification as read' });
                }
                
                // Respond back with success
                res.json({ success: true });
            });
        });
    });
    
    router.get('/notification', (req, res) => {
        const username = req.session.user?.username; 
        const permission = req.session.user?.permission;
        const query = `SELECT n.notification_id, 
                        n.detail, 
                        DATE_FORMAT(n.created_at, '%H:%i') AS created_time, 
                        DATE_FORMAT(n.created_at, '%m/%d/%Y') AS created_date,
                        (SELECT CONCAT(a.firstName, ' ', a.lastName) FROM tbl_accounts a 
                        WHERE a.accountID = n.created_by) AS created_by, 
                        IF(l.notification_id IS NULL, 'unread', 'read') AS status
                    FROM tbl_notification n 
                    LEFT JOIN tbl_notification_logs l ON l.notification_id = n.notification_id
                    WHERE n.target = ? OR n.target = ? 
                    ORDER BY n.created_at DESC 
                    LIMIT 0, 25;
                    `;
    
        db.query(query, [permission, username], (err, results) => {
            if (err) {
                console.error('Error fetching notification data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            //console.log(results);
            res.json(results);
        });
    });

    router.get('/inventory2', (req, res) => {
        const username = req.session.user?.username; 
        const search = req.query.search || ''; 
    
        const query = `
                SELECT il.itemID,
                    il.logID, 
                    DATE_FORMAT(il.dateAndTimeChecked, '%Y-%m-%d') AS checked_date,  
                    DATE_FORMAT(il.dateAndTimeChecked, '%H:%i:%s') AS checked_time, 
                    iv.vehicleAssignment AS vehicle
                FROM tbl_inventory_logs il
                JOIN tbl_inventory iv ON iv.ItemID = il.itemID
                WHERE il.accountID = (SELECT accountID FROM tbl_accounts WHERE username = ?)
                AND (iv.vehicleAssignment LIKE ? OR il.itemID LIKE ?) 
                GROUP BY DATE(il.dateAndTimeChecked) -- Group by the date part
                ORDER BY il.dateAndTimeChecked DESC 
                LIMIT 0, 25;`;
        db.query(query, [username, `%${search}%`, `%${search}%`], (err, results) => {
            if (err) {
                console.error('Error fetching inventory data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    router.get('/inventory2/detail/:checked_date', (req, res) => {
        const checked_date = req.params.checked_date;
        console.log(checked_date);
        const username = req.session.user?.username; 
    
        // Use DATE() to compare only the date part
        const query = `
            SELECT il.itemID, i.itemName, il.changeFrom, il.changeTo
            FROM tbl_inventory_logs il
            JOIN tbl_inventory i ON il.itemID = i.itemID
            WHERE DATE(il.dateAndTimeChecked) = ? AND il.accountID = (select accountID from tbl_accounts where username = ?);
        `;
    
        // Combine parameters into a single array
        db.query(query, [checked_date, username], (err, results) => {
            if (err) {
                console.error('Error fetching inventory details:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    //FOR SUPERVISOR INV
    router.get('/inventory-supervisor', (req, res) => {
        const vehicleAssignment = req.query.vehicleAssignment; 
        let query = "SELECT itemId, itemName, itemImage, vehicleAssignment FROM tbl_inventory WHERE itemStatus = 'Available'";
        if (vehicleAssignment && vehicleAssignment !== '') {
            query += " AND vehicleAssignment = ?";
        }
    
        db.query(query, vehicleAssignment ? [vehicleAssignment] : [], (err, results) => {
            if (err) {
                console.error('Error fetching inventory data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    //__search INV
    router.get('/inventory-supervisor-search', (req, res) => {
        const search = req.query.search || '';
        const vehicleAssignment = req.query.vehicleAssignment || ''; 
        const vehicleStat = req.query.vehicleStat || '';
        //console.log(vehicleAssignment);
        const searchParam = `%${search}%`;
        let query = `
            SELECT itemId, itemName, itemImage, vehicleAssignment
            FROM tbl_inventory
            WHERE (itemName LIKE ? OR status LIKE ?)
            AND itemStatus = 'Available'
        `;
        const params = [searchParam, searchParam];
    
        // Add vehicleAssignment condition only if it's provided
        if (vehicleAssignment) {
            query += ' AND vehicleAssignment = ?';
            params.push(vehicleAssignment);
        }
        if (vehicleStat) {
            query += ' AND status = ?';
            params.push(vehicleStat);
        }
    
        db.query(query, params, (err, results) => {
            if (err) {
                console.error('Error fetching inventory data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    router.post('/inventory-supervisor/log', async (req, res) => {
        const items = req.body;
        let ischanged = false;
        const username = req.session.user?.username;
        let connection;
    
        try {
            connection = await db2.getConnection();
            await connection.beginTransaction();
    
            // Fetch the date of the last inventory expiration for the user
            const [dateExpirationResult] = await connection.query(
                'SELECT dateinvExpiration FROM tbl_accounts WHERE username = ?',
                [username]
            );
            let dateExpiration = dateExpirationResult[0]?.dateinvExpiration;
            console.log('Date Expiration:', dateExpiration);
    
            const expirationDate = dateExpiration ? new Date(dateExpiration) : null;
            const currentTime = new Date();
            const twentyFourHoursAgo = new Date(currentTime.getTime() - 1 * 60 * 60 * 1000); 
            let vehicle = items[0].vehAss ? items[0].vehAss : 'All Vehicle';
            if (!dateExpiration || expirationDate <= twentyFourHoursAgo) {
                for (const item of items) {
                    const { itemID, vehicleAssignment } = item;
    
                    // Fetch current vehicle assignment for the item
                    const [currentVehicleAssignmentResult] = await connection.query(
                        'SELECT vehicleAssignment FROM tbl_inventory WHERE itemID = ?',
                        [itemID]
                    );
                    const currentVehicleAssignment = currentVehicleAssignmentResult[0]?.vehicleAssignment;
    
                    // Log and update the vehicle assignment if it has changed
                    if (currentVehicleAssignment !== vehicleAssignment) {
                        await connection.query(
                            `INSERT INTO tbl_inventory_logs (itemID, accountID, changeLabel, changeFrom, changeTo, dateAndTimeChecked, vehicleAssignment) 
                            VALUES (?, (SELECT accountID FROM tbl_accounts WHERE username = ?), 'change truckAssignment', ?, ?, NOW(), ?)`,
                            [itemID, username, currentVehicleAssignment, vehicleAssignment, vehicle]
                        );
                        await connection.query(
                            'UPDATE tbl_inventory SET vehicleAssignment = ? WHERE itemID = ?',
                            [vehicleAssignment, itemID]
                        );
                        ischanged = true;
                    }
                }

                if (!ischanged) {
                    await connection.query(
                        `INSERT INTO tbl_inventory_logs (accountID, changeLabel, dateAndTimeChecked, vehicleAssignment) 
                        VALUES ((SELECT accountID FROM tbl_accounts WHERE username = ?), 'All Equipment are good', NOW(), ?)`, 
                        [username, vehicle]
                    );
                    await connection.query(
                        'INSERT INTO tbl_notification (detail, target, created_by, created_at) VALUES ("All equipments are good", "Admin", (SELECT accountID FROM tbl_accounts WHERE username = ?), NOW())',
                        [username]
                    );
                }else{
                    await connection.query(
                        'INSERT INTO tbl_notification (detail, target, created_by, created_at) VALUES ("Equipment vehicle transfered", "Admin", (SELECT accountID FROM tbl_accounts WHERE username = ?), NOW())',
                        [username]
                    );
                }
    
                // Update inventory points and expiration date
                await connection.query(
                    'UPDATE tbl_accounts SET inventoryPoints = inventoryPoints + 1, dateinvExpiration = NOW() WHERE username = ?', 
                    [username]
                );
                
                await connection.commit();
                res.json({ message: 'Inventory vehicle assignments updated and logs created where applicable.', redirect: '/supervisor_inventory_report' });
            } else {
                await connection.query(
                    'UPDATE tbl_accounts SET inventoryPoints = inventoryPoints + 1, dateinvExpiration = NOW() WHERE username = ?', 
                    [username]
                );
                res.status(403).json({ message: 'Please wait 24 hours before logging inventory again.' });
            }
    
        } catch (err) {
            console.error('Database error:', err);
            if (connection) await connection.rollback();
            res.status(500).json({ message: 'Server error' });
        } finally {
            if (connection) connection.release();
        }
    });
    
    router.get('/admin-inventory/log', (req, res) => {
        const query = `SELECT i.itemImage AS image, i.itemName AS item, 
                CONCAT(a.firstName, ' ', a.lastName) AS volunteer_name, 
                DATE_FORMAT(il.dateAndTimeChecked, '%Y-%m-%d') AS checked_date,  
                DATE_FORMAT(il.dateAndTimeChecked, '%H:%i:%s') AS checked_time, 
                iv.vehicleAssignment AS vehicle, 
                il.changeFrom AS from_vehicle, 
                il.changeTo AS change_to, 
                il.remarks 
            FROM tbl_inventory_logs il
            JOIN tbl_inventory i ON i.itemID = il.itemID 
            JOIN tbl_accounts a ON a.accountID = il.accountID
            LEFT JOIN tbl_inventory iv ON iv.itemID = il.itemID
            WHERE il.changeLabel = 'change status'
            ORDER BY il.dateAndTimeChecked DESC
            LIMIT 50`;
    
        db.query(query, (err, results) => {
            if (err) throw err;
            //console.log(results); // Log the results to see if data is retrieved
            res.json(results);
        });
    });
    router.get('/admin-inventory/log2', (req, res) => {
        const query = `SELECT i.itemImage AS image, i.itemName AS item, 
                CONCAT(a.firstName, ' ', a.lastName) AS volunteer_name, 
                DATE_FORMAT(il.dateAndTimeChecked, '%Y-%m-%d') AS checked_date,  
                DATE_FORMAT(il.dateAndTimeChecked, '%H:%i:%s') AS checked_time, 
                iv.vehicleAssignment AS vehicle, 
                il.changeFrom AS from_vehicle, 
                il.changeTo AS change_to, 
                il.remarks 
            FROM tbl_inventory_logs il
            JOIN tbl_inventory i ON i.itemID = il.itemID 
            JOIN tbl_accounts a ON a.accountID = il.accountID
            LEFT JOIN tbl_inventory iv ON iv.itemID = il.itemID
            WHERE il.changeLabel = 'change truckAssignment'
            ORDER BY il.dateAndTimeChecked DESC
            LIMIT 50`;
    
        db.query(query, (err, results) => {
            if (err) throw err;
            //console.log(results); // Log the results to see if data is retrieved
            res.json(results);
        });
    });
    router.get('/admin-inventory/log3', (req, res) => {
        const query = `SELECT CONCAT(a.firstName, ' ', a.lastName) AS volunteer_name, 
                        DATE_FORMAT(il.dateAndTimeChecked, '%Y-%m-%d') AS checked_date,  
                        DATE_FORMAT(il.dateAndTimeChecked, '%H:%i:%s') AS checked_time, 
                        il.vehicleAssignment AS vehicle,
                        il.changeLabel AS status 
                    FROM tbl_inventory_logs il
                    JOIN tbl_accounts a ON a.accountID = il.accountID
                    WHERE il.changeLabel = 'All Equipment are good'
                    ORDER BY il.dateAndTimeChecked DESC
                    LIMIT 50;
                    `;
    
        db.query(query, (err, results) => {
            if (err) throw err;
            //console.log(results); // Log the results to see if data is retrieved
            res.json(results);
        });
    });

    router.get('/equipment/:id', async (req, res) => {
        try {
            const itemId = parseInt(req.params.id, 10); // Convert string to integer
            
            const query = 'SELECT itemID, itemName, itemImage, vehicleAssignment FROM tbl_inventory WHERE itemID = ?';
            db.query(query, [itemId], async (error, results) => {
                if (error) {
                    console.error('Error fetching equipment data:', error);
                    return res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
                }
                
                if (results.length === 0) {
                    return res.status(404).json({ success: false, message: 'Equipment not found' });
                }
    
                const equipment = results[0];
    
                // Generate the Cloudinary URL
                const itemImagePath = equipment.itemImage 
                    ? cloudinary.url(equipment.itemImage) 
                    : 'https://your-cloudinary-default-image-url.com/default.jpg'; // Default image URL if no image is found
    
                // Return the equipment data along with the image URL
                res.json({ success: true, data: { ...equipment, itemImagePath } });
            });
        } catch (error) {
            console.error('Unexpected error:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred' });
        }
    });
    
    router.get('/getMembers', (req, res) => {
        const search = req.query.search || '';
        let sql = 'SELECT callSign, firstName, middleInitial, lastName FROM tbl_accounts WHERE accountID NOT IN (SELECT accountID FROM tbl_attendance WHERE timeInStatus = 1)';
        
        if (search) {
          
            sql += ' WHERE callSign LIKE ? OR firstName LIKE ? OR lastName LIKE ?';
        }
    
        const searchParam = `%${search}%`;
    
        db.query(sql, [searchParam, searchParam, searchParam], (err, result) => {
            if (err) {
                console.error('Error fetching members:', err);
                return res.status(500).json({ error: 'Failed to retrieve members' });
            }
            res.json(result);
        });
    });
    router.get('/allPerson', (req, res) => {
        const search = req.query.search || '';
        let sql = 'SELECT accountID, callSign, firstName, middleInitial, lastName FROM tbl_accounts';
        
        if (search) {
          
            sql += ' WHERE callSign LIKE ? OR firstName LIKE ? OR lastName LIKE ?';
        }
    
        const searchParam = `%${search}%`;
    
        db.query(sql, [searchParam, searchParam, searchParam], (err, result) => {
            if (err) {
                console.error('Error fetching members:', err);
                return res.status(500).json({ error: 'Failed to retrieve members' });
            }
            res.json(result);
        });
    });
    router.post('/addEquipment', async (req, res) => {
        const { itemName, vehicleAssignment, dateAcquired } = req.body;
        let itemImagePath = null;
    
        if (req.files && req.files.itemImage) {
            const itemImage = req.files.itemImage;
            if (itemImage.size > 50 * 1024 * 1024) {
                return res.status(400).json({ success: false, message: 'File size exceeds 50 MB limit.' });
            }
    
            try {
                const tempFilePath = path.join(__dirname, 'temp', `${itemName}_${Date.now()}_resized.jpg`);
    
                await sharp(itemImage.data)
                    .resize({ width: 600 })
                    .jpeg({ quality: 70 }) 
                    .toFile(tempFilePath);
    
                // Upload the resized image to Cloudinary
                const uniqueFileName = `${itemName}_${Date.now()}`;
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    folder: 'uploads',
                    public_id: uniqueFileName,
                });
    
                // Get the secure URL from Cloudinary
                itemImagePath = result.secure_url;
    
                // Clean up the temp file after upload
                fs.unlinkSync(tempFilePath);
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                return res.status(500).json({ success: false, message: 'Error uploading image.' });
            }
        }
    
        // Insert equipment data into the database
        const query = `
            INSERT INTO tbl_inventory (itemName, vehicleAssignment, dateAcquired, itemImage)
            VALUES (?, ?, ?, ?)
        `;
        const queryParams = [itemName, vehicleAssignment, dateAcquired, itemImagePath];
    
        db.query(query, queryParams, (error, results) => {
            if (error) {
                // Check if the error is related to duplicate entry
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ success: false, message: 'Item name already exists.' });
                }
    
                console.error('Error inserting equipment data:', error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
    
            res.json({ success: true, message: 'Equipment added successfully.' });
        });
    });
    
    router.put('/updateEquipment', async (req, res) => {
        const { updatedItemName, updatedVehicleAssignment, itemId } = req.body;
        let itemImagePath = null;
    
        const getCurrentImagePathSql = 'SELECT itemImage FROM tbl_inventory WHERE itemID = ?';
        db.query(getCurrentImagePathSql, [itemId], async (err, results) => {
            if (err) {
                console.error('Error retrieving current image path:', err);
                return res.status(500).send({ success: false, message: 'Error retrieving current image' });
            }
            if (results.length === 0) {
                return res.status(404).send({ success: false, message: 'Item not found' });
            }
            const currentImagePath = results[0].itemImage;
    
            if (req.files && req.files.itemImage) {
                const itemImage = req.files.itemImage;
    
                if (itemImage.size > 50 * 1024 * 1024) {
                    return res.status(400).json({ success: false, message: 'File size exceeds 50 MB limit.' });
                }
    
                try {
                    // Resize the image and save it temporarily before uploading to Cloudinary
                    const tempFilePath = path.join(__dirname, 'temp', `${updatedItemName}_${Date.now()}_resized.jpg`);
    
                    await sharp(itemImage.data)
                        .resize({ width: 800 }) // Adjust the width as necessary
                        .jpeg({ quality: 80 })
                        .toFile(tempFilePath);
    
                    // Upload the resized image to Cloudinary
                    const uniqueFileName = `${updatedItemName}_${Date.now()}`;
                    const result = await cloudinary.uploader.upload(tempFilePath, {
                        folder: 'uploads',
                        public_id: uniqueFileName,
                    });
    
                    // Get the secure URL from Cloudinary
                    itemImagePath = result.secure_url;
    
                    // Clean up the temp file after upload
                    fs.unlinkSync(tempFilePath);
    
                    // Step 3: Delete the old image if it exists
                    if (currentImagePath) {
                        const existingImagePublicId = currentImagePath.split('/').pop().split('.')[0]; // Extract public ID from the URL
                        await cloudinary.uploader.destroy(existingImagePublicId);
                    }
                } catch (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                    return res.status(500).json({ success: false, message: 'Error uploading image.' });
                }
            } else {
                // No new image uploaded, just retain the current image path
                itemImagePath = currentImagePath;
            }
    
            // Update the database with the new data
            const sql = `
                UPDATE tbl_inventory
                SET itemName = ?, 
                    vehicleAssignment = ?,
                    itemImage = ?
                WHERE itemID = ?
            `;
    
            db.query(sql, [updatedItemName, updatedVehicleAssignment, itemImagePath, itemId], (err, result) => {
                if (err) {
                    console.error('Database update error:', err);
                    return res.status(500).json({ success: false, message: 'Failed to update equipment' });
                }
                res.status(200).json({ success: true, message: 'Equipment updated successfully' });
            });
        });
    });
    
    router.post('/send-email', async (req, res) => {
        try {
            const { email } = req.body;
    
            // Check if the user exists
            const user = await db.query('SELECT * FROM tbl_accounts WHERE emailAddress = ?', [email]);
            if (!user || user.length === 0) {
                return res.status(400).json({ message: 'No account with that email found.' });
            }
    
            const token = crypto.randomBytes(20).toString('hex');
            const expireTime = Date.now() + 3600000; // 1 hour expiration
            await db.query('UPDATE tbl_accounts SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE emailAddress = ?', [token, expireTime, email]);
    
            // Create the reset link
            const resetLink = `http://${req.headers.host}/auth/reset-password/${token}`;
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });
    
            const mailOptions = {
                to: email,
                from: process.env.EMAIL,
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) requested the reset of your account's password.\n\n` +
                      `Please click the following link, or copy and paste it into your browser to complete the process:\n\n` +
                      `${resetLink}\n\n` +
                      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };
    
            // Send the email
            await transporter.sendMail(mailOptions);
    
            // Return success response
            res.status(200).json({ message: 'Reset link sent to your email.' });
        } catch (err) {
            console.error('Error sending email:', err);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });

    router.get('/reset-password/:token', (req, res) => {
        const token = req.params.token;
        //console.log("Received token:", token); 
        res.sendFile(path.join(__dirname, '..', 'public', 'reset_pass.html'), {
            headers: {
                'token': token 
            }
        });
    });
    

    router.post('/reset-password', async (req, res) => {
        try {
            const { token, password } = req.body;
        
            if (!token || !password) {
                return res.status(400).json({ message: 'Token and password are required.' });
            }

            const sql = 'SELECT * FROM tbl_accounts WHERE resetPasswordToken = ? AND resetPasswordExpires > ?';
            console.log("Executing SQL:", sql, "with parameters:", [token, Date.now()]);

            const result = await query(sql, [token, Date.now()]);
            if (!Array.isArray(result) || result.length === 0) {
                return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
            }
    
            const user = result[0];
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            await query(
                'UPDATE tbl_accounts SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE accountID  = ?',
                [hashedPassword, user.accountID ]
            );
        
            res.status(200).json({ message: 'Your password has been updated. You can now log in.', redirectTo: '/' });
        } catch (error) {
            console.error('Error resetting password:', error.message || error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });

    router.post('/submit-activity', (req, res) => {
        const { activityDate, activityTime, location, activityAssignment, activityDetail, responders } = req.body;
        //console.log(responders);
        const username = req.session.user?.username;
        const insertActivityQuery = `
            INSERT INTO tbl_activity (date, time, location, vehicle_used, detail, added_by) 
            VALUES (?, ?, ?, ?, ?, (select accountID from tbl_accounts where username = ?))`;

        db.query(insertActivityQuery, [activityDate, activityTime, location, activityAssignment, activityDetail, username], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Failed to insert activity.' });
            }
            db.query(
                'INSERT INTO tbl_notification (detail, target, created_by, created_at) VALUES ("new activity logs", "Admin", (SELECT accountID from tbl_accounts where username = ?), NOW())',
                [username]
            );

            const activityID = result.insertId;
            //console.log('THIS IS THE ID: ',activityID);
            if (responders && responders.length > 0) {
                const insertRespondersQuery = `INSERT INTO tbl_responders (activityID, accountID) VALUES ?`;
                const responderValues = [];

                const responderCalls = responders.map(responder => {
                    return new Promise((resolve, reject) => {
                        const accountQuery = `SELECT accountID FROM tbl_accounts WHERE callsign = ?`;
                        //console.log(`Looking up accountID for callSign: ${responder.callSign}`);
                        db.query(accountQuery, [responder.callSign], (err, results) => {
                            if (err) {
                                return reject(err);
                            }
                            if (results.length > 0) {
                                const accountID = results[0].accountID;
                                db.query(
                                    'UPDATE tbl_accounts SET activityPoints = activityPoints + 1 WHERE accountID = ?', 
                                    [accountID]
                                );
                                db.query(
                                    'INSERT INTO tbl_notification (detail, target, created_by, created_at) VALUES ("added activity Points", (SELECT username from tbl_accounts where accountID = ?), (SELECT accountID from tbl_accounts where username = ?), NOW())',
                                    [accountID, username]
                                );
                                //console.log(`Found accountID ${accountID} for callSign: ${responder.callSign}`);
                                responderValues.push([activityID, accountID]);
                            } else {
                                console.log(`No account found for callSign: ${responder.callSign}`);
                            }
                            resolve();
                        });
                    });
                });

                // Wait for all account lookups to finish
                Promise.all(responderCalls)
                    .then(() => {
                        //console.log(`Responder values length: ${responderValues.length}`);
                        if (responderValues.length > 0) {
                            // Insert all responders
                            db.query(insertRespondersQuery, [responderValues], (err, result) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({ success: false, message: 'Failed to insert responders.' });
                                }
                                res.json({ success: true });
                            });
                        } else {
                            res.json({ success: true }); // No responders to insert
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).json({ success: false, message: 'Failed to retrieve account IDs for responders.' });
                    });
            } else {
                res.json({ success: true }); // No responders provided
            }
        });
    });

    router.get('/get-activities', (req, res) => {
        const query = 'SELECT activityID, date, time, detail, location FROM tbl_activity ORDER BY date DESC';
        
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Failed to retrieve activities.' });
            }
            res.json({ success: true, activities: results });
        });
    });

    router.get('/get-responders/:activityId', (req, res) => {
        const activityId = req.params.activityId;
        console.log(activityId);
        const getRespondersQuery = `
            SELECT CONCAT(a.firstName, ' ', a.lastName) AS name, a.callsign, r.accountID 
            FROM tbl_responders r
            JOIN tbl_accounts a ON r.accountID = a.accountID
            WHERE r.activityID = ?`;

        db.query(getRespondersQuery, [activityId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Failed to retrieve responders.' });
            }
            //console.log(results);
            res.json({ success: true, responders: results });
        });
    });

    router.post('/submit-manual-attendance', (req, res) => {
        const { attendanceDateIn, attendanceTimeIn, attendanceDateOut, attendanceTimeOut, volunteers } = req.body;
    
        let timeInStatus = attendanceDateOut && attendanceTimeOut ? 0 : 1;
    
        const promises = volunteers.map(volunteer => {
            const accountID = volunteer.accountID;
    
            // Check if accountID already exists in tbl_attendance for time in on the same date
            const checkAttendanceQuery = `
                SELECT * FROM tbl_attendance WHERE accountID = ? AND dateOfTimeIn = ?
            `;
            
            return new Promise((resolve, reject) => {
                db.query(checkAttendanceQuery, [accountID, attendanceDateIn], (err, existingAttendance) => {
                    if (err) return reject('Error checking existing attendance');
                    
                    if (existingAttendance.length > 0) {
                        return resolve(); 
                    }

                    if (attendanceDateOut && attendanceTimeOut) {
                        const timeIn = new Date(`${attendanceDateIn} ${attendanceTimeIn}`);
                        const timeOut = new Date(`${attendanceDateOut} ${attendanceTimeOut}`);
                        const totalMinutes = Math.floor((timeOut - timeIn) / 60000);
    
                        const getDutyHoursQuery = `SELECT dutyHours, cumulativeDutyHours FROM tbl_accounts WHERE accountID = ?`;
    
                        db.query(getDutyHoursQuery, [accountID], (err, result) => {
                            if (err) return reject('Error retrieving duty hours');
    
                            let oldDutyHours = result[0]?.dutyHours || 0;
                            let oldCumulativeDutyHours = result[0]?.cumulativeDutyHours || 0;
                            const updatedDutyHours = oldDutyHours + totalMinutes;
                            const updatedCumulativeDutyHours = oldCumulativeDutyHours + totalMinutes;
    
                            // Insert a new attendance record with timeOut and dateOfTimeOut
                            const insertAttendanceQuery = `
                                INSERT INTO tbl_attendance (dateOfTimeIn, timeIn, timeOut, dateOfTimeOut, timeInStatus, accountID) 
                                VALUES (?, ?, ?, ?, 0, ?)
                            `;
                            db.query(insertAttendanceQuery, [attendanceDateIn, attendanceTimeIn, attendanceTimeOut, attendanceDateOut, accountID], (err, result) => {
                                if (err) return reject('Error logging Time Out');
    
                                // Update duty hours in tbl_accounts
                                const updateDutyHoursQuery = `
                                    UPDATE tbl_accounts 
                                    SET dutyHours = ?, cumulativeDutyHours = ? 
                                    WHERE accountID = ?
                                `;
                                db.query(updateDutyHoursQuery, [updatedDutyHours, updatedCumulativeDutyHours, accountID], (err, result) => {
                                    if (err) return reject('Error updating duty hours');
                                    resolve();
                                });
                            });
                        });
                    } else {
                        // Insert new attendance record for time in only
                        const insertAttendanceQuery = `
                            INSERT INTO tbl_attendance (dateOfTimeIn, timeIn, timeInStatus, accountID) 
                            VALUES (?, ?, 1, ?)
                        `;
                        db.query(insertAttendanceQuery, [attendanceDateIn, attendanceTimeIn, accountID], (err, result) => {
                            if (err) return reject('Error logging Time In');
                            resolve();
                        });
                    }
                });
            });
        });
    
        // Once all promises are resolved, send a response
        Promise.all(promises)
            .then(() => res.json({ success: true }))
            .catch(error => res.status(500).send(error));
    });
    
    return router;
};

