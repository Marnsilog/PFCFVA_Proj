const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });
const multer = require('multer');
const upload = multer(); 
const router = express.Router();
const path = require('path');
const fs = require('fs');

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

    router.post('/edit-profile', (req, res) => {
        //console.log('Uploaded files:', req.files);  // Log uploaded files
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
    
                        //console.log('File successfully uploaded to:', uploadPath);
                        profilePicturePath = `profilePicture/${uniqueFileName}`;
                        updateUserDetails(password, profilePicturePath); // Update with new picture
                    });
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
                    let accountType =  req.session.user.permission;;
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

    router.post('/edit-volunteer', (req, res) => {
        //console.log('Uploaded files:', req.files);  // Log uploaded files
        const {
            lastName, firstName, middleName, emailAddress, contactNumber,
            oldPassword, newPassword, civilStatus, nationality, bloodType,
            birthday, gender, currentAddress, emergencyContactPerson,
            emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
            yearsInService, skillsTraining, otherAffiliation
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
    
                        //console.log('File successfully uploaded to:', uploadPath);
                        profilePicturePath = `profilePicture/${uniqueFileName}`;
                        updateUserDetails(password, profilePicturePath); // Update with new picture
                    });
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
                    res.redirect('/admin_volunteer_configuration');
                    
                });
            }
        });
    });
    

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
    router.get('/equipment/:id', (req, res) => {
        const itemId = parseInt(req.params.id, 10); // Convert string to integer
        
        const query = 'SELECT * FROM tbl_inventory WHERE itemID = ?';
        db.query(query, [itemId], (error, results) => {
            if (error) {
                console.error('Error fetching equipment data:', error);
                return res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: 'Equipment not found' });
            }
    
            const equipment = results[0];
    
            // If the equipment image is not found, use the default image
            const itemImagePath = equipment.itemImage ? '../' + equipment.itemImage : '../public/img/ex1.jpg';

            
            res.json({ success: true, data: { ...equipment, itemImagePath } });
        });
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
    
    router.post('/addEquipment', (req, res) => {
        const { itemName, vehicleAssignment, dateAcquired } = req.body;
        let itemImagePath = null;
        if (req.files && req.files.itemImage) {
            const itemImage = req.files.itemImage;
            const uniqueFileName = `${itemName}_${Date.now()}_${itemImage.name}`;
            const uploadPath = path.join(__dirname, '../public/uploads', uniqueFileName);
    
            itemImage.mv(uploadPath, (err) => {
                if (err) {
                    console.error('Error moving file:', err);
                    return res.status(500).send({ success: false, message: 'Internal Server Error' });
                }
    
                itemImagePath = `uploads/${uniqueFileName}`;
                insertEquipment();
            });
        } else {
            // No image uploaded, proceed with inserting data into the database
            insertEquipment();
        }
    
        function insertEquipment() {
            const query = `
                INSERT INTO tbl_inventory (itemName, vehicleAssignment, dateAcquired, itemImage)
                VALUES (?, ?, ?, ?)
            `;
            const queryParams = [itemName, vehicleAssignment, dateAcquired, itemImagePath];
    
            db.query(query, queryParams, (error, results) => {
                if (error) {
                    console.error('Error inserting equipment data:', error);
                    return res.status(500).send({ success: false, message: 'Internal Server Error' });
                }
    
                res.send({ success: true, message: 'Equipment added successfully.' });
            });
        }
    });
    return router;
};

