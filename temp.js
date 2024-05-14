//from app.js

// //Register Route
// app.post('/register', (req, res) => {
//     const {
//         username,
//         password,
//         accountType,
//         lastName,
//         firstName,
//         middleName,
//         middleInitial,
//         callSign,
//         currentAddress,
//         dateOfBirth,
//         civilStatus,
//         gender,
//         nationality,
//         bloodType,
//         mobileNumber,
//         emailAddress,
//         emergencyContactPerson,
//         emergencyContactNumber,
//         highestEducationalAttainment,
//         nameOfCompany,
//         yearsInService,
//         skillsTraining,
//         otherAffiliation,
//         bioDataChecked,
//         interviewChecked,
//         fireResponsePoints,
//         activityPoints,
//         inventoryPoints,
//         dutyHours
//     } = req.body;

//     // Check if the username already exists in the database
//     const checkUsernameQuery = 'SELECT COUNT(*) AS count FROM tbl_accounts WHERE username = ?';
//     db.query(checkUsernameQuery, [username], (checkErr, checkResult) => {
//         if (checkErr) {
//             console.error('Error checking username:', checkErr);
//             res.status(500).send('Error checking username');
//             return;
//         }

//         // If username already exists, send an error response
//         if (checkResult[0].count > 0) {
//             res.status(400).send('Username already exists');
//             return;
//         }

//         // If username does not exist, proceed with registration
//         const sql = `INSERT INTO tbl_accounts (
//             username,
//             password,
//             accountType,
//             lastName,
//             firstName,
//             middleName,
//             middleInitial,
//             callSign,
//             currentAddress,
//             dateOfBirth,
//             civilStatus,
//             gender,
//             nationality,
//             bloodType,
//             mobileNumber,
//             emailAddress,
//             emergencyContactPerson,
//             emergencyContactNumber,
//             highestEducationalAttainment,
//             nameOfCompany,
//             yearsInService,
//             skillsTraining,
//             otherAffiliation,
//             bioDataChecked,
//             interviewChecked,
//             fireResponsePoints,
//             activityPoints,
//             inventoryPoints,
//             dutyHours
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//         db.query(sql, [
//             username,
//             password,
//             accountType,
//             lastName,
//             firstName,
//             middleName,
//             middleInitial,
//             callSign,
//             currentAddress,
//             dateOfBirth,
//             civilStatus,
//             gender,
//             nationality,
//             bloodType,
//             mobileNumber,
//             emailAddress,
//             emergencyContactPerson,
//             emergencyContactNumber,
//             highestEducationalAttainment,
//             nameOfCompany,
//             yearsInService,
//             skillsTraining,
//             otherAffiliation,
//             bioDataChecked,
//             interviewChecked,
//             fireResponsePoints,
//             activityPoints,
//             inventoryPoints,
//             dutyHours
//         ], (err, result) => {
//             if (err) {
//                 console.error('Error registering user:', err);
//                 res.status(500).send('Error registering user');
//                 return;
//             }
//             res.status(200).send('User registered successfully');
//         });
//     });
// });





// // Login route

// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (response.status === 200) {
//             alert('Login successful');
//         } else if (response.status === 401) {
//             alert('Invalid username or password');
//         } else {
//             throw new Error('Error logging in');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });




// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (response.status === 200) {
//             // Redirect to volunteer.html upon successful login
//             window.location.href = 'volunteer.html';
//         } else if (response.status === 401) {
//             alert('Invalid username or password');
//         } else {
//             throw new Error('Error logging in');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });


// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT * FROM tbl_accounts WHERE username = ? AND password = ?';
//     db.query(sql, [username, password], (err, result) => {
//         if (err) {
//             res.status(500).send('Error logging in');
//             return;
//         }
//         if (result.length > 0) {
//             // Assuming 'accountType' is a column in your database table
//             const accountType = result[0].accountType;
//             res.status(200).json({ message: 'Login successful', accountType: accountType });
//         } else {
//             res.status(401).send('Invalid username or password');
//         }
//     });
// });

// // Server side route to retrieve account data for the currently logged-in user
// app.get('/getAccountData', (req, res) => {
//     // Check if the user is authenticated and their session contains user information
//     if (!req.session || !req.session.userId) {
//         // If the user is not logged in or session data is missing, return an error
//         res.status(401).send('User is not authenticated');
//         return;
//     }
    
//     // Retrieve the user ID from the session
//     const userId = req.session.userId;

//     // Perform a database query to retrieve account data based on the user ID
//     const sql = 'SELECT * FROM tbl_accounts WHERE id = ?'; // Adjust this query based on your database schema
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error('Error retrieving account data:', err);
//             res.status(500).send('Error retrieving account data');
//             return;
//         }
//         if (result.length === 0) {
//             // If no account data is found for the user ID, return a not found error
//             res.status(404).send('Account not found');
//             return;
//         }
//         // Send the retrieved account data as JSON response
//         const accountData = result[0]; // Assuming you're only retrieving one account
//         res.status(200).json(accountData);
//     });
// });




// // Server side route to retrieve user data after login
// app.get('/getUserData', (req, res) => {
//     // Retrieve the user ID from the session or any other means of identification
//     const userId = req.session.userId; // Adjust this based on your authentication mechanism

//     // Perform a database query to retrieve user data based on the user ID
//     const sql = 'SELECT firstName, middleInitial, lastName, callSign FROM tbl_accounts WHERE id = ?'; // Adjust this query based on your database schema
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error('Error retrieving user data:', err);
//             res.status(500).send('Error retrieving user data');
//             return;
//         }
//         if (result.length === 0) {
//             // If no user data is found, return a not found error
//             res.status(404).send('User data not found');
//             return;
//         }
//         // Send the retrieved user data as JSON response
//         const userData = result[0]; // Assuming you're only retrieving one user's data
//         res.status(200).json(userData);
//     });
// });



// Login route (test-get profile)
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT firstName, middleInitial, lastName, callSign, accountType FROM tbl_accounts WHERE username = ?';
//     db.query(sql, [username], (err, result) => {
//         if (err) {
//             res.status(500).send('Error logging in');
//             return;
//         }
//         if (result.length === 0) {
//             res.status(401).send('Invalid username or password');
//             return;
//         }
//         const hashedPassword = result[0].password;
//         bcrypt.compare(password, hashedPassword, (compareErr, compareResult) => {
//             if (compareErr) {
//                 res.status(500).send('Error comparing passwords');
//                 return;
//             }
//             if (compareResult) {
//                 const userData = {
//                     firstName: result[0].firstName,
//                     middleInitial: result[0].middleInitial,
//                     lastName: result[0].lastName,
//                     callSign: result[0].callSign,
//                     accountType: result[0].accountType
//                 };
//                 res.status(200).json(userData);
//             } else {
//                 res.status(401).send('Invalid username or password');
//             }
//         });
//     });
// });





//from login.js


// //test get profile
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (response.status === 200) {
//             return response.json();
//         } else if (response.status === 401) {
//             alert('Invalid username or password');
//         } else {
//             throw new Error('Error logging in');
//         }
//     })
//     .then(data => {
//         // Redirect based on account type
//         const accountType = data.accountType;
//         switch (accountType) {
//             case 'Admin':
//                 window.location.href = 'admin.html';
//                 break;
//             case 'Volunteer':
//                 // Pass user data as URL parameters to volunteer.html
//                 const params = new URLSearchParams({
//                     firstName: data.firstName,
//                     middleInitial: data.middleInitial,
//                     lastName: data.lastName,
//                     callSign: data.callSign
//                 });
//                 window.location.href = `volunteer.html?${params.toString()}`;
//                 break;
//             case 'Supervisor':
//                 window.location.href = 'supervisor.html';
//                 break;
//             default:
//                 alert('Unknown account type');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });






// // Event listener for login form submission
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (response.status === 200) {
//             // Upon successful login, fetch user profile data
//             getUserProfileData();
//             // Redirect or perform other actions as needed
//         } else if (response.status === 401) {
//             alert('Invalid username or password');
//         } else {
//             throw new Error('Error logging in');
//         }
//     })
//     .then(data => {
//         // Redirect based on account type
//         const accountType = data.accountType;
//         switch (accountType) {
//             case 'Admin':
//                 window.location.href = 'admin.html';
//                 break;
//             case 'Volunteer':
//                 window.location.href = 'volunteer.html';
//                 break;
//             case 'Supervisor':
//                 window.location.href = 'supervisor.html';
//                 break;
//             default:
//                 alert('Unknown account type');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });



// //get profile data
// function getUserProfileData() {
//     fetch('/getAccountData') // Replace with your endpoint to fetch user profile data
//     .then(response => {
//         if (response.ok) {
//             return response.json(); // Assuming the response is in JSON format
//         }
//         throw new Error('Failed to fetch user profile data');
//     })
//     .then(data => {
//         // Update HTML elements with user profile data
//         document.getElementById('Birthday').innerText = data.dateOfBirth;
//         document.getElementById('Gender').innerText = data.gender;
//         document.getElementById('CivilStat').innerText = data.civilStatus;
//         document.getElementById('Nationality').innerText = data.nationality;
//         document.getElementById('BloodType').innerText = data.bloodType;
//         document.getElementById('CollegeUnd').innerText = data.highestEducationalAttainment;
//         document.getElementById('NOC').innerText = data.nameOfCompany;
//         document.getElementById('YOS').innerText = data.yearsInService;
//         document.getElementById('Skillandtraining').innerText = data.skillsTraining;
//         document.getElementById('others').innerText = data.otherAffiliation;
//         document.getElementById('emailAdd').innerText = data.emailAddress;
//         document.getElementById('ContactNum').innerText = data.mobileNumber;
//         document.getElementById('Address').innerText = data.currentAddress;
//         document.getElementById('ECP').innerText = data.emergencyContactPerson;
//         document.getElementById('ECN').innerText = data.emergencyContactNumber;
//         // Update other HTML elements similarly
//     })
//     .catch(error => console.error('Error fetching user profile data:', error));
// }