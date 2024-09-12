// const express = require('express'); //
// const mysql = require('mysql'); //
// const bcrypt = require('bcrypt'); //
// const session = require('express-session'); //
// const bodyParser = require('body-parser'); //
// const path = require('path'); //
//push test
//bugged
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { promisify } = require('util');
const path = require('path');
const multer = require('multer');

const randomBytesAsync = promisify(crypto.randomBytes);

// Create connections
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pfcfva'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

const app = express();

//INVENTORY requirements (multer)
// Set storage engine
// const storage = multer.diskStorage({
//     destination: '/public/uploads/',
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/'),
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 50 * 1024 * 1024}, // 50MB limit
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('itemImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}




// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//url body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




//register route (test-hash)
app.post('/register', (req, res) => {
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



// Login route (test-hash)
//format: req.session.dataName = user.dataName;
app.post('/login', (req, res) => {
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
                req.session.rfid = user.rfid; //this 2
                //basic info
                req.session.fullName = `${user.firstName} ${user.middleInitial +"."} ${user.lastName}`; //add middle initial
                //temp
                req.session.lastName = user.lastName;
                req.session.firstName = user.firstName;
                req.session.middleName = user.middleName;
                //basic info 2
                req.session.callSign = user.callSign;
                req.session.dateOfBirth = user.dateOfBirth; //need format fix
                req.session.gender = user.gender;
                req.session.civilStatus = user.civilStatus;
                req.session.nationality = user.nationality;
                req.session.bloodType = user.bloodType;
                req.session.highestEducationalAttainment = user.highestEducationalAttainment;
                req.session.nameOfCompany = user.nameOfCompany;
                req.session.yearsInService = user.yearsInService;
                req.session.skillsTraining = user.skillsTraining;
                req.session.otherAffiliation = user.otherAffiliation;
                //contact info
                req.session.emailAddress = user.emailAddress;
                req.session.mobileNumber = user.mobileNumber;
                req.session.currentAddress = user.currentAddress;
                req.session.emergencyContactPerson = user.emergencyContactPerson;
                req.session.emergencyContactNumber = user.emergencyContactNumber;
                //points
                req.session.dutyHours = user.dutyHours;
                req.session.fireResponsePoints = user.fireResponsePoints;
                req.session.inventoryPoints = user.inventoryPoints;
                req.session.activityPoints = user.activityPoints;
                //etc
                req.session.accountType = user.accountType;

                res.status(200).json({ message: 'Login successful', accountType: user.accountType });
            } else {
                res.status(401).send('Invalid username or password');
            }
        });
    });
});

app.get('/volunteer', (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname, 'public', 'volunteer_dashboard.html'));
    } else {
        res.redirect('/');
    }
});

//profiling session
//format: dataName: req.session.dataName,
app.get('/profile', (req, res) => {
    if (req.session.loggedin) {
        res.json({ 
            rfid: req.session.rfid,// this 3
            //basic info
            fullName: req.session.fullName, 
            //temp
            lastName: req.session.lastName,
            firstName: req.session.firstName,
            middleName: req.session.middleName,
            //basic info 2
            callSign: req.session.callSign, 
            dateOfBirth: req.session.dateOfBirth, 
            gender: req.session.gender,
            civilStatus: req.session.civilStatus,
            nationality: req.session.nationality,
            bloodType: req.session.bloodType,
            highestEducationalAttainment: req.session.highestEducationalAttainment,
            nameOfCompany: req.session.nameOfCompany,
            yearsInService: req.session.yearsInService,
            skillsTraining: req.session.skillsTraining,
            otherAffiliation: req.session.otherAffiliation,
            //contact info
            emailAddress: req.session.emailAddress,
            mobileNumber: req.session.mobileNumber,
            currentAddress: req.session.currentAddress,
            emergencyContactPerson: req.session.emergencyContactPerson,
            emergencyContactNumber: req.session.emergencyContactNumber,
            //points
            dutyHours: req.session.dutyHours,
            fireResponsePoints: req.session.fireResponsePoints,
            inventoryPoints: req.session.inventoryPoints,
            activityPoints: req.session.activityPoints,
            //etc
            accountType: req.session.accountType,
            username: req.session.username
            
        });
    } else {
        res.status(401).send('Not logged in');
    }
});



//update profile route (WITH BUGS)
app.post('/updateProfile', (req, res) => {
    const {
        rfid, lastName, firstName, middleName, middleInitial, username, emailAddress, mobileNumber,
        civilStatus, nationality, bloodType, dateOfBirth, gender, currentAddress,
        emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment,
        nameOfCompany, yearsInService, skillsTraining, otherAffiliation, oldPassword,
        newPassword, confirmPassword
    } = req.body;

    if (newPassword && newPassword !== confirmPassword) {
        return res.status(400).send('New password and confirm password do not match');
    }

    const getUserQuery = 'SELECT password FROM tbl_accounts WHERE rfid = ?';
    db.query(getUserQuery, [rfid], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user');
        }

        const hashedPassword = result[0].password;

        // If a new password is provided, validate the old password
        if (newPassword) {
            bcrypt.compare(oldPassword, hashedPassword, (compareErr, compareResult) => {
                if (compareErr || !compareResult) {
                    return res.status(400).send('Incorrect old password');
                }

                bcrypt.hash(newPassword, 10, (hashErr, hash) => {
                    if (hashErr) {
                        console.error('Error hashing new password:', hashErr);
                        return res.status(500).send('Error hashing new password');
                    }

                    // Call updateUserProfile with new password
                    updateUserProfile(rfid, lastName, firstName, middleName, middleInitial, username, emailAddress, mobileNumber,
                        civilStatus, nationality, bloodType, dateOfBirth, gender, currentAddress,
                        emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment,
                        nameOfCompany, yearsInService, skillsTraining, otherAffiliation, hash, req, res); // Pass req to update session
                });
            });
        } else {
            // Call updateUserProfile without new password
            updateUserProfile(rfid, lastName, firstName, middleName, middleInitial, username, emailAddress, mobileNumber,
                civilStatus, nationality, bloodType, dateOfBirth, gender, currentAddress,
                emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment,
                nameOfCompany, yearsInService, skillsTraining, otherAffiliation, null, req, res); // Pass req to update session
        }
    });
});

function updateUserProfile(rfid, lastName, firstName, middleName, middleInitial, username, emailAddress, mobileNumber,
    civilStatus, nationality, bloodType, dateOfBirth, gender, currentAddress,
    emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment,
    nameOfCompany, yearsInService, skillsTraining, otherAffiliation, newPassword, req, res) { // Added req to update session
    
    let updateUserQuery = `UPDATE tbl_accounts SET
        lastName = ?, firstName = ?, middleName = ?, middleInitial = ?, username = ?, emailAddress = ?,
        mobileNumber = ?, civilStatus = ?, nationality = ?, bloodType = ?, dateOfBirth = ?,
        gender = ?, currentAddress = ?, emergencyContactPerson = ?, emergencyContactNumber = ?,
        highestEducationalAttainment = ?, nameOfCompany = ?, yearsInService = ?, skillsTraining = ?,
        otherAffiliation = ?`;

    const updateValues = [
        lastName, firstName, middleName, middleInitial, username, emailAddress, mobileNumber,
        civilStatus, nationality, bloodType, dateOfBirth, gender, currentAddress,
        emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment,
        nameOfCompany, yearsInService, skillsTraining, otherAffiliation
    ];

    if (newPassword) {
        updateUserQuery += `, password = ?`;
        updateValues.push(newPassword);
    }

    updateUserQuery += ` WHERE rfid = ?`;
    updateValues.push(rfid);

    db.query(updateUserQuery, updateValues, (updateErr, updateResult) => {
        if (updateErr) {
            console.error('Error updating profile:', updateErr);
            return res.status(500).send('Error updating profile');
        }
        
        // Update session variables to reflect the changes
        req.session.lastName = lastName; 
        req.session.firstName = firstName; 
        req.session.middleName = middleName; 
        req.session.middleInitial = middleInitial; 
        req.session.username = username; 
        req.session.emailAddress = emailAddress; 
        req.session.mobileNumber = mobileNumber; 
        req.session.civilStatus = civilStatus; 
        req.session.nationality = nationality; 
        req.session.bloodType = bloodType; 
        req.session.dateOfBirth = dateOfBirth; 
        req.session.gender = gender; 
        req.session.currentAddress = currentAddress; 
        req.session.emergencyContactPerson = emergencyContactPerson; 
        req.session.emergencyContactNumber = emergencyContactNumber; 
        req.session.highestEducationalAttainment = highestEducationalAttainment; 
        req.session.nameOfCompany = nameOfCompany; 
        req.session.yearsInService = yearsInService; 
        req.session.skillsTraining = skillsTraining; 
        req.session.otherAffiliation = otherAffiliation; 

        // res.status(200).send('Profile updated successfully');
        req.session.fullName = `${firstName} ${middleInitial}. ${lastName}`; // Corrected to update fullName

        res.status(200).json(req.session); // Send updated session data to client
    });
}




///////////////////////////////////////////////////////




// endpoint to get user profile data by RFID (working for profile)
app.get('/attendanceProfile', (req, res) => {
    const rfid = req.query.rfid;
    const sql = 'SELECT * FROM tbl_accounts WHERE rfid = ?';
    db.query(sql, [rfid], (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving user data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const user = result[0];
        res.json({
            fullName: `${user.firstName} ${user.middleInitial}. ${user.lastName}`,
            callSign: user.callSign,
            dutyHours: user.dutyHours,
            fireResponsePoints: user.fireResponsePoints,
            inventoryPoints: user.inventoryPoints,
            activityPoints: user.activityPoints
        });
    });
});


// endpoint to record Time In (working)
app.post('/recordTimeIn', (req, res) => {
    const rfid = req.body.rfid;
    const currentTime = new Date();
    const timeIn = currentTime.toTimeString().split(' ')[0]; // time in HH:MM:SS format
    const dateOfTimeIn = currentTime.toISOString().split('T')[0]; // date in YYYY-MM-DD format

    const getUserQuery = 'SELECT accountID FROM tbl_accounts WHERE rfid = ?';
    db.query(getUserQuery, [rfid], (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving user data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const accountID = result[0].accountID;
        const checkStatusQuery = `SELECT timeInStatus FROM tbl_attendance WHERE accountID = ? ORDER BY attendanceID DESC LIMIT 1`;
        db.query(checkStatusQuery, [accountID], (err, result) => {
            if (err) {
                res.status(500).send('Error checking attendance status');
                return;
            }
            if (result.length === 0 || result[0].timeInStatus === 0) {
                const insertAttendanceQuery = `INSERT INTO tbl_attendance (accountID, timeIn, dateOfTimeIn, timeInStatus) 
                                               VALUES (?, ?, ?, 1)`;
                db.query(insertAttendanceQuery, [accountID, timeIn, dateOfTimeIn], (err, result) => {
                    if (err) {
                        res.status(500).send('Error recording Time In');
                        return;
                    }
                    res.json({ timeIn, dateOfTimeIn });
                });
            } else {
                res.status(400).send('User already has an active Time In record');
            }
        });
    });
});

// endpoint to record Time Out (working)
app.post('/recordTimeOut', (req, res) => {
    const rfid = req.body.rfid;
    const currentTime = new Date();
    const timeOut = currentTime.toTimeString().split(' ')[0]; 
    const dateOfTimeOut = currentTime.toISOString().split('T')[0]; 

    const getUserQuery = 'SELECT accountID FROM tbl_accounts WHERE rfid = ?';
    db.query(getUserQuery, [rfid], (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving user data');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const accountID = result[0].accountID;
        const updateAttendanceQuery = `UPDATE tbl_attendance 
                                       SET timeOut = ?, dateOfTimeOut = ?, timeInStatus = 0 
                                       WHERE accountID = ? AND timeInStatus = 1 ORDER BY attendanceID DESC LIMIT 1`;
        db.query(updateAttendanceQuery, [timeOut, dateOfTimeOut, accountID], (err, result) => {
            if (err) {
                res.status(500).send('Error recording Time Out');
                return;
            }
            if (result.affectedRows === 0) {
                res.status(400).send('No active Time In record found');
                return;
            }
            res.json({ timeOut, dateOfTimeOut });
        });
    });
});



// endpoint to retrieve recent attendance records
app.get('/recentAttendance', (req, res) => {
    const sql = `
        SELECT a.accountID, a.timeIn, a.dateOfTimeIn, a.timeOut, a.dateOfTimeOut, 
               b.firstName, b.middleInitial, b.lastName
        FROM tbl_attendance a
        JOIN tbl_accounts b ON a.accountID = b.accountID
        ORDER BY a.attendanceID DESC
        LIMIT 10`; // pang limit kung ilan kukunin shit

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving recent attendance records');
            return;
        }
        res.json(results);
    });
});


//SELECT tbl_accounts (REFINED)
app.get('/accountsAll', (req, res) => {
    const sql = `
        SELECT
            accountID,
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
            idPicture,
            bioDataChecked,
            interviewChecked,
            fireResponsePoints,
            activityPoints,
            inventoryPoints,
            dutyHours,
            cumulativeDutyHours,
            rank,
            resetPasswordToken,
            resetPasswordExpires,
            status
        FROM tbl_accounts
        ORDER BY lastName ASC, firstName ASC, middleInitial ASC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving accounts');
            return;
        }
        res.json(results);
    });
});




//admin attendance shit
// endpoint to retrieve attendance details
app.get('/attendanceDetails', (req, res) => {
    const sql = `
        SELECT 
            a.firstName,
            a.middleInitial,
            a.lastName,
            a.callSign,
            b.dateOfTimeIn,
            b.timeIn,
            b.dateOfTimeOut,
            b.timeOut,
            a.status,
            a.accountType
        FROM tbl_accounts a
        JOIN tbl_attendance b ON a.accountID = b.accountID
        ORDER BY b.dateOfTimeIn DESC, b.timeIn DESC `; // add LIMIT # if need

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving attendance details');
            return;
        }
        res.json(results);
    });
});


// endpoint to retrieve volunteer details
// New endpoint to retrieve all account details
app.get('/volunteerDetails', (req, res) => {
    const sql = `
        SELECT 
            a.firstName,
            a.middleInitial,
            a.lastName,
            a.callSign,
            a.callSign AS rank, 
            a.dutyHours,
            a.cumulativeDutyHours,
            a.fireResponsePoints,
            a.inventoryPoints,
            a.activityPoints,
            a.accountType
        FROM tbl_accounts a
        ORDER BY a.lastName, a.firstName`;  

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving account details');
            return;
        }
        res.json(results);
    }); 
});





// equipment route (bugged)
// app.post('/uploadEquipment', upload, (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const { itemName, vehicleAssignment, dateAcquired } = req.body;
//     if (!itemName || !vehicleAssignment || !dateAcquired) {
//         return res.status(400).json({ error: 'All fields are required.' });
//     }

//     // Assuming the image is stored in the 'public/uploads' folder and accessible via a static path
//     const itemImagePath = `/uploads/${req.file.filename}`; // Store the file path instead of the binary data

//     const sql = `
//         INSERT INTO tbl_inventory (itemName, itemImage, vehicleAssignment, dateAcquired)
//         VALUES (?, ?, ?, ?)
//     `;

//     db.query(sql, [itemName, itemImagePath, vehicleAssignment, dateAcquired], (err, results) => {
//         if (err) {
//             console.error('Failed to add equipment:', err);
//             return res.status(500).json({ error: 'Failed to add equipment due to internal server error.' });
//         }
//         res.status(201).json({
//             message: 'Equipment added successfully!',
//             data: {
//                 itemName,
//                 itemImagePath,
//                 vehicleAssignment,
//                 dateAcquired
//             }
//         });
//     });
// });

app.post('/uploadEquipment', (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const { itemName, vehicleAssignment, dateAcquired } = req.body;
        if (!itemName || !vehicleAssignment || !dateAcquired) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const itemImagePath = `/uploads/${req.file.filename}`;

        const sql = `
            INSERT INTO tbl_inventory (itemName, itemImage, vehicleAssignment, dateAcquired)
            VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [itemName, itemImagePath, vehicleAssignment, dateAcquired], (err, results) => {
            if (err) {
                console.error('Failed to add equipment:', err);
                return res.status(500).json({ error: 'Failed to add equipment due to internal server error.' });
            }
            res.status(201).json({
                message: 'Equipment added successfully!',
                data: {
                    itemName,
                    itemImagePath,
                    vehicleAssignment,
                    dateAcquired
                }
            });
        });
    });
});



//select equip route
app.get('/getEquipment', (req, res) => {
    const sql = 'SELECT itemName, itemImage, vehicleAssignment FROM tbl_inventory';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to retrieve equipment:', err);
            res.status(500).json({ error: 'Failed to retrieve equipment' });
        } else {
            res.json(results);
        }
    });
});



// // Add forgot password route (bugged)
// app.post('/forgot-password', async (req, res) => {
//     const { emailAddress } = req.body;

//     // Check if email exists in the database
//     db.query('SELECT * FROM tbl_accounts WHERE emailAddress = ?', [emailAddress], async (err, results) => {
//         if (err) {
//             return res.status(500).json({ success: false, message: 'Database error' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ success: false, message: 'Email not found' });
//         }

//         const user = results[0];
//         const token = (await randomBytesAsync(20)).toString('hex');
//         const tokenExpiry = Date.now() + 3600000; // 1 hour

//         // Save the token and expiry to the user record
//         db.query('UPDATE tbl_accounts SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE accountID = ?', [token, tokenExpiry, user.accountID], (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Database error' });
//             }

//             // Send email with reset link
//             const transporter = nodemailer.createTransport({
//                 service: 'Gmail',
//                 auth: {
//                     user: 'kulowtsss@gmail.com',
//                     pass: 'KULOWTS12345'
//                 }
//             });

//             const mailOptions = {
//                 to: emailAddress,
//                 from: 'kulowtsss@gmail.com',
//                 subject: 'Password Reset',
//                 text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
//                       `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
//                       `http://${req.headers.host}/reset/${token}\n\n` +
//                       `If you did not request this, please ignore this email and your password will remain unchanged.\n`
//             };

//             transporter.sendMail(mailOptions, (err) => {
//                 if (err) {
//                     return res.status(500).json({ success: false, message: 'Email sending error' });
//                 }

//                 res.status(200).json({ success: true, message: 'Password reset link has been sent to your email.' });
//             });
//         });
//     });
// });

// // Add endpoint to handle password reset form submission
// app.post('/reset/:token', (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;

//     // Find user with the matching token and ensure it hasn't expired
//     db.query('SELECT * FROM tbl_accounts WHERE resetPasswordToken = ? AND resetPasswordExpires > ?', [token, Date.now()], (err, results) => {
//         if (err) {
//             return res.status(500).json({ success: false, message: 'Database error' });
//         }

//         if (results.length === 0) {
//             return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired.' });
//         }

//         const user = results[0];

//         // Hash the new password
//         bcrypt.hash(newPassword, 10, (hashErr, hash) => {
//             if (hashErr) {
//                 return res.status(500).json({ success: false, message: 'Error hashing password' });
//             }

//             // Update the user's password in the database
//             db.query('UPDATE tbl_accounts SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE accountID = ?', [hash, user.accountID], (updateErr) => {
//                 if (updateErr) {
//                     return res.status(500).json({ success: false, message: 'Database error' });
//                 }

//                 res.status(200).json({ success: true, message: 'Password has been reset successfully.' });
//             });
//         });
//     });
// });



//port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
