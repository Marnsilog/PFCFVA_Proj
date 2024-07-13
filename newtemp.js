// //new edit
// app.post('/updateProfile', (req, res) => {
//     const {
//         rfid,
//         lastName,
//         firstName,
//         middleName,
//         middleInitial,
//         username,
//         emailAddress,
//         mobileNumber,
//         oldPassword,
//         newPassword,
//         confirmPassword,
//         civilStatus,
//         nationality,
//         bloodType,
//         gender,
//         currentAddress,
//         emergencyContactPerson,
//         emergencyContactNumber,
//         highestEducationalAttainment,
//         nameOfCompany,
//         yearsInService,
//         skillsTraining,
//         otherAffiliation
//     } = req.body;

//     const updateFields = {
//         lastName,
//         firstName,
//         middleName,
//         middleInitial,
//         username,
//         emailAddress,
//         mobileNumber,
//         civilStatus,
//         nationality,
//         bloodType,
//         gender,
//         currentAddress,
//         emergencyContactPerson,
//         emergencyContactNumber,
//         highestEducationalAttainment,
//         nameOfCompany,
//         yearsInService,
//         skillsTraining,
//         otherAffiliation
//     };

//     // Filter out empty fields
//     const fieldsToUpdate = Object.entries(updateFields).reduce((acc, [key, value]) => {
//         if (value !== undefined && value !== '') acc[key] = value;
//         return acc;
//     }, {});

//     const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ');
//     const params = [...Object.values(fieldsToUpdate), rfid];

//     let sql = `UPDATE tbl_accounts SET ${setClause} WHERE rfid = ?`;

//     const handlePasswordUpdate = () => {
//         if (oldPassword && newPassword && confirmPassword) {
//             const passwordQuery = 'SELECT password FROM tbl_accounts WHERE rfid = ?';
//             db.query(passwordQuery, [rfid], (err, results) => {
//                 if (err) {
//                     console.error('Error fetching password:', err);
//                     return res.status(500).json({ success: false, message: 'Error fetching password' });
//                 }

//                 const storedPassword = results[0].password;
//                 bcrypt.compare(oldPassword, storedPassword, (compareErr, isMatch) => {
//                     if (compareErr || !isMatch) {
//                         return res.status(400).json({ success: false, message: 'Incorrect old password' });
//                     }

//                     if (newPassword !== confirmPassword) {
//                         return res.status(400).json({ success: false, message: 'New password and confirm password do not match' });
//                     }

//                     bcrypt.hash(newPassword, 10, (hashErr, hashedNewPassword) => {
//                         if (hashErr) {
//                             console.error('Error hashing new password:', hashErr);
//                             return res.status(500).json({ success: false, message: 'Error hashing new password' });
//                         }

//                         fieldsToUpdate.password = hashedNewPassword;
//                         updateDatabase();
//                     });
//                 });
//             });
//         } else {
//             updateDatabase();
//         }
//     };

//     const updateDatabase = () => {
//         db.query(sql, params, (err, result) => {
//             if (err) {
//                 console.error('Error updating profile:', err);
//                 return res.status(500).json({ success: false, message: 'Error updating profile' });
//             }
//             res.status(200).json({ success: true, message: 'Profile updated successfully' });
//         });
//     };

//     handlePasswordUpdate();
// });





// //for editing prpfile (working with bugs)
// // app.post('/updateProfile', (req, res) => {
// //     const {
// //         rfid,
// //         lastName,
// //         firstName,
// //         middleName,
// //         middleInitial,
// //         username,
// //         emailAddress,
// //         mobileNumber,
// //         oldPassword,
// //         newPassword,
// //         confirmPassword,
// //         civilStatus,
// //         nationality,
// //         bloodType,
// //         gender,
// //         currentAddress,
// //         emergencyContactPerson,
// //         emergencyContactNumber,
// //         highestEducationalAttainment,
// //         nameOfCompany,
// //         yearsInService,
// //         skillsTraining,
// //         otherAffiliation
// //     } = req.body;

// //     const updateFields = {
// //         lastName,
// //         firstName,
// //         middleName,
// //         middleInitial,
// //         username,
// //         emailAddress,
// //         mobileNumber,
// //         civilStatus,
// //         nationality,
// //         bloodType,
// //         gender,
// //         currentAddress,
// //         emergencyContactPerson,
// //         emergencyContactNumber,
// //         highestEducationalAttainment,
// //         nameOfCompany,
// //         yearsInService,
// //         skillsTraining,
// //         otherAffiliation
// //     };

// //     // Filter out empty fields
// //     const fieldsToUpdate = Object.entries(updateFields).reduce((acc, [key, value]) => {
// //         if (value !== undefined && value !== '') acc[key] = value;
// //         return acc;
// //     }, {});

// //     const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ');
// //     const params = [...Object.values(fieldsToUpdate), rfid];

// //     let sql = `UPDATE tbl_accounts SET ${setClause} WHERE rfid = ?`;

// //     const handlePasswordUpdate = () => {
// //         if (oldPassword && newPassword && confirmPassword) {
// //             const passwordQuery = 'SELECT password FROM tbl_accounts WHERE rfid = ?';
// //             db.query(passwordQuery, [rfid], (err, results) => {
// //                 if (err) {
// //                     console.error('Error fetching password:', err);
// //                     return res.status(500).json({ success: false, message: 'Error fetching password' });
// //                 }

// //                 const storedPassword = results[0].password;
// //                 bcrypt.compare(oldPassword, storedPassword, (compareErr, isMatch) => {
// //                     if (compareErr || !isMatch) {
// //                         return res.status(400).json({ success: false, message: 'Incorrect old password' });
// //                     }

// //                     if (newPassword !== confirmPassword) {
// //                         return res.status(400).json({ success: false, message: 'New password and confirm password do not match' });
// //                     }

// //                     bcrypt.hash(newPassword, 10, (hashErr, hashedNewPassword) => {
// //                         if (hashErr) {
// //                             console.error('Error hashing new password:', hashErr);
// //                             return res.status(500).json({ success: false, message: 'Error hashing new password' });
// //                         }

// //                         fieldsToUpdate.password = hashedNewPassword;
// //                         updateDatabase();
// //                     });
// //                 });
// //             });
// //         } else {
// //             updateDatabase();
// //         }
// //     };

// //     const updateDatabase = () => {
// //         db.query(sql, params, (err, result) => {
// //             if (err) {
// //                 console.error('Error updating profile:', err);
// //                 return res.status(500).json({ success: false, message: 'Error updating profile' });
// //             }
// //             res.status(200).json({ success: true, message: 'Profile updated successfully' });
// //         });
// //     };

// //     handlePasswordUpdate();
// // });


// //update profile (WORKING)
// // app.post('/updateProfile', (req, res) => {
// //     const {
// //         rfid,
// //         lastName,
// //         firstName,
// //         middleName,
// //         username,
// //         emailAddress,
// //         mobileNumber,
// //         oldPassword,
// //         newPassword,
// //         confirmPassword,
// //         civilStatus,
// //         nationality,
// //         bloodType,
// //         gender,
// //         currentAddress,
// //         emergencyContactPerson,
// //         emergencyContactNumber,
// //         highestEducationalAttainment,
// //         nameOfCompany,
// //         yearsInService,
// //         skillsTraining,
// //         otherAffiliation
// //     } = req.body;

// //     // Optional: Add validation for the inputs here

// //     // Update password only if provided and confirmed
// //     if (newPassword && newPassword === confirmPassword) {
// //         bcrypt.hash(newPassword, 10, (hashErr, hashedNewPassword) => {
// //             if (hashErr) {
// //                 console.error('Error hashing new password:', hashErr);
// //                 res.status(500).send({ success: false, message: 'Error hashing new password' });
// //                 return;
// //             }
// //             updateProfileInDatabase(rfid, lastName, firstName, middleName, username, emailAddress, mobileNumber, hashedNewPassword, civilStatus, nationality, bloodType, gender, currentAddress, emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining, otherAffiliation, res);
// //         });
// //     } else {
// //         // Update without password change
// //         updateProfileInDatabase(rfid, lastName, firstName, middleName, username, emailAddress, mobileNumber, null, civilStatus, nationality, bloodType, gender, currentAddress, emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining, otherAffiliation, res);
// //     }
// // });

// // function updateProfileInDatabase(rfid, lastName, firstName, middleName, username, emailAddress, mobileNumber, hashedNewPassword, civilStatus, nationality, bloodType, gender, currentAddress, emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining, otherAffiliation, res) {
// //     const sql = hashedNewPassword
// //         ? `UPDATE tbl_accounts SET lastName = ?, firstName = ?, middleName = ?, username = ?, emailAddress = ?, mobileNumber = ?, password = ?, civilStatus = ?, nationality = ?, bloodType = ?, gender = ?, currentAddress = ?, emergencyContactPerson = ?, emergencyContactNumber = ?, highestEducationalAttainment = ?, nameOfCompany = ?, yearsInService = ?, skillsTraining = ?, otherAffiliation = ? WHERE rfid = ?`
// //         : `UPDATE tbl_accounts SET lastName = ?, firstName = ?, middleName = ?, username = ?, emailAddress = ?, mobileNumber = ?, civilStatus = ?, nationality = ?, bloodType = ?, gender = ?, currentAddress = ?, emergencyContactPerson = ?, emergencyContactNumber = ?, highestEducationalAttainment = ?, nameOfCompany = ?, yearsInService = ?, skillsTraining = ?, otherAffiliation = ? WHERE rfid = ?`;

// //     const params = hashedNewPassword
// //         ? [lastName, firstName, middleName, username, emailAddress, mobileNumber, hashedNewPassword, civilStatus, nationality, bloodType, gender, currentAddress, emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining, otherAffiliation, rfid]
// //         : [lastName, firstName, middleName, username, emailAddress, mobileNumber, civilStatus, nationality, bloodType, gender, currentAddress, emergencyContactPerson, emergencyContactNumber, highestEducationalAttainment, nameOfCompany, yearsInService, skillsTraining, otherAffiliation, rfid];

// //     db.query(sql, params, (err, result) => {
// //         if (err) {
// //             console.error('Error updating profile:', err);
// //             res.status(500).send({ success: false, message: 'Error updating profile' });
// //             return;
// //         }
// //         res.status(200).send({ success: true, message: 'Profile updated successfully' });
// //     });
// // }








// //EDIT PROFILE
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/profile')
//         .then(response => {
//             if (response.status === 200) {
//                 return response.json();
//             } else {
//                 throw new Error('Not logged in');
//             }
//         })
//         .then(data => {
//             populateProfile(data);
//         })
//         .catch(error => {
//             console.error('Error fetching profile:', error);
//             window.location.href = '/';
//         });
// });

// function populateProfile(data) {
//     document.getElementById('RFID').textContent = `ID#: ${data.rfid}`;
//     document.getElementById('FullName').textContent = data.fullName;
//     document.getElementById('CallSign').textContent = data.callSign;
//     document.getElementById('Birthday').textContent = formatDate(data.dateOfBirth);
//     document.getElementById('Gender').textContent = data.gender;
//     document.getElementById('CivilStatus').textContent = data.civilStatus;
//     document.getElementById('Nationality').textContent = data.nationality;
//     document.getElementById('BloodType').textContent = data.bloodType;
//     document.getElementById('HighestEducationalAttainment').textContent = data.highestEducationalAttainment;
//     document.getElementById('NameOfCompany').textContent = data.nameOfCompany;
//     document.getElementById('YearsInService').textContent = data.yearsInService;
//     document.getElementById('SkillsTraining').textContent = data.skillsTraining;
//     document.getElementById('OtherAffiliation').textContent = data.otherAffiliation;
//     document.getElementById('EmailAddress').textContent = data.emailAddress;
//     document.getElementById('ContactNumber').textContent = data.mobileNumber;
//     document.getElementById('CurrentAddress').textContent = data.currentAddress;
//     document.getElementById('EmergencyContactPerson').textContent = data.emergencyContactPerson;
//     document.getElementById('EmergencyContactNumber').textContent = data.emergencyContactNumber;
//     document.getElementById('DutyHours').textContent = `${data.dutyHours || 0} hrs`;
//     document.getElementById('FireResponse').textContent = `${data.fireResponsePoints || 0} points`;
//     document.getElementById('InventoryPoints').textContent = data.inventoryPoints || '0';
//     document.getElementById('ActivityPoints').textContent = data.activityPoints || '0';
// }

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     });
// }

// function populateEditForm(data) {
//     document.getElementById('EditRFID').value = data.rfid;
//     document.getElementById('EditLastName').value = data.lastName || '';
//     document.getElementById('EditFirstName').value = data.firstName || '';
//     document.getElementById('EditMiddleName').value = data.middleName || '';
//     document.getElementById('EditUsername').value = data.username || '';
//     document.getElementById('EditEmailAddress').value = data.emailAddress || '';
//     document.getElementById('EditContactNumber').value = data.mobileNumber || '';
//     document.getElementById('EditCivilStatus').value = data.civilStatus || '';
//     document.getElementById('EditNationality').value = data.nationality || '';
//     document.getElementById('EditBloodType').value = data.bloodType || '';
//     document.getElementById('EditGender').value = data.gender || '';
//     document.getElementById('EditCurrentAddress').value = data.currentAddress || '';
//     document.getElementById('EditEmergencyContactPerson').value = data.emergencyContactPerson || '';
//     document.getElementById('EditEmergencyContactNumber').value = data.emergencyContactNumber || '';
//     document.getElementById('EditHighestEducationalAttainment').value = data.highestEducationalAttainment || '';
//     document.getElementById('EditNameOfCompany').value = data.nameOfCompany || '';
//     document.getElementById('EditYearsInService').value = data.yearsInService || '';
//     document.getElementById('EditSkillsTraining').value = data.skillsTraining || '';
//     document.getElementById('EditOtherAffiliation').value = data.otherAffiliation || '';
// }

// function saveProfile() {
//     const rfid = document.getElementById('EditRFID').value;
//     const lastName = document.getElementById('EditLastName').value;
//     const firstName = document.getElementById('EditFirstName').value;
//     const middleName = document.getElementById('EditMiddleName').value;
//     const middleInitial = middleName.charAt(0).toUpperCase();
//     const username = document.getElementById('EditUsername').value;
//     const emailAddress = document.getElementById('EditEmailAddress').value;
//     const mobileNumber = document.getElementById('EditContactNumber').value;
//     const oldPassword = document.getElementById('EditOldPassword').value;
//     const newPassword = document.getElementById('EditNewPassword').value;
//     const confirmPassword = document.getElementById('EditConfirmPassword').value;
//     const civilStatus = document.getElementById('EditCivilStatus').value;
//     const nationality = document.getElementById('EditNationality').value;
//     const bloodType = document.getElementById('EditBloodType').value;
//     const gender = document.getElementById('EditGender').value;
//     const currentAddress = document.getElementById('EditCurrentAddress').value;
//     const emergencyContactPerson = document.getElementById('EditEmergencyContactPerson').value;
//     const emergencyContactNumber = document.getElementById('EditEmergencyContactNumber').value;
//     const highestEducationalAttainment = document.getElementById('EditHighestEducationalAttainment').value;
//     const nameOfCompany = document.getElementById('EditNameOfCompany').value;
//     const yearsInService = document.getElementById('EditYearsInService').value;
//     const skillsTraining = document.getElementById('EditSkillsTraining').value;
//     const otherAffiliation = document.getElementById('EditOtherAffiliation').value;

//     const profileData = {
//         rfid,
//         lastName,
//         firstName,
//         middleName,
//         middleInitial,
//         username,
//         emailAddress,
//         mobileNumber,
//         oldPassword,
//         newPassword,
//         confirmPassword,
//         civilStatus,
//         nationality,
//         bloodType,
//         gender,
//         currentAddress,
//         emergencyContactPerson,
//         emergencyContactNumber,
//         highestEducationalAttainment,
//         nameOfCompany,
//         yearsInService,
//         skillsTraining,
//         otherAffiliation
//     };

//     fetch('/updateProfile', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(profileData)
//     })
//     .then(response => response.json())
//     .then(result => {
//         if (result.success) {
//             alert('Profile updated successfully');
//             fetch('/profile')
//                 .then(response => response.json())
//                 .then(data => {
//                     populateProfile(data);
//                     showProfile(); // Switch back to profile view
//                 });
//         } else {
//             alert('Failed to update profile: ' + result.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error updating profile:', error);
//         alert('An error occurred while updating the profile.');
//     });
// }

// function showEdit() {
//     fetch('/profile')
//         .then(response => response.json())
//         .then(data => {
//             populateEditForm(data);
//             document.getElementById('frmMainProfile').style.display = 'none';
//             document.getElementById('editProfile').style.display = 'block';
//         })
//         .catch(error => {
//             console.error('Error fetching profile for edit:', error);
//         });
// }

// function showProfile() {
//     document.getElementById('editProfile').style.display = 'none';
//     document.getElementById('frmMainProfile').style.display = 'block';
// }

// function cancelEdit() {
//     showProfile();
// }