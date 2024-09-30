document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get RFID, last name, and date of birth values
        const rfid = document.getElementById('rfid').value; 
        const lastName = document.getElementById('lastName').value.trim();
        const dateOfBirth = document.getElementById('dateOfBirth').value;

        // Generate the username and password based on the provided data
        const username = rfid;
        const password = generatePassword(lastName.toLowerCase(), dateOfBirth);

        // ... (rest of your code)

        // Post the data
        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                rfid,
                username,
                password,
                // ... (rest of your properties)
            })
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else if (response.status === 400) {
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            } else {
                throw new Error('Registration failed');
            }
        })
        .then(message => {
            alert(message);
            location.reload();
        })
        .catch(error => {
            console.error('Error registering:', error);
            alert('Error registering: ' + error.message);
        });
    });
});



// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Get RFID, last name, and date of birth values
//     const rfid = document.getElementById('rfid').value; 
//     const lastName = document.getElementById('lastName').value.trim(); //keep last name as is for database
//     const dateOfBirth = document.getElementById('dateOfBirth').value;

//     // Generate the username and password based on the provided data
//     const username = rfid; // set RFID as the username
//     const password = generatePassword(lastName.toLowerCase(), dateOfBirth); // use lowercase version of last name for password

//     const accountType = document.getElementById('accountType').value;
//     const firstName = document.getElementById('firstName').value;
//     const middleName = document.getElementById('middleName').value;
//     const middleInitial = middleName ? middleName.charAt(0) : ''; // Take the first character of middleName as middleInitial
//     let callSign = document.getElementById('callSign').value;
//     const callSignNum = document.getElementById('callSignNum').value;

//     // Adjust callSign based on its value
//     if (callSign === "ECHO800" || callSign === "ECHO900") {
//         callSign = callSign.slice(0, 4) + callSignNum;
//     } else if (callSign === "ASPIRANT" || callSign === "PROBATIONARY" || callSign === "ECHO") {
//         callSign = callSign + callSignNum;
//     }

//     const currentAddress = document.getElementById('currentAddress').value;
//     const civilStatus = document.getElementById('civilStatus').value;
//     const gender = document.getElementById('gender').value;
//     const nationality = document.getElementById('nationality').value;
//     const bloodType = document.getElementById('bloodType').value;
//     const mobileNumber = document.getElementById('contactNumber').value;
//     const emailAddress = document.getElementById('emailAddress').value;
//     const emergencyContactPerson = document.getElementById('emergencyContactPerson').value;
//     const emergencyContactNumber = document.getElementById('emergencyContactNumber').value;
//     const highestEducationalAttainment = document.getElementById('highestEducationalAttainment').value;
//     const nameOfCompany = document.getElementById('nameOfCompany').value;
//     const yearsInService = document.getElementById('yearsInService').value;
//     const skillsTraining = document.getElementById('skillsTraining').value;
//     const otherAffiliation = document.getElementById('otherAffiliation').value;
//     const bioDataChecked = document.getElementById('cbBioData').checked ? 1 : 0;
//     const interviewChecked = document.getElementById('cbInterview').checked ? 1 : 0;
//     const fireResponsePoints = document.getElementById('fireResponse').value;
//     const activityPoints = document.getElementById('activityPoints').value;
//     const inventoryPoints = document.getElementById('inventoryPoints').value;
//     const dutyHours = document.getElementById('dutyHours').value;

//     // Validate email format
//     if (!validateEmail(emailAddress)) {
//         alert("Please enter a valid email address");
//         return;
//     }

//     // Post the data
//     fetch('/auth/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ 
//             rfid,
//             username, // send default generated username
//             password, // send default generated password
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
//         })
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.text();
//         } else if (response.status === 400) {
//             return response.text().then(errorMessage => {
//                 throw new Error(errorMessage);
//             });
//         } else {
//             throw new Error('Registration failed');
//         }
//     })
//     .then(message => {
//         alert(message);
//         location.reload();
//     })
//     .catch(error => {
//         console.error('Error registering:', error);
//         alert('Error registering: ' + error.message);
//     });
// });

// Function to generate password
function generatePassword(lowercaseLastName, dateOfBirth) {
    // Change 7: Format dateOfBirth as YYYYMMDD and combine with lowercase last name
    const formattedDate = dateOfBirth.replace(/-/g, ''); 
    return `${lowercaseLastName}${formattedDate}`;
}

// Email validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



