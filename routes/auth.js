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

cloudinary.config({
    cloud_name: 'duhumw72j',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = (db, db2) => {
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
        const accountID = req.params.accountID; // Get accountID from the route parameter
    
        if (!accountID) {
            return res.status(400).send('Volunteer account ID is required');
        }
    
        const query = 'SELECT * FROM tbl_accounts WHERE accountID = ?';
        db.query(query, [accountID], (err, result) => {
            if (err) {
                console.error('Error fetching volunteer data:', err);
                return res.status(500).send('Error fetching volunteer data');
            }
            if (result.length === 0) {
                return res.status(404).send('Volunteer not found');
            }
    
            const { password, ...volunteerData } = result[0]; 
            //console.log(volunteerData);
            res.json(volunteerData); 
        });
    });

    // router.post('/edit-profile', (req, res) => {
    //     //console.log('Uploaded files:', req.files);  // Log uploaded files
    //     const {
    //         lastName, firstName, middleName, emailAddress, contactNumber,
    //         oldPassword, newPassword, civilStatus, nationality, bloodType,
    //         birthday, gender, currentAddress, emergencyContactPerson,
    //         emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
    //         yearsInService, skillsTraining, otherAffiliation
    //     } = req.body;
    
    //     const username = req.session.user?.username;
    //     if (!username) {
    //         return res.status(400).send('User not found in session');
    //     }
    
    //     const checkUsernameQuery = 'SELECT * FROM tbl_accounts WHERE username = ?';
    //     db.query(checkUsernameQuery, [username], (checkUsernameErr, checkUsernameResult) => {
    //         if (checkUsernameErr) {
    //             console.error('Error checking username:', checkUsernameErr);
    //             return res.status(500).send({ success: false, message: 'Error checking username' });
    //         }
    
    //         if (checkUsernameResult.length === 0) {
    //             return res.status(400).send({ success: false, message: 'User not found' });
    //         }
    
    //         const user = checkUsernameResult[0];
    //         let profilePicturePath = user.idPicture;
    
    //         // Handling password update
    //         if (oldPassword) {
    //             bcrypt.compare(oldPassword, user.password, (compareErr, isMatch) => {
    //                 if (compareErr || !isMatch) {
    //                     return res.status(400).send({ success: false, message: 'Old password is incorrect' });
    //                 }
    
    //                 if (newPassword) {
    //                     bcrypt.hash(newPassword, 10, (hashErr, hash) => {
    //                         if (hashErr) {
    //                             console.error('Error hashing new password:', hashErr);
    //                             return res.status(500).send({ success: false, message: 'Error hashing new password' });
    //                         }
    //                         handleProfilePictureUpdate(hash);
    //                     });
    //                 } else {
    //                     handleProfilePictureUpdate(user.password);
    //                 }
    //             });
    //         } else {
    //             handleProfilePictureUpdate(user.password);
    //         }
    
    //         // Function to handle profile picture upload and update profile
    //         function handleProfilePictureUpdate(password) {
    //             if (req.files && req.files.profilePicture) {
    //                 const profilePicture = req.files.profilePicture;
    //                 const uniqueFileName = `${username}_${Date.now()}_${profilePicture.name}`;
    //                 const uploadDir = path.join(__dirname, '../profilePicture');
    //                 const uploadPath = path.join(uploadDir, uniqueFileName);
    
    //                 // Ensure the directory exists
    //                 if (!fs.existsSync(uploadDir)) {
    //                     fs.mkdirSync(uploadDir, { recursive: true });
    //                 }
    
    //                 // Log and move the file
    //                 profilePicture.mv(uploadPath, (err) => {
    //                     if (err) {
    //                         console.error('Error moving file:', err);
    //                         return res.status(500).send({ success: false, message: 'Error saving profile picture' });
    //                     }
    
    //                     //console.log('File successfully uploaded to:', uploadPath);
    //                     profilePicturePath = `profilePicture/${uniqueFileName}`;
    //                     updateUserDetails(password, profilePicturePath); // Update with new picture
    //                 });
    //             } else {
    //                 updateUserDetails(password, profilePicturePath); // Update without new picture
    //             }
    //         }
    
    //         // Function to execute the update query
    //         function updateUserDetails(password, profilePicturePath) {
    //             const updateQuery = `
    //                 UPDATE tbl_accounts SET 
    //                     lastName = ?, 
    //                     firstName = ?, 
    //                     middleName = ?, 
    //                     emailAddress = ?, 
    //                     mobileNumber = ?, 
    //                     password = ?, 
    //                     civilStatus = ?, 
    //                     nationality = ?, 
    //                     bloodType = ?, 
    //                     dateOfBirth = ?, 
    //                     gender = ?, 
    //                     currentAddress = ?, 
    //                     emergencyContactPerson = ?, 
    //                     emergencyContactNumber = ?, 
    //                     highestEducationalAttainment = ?, 
    //                     nameOfCompany = ?, 
    //                     yearsInService = ?, 
    //                     skillsTraining = ?, 
    //                     otherAffiliation = ?, 
    //                     idPicture = ? 
    //                 WHERE username = ?
    //             `;
    
    //             const values = [
    //                 lastName, firstName, middleName, emailAddress, contactNumber,
    //                 password, civilStatus, nationality, bloodType,
    //                 birthday, gender, currentAddress, emergencyContactPerson,
    //                 emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
    //                 yearsInService, skillsTraining, otherAffiliation,
    //                 profilePicturePath,
    //                 username
    //             ];
    
    //             db.query(updateQuery, values, (updateErr, updateResult) => {
    //                 if (updateErr) {
    //                     console.error('Error updating profile:', updateErr);
    //                     return res.status(500).send({ success: false, message: 'Error updating profile' });
    //                 }
    //                 let accountType =  req.session.user.permission;;
    //                 if (accountType === 'Admin') {
    //                     res.redirect('/admin_main_profile');
    //                 } else if (accountType === 'Supervisor') {
    //                     res.redirect('/supervisor_main_profile');
    //                 } else if (accountType === 'Volunteer') {
    //                     res.redirect('/volunteer_main_profile');
    //                 }
                  
    //             });
    //         }
    //     });
    // });
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
    // router.post('/edit-volunteer', (req, res) => {
    //     //console.log('Uploaded files:', req.files);  // Log uploaded files
    //     const {
    //         lastName, firstName, middleName, emailAddress, contactNumber,
    //         oldPassword, newPassword, civilStatus, nationality, bloodType,
    //         birthday, gender, currentAddress, emergencyContactPerson,
    //         emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
    //         yearsInService, skillsTraining, otherAffiliation
    //     } = req.body;
    
    //     const username = req.body.username;
    
    //     const checkUsernameQuery = 'SELECT * FROM tbl_accounts WHERE username = ?';
    //     db.query(checkUsernameQuery, [username], (checkUsernameErr, checkUsernameResult) => {
    //         if (checkUsernameErr) {
    //             console.error('Error checking username:', checkUsernameErr);
    //             return res.status(500).send({ success: false, message: 'Error checking username' });
    //         }
    
    //         if (checkUsernameResult.length === 0) {
    //             return res.status(400).send({ success: false, message: 'User not found' });
    //         }
    
    //         const user = checkUsernameResult[0];
    //         let profilePicturePath = user.idPicture;
    
    //         // Handling password update
    //         if (oldPassword) {
    //             bcrypt.compare(oldPassword, user.password, (compareErr, isMatch) => {
    //                 if (compareErr || !isMatch) {
    //                     return res.status(400).send({ success: false, message: 'Old password is incorrect' });
    //                 }
    
    //                 if (newPassword) {
    //                     bcrypt.hash(newPassword, 10, (hashErr, hash) => {
    //                         if (hashErr) {
    //                             console.error('Error hashing new password:', hashErr);
    //                             return res.status(500).send({ success: false, message: 'Error hashing new password' });
    //                         }
    //                         handleProfilePictureUpdate(hash);
    //                     });
    //                 } else {
    //                     handleProfilePictureUpdate(user.password);
    //                 }
    //             });
    //         } else {
    //             handleProfilePictureUpdate(user.password);
    //         }
    
    //         // Function to handle profile picture upload and update profile
    //         function handleProfilePictureUpdate(password) {
    //             if (req.files && req.files.profilePicture) {
    //                 const profilePicture = req.files.profilePicture;
    //                 const uniqueFileName = `${username}_${Date.now()}_${profilePicture.name}`;
    //                 const uploadDir = path.join(__dirname, '../profilePicture');
    //                 const uploadPath = path.join(uploadDir, uniqueFileName);
    
    //                 // Ensure the directory exists
    //                 if (!fs.existsSync(uploadDir)) {
    //                     fs.mkdirSync(uploadDir, { recursive: true });
    //                 }
    
    //                 // Log and move the file
    //                 profilePicture.mv(uploadPath, (err) => {
    //                     if (err) {
    //                         console.error('Error moving file:', err);
    //                         return res.status(500).send({ success: false, message: 'Error saving profile picture' });
    //                     }
    
    //                     //console.log('File successfully uploaded to:', uploadPath);
    //                     profilePicturePath = `profilePicture/${uniqueFileName}`;
    //                     updateUserDetails(password, profilePicturePath); // Update with new picture
    //                 });
    //             } else {
    //                 updateUserDetails(password, profilePicturePath); // Update without new picture
    //             }
    //         }
    
    //         // Function to execute the update query
    //         function updateUserDetails(password, profilePicturePath) {
    //             const updateQuery = `
    //                 UPDATE tbl_accounts SET 
    //                     lastName = ?, 
    //                     firstName = ?, 
    //                     middleName = ?, 
    //                     emailAddress = ?, 
    //                     mobileNumber = ?, 
    //                     password = ?, 
    //                     civilStatus = ?, 
    //                     nationality = ?, 
    //                     bloodType = ?, 
    //                     dateOfBirth = ?, 
    //                     gender = ?, 
    //                     currentAddress = ?, 
    //                     emergencyContactPerson = ?, 
    //                     emergencyContactNumber = ?, 
    //                     highestEducationalAttainment = ?, 
    //                     nameOfCompany = ?, 
    //                     yearsInService = ?, 
    //                     skillsTraining = ?, 
    //                     otherAffiliation = ?, 
    //                     idPicture = ? 
    //                 WHERE username = ?
    //             `;
    
    //             const values = [
    //                 lastName, firstName, middleName, emailAddress, contactNumber,
    //                 password, civilStatus, nationality, bloodType,
    //                 birthday, gender, currentAddress, emergencyContactPerson,
    //                 emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
    //                 yearsInService, skillsTraining, otherAffiliation,
    //                 profilePicturePath,
    //                 username
    //             ];
    
    //             db.query(updateQuery, values, (updateErr, updateResult) => {
    //                 if (updateErr) {
    //                     console.error('Error updating profile:', updateErr);
    //                     return res.status(500).send({ success: false, message: 'Error updating profile' });
    //                 }
    //                 res.redirect('/admin_volunteer_configuration');
                    
    //             });
    //         }
    //     });
    // });
    

    // router.get('/get-profilePic', (req, res) => {
    //     const profilePicPath = req.session.user?.profilePicPath || 'img/user.png'; 
    //     console.log(profilePicPath)
    //     res.json({ success: true, profilePicPath }); 
    // });
    
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
    
            // If no results found, use the default profile picture
            const profilePicPath = results[0]?.profile_pic || 'img/user.png';
            res.json({ success: true, profilePicPath });
        });
    });
    router.get('/dashboard-data', (req, res) => {
    const username = req.session.user?.username;

    // Check if the user is authorized
    if (!username) {
        console.log('Unauthorized access attempt'); // Log unauthorized access
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // SQL query to fetch the dashboard data
    const query = `SELECT accountType, CONCAT(firstname, ' ', lastname) AS fullName, 
                          dutyHours, fireResponsePoints, inventoryPoints, activityPoints
                   FROM tbl_accounts WHERE username = ?`;

    // Execute the query
    db.query(query, [username], (error, results) => {
        if (error) {
            console.error('Error fetching profile data:', error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        // Check if the results are empty
        if (results.length === 0) {
            console.log('No profile found for username:', username); // Log when no profile is found
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        res.json({ success: true, data: results[0] });
    });
    });

    router.get('/profile', (req, res) => {
        const username = req.session.user?.username;
    
        //console.log('Logged in username:', username); 
    
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
                activityPoints,
                idPicture 
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
            SELECT accountID AS id, firstName AS name, dutyHours AS points 
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
            SELECT accountID AS id, firstName AS name, dutyHours, 
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
            SELECT accountID AS id, firstName AS name, dutyHours, 
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
        let connection;
    
        try {
            connection = await db2.getConnection(); 
            await connection.beginTransaction();
            
            const [dateExpirationResult] = await connection.query(
                'SELECT dateinvExpiration FROM tbl_accounts WHERE username = ?', 
                [username]
            );
    
            let dateExpiration = dateExpirationResult[0]?.dateinvExpiration;
            console.log('Date Expiration:', dateExpiration);
    
            // Convert dateExpiration to a Date object for comparison
            const expirationDate = dateExpiration ? new Date(dateExpiration) : null;
    
            // Check if 24 hours have passed since dateExpiration
            const currentTime = new Date();
            const twentyFourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    
            // Allow logging if dateExpiration is null (first log) or if 24 hours have passed
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
                            `INSERT INTO tbl_inventory_logs (itemID, accountID, changeLabel, changeFrom, changeTo, dateAndTimeChecked, remarks) 
                            VALUES (?, (SELECT accountID FROM tbl_accounts WHERE username = ?), 'change status', ?, ?, NOW(), ?)`, 
                            [itemID, username, currentStatus, status, remarks]
                        );
                        await connection.query(
                            'UPDATE tbl_inventory SET Status = ? WHERE itemID = ?', 
                            [status, itemID]
                        );
                    }
                }
    
                // Increment inventory points and update expiration date
                await connection.query(
                    'UPDATE tbl_accounts SET inventoryPoints = inventoryPoints + 1, dateinvExpiration = NOW() WHERE username = ?', 
                    [username]
                );
    
                await connection.commit();
                res.json({ message: 'Inventory statuses updated and logs created where applicable.', redirect: '/volunteer_form_inv' });
            } else {
                res.status(403).json({ message: 'Please wait 24 hours before logging inventory again.' });
            }
            
        } catch (err) {
            console.error('Database error:', err);
            
            // Rollback the transaction if any operation fails
            if (connection) await connection.rollback();
            res.status(500).json({ message: 'Server error' });
        } finally {
            if (connection) connection.release();
        }
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
    
    // router.get('/inventory2', (req, res) => {
    //     const username = req.session.user?.username; 
    //     const search = req.query.search || ''; 
    
    //     const query = `
    //         SELECT il.itemID,
    //                il.logID, 
    //                DATE_FORMAT(il.dateAndTimeChecked, '%Y-%m-%d') AS checked_date,  
    //                DATE_FORMAT(il.dateAndTimeChecked, '%H:%i:%s') AS checked_time, 
    //                iv.vehicleAssignment AS vehicle
    //         FROM tbl_inventory_logs il
    //         JOIN tbl_inventory iv ON iv.ItemID = il.itemID
    //         WHERE il.accountID = (SELECT accountID FROM tbl_accounts WHERE username = ?)
    //           AND (iv.vehicleAssignment LIKE ? OR il.itemID LIKE ?) 
    //         ORDER BY il.dateAndTimeChecked DESC 
    //         LIMIT 0, 25;`;
    
    //     // Use '%' wildcard for LIKE search
    //     db.query(query, [username, `%${search}%`, `%${search}%`], (err, results) => {
    //         if (err) {
    //             console.error('Error fetching inventory data:', err);
    //             return res.status(500).json({ error: 'Error fetching data' });
    //         }
    //         res.json(results);
    //     });
    // });
    // router.get('/inventory2/detail/:checked_date', (req, res) => {
    //     const checked_date = req.params.checked_date;
    //     const query = `
    //       SELECT il.itemID, i.itemName, il.changeFrom, il.changeTo
    //         FROM tbl_inventory_logs il
    //         JOIN tbl_inventory i ON il.itemID = i.itemID
    //         WHERE il.dateAndTimeChecked = ?;
    //         `;

    //     db.query(query, [checked_date], (err, results) => {
    //         if (err) {
    //             console.error('Error fetching inventory details:', err);
    //             return res.status(500).json({ error: 'Error fetching data' });
    //         }
    //         res.json(results);
    //     });
    // });




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
        const search = req.query.search;
        const searchParam = `%${search}%`; 
        const query = `
            SELECT itemId, itemName, itemImage, vehicleAssignment 
            FROM tbl_inventory 
            WHERE (itemName LIKE ? OR status LIKE ?) 
            AND itemStatus = 'Available'
        `;
        
        db.query(query, [searchParam, searchParam], (err, results) => {
            if (err) {
                console.error('Error fetching inventory data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    
router.post('/inventory-supervisor/log', async (req, res) => {
    const items = req.body;
    const username = req.session.user?.username;
    let connection;

    try {
        connection = await db2.getConnection();
        await connection.beginTransaction();

        const [dateExpirationResult] = await connection.query(
            'SELECT dateinvExpiration FROM tbl_accounts WHERE username = ?',
            [username]
        );

        let dateExpiration = dateExpirationResult[0]?.dateinvExpiration;
        console.log('Date Expiration:', dateExpiration);

        // Convert dateExpiration to a Date object for comparison
        const expirationDate = dateExpiration ? new Date(dateExpiration) : null;

        // Check if 24 hours have passed since dateExpiration
        const currentTime = new Date();
        const twentyFourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

        // Allow logging if dateExpiration is null (first log) or if 24 hours have passed
        if (!dateExpiration || expirationDate <= twentyFourHoursAgo) {
            for (const item of items) {
                const { itemID, vehicleAssignment } = item;
                const [currentVehicleAssignmentResult] = await connection.query(
                    'SELECT vehicleAssignment FROM tbl_inventory WHERE itemID = ?',
                    [itemID]
                );
                const currentVehicleAssignment = currentVehicleAssignmentResult[0]?.vehicleAssignment;

                if (currentVehicleAssignment !== vehicleAssignment) {
                    await connection.query(
                        `INSERT INTO tbl_inventory_logs (itemID, accountID, changeLabel, changeFrom, changeTo, dateAndTimeChecked) 
                        VALUES (?, (SELECT accountID FROM tbl_accounts WHERE username = ?), 'change truckAssignment', ?, ?, NOW())`,
                        [itemID, username, currentVehicleAssignment, vehicleAssignment]
                    );
                    await connection.query(
                        'UPDATE tbl_inventory SET vehicleAssignment = ? WHERE itemID = ?',
                        [vehicleAssignment, itemID]
                    );
                }
            }

            // Increment inventory points and update expiration date
            await connection.query(
                'UPDATE tbl_accounts SET inventoryPoints = inventoryPoints + 1, dateinvExpiration = NOW() WHERE username = ?', 
                [username]
            );

            await connection.commit();
            res.json({ message: 'Inventory vehicle assignments updated and logs created where applicable.', redirect: '/supervisor_inventory_report' });
        } else {
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

    
    // router.post('/inventory-supervisor/log', async (req, res) => {
    //     const items = req.body;
    //     const username = req.session.user?.username;
    //     let connection;
    
    //     try {
    //         connection = await db2.getConnection();
    //         await connection.beginTransaction();
            
    //         for (const item of items) {
    //             const { itemID, vehicleAssignment } = item;
    //             const [currentVehicleAssignmentResult] = await connection.query(
    //                 'SELECT vehicleAssignment FROM tbl_inventory WHERE itemID = ?',
    //                 [itemID]
    //             );
    //             const currentVehicleAssignment = currentVehicleAssignmentResult[0]?.vehicleAssignment;
    
    //             if (currentVehicleAssignment !== vehicleAssignment) {
    //                 await connection.query(
    //                     `INSERT INTO tbl_inventory_logs (itemID, accountID, changeLabel, changeFrom, changeTo, dateAndTimeChecked) 
    //                     VALUES (?, (SELECT accountID FROM tbl_accounts WHERE username = ?), 'change truckAssignment', ?, ?, NOW())`,
    //                     [itemID, username, currentVehicleAssignment, vehicleAssignment] 
    //                 );
    //                 await connection.query(
    //                     'UPDATE tbl_inventory SET vehicleAssignment = ? WHERE itemID = ?',
    //                     [vehicleAssignment, itemID]
    //                 );
    //             }
    //         }
    
    //         await connection.commit();
    //         res.json({ message: 'Inventory vehicle assignments updated and logs created where applicable.', redirect: '/supervisor_inventory_report' });
            
    //     } catch (err) {
    //         console.error('Database error:', err);
    //         if (connection) await connection.rollback();
    //         res.status(500).json({ message: 'Server error' });
    //     } finally {
    //         if (connection) connection.release();
    //     }
    // });
    router.get('/admin-inventory/log', (req, res) => {
        const query = `SELECT i.itemImage AS image, i.itemName AS item, 
                a.firstName AS volunteer_name, 
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
                a.firstName AS volunteer_name, 
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

    // router.get('/equipment/:id', (req, res) => {
    //     const itemId = parseInt(req.params.id, 10); // Convert string to integer
        
    //     const query = 'SELECT * FROM tbl_inventory WHERE itemID = ?';
    //     db.query(query, [itemId], (error, results) => {
    //         if (error) {
    //             console.error('Error fetching equipment data:', error);
    //             return res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    //         }
            
    //         if (results.length === 0) {
    //             return res.status(404).json({ success: false, message: 'Equipment not found' });
    //         }
    
    //         const equipment = results[0];
    
    //         // If the equipment image is not found, use the default image
    //         const itemImagePath = equipment.itemImage ? '../' + equipment.itemImage : '../public/img/ex1.jpg';

            
    //         res.json({ success: true, data: { ...equipment, itemImagePath } });
    //     });
    // });
    
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
    
        let sql = 'SELECT callSign, firstName, middleInitial, lastName FROM tbl_accounts';
        
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
                    .resize({ width: 300 })
                    .jpeg({ quality: 40 }) 
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
                console.error('Error inserting equipment data:', error);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            res.json({ success: true, message: 'Equipment added successfully.' });
        });
    });
    
    
    
    // router.post('/addEquipment', (req, res) => {
    //     const { itemName, vehicleAssignment, dateAcquired } = req.body;
    //     let itemImagePath = null;
    
    //     if (req.files && req.files.itemImage) {
    //         const itemImage = req.files.itemImage;
    //         const uniqueFileName = `${itemName}_${Date.now()}_${itemImage.name}`;
    //         const uploadPath = path.join(__dirname, '../public/uploads', uniqueFileName);
    
    //         sharp(itemImage.data)
    //             .resize(500) // Resize to a width of 800px (adjust as necessary)
    //             .toFormat('jpeg') // Convert to JPEG format (you can change this based on your requirement)
    //             .jpeg({ quality: 80 }) // Set JPEG quality to 80%
    //             .toFile(uploadPath, (err, info) => {
    //                 if (err) {
    //                     console.error('Error processing image:', err);
    //                     return res.status(500).send({ success: false, message: 'Internal Server Error' });
    //                 }
    
    //                 itemImagePath = `uploads/${uniqueFileName}`;
    //                 insertEquipment();
    //             });
    //     } else {
    //         // No image uploaded, proceed with inserting data into the database
    //         insertEquipment();
    //     }
    
    //     function insertEquipment() {
    //         const query = `
    //             INSERT INTO tbl_inventory (itemName, vehicleAssignment, dateAcquired, itemImage)
    //             VALUES (?, ?, ?, ?)
    //         `;
    //         const queryParams = [itemName, vehicleAssignment, dateAcquired, itemImagePath];
    
    //         db.query(query, queryParams, (error, results) => {
    //             if (error) {
    //                 console.error('Error inserting equipment data:', error);
    //                 return res.status(500).send({ success: false, message: 'Internal Server Error' });
    //             }
    
    //             res.send({ success: true, message: 'Equipment added successfully.' });
    //         });
    //     }
    // });

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
    
    // router.put('/updateEquipment', (req, res) => {
    //     const { updatedItemName, updatedVehicleAssignment, itemId } = req.body;
    //     let itemImagePath = null;

    //     const getCurrentImagePathSql = 'SELECT itemImage FROM tbl_inventory WHERE itemID = ?';
    //     db.query(getCurrentImagePathSql, [itemId], (err, results) => {
    //         if (err) {
    //             console.error('Error retrieving current image path:', err);
    //             return res.status(500).send({ success: false, message: 'Error retrieving current image' });
    //         }
    //         if (results.length === 0) {
    //             return res.status(404).send({ success: false, message: 'Item not found' });
    //         }
    //         const currentImagePath = results[0].itemImage;
    //         if (req.files && req.files.itemImage) {
    //             const itemImage = req.files.itemImage;
    //             const uniqueFileName = `${updatedItemName}_${Date.now()}_${itemImage.name}`;
    //             const uploadDir = path.join(__dirname, '../public/uploads');
    //             const uploadPath = path.join(uploadDir, uniqueFileName);
                
    //             // Ensure upload directory exists
    //             if (!fs.existsSync(uploadDir)) {
    //                 fs.mkdirSync(uploadDir, { recursive: true });
    //             }
    

    //             sharp(itemImage.data)
    //                 .resize(500) // Resize to a width of 800px (adjust as necessary)
    //                 .toFormat('jpeg') // Convert to JPEG format
    //                 .jpeg({ quality: 80 }) // Set JPEG quality to 80%
    //                 .toFile(uploadPath, (err) => {
    //                     if (err) {
    //                         console.error('Error processing image:', err);
    //                         return res.status(500).send({ success: false, message: 'Error saving item image' });
    //                     }
    
    //                     itemImagePath = `uploads/${uniqueFileName}`;
    //                     // Step 3: Delete the old image if it exists
    //                     if (currentImagePath) {
    //                         const existingImagePath = path.join(__dirname, '../public', currentImagePath);
    //                         if (fs.existsSync(existingImagePath)) {
    //                             fs.unlink(existingImagePath, (err) => {
    //                                 if (err) {
    //                                     console.error('Error deleting existing image:', err);
    //                                     return res.status(500).send({ success: false, message: 'Error deleting existing image' });
    //                                 }
    //                                 updateDatabase();
    //                             });
    //                         } else {
    //                             updateDatabase();
    //                         }
    //                     } else {
    //                         updateDatabase();
    //                     }
    //                 });
    //         } else {
    //             // No new image uploaded, just update the database
    //             updateDatabase();
    //         }
    //     });
    
    //     function updateDatabase() {
    //         const sql = `
    //             UPDATE tbl_inventory
    //             SET itemName = ?, 
    //                 vehicleAssignment = ?,
    //                 itemImage = COALESCE(?, itemImage) -- Only update image if a new one is uploaded
    //             WHERE itemID = ?
    //         `;
    
    //         db.query(sql, [updatedItemName, updatedVehicleAssignment, itemImagePath, itemId], (err, result) => {
    //             if (err) {
    //                 console.error('Database update error:', err);
    //                 return res.status(500).json({ success: false, message: 'Failed to update equipment' });
    //             }
    //             res.status(200).json({ success: true, message: 'Equipment updated successfully' });
    //         });
    //     }
    // });
    
    
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
    
const util = require('util');
const query = util.promisify(db.query).bind(db);
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

  
    return router;
};

