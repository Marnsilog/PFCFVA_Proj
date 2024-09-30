const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });
const multer = require('multer');
const upload = multer(); 
const router = express.Router();
const mysql = require('mysql2/promise');

const db2 = mysql.createPool({
    host: process.env.DB_HOST,
    //port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


module.exports = (db) => {
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
                        userId: user.accountID,
                        permission: user.accountType
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
        const query = 'SELECT accountID AS id, firstName AS name, dutyHours AS points FROM tbl_accounts ORDER BY dutyHours DESC';
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
        const query = 'SELECT accountID as id, firstName as name, fireResponsePoints as points FROM tbl_accounts ORDER BY fireResponsePoints DESC';
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
    
    router.post('/addVehicle', upload.none(), (req, res) => {
        console.log("Received request:", req.body); 
        const vehicleName = req.body.vehicleName;
    
        // Input validation
        if (!vehicleName || typeof vehicleName !== 'string' || vehicleName.length < 1) {
            return res.status(400).json({ message: 'Invalid vehicle name' });
        }
    
        // Insert into database
        const query = 'INSERT INTO tbl_vehicles (vehicleName) VALUES (?)';
        db.query(query, [vehicleName], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to add vehicle' });
            }
    
            console.log('Vehicle added:', result.insertId); // Log the inserted ID
            res.status(201).json({ message: 'Vehicle added successfully!', vehicleId: result.insertId });
        });
    });

    router.get('/inventory', (req, res) => {
        const query = "SELECT itemID AS id, itemName AS name, itemImage, Status FROM tbl_inventory WHERE itemStatus = 'Available'";
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching inventory data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            //console.log(results);
            res.json(results);
        });
    });
    
    router.post('/inventory/log', async (req, res) => {
        const items = req.body; 
        const username = req.session.user?.username; 
        let connection;
    
        try {
            connection = await db2.getConnection(); 
            await connection.beginTransaction();
            
            for (const item of items) {
                const { itemID, status, remarks } = item;
                const [currentStatusResult] = await connection.query(
                    'SELECT Status FROM tbl_inventory WHERE itemID = ?', 
                    [itemID]
                );
                const currentStatus = currentStatusResult[0]?.Status;
    
                if ((status === 'damaged' || status === 'missing' || status === 'good') && currentStatus !== status) {
                    await connection.query(
                        `INSERT INTO tbl_inventory_logs (itemID, accountID, changeFrom, changeTo, dateAndTimeChecked, remarks) 
                        VALUES (?, (SELECT accountID FROM tbl_accounts WHERE username = ?), ?, ?, NOW(), ?)`, 
                        [itemID, username, currentStatus, status, remarks]
                    );
    
                    // Update the inventory status
                    await connection.query(
                        'UPDATE tbl_inventory SET Status = ? WHERE itemID = ?', 
                        [status, itemID]
                    );
                }
            }
    
            await connection.commit();
            res.json({ message: 'Inventory statuses updated and logs created where applicable.', redirect: '/volunteer_form_inv' });
            
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
        const query = `
                                    SELECT il.itemID, 
                    DATE_FORMAT(il.dateAndTimeChecked, '%Y-%m-%d') AS checked_date,  
                    DATE_FORMAT(il.dateAndTimeChecked, '%H:%i:%s') AS checked_time, 
                    iv.vehicleAssignment AS vehicle
                FROM 
                    tbl_inventory_logs il
                JOIN 
                    tbl_inventory iv ON iv.ItemID = il.itemID
                WHERE 
                    il.accountID = (SELECT accountID FROM tbl_accounts WHERE username = ?)
                ORDER BY 
                    il.dateAndTimeChecked DESC  -- Sort by date and time checked, most recent first
                LIMIT 0, 25;`;
    
        db.query(query, [ username], (err, results) => {
            if (err) {
                console.error('Error fetching inventory data:', err);
                return res.status(500).json({ error: 'Error fetching data' });
            }
            res.json(results);
        });
    });
    
    router.get('/inventory2/detail/:itemID', (req, res) => {
        const itemID = req.params.itemID;
        const query = `
            SELECT itemName, status,vehicleAssignment FROM tbl_inventory  WHERE itemID = ?;
        `;

        db.query(query, [itemID], (err, results) => {
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
    
    

    router.post('/inventory-supervisor/log', async (req, res) => {
        const items = req.body;
        const username = req.session.user?.username;
        let connection;
    
        try {
            connection = await db2.getConnection();
            await connection.beginTransaction();
            
            for (const item of items) {
                const { itemID, vehicleAssignment } = item;
                const [currentVehicleAssignmentResult] = await connection.query(
                    'SELECT vehicleAssignment FROM tbl_inventory WHERE itemID = ?',
                    [itemID]
                );
                const currentVehicleAssignment = currentVehicleAssignmentResult[0]?.vehicleAssignment;
    
                if (currentVehicleAssignment !== vehicleAssignment) {
                    await connection.query(
                        `INSERT INTO tbl_inventory_logs (itemID, accountID, changeFrom, changeTo, dateAndTimeChecked) 
                        VALUES (?, (SELECT accountID FROM tbl_accounts WHERE username = ?), ?, ?, NOW())`, // Update here
                        [itemID, username, currentVehicleAssignment, vehicleAssignment] // Changed here
                    );
                    await connection.query(
                        'UPDATE tbl_inventory SET vehicleAssignment = ? WHERE itemID = ?',
                        [vehicleAssignment, itemID]
                    );
                }
            }
    
            await connection.commit();
            res.json({ message: 'Inventory vehicle assignments updated and logs created where applicable.', redirect: '/supervisor_dashboard' });
            
        } catch (err) {
            console.error('Database error:', err);
            if (connection) await connection.rollback();
            res.status(500).json({ message: 'Server error' });
        } finally {
            if (connection) connection.release();
        }
    });
    
    
    return router;
};

