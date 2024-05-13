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


// //working recent
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


//test get profile
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401) {
            alert('Invalid username or password');
        } else {
            throw new Error('Error logging in');
        }
    })
    .then(data => {
        // Redirect based on account type
        const accountType = data.accountType;
        switch (accountType) {
            case 'Admin':
                window.location.href = 'admin.html';
                break;
            case 'Volunteer':
                // Pass user data as URL parameters to volunteer.html
                const params = new URLSearchParams({
                    firstName: data.firstName,
                    middleInitial: data.middleInitial,
                    lastName: data.lastName,
                    callSign: data.callSign
                });
                window.location.href = `volunteer.html?${params.toString()}`;
                break;
            case 'Supervisor':
                window.location.href = 'supervisor.html';
                break;
            default:
                alert('Unknown account type');
        }
    })
    .catch(error => console.error('Error logging in:', error));
});






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