
const express = require('express');
const mysql = require('mysql'); 
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { promisify } = require('util');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const cron = require('node-cron');
require('dotenv').config({ path: './.env' });
const socketIo = require('socket.io');
const http = require('http'); 
const mysql2 = require('mysql2/promise');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'duhumw72j',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const db = mysql.createConnection({
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT, // Uncomment if you want to use a specific port
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Corrected this line
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const db2 = mysql2.createPool({
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT, // Uncomment if you want to use a specific port
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Corrected this line
    database: process.env.DB_NAME,

});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

const app = express();

app.use(fileUpload({
    createParentPath: true,  // Automatically creates directories if they don't exist
}));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Save to 'uploads' directory inside 'public'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

// Init upload
const upload = multer({ storage: storage });





// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//session
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 } 
// }));
app.use(session({
    secret: 'ampotangina',
    resave: false,
    cookie: { secure: false },
    saveUninitialized: true
}));;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Create HTTP server and pass it to socket.io
const server = http.createServer(app);  // Create the HTTP server

const io = socketIo(server);  // Attach Socket.IO to the server

const filePath = path.join(__dirname, 'public/chat_logs', 'chat_log.txt'); // Single log file for all chats

// Ensure that the chat_logs folder is created if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'public/chat_logs'))) {
    fs.mkdirSync(path.join(__dirname, 'public/chat_logs'), { recursive: true });
    console.log('Chat logs directory created.');
} else {
    console.log('Chat logs directory already exists.');
}



io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);

    // Send the chat log when a user connects
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading chat log file:', err);
        } else {
            // Send the entire chat log content to the client
            const logMessages = data.trim().split('\n').reverse(); // Reverse to show recent first
            socket.emit('loadChatLog', logMessages);
        }
    });

    // Handle incoming chat messages
    socket.on('chatMessage', (msgData) => {
        const now = new Date();
        const logMessage = `[${msgData.date} ${msgData.time}] ${msgData.username}: ${msgData.message}\n`;

        // Save the message to the single .txt file
        fs.appendFile(filePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to chat log:', err);
                return;
            }
        });

        // Broadcast the message to all clients
        io.emit('chatMessage', msgData);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected: ', socket.id);
    });
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//routes etc
const authRoutes = require('./routes/auth')(db, db2); // Pass the `db` connection
app.use('/auth', authRoutes);

const allRoutes = require('./routes/routes_all')(db); // Pass the `db` connection
app.use('/routes_attendance', allRoutes);


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

        const dutyHoursInMinutes = user.cumulativeDutyHours || 0; 
        const dutyHours = Math.floor(dutyHoursInMinutes / 60); 

        res.json({
            fullName: `${user.firstName} ${user.middleInitial}. ${user.lastName}`,
            callSign: user.callSign,
            dutyHours: dutyHours, 
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
    const timeIn = currentTime.toTimeString().split(' ')[0]; 
    const dateOfTimeIn = currentTime.toISOString().split('T')[0]; 

     //console.log('Time In: ',timeIn, dateOfTimeIn);
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

app.post('/recordTimeOut', (req, res) => {
    const rfid = req.body.rfid;
    const currentTime = new Date();
    const dateOfTimeOut = currentTime.toISOString().split('T')[0];
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const timeOut = `${hours}:${minutes}`;

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

        // Query to get the last time in record
        const getLastTimeInQuery = `SELECT DATE_FORMAT(timeIn, '%H:%i') AS timeIn, 
                                        DATE_FORMAT(dateOfTimeIn, '%Y-%m-%d') AS dateOfTimeIn,
                                        DATE_FORMAT(NOW(), '%H:%i') AS timeOut, 
                                        DATE_FORMAT(NOW(), '%Y-%m-%d') AS dateOfTimeOut
                                    FROM tbl_attendance 
                                    WHERE accountID = ? AND timeInStatus = 1 
                                    ORDER BY attendanceID DESC 
                                    LIMIT 1;
                                    ;`;

        db.query(getLastTimeInQuery, [accountID], (err, result) => {
            if (err) {
                res.status(500).send('Error retrieving time in data');
                return;
            }

            if (result.length === 0) {
                res.status(400).send('No active Time In record found');
                return;
            }

            const timeIn = result[0].timeIn; 
            const dateOfTimeIn = result[0].dateOfTimeIn; 

            // const timeOut = result[0].timeOut; 
            // const dateOfTimeOut = result[0].dateOfTimeOut; 

            //console.log('ss datetimeIn: ',timeIn, dateOfTimeIn)
            //console.log('ss datetimeOut: ',timeOut, dateOfTimeOut)

            const timeInDateTime = new Date(`${dateOfTimeIn}T${timeIn}Z`); 
            const timeOutDateTime = new Date(`${dateOfTimeOut}T${timeOut}Z`); 
            //console.log('-- timeInDateTime: ', timeInDateTime)
            //console.log('xx timeOutDateTime: ', timeOutDateTime)

            
            if (isNaN(timeInDateTime.getTime())) {
                console.error('Invalid timeInDateTime:', timeInDateTime);
                res.status(400).send('Invalid Time In data');
                return;
            }

            // Calculate total minutes
            const totalMinutes = Math.floor((timeOutDateTime - timeInDateTime) / (1000 * 60)); 

            // Debug log for total minutes
            // console.log(`Total Minutes: ${totalMinutes}`);

            if (totalMinutes < 0) {
                res.status(400).send('Time Out cannot be earlier than Time In');
                return;
            }

            // Now get the duty hours and cumulative duty hours
            const getDutyHoursQuery = `SELECT dutyHours, cumulativeDutyHours FROM tbl_accounts WHERE accountID = ?`;
            db.query(getDutyHoursQuery, [accountID], (err, result) => {
                if (err) {
                    res.status(500).send('Error retrieving duty hours');
                    return;
                }

                let oldDutyHours = result[0].dutyHours || 0; 
                let oldCumulativeDutyHours = result[0].cumulativeDutyHours || 0; 
                const updatedDutyHours = oldDutyHours + totalMinutes;
                const updatedCumulativeDutyHours = oldCumulativeDutyHours + totalMinutes;

                const updateAttendanceQuery = `UPDATE tbl_attendance 
                                               SET timeOut = ?, dateOfTimeOut = ?, timeInStatus = 0 
                                               WHERE accountID = ? AND timeInStatus = 1 
                                               ORDER BY attendanceID DESC LIMIT 1`;

                db.query(updateAttendanceQuery, [timeOut, dateOfTimeOut, accountID], (err, result) => {
                    if (err) {
                        res.status(500).send('Error recording Time Out');
                        return;
                    }

                    if (result.affectedRows === 0) {
                        res.status(400).send('No active Time In record found');
                        return;
                    }

                    // Now update both dutyHours and cumulativeDutyHours
                    const updateDutyHoursQuery = `UPDATE tbl_accounts 
                                                  SET dutyHours = ?, cumulativeDutyHours = ? 
                                                  WHERE accountID = ?`;

                    db.query(updateDutyHoursQuery, [updatedDutyHours, updatedCumulativeDutyHours, accountID], (err) => {
                        if (err) {
                            res.status(500).send('Error updating duty hours');
                            console.log(err);
                            return;
                        }

                        // Send the updated data back to the client
                        res.json({
                            timeOut,
                            dateOfTimeOut,
                            timeIn,
                            dateOfTimeIn
                        });
                    });
                });
            });
        });
    });
});

// TIMER TAB HERE
cron.schedule('58 20 * * *', () => {
    console.log('Logging out all users at 10:00 PM');
    logOutAllUsers();
});

// Schedule the cron job to run at midnight on the 1st day of each month
cron.schedule('0 0 1 * *', () => {
    console.log('Resetting duty hours at the beginning of the month');
    resetDutyHours();
    deleteTrashItems()
  });

function logOutAllUsers() {
    const currentTime = new Date();
    const dateOfTimeOut = currentTime.toISOString().split('T')[0];
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const timeOut = `${hours}:${minutes}`;
    const getUsersQuery = `
        SELECT a.accountID, 
              DATE_FORMAT(timeIn, '%H:%i') AS timeIn, 
              DATE_FORMAT(dateOfTimeIn, '%Y-%m-%d') AS dateOfTimeIn
        FROM tbl_accounts a
        JOIN tbl_attendance t ON a.accountID = t.accountID
        WHERE t.timeInStatus = 1;`;

    db.query(getUsersQuery, (err, users) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return;
        }

        if (users.length === 0) {
            console.log('No users to log out');
            return;
        }
        console.log(`Retrieved ${users.length} active users with Time In status:`);

        users.forEach(user => {
            const accountID = user.accountID;
            const timeIn = user.timeIn; 
            const dateOfTimeIn = user.dateOfTimeIn; 
            const timeInDateTime = new Date(`${dateOfTimeIn}T${timeIn}Z`); 
            const timeOutDateTime = new Date(`${dateOfTimeOut}T${timeOut}Z`); 
            const totalMinutes = Math.floor((timeOutDateTime - timeInDateTime) / (1000 * 60)); 

            if (totalMinutes < 0) {
                console.error('Time Out cannot be earlier than Time In for accountID:', accountID);
                return; 
            }

            const getDutyHoursQuery = `SELECT dutyHours, cumulativeDutyHours FROM tbl_accounts WHERE accountID = ?`;
            db.query(getDutyHoursQuery, [accountID], (err, result) => {
                if (err) {
                    console.error('Error retrieving duty hours for accountID:', accountID, err);
                    return;
                }

                let oldDutyHours = result[0].dutyHours || 0; 
                let oldCumulativeDutyHours = result[0].cumulativeDutyHours || 0; 
                const updatedDutyHours = oldDutyHours + totalMinutes;
                const updatedCumulativeDutyHours = oldCumulativeDutyHours + totalMinutes;
                const updateAttendanceQuery = `UPDATE tbl_attendance 
                                               SET timeOut = ?, dateOfTimeOut = ?, timeInStatus = 0 
                                               WHERE accountID = ? AND timeInStatus = 1 
                                               ORDER BY attendanceID DESC LIMIT 1`;
                
                const timeOut = new Date().toTimeString().split(' ')[0]; // Get current time

                db.query(updateAttendanceQuery, [timeOut, new Date().toISOString().split('T')[0], accountID], (err) => {
                    if (err) {
                        console.error('Error recording Time Out for accountID:', accountID, err);
                        return;
                    }
                    const updateDutyHoursQuery = `UPDATE tbl_accounts 
                                                  SET dutyHours = ?, cumulativeDutyHours = ? 
                                                  WHERE accountID = ?`;

                    db.query(updateDutyHoursQuery, [updatedDutyHours, updatedCumulativeDutyHours, accountID], (err) => {
                        if (err) {
                            console.error('Error updating duty hours for accountID:', accountID, err);
                            return;
                        }

                        console.log(`Logged out accountID: ${accountID}, Total Minutes: ${totalMinutes}`);
                    });
                });
            });
        });
    });
}
function resetDutyHours() {
    const query = 'UPDATE tbl_accounts SET dutyHours = 0';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error running query:', error);
      } else {
        console.log('Duty hours reset successfully');
      }
    });
}
function deleteTrashItems() {
    console.log('Running scheduled task to delete trash items');

    const deleteTrashQuery = 'DELETE FROM tbl_inventory WHERE itemStatus = "trash"';

    db.query(deleteTrashQuery, (err, result) => {
        if (err) {
            console.error('Error deleting trash items:', err);
        } else {
            console.log(`Deleted ${result.affectedRows} trash items`);
        }
    });
}

app.get('/recentAttendance', (req, res) => {
    const sql = `
        SELECT a.accountID, a.timeIn, a.dateOfTimeIn, a.timeOut, a.dateOfTimeOut, 
               b.firstName, b.middleInitial, b.lastName
        FROM tbl_attendance a
        JOIN tbl_accounts b ON a.accountID = b.accountID
        ORDER BY a.attendanceID DESC
        LIMIT 50`; // pang limit kung ilan kukunin shit

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving recent attendance records');
            return;
        }
        res.json(results);
    });
});
app.get('/accountsAll', (req, res) => {
    const sql = `
        SELECT *
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
            FLOOR(a.dutyHours / 60) AS dutyHours,
            FLOOR(a.cumulativeDutyHours / 60) AS cumulativeDutyHours,
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
// Endpoint to get current attendees with timeInStatus = 1
app.get('/getCurrentPresent', (req, res) => {
    const sql = `
        SELECT b.callSign, b.firstName, b.middleInitial, b.lastName 
        FROM tbl_attendance a
        JOIN tbl_accounts b ON a.accountID = b.accountID
        WHERE a.timeInStatus = 1
    `;

    db.query(sql, (err, results) => {
        if (err) {  
            console.error('Error retrieving current present attendees:', err);
            res.status(500).send('Error retrieving current present attendees');
            return;
        }
        res.json(results);
    });
});

app.get('/getVehicleAssignments', (req, res) => {
    const sql = 'SELECT * from tbl_vehicles;';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to retrieve vehicle assignments:', err);
            res.status(500).json({ error: 'Failed to retrieve vehicle assignments' });
        } else {
            res.json(results);
        }
    });
});
app.get('/getEquipment', (req, res) => { 
    try {
        const search = req.query.search || ''; 
        const vehicleAssignment = req.query.vehicleAssignment || ''; 
        const itemStatus = req.query.itemStatus || ''; 

        let query = `
            SELECT itemID, itemName, itemImage, vehicleAssignment FROM tbl_inventory 
            WHERE (itemName LIKE ? OR itemID LIKE ?) 
            AND itemStatus = 'Available'
        `;
        
        const queryParams = [`%${search}%`, `%${search}%`];

        // Add filters only if vehicleAssignment and itemStatus are provided
        if (vehicleAssignment !== '') {
            query += ` AND vehicleAssignment LIKE ? `;
            queryParams.push(`%${vehicleAssignment}%`);
        }

        if (itemStatus !== '') {
            query += ` AND status LIKE ? `;
            queryParams.push(`%${itemStatus}%`);
        }

        db.query(query, queryParams, (err, results) => {
            if (err) {
                console.error('Failed to retrieve equipment:', err);
                return res.status(500).json({ error: 'Failed to retrieve equipment' });
            }

            const equipment = results.map(item => ({
                ...item,
                itemImage: cloudinary.url(item.itemImage) // Assuming you're using Cloudinary
            }));
            // console.log(equipment);
            res.json(equipment);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});




app.get('/getTrashedEquipment', (req, res) => { 
    try {
        const search = req.query.search || ''; 
        const query = `
            SELECT itemID, itemName, itemImage, vehicleAssignment 
            FROM tbl_inventory 
            WHERE (itemName LIKE ? OR itemID LIKE ? OR vehicleAssignment LIKE ?) 
            AND itemStatus = 'trash'
        `;

        const searchParam = `%${search}%`;

        db.query(query, [searchParam, searchParam, searchParam], (err, results) => {
            if (err) {
                console.error('Failed to retrieve trashed equipment:', err);
                return res.status(500).json({ error: 'Failed to retrieve trashed equipment' });
            }

            const trashedEquipment = results.map(item => ({
                ...item,
                itemImage: cloudinary.url(item.itemImage) 
            }));

            res.json(trashedEquipment);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

app.put('/moveToTrash/:itemID', (req, res) => {
    const itemID = req.params.itemID;

    // Move the item to the trash by updating its `itemStatus`
    const sql = 'UPDATE tbl_inventory SET itemStatus = "trash" WHERE itemID = ?'; 
    db.query(sql, [itemID], (err, result) => {
        if (err) {
            console.error('Error moving equipment to trash:', err);
            return res.status(500).json({ error: 'Failed to move equipment to trash.' });
        }

        res.status(200).json({ message: 'Equipment moved to trash successfully.' });
    });
});

app.delete('/deleteFromTrash/:itemID', (req, res) => {
    const { itemID } = req.params;
    const { password } = req.body;
    const username = req.session.user?.username;

    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const getPasswordQuery = 'SELECT password FROM tbl_accounts WHERE username = ?';
    db.query(getPasswordQuery, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(500).json({ error: 'Error retrieving password' });
        }

        const hashedPassword = results[0].password;

        bcrypt.compare(password, hashedPassword, async (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ error: 'Incorrect password' });
            }

            const getImagePathQuery = 'SELECT itemImage FROM tbl_inventory WHERE itemID = ?';

            console.log('Executing Query:', getImagePathQuery, 'with itemID:', itemID);

            db.query(getImagePathQuery, [itemID], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: 'Failed to retrieve image path' });
                }

                if (results.length === 0 || !results[0].itemImage) {
                    console.warn('No image found for itemID:', itemID);
                    return deleteFromDatabase(itemID, res);
                }

                const imagePath = results[0].itemImage;

                try {
                    const publicId = imagePath.startsWith('uploads/') 
                        ? imagePath.split('uploads/')[1].split('.')[0]  // Extract after 'uploads/' and remove file extension
                        : imagePath.split('/').pop().split('.')[0];     // Fallback if no 'uploads/' in path

                    if (publicId) {
                        cloudinary.uploader.destroy(`uploads/${publicId}`, (err, result) => {
                            if (err || result.result === 'not found') {
                                console.warn('Image not found in Cloudinary or deletion failed:', err || result.result);
                            }

                            // Proceed with database deletion even if image deletion fails
                            deleteFromDatabase(itemID, res);
                        });
                    } else {
                        console.warn('Invalid imagePath or publicId for itemID:', itemID);
                        // Proceed with database deletion
                        deleteFromDatabase(itemID, res);
                    }
                } catch (error) {
                    console.error('Error processing image deletion:', error);
                    // Proceed with database deletion even if an error occurs during image processing
                    deleteFromDatabase(itemID, res);
                }
            });
        });
    });
});

function deleteFromDatabase(itemID, res) {
    const deleteLog = 'DELETE FROM tbl_inventory_logs WHERE itemID = ?';
    
    db.query(deleteLog, [itemID], (err) => {
        if (err) {
            console.error('Failed to delete log:', err);
        }
        const deleteQuery = 'DELETE FROM tbl_inventory WHERE itemID = ?';
        
        db.query(deleteQuery, [itemID], (err) => {
            if (err) {
                console.error('Failed to delete item:', err);
                return res.status(500).json({ error: 'Failed to delete equipment' });
            }

            res.status(200).json({ message: 'Equipment permanently deleted from trash.' });
        });
    });
}

//edit equip route
app.put('/updateEquipment', (req, res) => {
    const { updatedItemName, updatedVehicleAssignment, itemId } = req.body;
    let itemImagePath = null;

    // Step 1: Get the current image path from the database
    const getCurrentImagePathSql = 'SELECT itemImage FROM tbl_inventory WHERE itemID = ?';
    db.query(getCurrentImagePathSql, [itemId], (err, results) => {
        if (err) {
            console.error('Error retrieving current image path:', err);
            return res.status(500).send({ success: false, message: 'Error retrieving current image' });
        }

        // If item not found, send a 404 error
        if (results.length === 0) {
            return res.status(404).send({ success: false, message: 'Item not found' });
        }

        // Get the current image path
        const currentImagePath = results[0].itemImage;

        // Step 2: Check if a new image is uploaded
        if (req.files && req.files.itemImage) {
            const itemImage = req.files.itemImage;
            const uniqueFileName = `${updatedItemName}_${Date.now()}_${itemImage.name}`;
            const uploadDir = path.join(__dirname, 'public/uploads');
            const uploadPath = path.join(uploadDir, uniqueFileName);
            
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            itemImage.mv(uploadPath, (err) => {
                if (err) {
                    console.error('Error moving file:', err);
                    return res.status(500).send({ success: false, message: 'Error saving item image' });
                }
                itemImagePath = `uploads/${uniqueFileName}`;
                if (currentImagePath) {
                    const existingImagePath = path.join(__dirname, 'public', currentImagePath);
                    if (fs.existsSync(existingImagePath)) {
                        fs.unlink(existingImagePath, (err) => {
                            if (err) {
                                console.error('Error deleting existing image:', err);
                                return res.status(500).send({ success: false, message: 'Error deleting existing image' });
                            }
                            updateDatabase();
                        });
                    } else {
                        updateDatabase();
                    }
                } else {
                    updateDatabase();
                }
            });
        } else {
            updateDatabase();
        }
    });

    function updateDatabase() {
        const sql = `
            UPDATE tbl_inventory
            SET itemName = ?, 
            vehicleAssignment = ?,
            itemImage = COALESCE(?, itemImage) -- Only update image if a new one is uploaded
            WHERE itemID = ?
        `;

        db.query(sql, [updatedItemName, updatedVehicleAssignment, itemImagePath, itemId], (err, result) => {
            if (err) {
                console.error('Database update error:', err);
                return res.status(500).json({ error: 'Failed to update equipment' });
            }
            res.status(200).json({ message: 'Equipment updated successfully' });
        });
    }
});





// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




app.post('/saveICSLogs', async (req, res) => {
    const username = req.session.user?.username;
    const {
        supervisorName,
        incidentDate,
        dispatchTime,
        location,
        alarmStatus,
        whoRequested,
        fireType,
        vehicleUsed,
        responders,
        chatLogs,
        remarks
    } = req.body;

    try {
        // Save the ICS logs to tbl_ics_logs
        await db.query(`INSERT INTO tbl_ics_logs 
            (supervisorName, incidentDate, dispatchTime, location, alarmStatus, whoRequested, fireType, vehicleUsed, responders, chatLogs, remarks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [supervisorName, incidentDate, dispatchTime, location, alarmStatus, whoRequested, fireType, vehicleUsed, responders, chatLogs, remarks]);

        // Convert responders into an array of callSigns
        const responderList = responders.split(',').map(responder => {
            const match = responder.match(/\[(.*?)\]/);
            return match ? match[1].trim() : null;
        }).filter(callSign => callSign);  // Remove null values in case of failed regex match

        // Update the fireResponsePoints for each responder in tbl_accounts
        for (const callSign of responderList) {
            await db.query(`UPDATE tbl_accounts SET fireResponsePoints = fireResponsePoints + 1 WHERE callSign = ?`, [callSign]);

            // Insert notification for responder
            await db.query(
                'INSERT INTO tbl_notification (detail, target, created_by, created_at) VALUES ("earned fire response", (SELECT username FROM tbl_accounts WHERE callSign = ?), "0", NOW())',
                [callSign]
            );
        }

        // Insert notification for the admin
        await db.query(
            'INSERT INTO tbl_notification (detail, target, created_by, created_at) VALUES ("fire response submitted", "Admin", (SELECT accountID from tbl_accounts where username = ?), NOW())',
            [username]
        );

        res.json({ success: true, message: 'Logs saved and fireResponsePoints updated successfully' });
    } catch (error) {
        console.error('Error saving logs or updating fireResponsePoints:', error);
        res.status(500).json({ success: false, message: 'Failed to save logs or update fireResponsePoints' });
    }
});


app.get('/getIcsLogs', (req, res) => {
    const query = 'SELECT icsID, TRIM(SUBSTRING_INDEX(supervisorName, \'[\', 1)) AS supervisorName, incidentDate, dispatchTime FROM tbl_ics_logs;';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch ICS logs' });
        }
        res.json(results);
    });
});

app.get('/getIncidentLog/:icsID', (req, res) => {
    const icsID = req.params.icsID;
    
    // Define the SQL query to fetch the log for the given icsID
    const sql = `SELECT supervisorName, incidentDate, dispatchTime, alarmStatus, location, 
                        whoRequested, fireType, vehicleUsed, responders, chatLogs, remarks 
                 FROM tbl_ics_logs WHERE icsID = ?`;

    db.query(sql, [icsID], (err, results) => {
        if (err) {
            console.error('Error fetching incident log:', err);  // Log the error for debugging
            return res.status(500).json({ error: 'Failed to fetch incident log' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Incident log not found' });  // Handle case where no log is found
        }

        // Return the incident log details as JSON
        res.json(results[0]);
    });
});

app.get('/rankUp', (req, res) => {
    const sql = `SELECT a.accountID, a.firstName, a.middleInitial,
    a.lastName, a.callSign, FLOOR(a.cumulativeDutyHours / 60) AS dutyHours,
    a.fireResponsePoints FROM tbl_accounts a WHERE (FLOOR(a.cumulativeDutyHours / 60) >= 100 AND a.callSign LIKE 'ASPIRANT%')
    OR (FLOOR(a.cumulativeDutyHours / 60) >= 1000 AND a.callSign LIKE 'PROBATIONARY%' AND a.fireResponsePoints >= 20)
    OR (FLOOR(a.cumulativeDutyHours / 60) >= 2000 AND a.callSign LIKE 'ECHO%' AND a.fireResponsePoints >= 20)
    ORDER BY a.lastName, a.firstName;`;

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving account details');
            return;
        }
        res.json(results);
    }); 
});

app.post('/upgradeRank', (req, res) => {
    const { accountID, currentCallSign, dutyHours, fireResponsePoints } = req.body;

    // Determine the new rank based on the current callSign
    let newCallSign;
    if (currentCallSign.startsWith('ASPIRANT')) {
        newCallSign = currentCallSign.replace('ASPIRANT', 'PROBATIONARY');
    } else if (currentCallSign.startsWith('PROBATIONARY')) {
        newCallSign = currentCallSign.replace('PROBATIONARY', 'ECHO900');
    } else if (/^ECHO9\d{2}$/.test(currentCallSign)) {
        // Change 'ECHO9' to 'ECHO8' while keeping the remaining digits the same
        newCallSign = currentCallSign.replace('ECHO9', 'ECHO8');
    } else {
        return res.status(400).json({ error: 'Invalid rank or no promotion available' });
    }

    // SQL to update the callSign and cumulative values
    const sql = `
        UPDATE tbl_accounts 
        SET callSign = ?
        WHERE accountID = ?`;

    const params = [newCallSign, accountID];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error upgrading the rank' });
        }

        res.json({ success: true });
    });
});


app.get('/getMembers2', (req, res) => {
    const search = req.query.search || '';
    let sql = 'SELECT callSign, firstName, middleInitial, lastName FROM tbl_accounts WHERE accountID NOT IN (SELECT accountID FROM tbl_attendance WHERE timeInStatus = 1)';
    
    if (search) {
        // Add the search filter using AND, since there's already a WHERE clause
        sql += ' AND (callSign LIKE ? OR firstName LIKE ? OR lastName LIKE ?)';
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

const pages = require('./routes/pages');
app.use('/', pages);
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/profilePicture', express.static(path.join(__dirname, 'profilePicture')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));




//server instead of app for HTTP || wag baguhin.
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
