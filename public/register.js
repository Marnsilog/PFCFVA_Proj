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


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Extracting values from form fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const position = document.getElementById('position').value;
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const middleInitial = document.getElementById('middleInitial').value;
    const callSign = document.getElementById('callSign').value;
    const currentAddress = document.getElementById('currentAddress').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value; // Assuming this is a text input, you might want to use a different type if you have a date picker
    const civilStatus = document.getElementById('civilStatus').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const bloodType = document.getElementById('bloodType').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const emergencyContactPerson = document.getElementById('emergencyContactPerson').value;
    const emergencyContactNumber = document.getElementById('emergencyContactNumber').value;
    const highestEducationalAttainment = document.getElementById('highestEducationalAttainment').value;
    const nameOfCompany = document.getElementById('nameOfCompany').value;
    const yearsInService = document.getElementById('yearsInService').value;
    const skillsTraining = document.getElementById('skillsTraining').value;
    const otherAffiliation = document.getElementById('otherAffiliation').value;
    const idPicture = document.getElementById('idPicture').files[0]; // Assuming this is a file input
    const requiredDocument1 = document.getElementById('requiredDocument1').checked;
    const requiredDocument2 = document.getElementById('requiredDocument2').checked;
    const requiredDocument3 = document.getElementById('requiredDocument3').checked;

    // Constructing the payload to be sent to the server
    const payload = {
        username,
        password,
        position,
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
        requiredDocument1,
        requiredDocument2,
        requiredDocument3
    };

    // Sending the form data to the server using fetch
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Registration failed');
    })
    .then(message => {
        alert(message);
        // Optionally, you can redirect the user to another page after successful registration
        // window.location.href = '/login.html';
    })
    .catch(error => console.error('Error registering:', error));
});
