const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });
const router = express.Router();



module.exports = (db) => {
    // Register route
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
    
    
    // Edit Profile
    router.post('/edit-profile', (req, res) => {
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
                return res.status(500).send('Error checking username');
            }
    
            if (checkUsernameResult.length === 0) {
                return res.status(400).send('User not found');
            }
    
            const user = checkUsernameResult[0];
            if (oldPassword) {
                bcrypt.compare(oldPassword, user.password, (compareErr, isMatch) => {
                    if (compareErr || !isMatch) {
                        return res.status(400).send('Old password is incorrect');
                    }
                    if (newPassword) {
                        bcrypt.hash(newPassword, 10, (hashErr, hash) => {
                            if (hashErr) {
                                console.error('Error hashing new password:', hashErr);
                                return res.status(500).send('Error hashing new password');
                            }
                            updateProfile(hash); 
                        });
                    } else {
                        updateProfile(user.password); 
                    }
                });
            } else {
                updateProfile(user.password);
            }
        });
    
        // Function to update the user's profile
        function updateProfile(password) {
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
                    otherAffiliation = ? 
                WHERE username = ?
            `;
    
            const values = [
                lastName, firstName, middleName, emailAddress, contactNumber,
                password, civilStatus, nationality, bloodType,
                birthday, gender, currentAddress, emergencyContactPerson,
                emergencyContactNumber, highestEducationalAttainment, nameOfCompany,
                yearsInService, skillsTraining, otherAffiliation,
                username
            ];
    
            db.query(updateQuery, values, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating profile:', updateErr);
                    return res.status(500).send('Error updating profile');
                }
                res.send('Profile updated successfully');
            });
        }
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
        const query = 'SELECT accountID as id, firstName as name, dutyHours as points FROM tbl_accounts';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching volunteer data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    router.get('/volunteer/:id', (req, res) => {
        const volunteerId = req.params.id;
        const query = 'SELECT accountID as id, firstName as name, dutyHours, fireResponsePoints, inventoryPoints, activityPoints FROM tbl_accounts WHERE accountID = ?';
        db.query(query, [volunteerId], (err, results) => {
            if (err) {
                console.error('Error fetching volunteer details:', err);
                return res.status(500).json({ error: 'Error fetching details' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Volunteer not found' });
            }
            res.json(results[0]);
        });
    });
    router.get('/fireresponse', (req, res) => {
        const query = 'SELECT accountID as id, firstName as name, fireResponsePoints as points FROM tbl_accounts';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching volunteer data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    router.get('/fireresponse/:id', (req, res) => {
        const volunteerId = req.params.id;
        const query = 'SELECT accountID as id, firstName as name, dutyHours, fireResponsePoints, inventoryPoints, activityPoints FROM tbl_accounts WHERE accountID = ?';
        db.query(query, [volunteerId], (err, results) => {
            if (err) {
                console.error('Error fetching volunteer details:', err);
                return res.status(500).json({ error: 'Error fetching details' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Volunteer not found' });
            }
            res.json(results[0]);
        });
    });
    
    router.post('/edit-profile', (req, res) => {
        const {
            username, lastName, firstName, middleName, emailAddress, contactNumber, 
            oldPassword, newPassword, civilStatus, nationality, bloodType, 
            birthday, gender, currentAddress, emergencyContactPerson, 
            emergencyContactNumber, highestEducationalAttainment, nameOfCompany, 
            yearsInService, skillsTraining, otherAffiliation
        } = req.body;
    
        // Optionally check if the username exists, you can adjust this logic based on your needs
        const checkUsernameQuery = 'SELECT * FROM tbl_accounts WHERE username = ?';
        db.query(checkUsernameQuery, [username], (checkUsernameErr, checkUsernameResult) => {
            if (checkUsernameErr) {
                console.error('Error checking username:', checkUsernameErr);
                return res.status(500).send('Error checking username');
            }
    
            if (checkUsernameResult.length === 0) {
                return res.status(400).send('User not found');
            }
    
            // Validate old password if it was provided
            if (oldPassword) {
                const user = checkUsernameResult[0];
                bcrypt.compare(oldPassword, user.password, (compareErr, isMatch) => {
                    if (compareErr || !isMatch) {
                        return res.status(400).send('Old password is incorrect');
                    }
    
                    // Hash new password if provided
                    if (newPassword) {
                        bcrypt.hash(newPassword, 10, (hashErr, hash) => {
                            if (hashErr) {
                                console.error('Error hashing new password:', hashErr);
                                return res.status(500).send('Error hashing new password');
                            }
                            updateProfile(hash);
                        });
                    } else {
                        updateProfile(user.password); // use old password if no new password is provided
                    }
                });
            } else {
                updateProfile(null); // No old password provided
            }
        });
    
        function updateProfile(hashedPassword) {
            const updateQuery = `
                UPDATE tbl_accounts 
                SET 
                    lastName = ?, firstName = ?, middleName = ?, emailAddress = ?, contactNumber = ?, 
                    civilStatus = ?, nationality = ?, bloodType = ?, dateOfBirth = ?, gender = ?, 
                    currentAddress = ?, emergencyContactPerson = ?, emergencyContactNumber = ?, 
                    highestEducationalAttainment = ?, nameOfCompany = ?, yearsInService = ?, 
                    skillsTraining = ?, otherAffiliation = ? 
                    ${hashedPassword ? ', password = ?' : ''}
                WHERE username = ?`;
    
            const values = [
                lastName, firstName, middleName, emailAddress, contactNumber,
                civilStatus, nationality, bloodType, birthday, gender,
                currentAddress, emergencyContactPerson, emergencyContactNumber,
                highestEducationalAttainment, nameOfCompany, yearsInService,
                skillsTraining, otherAffiliation,
                username,
            ];
    
            if (hashedPassword) {
                values.push(hashedPassword);
            }
    
            db.query(updateQuery, values, (updateErr, result) => {
                if (updateErr) {
                    console.error('Error updating profile:', updateErr);
                    return res.status(500).send('Error updating profile');
                }
                res.status(200).send('Profile updated successfully');
            });
        }
    });
    
    
    return router;
};

