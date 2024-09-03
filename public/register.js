// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.text();
//         }
//         throw new Error('Registration failed');
//     })
//     .then(message => {
//         alert(message);
//         // Optionally, you can redirect the user to another page after successful registration
//         // window.location.href = '/login.html';
//     })
//     .catch(error => console.error('Error registering:', error));
// });



/////////////////////////////////////////////////////////////////////////////////////////////
// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value; //make this required
//     const password = document.getElementById('password').value; //make this required
//     const confirmPassword = document.getElementById('confirmPassword').value; //make this required         
//     const accountType = document.getElementById('accountType').value; //make this required
//     const lastName = document.getElementById('lastName').value; //make this required
//     const firstName = document.getElementById('firstName').value; //make this required
//     const middleName = document.getElementById('middleName').value;
//     const middleInitial = middleName ? middleName.charAt(0) : ''; // Take the first character of middleName as middleInitial
//     const callSign = document.getElementById('callSign').value; //make this required
//     const currentAddress = document.getElementById('currentAddress').value; //make this required
//     const dateOfBirth = document.getElementById('dateOfBirth').value; //make this required
//     const civilStatus = document.getElementById('civilStatus').value; //make this required
//     const gender = document.getElementById('gender').value; //make this required
//     const nationality = document.getElementById('nationality').value; //make this required
//     const bloodType = document.getElementById('bloodType').value; //make this required
//     const mobileNumber = document.getElementById('contactNumber').value; //make this required, nuumbers only
//     const emailAddress = document.getElementById('emailAddress').value; //make this required
//     const emergencyContactPerson = document.getElementById('emergencyContactPerson').value; //make this required
//     const emergencyContactNumber = document.getElementById('emergencyContactNumber').value; //make this required, numbers only
//     const highestEducationalAttainment = document.getElementById('highestEducationalAttainment').value; 
//     const nameOfCompany = document.getElementById('nameOfCompany').value; 
//     const yearsInService = document.getElementById('yearsInService').value; //accept only numbers
//     const skillsTraining = document.getElementById('skillsTraining').value; 
//     const otherAffiliation = document.getElementById('otherAffiliation').value;
//     const bioDataChecked = document.getElementById('cbBioData').checked ? 1 : 0;
//     const interviewChecked = document.getElementById('cbInterview').checked ? 1 : 0;
//     const fireResponsePoints = document.getElementById('fireResponse').value; // accept only numbers
//     const activityPoints = document.getElementById('activityPoints').value; // accepnt only numbers
//     const inventoryPoints = document.getElementById('inventoryPoints').value; // accept only numbers
//     const dutyHours = document.getElementById('dutyHours').value; //accept only numbers

//     // Check if passwords match
//     if (password !== confirmPassword) {
//         alert("Passwords do not match");
//         return;
//     }

//     // Validate email format
//     if (!validateEmail(emailAddress)) {
//         alert("Please enter a valid email address");
//         return;
//     }

//     fetch('/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ 
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
//         })
//     })
//     .then(response => {
//         if (response.ok) {
            
//             return response.text();
            
//         }
//         throw new Error('Registration failed');
//     })
//     .then(message => {
//         alert(message);
//         // Optionally, you can redirect the user to another page after successful registration
//         // window.location.href = '/login.html';
//         location.reload();
//     })
//     .catch(error => console.error('Error registering:', error));
//     alert('Error registering: ' + error.message);

    
// });


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get RFID, last name, and date of birth values
    const rfid = document.getElementById('rfid').value; 
    const lastName = document.getElementById('lastName').value.trim(); //keep last name as is for database
    const dateOfBirth = document.getElementById('dateOfBirth').value;

    // Generate the username and password based on the provided data
    const username = rfid; // set RFID as the username
    const password = generatePassword(lastName.toLowerCase(), dateOfBirth); // use lowercase version of last name for password

    const accountType = document.getElementById('accountType').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const middleInitial = middleName ? middleName.charAt(0) : ''; // Take the first character of middleName as middleInitial
    let callSign = document.getElementById('callSign').value;
    const callSignNum = document.getElementById('callSignNum').value;

    // Adjust callSign based on its value
    if (callSign === "ECHO800" || callSign === "ECHO900") {
        callSign = callSign.slice(0, 4) + callSignNum;
    } else if (callSign === "ASPIRANT" || callSign === "PROBATIONARY" || callSign === "ECHO") {
        callSign = callSign + callSignNum;
    }

    const currentAddress = document.getElementById('currentAddress').value;
    const civilStatus = document.getElementById('civilStatus').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const bloodType = document.getElementById('bloodType').value;
    const mobileNumber = document.getElementById('contactNumber').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const emergencyContactPerson = document.getElementById('emergencyContactPerson').value;
    const emergencyContactNumber = document.getElementById('emergencyContactNumber').value;
    const highestEducationalAttainment = document.getElementById('highestEducationalAttainment').value;
    const nameOfCompany = document.getElementById('nameOfCompany').value;
    const yearsInService = document.getElementById('yearsInService').value;
    const skillsTraining = document.getElementById('skillsTraining').value;
    const otherAffiliation = document.getElementById('otherAffiliation').value;
    const bioDataChecked = document.getElementById('cbBioData').checked ? 1 : 0;
    const interviewChecked = document.getElementById('cbInterview').checked ? 1 : 0;
    const fireResponsePoints = document.getElementById('fireResponse').value;
    const activityPoints = document.getElementById('activityPoints').value;
    const inventoryPoints = document.getElementById('inventoryPoints').value;
    const dutyHours = document.getElementById('dutyHours').value;

    // Validate email format
    if (!validateEmail(emailAddress)) {
        alert("Please enter a valid email address");
        return;
    }

    // Post the data
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            rfid,
            username, // send default generated username
            password, // send default generated password
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



