// // Attendance profile route (recent working)
// app.get('/attendanceProfile', (req, res) => {
//     const rfid = req.query.rfid;
//     if (!rfid) {
//         return res.status(400).send('RFID is required');
//     }

//     const getUserQuery = 'SELECT * FROM tbl_accounts WHERE rfid = ?';
//     db.query(getUserQuery, [rfid], (err, result) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).send('Error fetching user');
//         }

//         if (result.length === 0) {
//             return res.status(404).send('User not found');
//         }

//         const user = result[0];
//         res.json({
//             rfid: user.rfid,
//             fullName: `${user.firstName} ${user.middleInitial}. ${user.lastName}`,
//             callSign: user.callSign,
//             dutyHours: user.dutyHours,
//             fireResponsePoints: user.fireResponsePoints,
//             inventoryPoints: user.inventoryPoints,
//             activityPoints: user.activityPoints,
//             emailAddress: user.emailAddress,
//             mobileNumber: user.mobileNumber,
//             dateOfBirth: user.dateOfBirth,
//             gender: user.gender,
//             civilStatus: user.civilStatus,
//             nationality: user.nationality,
//             bloodType: user.bloodType,
//             highestEducationalAttainment: user.highestEducationalAttainment,
//             nameOfCompany: user.nameOfCompany,
//             yearsInService: user.yearsInService,
//             skillsTraining: user.skillsTraining,
//             otherAffiliation: user.otherAffiliation,
//             currentAddress: user.currentAddress,
//             emergencyContactPerson: user.emergencyContactPerson,
//             emergencyContactNumber: user.emergencyContactNumber
//         });
//     });
// });

// // Record attendance route
// app.post('/recordAttendance', (req, res) => {
//     const { rfid } = req.body;
//     if (!rfid) {
//         return res.status(400).send('RFID is required');
//     }

//     // Get the user's account ID based on RFID
//     const getUserQuery = 'SELECT accountID, dutyHours FROM tbl_accounts WHERE rfid = ?';
//     db.query(getUserQuery, [rfid], (err, result) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).send('Error fetching user');
//         }

//         if (result.length === 0) {
//             return res.status(404).send('User not found');
//         }

//         const accountID = result[0].accountID;
//         const currentDutyHours = result[0].dutyHours || 0;

//         // Check if the user already has an active attendance record (timeInStatus = 1)
//         const checkAttendanceQuery = 'SELECT * FROM tbl_attendance WHERE accountID = ? AND timeInStatus = 1';
//         db.query(checkAttendanceQuery, [accountID], (checkErr, checkResult) => {
//             if (checkErr) {
//                 console.error('Error checking attendance:', checkErr);
//                 return res.status(500).send('Error checking attendance');
//             }

//             const now = new Date();
//             const timeNow = now.toTimeString().split(' ')[0];
//             const dateNow = now.toISOString().split('T')[0];

//             if (checkResult.length === 0) {
//                 // No active attendance record, insert a new time-in record
//                 const insertAttendanceQuery = `INSERT INTO tbl_attendance (accountID, timeIn, dateOfTimeIn, timeInStatus)
//                                                 VALUES (?, ?, ?, 1)`;
//                 db.query(insertAttendanceQuery, [accountID, timeNow, dateNow], (insertErr, insertResult) => {
//                     if (insertErr) {
//                         console.error('Error inserting attendance:', insertErr);
//                         return res.status(500).send('Error inserting attendance');
//                     }
//                     console.log('Time in recorded:', { timeIn: timeNow, dateOfTimeIn: dateNow });
//                     res.status(200).json({
//                         message: 'Time in recorded successfully',
//                         timeIn: timeNow,
//                         dateOfTimeIn: dateNow,
//                         timeInStatus: 1
//                     });
//                 });
//             } else {
//                 // Active attendance record exists, update with time out
//                 const attendanceID = checkResult[0].attendanceID;
//                 const timeIn = checkResult[0].timeIn;
//                 const dateOfTimeIn = checkResult[0].dateOfTimeIn;

//                 const updateAttendanceQuery = `UPDATE tbl_attendance SET timeOut = ?, dateOfTimeOut = ?, timeInStatus = 0
//                                                 WHERE attendanceID = ?`;
//                 db.query(updateAttendanceQuery, [timeNow, dateNow, attendanceID], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.error('Error updating attendance:', updateErr);
//                         return res.status(500).send('Error updating attendance');
//                     }

//                     // Calculate the duty hours
//                     const dutyHours = (new Date(`${dateNow} ${timeNow}`) - new Date(`${dateOfTimeIn} ${timeIn}`)) / (1000 * 60 * 60);
//                     const newDutyHours = currentDutyHours + dutyHours;

//                     // Update the duty hours in tbl_accounts
//                     const updateDutyHoursQuery = 'UPDATE tbl_accounts SET dutyHours = ? WHERE accountID = ?';
//                     db.query(updateDutyHoursQuery, [newDutyHours, accountID], (dutyErr, dutyResult) => {
//                         if (dutyErr) {
//                             console.error('Error updating duty hours:', dutyErr);
//                             return res.status(500).send('Error updating duty hours');
//                         }
//                         console.log('Time out recorded:', { timeOut: timeNow, dateOfTimeOut: dateNow, dutyHours: newDutyHours });
//                         res.status(200).json({
//                             message: 'Time out recorded successfully',
//                             timeOut: timeNow,
//                             dateOfTimeOut: dateNow,
//                             timeInStatus: 0,
//                             dutyHours: newDutyHours
//                         });
//                     });
//                 });
//             }
//         });
//     });
// });











// // Attendance profile route (50%)
// app.get('/attendanceProfile', (req, res) => {
//     const rfid = req.query.rfid;
//     if (!rfid) {
//         return res.status(400).send('RFID is required');
//     }

//     const getUserQuery = 'SELECT * FROM tbl_accounts WHERE rfid = ?';
//     db.query(getUserQuery, [rfid], (err, result) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).send('Error fetching user');
//         }

//         if (result.length === 0) {
//             return res.status(404).send('User not found');
//         }

//         const user = result[0];
//         res.json({
//             rfid: user.rfid,
//             fullName: `${user.firstName} ${user.middleInitial}. ${user.lastName}`,
//             callSign: user.callSign,
//             dutyHours: user.dutyHours,
//             fireResponsePoints: user.fireResponsePoints,
//             inventoryPoints: user.inventoryPoints,
//             activityPoints: user.activityPoints,
//             emailAddress: user.emailAddress,
//             mobileNumber: user.mobileNumber,
//             dateOfBirth: user.dateOfBirth,
//             gender: user.gender,
//             civilStatus: user.civilStatus,
//             nationality: user.nationality,
//             bloodType: user.bloodType,
//             highestEducationalAttainment: user.highestEducationalAttainment,
//             nameOfCompany: user.nameOfCompany,
//             yearsInService: user.yearsInService,
//             skillsTraining: user.skillsTraining,
//             otherAffiliation: user.otherAffiliation,
//             currentAddress: user.currentAddress,
//             emergencyContactPerson: user.emergencyContactPerson,
//             emergencyContactNumber: user.emergencyContactNumber
//         });
//     });
// });



// // Record attendance route
// app.post('/recordAttendance', (req, res) => {
//     const { rfid } = req.body;
//     if (!rfid) {
//         return res.status(400).send('RFID is required');
//     }

//     // Get the user's account ID based on RFID
//     const getUserQuery = 'SELECT accountID, dutyHours FROM tbl_accounts WHERE rfid = ?';
//     db.query(getUserQuery, [rfid], (err, result) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).send('Error fetching user');
//         }

//         if (result.length === 0) {
//             return res.status(404).send('User not found');
//         }

//         const accountID = result[0].accountID;
//         const currentDutyHours = result[0].dutyHours || 0;

//         // Check if the user already has an active attendance record (timeInStatus = 1)
//         const checkAttendanceQuery = 'SELECT * FROM tbl_attendance WHERE accountID = ? AND timeInStatus = 1';
//         db.query(checkAttendanceQuery, [accountID], (checkErr, checkResult) => {
//             if (checkErr) {
//                 console.error('Error checking attendance:', checkErr);
//                 return res.status(500).send('Error checking attendance');
//             }

//             const now = new Date();
//             const timeNow = now.toTimeString().split(' ')[0];
//             const dateNow = now.toISOString().split('T')[0];

//             if (checkResult.length === 0) {
//                 // No active attendance record, insert a new time in record
//                 const insertAttendanceQuery = `INSERT INTO tbl_attendance (accountID, timeIn, dateOfTimeIn, timeInStatus)
//                                                 VALUES (?, ?, ?, 1)`;
//                 db.query(insertAttendanceQuery, [accountID, timeNow, dateNow], (insertErr, insertResult) => {
//                     if (insertErr) {
//                         console.error('Error inserting attendance:', insertErr);
//                         return res.status(500).send('Error inserting attendance');
//                     }
//                     console.log('Time in recorded:', { timeIn: timeNow, dateOfTimeIn: dateNow });
//                     res.status(200).json({
//                         message: 'Time in recorded successfully',
//                         timeIn: timeNow,
//                         dateOfTimeIn: dateNow,
//                         timeInStatus: 1
//                     });
//                 });
//             } else {
//                 // Active attendance record exists, update with time out
//                 const attendanceID = checkResult[0].attendanceID;
//                 const timeIn = checkResult[0].timeIn;
//                 const dateOfTimeIn = checkResult[0].dateOfTimeIn;

//                 const updateAttendanceQuery = `UPDATE tbl_attendance SET timeOut = ?, dateOfTimeOut = ?, timeInStatus = 0
//                                                 WHERE attendanceID = ?`;
//                 db.query(updateAttendanceQuery, [timeNow, dateNow, attendanceID], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.error('Error updating attendance:', updateErr);
//                         return res.status(500).send('Error updating attendance');
//                     }

//                     // Calculate the duty hours
//                     const dutyHours = (new Date(`${dateNow} ${timeNow}`) - new Date(`${dateOfTimeIn} ${timeIn}`)) / (1000 * 60 * 60);
//                     const newDutyHours = currentDutyHours + dutyHours;

//                     // Update the duty hours in tbl_accounts
//                     const updateDutyHoursQuery = 'UPDATE tbl_accounts SET dutyHours = ? WHERE accountID = ?';
//                     db.query(updateDutyHoursQuery, [newDutyHours, accountID], (dutyErr, dutyResult) => {
//                         if (dutyErr) {
//                             console.error('Error updating duty hours:', dutyErr);
//                             return res.status(500).send('Error updating duty hours');
//                         }
//                         console.log('Time out recorded:', { timeOut: timeNow, dateOfTimeOut: dateNow, dutyHours: newDutyHours });
//                         res.status(200).json({
//                             message: 'Time out recorded successfully',
//                             timeOut: timeNow,
//                             dateOfTimeOut: dateNow,
//                             timeInStatus: 0,
//                             dutyHours: newDutyHours
//                         });
//                     });
//                 });
//             }
//         });
//     });
// });



// // Record attendance route (bugged)
// app.post('/recordAttendance', (req, res) => {
//     const { rfid } = req.body;
//     if (!rfid) {
//         return res.status(400).send('RFID is required');
//     }

//     // Get the user's account ID based on RFID
//     const getUserQuery = 'SELECT accountID, dutyHours FROM tbl_accounts WHERE rfid = ?';
//     db.query(getUserQuery, [rfid], (err, result) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).send('Error fetching user');
//         }

//         if (result.length === 0) {
//             return res.status(404).send('User not found');
//         }

//         const accountID = result[0].accountID;
//         const currentDutyHours = result[0].dutyHours || 0;

//         // Check if the user already has an active attendance record (timeInStatus = 1)
//         const checkAttendanceQuery = 'SELECT * FROM tbl_attendance WHERE accountID = ? AND timeInStatus = 1';
//         db.query(checkAttendanceQuery, [accountID], (checkErr, checkResult) => {
//             if (checkErr) {
//                 console.error('Error checking attendance:', checkErr);
//                 return res.status(500).send('Error checking attendance');
//             }

//             const now = new Date();
//             const timeNow = now.toTimeString().split(' ')[0];
//             const dateNow = now.toISOString().split('T')[0];

//             if (checkResult.length === 0) {
//                 // No active attendance record, insert a new time in record
//                 const insertAttendanceQuery = `INSERT INTO tbl_attendance (accountID, timeIn, dateOfTimeIn, timeInStatus)
//                                                 VALUES (?, ?, ?, 1)`;
//                 db.query(insertAttendanceQuery, [accountID, timeNow, dateNow], (insertErr, insertResult) => {
//                     if (insertErr) {
//                         console.error('Error inserting attendance:', insertErr);
//                         return res.status(500).send('Error inserting attendance');
//                     }
//                     console.log('Time in recorded:', { timeIn: timeNow, dateOfTimeIn: dateNow });
//                     res.status(200).json({
//                         message: 'Time in recorded successfully',
//                         timeIn: timeNow,
//                         dateOfTimeIn: dateNow,
//                         timeInStatus: 1
//                     });
//                 });
//             } else {
//                 // Active attendance record exists, update with time out
//                 const attendanceID = checkResult[0].attendanceID;
//                 const timeIn = checkResult[0].timeIn;
//                 const dateOfTimeIn = checkResult[0].dateOfTimeIn;

//                 const updateAttendanceQuery = `UPDATE tbl_attendance SET timeOut = ?, dateOfTimeOut = ?, timeInStatus = 0
//                                                 WHERE attendanceID = ?`;
//                 db.query(updateAttendanceQuery, [timeNow, dateNow, attendanceID], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.error('Error updating attendance:', updateErr);
//                         return res.status(500).send('Error updating attendance');
//                     }

//                     // Calculate the duty hours
//                     const dutyHours = (new Date(`${dateNow} ${timeNow}`) - new Date(`${dateOfTimeIn} ${timeIn}`)) / (1000 * 60 * 60);
//                     const newDutyHours = currentDutyHours + dutyHours;

//                     // Update the duty hours in tbl_accounts
//                     const updateDutyHoursQuery = 'UPDATE tbl_accounts SET dutyHours = ? WHERE accountID = ?';
//                     db.query(updateDutyHoursQuery, [newDutyHours, accountID], (dutyErr, dutyResult) => {
//                         if (dutyErr) {
//                             console.error('Error updating duty hours:', dutyErr);
//                             return res.status(500).send('Error updating duty hours');
//                         }
//                         console.log('Time out recorded:', { timeOut: timeNow, dateOfTimeOut: dateNow, dutyHours: newDutyHours });
//                         res.status(200).json({
//                             message: 'Time out recorded successfully',
//                             timeOut: timeNow,
//                             dateOfTimeOut: dateNow,
//                             timeInStatus: 0,
//                             dutyHours: newDutyHours
//                         });
//                     });
//                 });
//             }
//         });
//     });
// });
