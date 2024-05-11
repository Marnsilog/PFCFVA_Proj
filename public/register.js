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


// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Extracting values from form fields
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const position = document.getElementById('position').value;
//     const lastName = document.getElementById('lastName').value;
//     const firstName = document.getElementById('firstName').value;
//     const middleName = document.getElementById('middleName').value;
//     const middleInitial = document.getElementById('middleInitial').value;
//     const callSign = document.getElementById('callSign').value;
//     const currentAddress = document.getElementById('currentAddress').value;
//     const dateOfBirth = document.getElementById('dateOfBirth').value; // Assuming this is a text input, you might want to use a different type if you have a date picker
//     const civilStatus = document.getElementById('civilStatus').value;
//     const gender = document.getElementById('gender').value;
//     const nationality = document.getElementById('nationality').value;
//     const bloodType = document.getElementById('bloodType').value;
//     const mobileNumber = document.getElementById('mobileNumber').value;
//     const emailAddress = document.getElementById('emailAddress').value;
//     const emergencyContactPerson = document.getElementById('emergencyContactPerson').value;
//     const emergencyContactNumber = document.getElementById('emergencyContactNumber').value;
//     const highestEducationalAttainment = document.getElementById('highestEducationalAttainment').value;
//     const nameOfCompany = document.getElementById('nameOfCompany').value;
//     const yearsInService = document.getElementById('yearsInService').value;
//     const skillsTraining = document.getElementById('skillsTraining').value;
//     const otherAffiliation = document.getElementById('otherAffiliation').value;
//     const idPicture = document.getElementById('idPicture').files[0]; // Assuming this is a file input
//     const requiredDocument1 = document.getElementById('requiredDocument1').checked;
//     const requiredDocument2 = document.getElementById('requiredDocument2').checked;
//     const requiredDocument3 = document.getElementById('requiredDocument3').checked;

//     // Constructing the payload to be sent to the server
//     const payload = {
//         username,
//         password,
//         position,
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
//         idPicture,
//         requiredDocument1,
//         requiredDocument2,
//         requiredDocument3
//     };

//     // Sending the form data to the server using fetch
//     fetch('/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
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
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value; //make this required
    const password = document.getElementById('password').value; //make this required
    const confirmPassword = document.getElementById('confirmPassword').value; //make this required         
    const accountType = document.getElementById('accountType').value; //make this required
    const lastName = document.getElementById('lastName').value; //make this required
    const firstName = document.getElementById('firstName').value; //make this required
    const middleName = document.getElementById('middleName').value;
    const middleInitial = middleName ? middleName.charAt(0) : ''; // Take the first character of middleName as middleInitial
    const callSign = document.getElementById('callSign').value; //make this required
    const currentAddress = document.getElementById('currentAddress').value; //make this required
    const dateOfBirth = document.getElementById('dateOfBirth').value; //make this required
    const civilStatus = document.getElementById('civilStatus').value; //make this required
    const gender = document.getElementById('gender').value; //make this required
    const nationality = document.getElementById('nationality').value; //make this required
    const bloodType = document.getElementById('bloodType').value; //make this required
    const mobileNumber = document.getElementById('contactNumber').value; //make this required, nuumbers only
    const emailAddress = document.getElementById('emailAddress').value; //make this required
    const emergencyContactPerson = document.getElementById('emergencyContactPerson').value; //make this required
    const emergencyContactNumber = document.getElementById('emergencyContactNumber').value; //make this required, numbers only
    const highestEducationalAttainment = document.getElementById('highestEducationalAttainment').value; 
    const nameOfCompany = document.getElementById('nameOfCompany').value; 
    const yearsInService = document.getElementById('yearsInService').value; //accept only numbers
    const skillsTraining = document.getElementById('skillsTraining').value; 
    const otherAffiliation = document.getElementById('otherAffiliation').value;
    const bioDataChecked = document.getElementById('cbBioData').checked ? 1 : 0;
    const interviewChecked = document.getElementById('cbInterview').checked ? 1 : 0;
    const fireResponsePoints = document.getElementById('fireResponse').value; // accept only numbers
    const activityPoints = document.getElementById('activityPoints').value; // accepnt only numbers
    const inventoryPoints = document.getElementById('inventoryPoints').value; // accept only numbers
    const dutyHours = document.getElementById('dutyHours').value; //accept only numbers

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Validate email format
    if (!validateEmail(emailAddress)) {
        alert("Please enter a valid email address");
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
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
        })
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

//functions
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



 // Fetch data from Node.js server
//  fetch('/products')
//  .then(response => response.json())
//  .then(products => {
//      const productList = document.getElementById('product-list');
//      products.forEach(product => {
//          // Create HTML elements to display product information
//          const productElement = document.createElement('div');
//          productElement.innerHTML = `
//          <div class="bg-[#D8BC8C80] w-[318px] h-[500px] outline outline-outline outline-1 rounded-xl pt-5 pr-5 relative">
//                      <div class="z-[-1] flex flex-col items-center ">
//                          <div>
//                              <img src="data:image/jpeg;base64,${product.productImage}" alt="${product.productName}" class = "w-[12rem] mt-[5rem]">
//                              </div>
//                          <div class = "absolute bottom-1">
//                              <h2>${product.productName}</h2>
//                              <p>Price: ${product.productPrice}</p>
//                          </div>
//                      </div>
//                      <div class="bg-[#FFFFFF] w-[62px] h-[87px] rounded-[50%] outline outline-outline outline-1 absolute right-1 top-1 z-10">
                         
//                      </div>
//              </div>

//          `;
//          productList.appendChild(productElement);
//      });
//  })
//  .catch(error => console.error('Error fetching products:', error));




// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Make this required 
//     const username = document.getElementById('username').value;
//     if (!username) {
//         alert("Please enter a username.");
//         return;
//     }

//     // Make this required
//     const password = document.getElementById('password').value;
//     if (!password) {
//         alert("Please enter a password.");
//         return;
//     }

//     // Make this required
//     const confirmPassword = document.getElementById('confirmPassword').value;
//     if (!confirmPassword) {
//         alert("Please confirm your password.");
//         return;
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//         alert("Passwords do not match.");
//         return;
//     }

//     // Make this required
//     const accountType = document.getElementById('accountType').value;
//     // if (!accountType) {
//     //     alert("Please select an account type.");
//     //     return;
//     // }

//     // Make this required
//     const lastName = document.getElementById('lastName').value;
//     if (!lastName) {
//         alert("Please enter your last name.");
//         return;
//     }

//     // Make this required
//     const firstName = document.getElementById('firstName').value;
//     if (!firstName) {
//         alert("Please enter your first name.");
//         return;
//     }

//     const middleName = document.getElementById('middleName').value;
//     const middleInitial = middleName ? middleName.charAt(0) : '';

//     // Make this required
//     const callSign = document.getElementById('callSign').value;
//     if (!callSign) {
//         alert("Please enter your call sign.");
//         return;
//     }

//     // Make this required
//     const currentAddress = document.getElementById('currentAddress').value;
//     if (!currentAddress) {
//         alert("Please enter your current address.");
//         return;
//     }

//     // Make this required
//     const dateOfBirth = document.getElementById('dateOfBirth').value;
//     if (!dateOfBirth) {
//         alert("Please enter your date of birth.");
//         return;
//     }

//     // Make this required
//     const civilStatus = document.getElementById('civilStatus').value;
//     if (!civilStatus) {
//         alert("Please enter your civil status.");
//         return;
//     }

//     // Make this required
//     const gender = document.getElementById('gender').value;
//     if (!gender) {
//         alert("Please select your gender.");
//         return;
//     }

//     // Make this required
//     const nationality = document.getElementById('nationality').value;
//     if (!nationality) {
//         alert("Please enter your nationality.");
//         return;
//     }

//     // Make this required and validate email format
//     const emailAddress = document.getElementById('emailAddress').value;
//     if (!emailAddress) {
//         alert("Please enter your email address.");
//         return;
//     } else if (!validateEmail(emailAddress)) {
//         alert("Please enter a valid email address.");
//         return;
//     }

//     // Make this required
//     const mobileNumber = document.getElementById('contactNumber').value;
//     if (!mobileNumber) {
//         alert("Please enter your mobile number.");
//         return;
//     }

//     // Make this required
//     const emergencyContactPerson = document.getElementById('emergencyContactPerson').value;
//     if (!emergencyContactPerson) {
//         alert("Please enter the emergency contact person.");
//         return;
//     }

//     // Make this required
//     const emergencyContactNumber = document.getElementById('emergencyContactNumber').value;
//     if (!emergencyContactNumber) {
//         alert("Please enter the emergency contact number.");
//         return;
//     }

//     const highestEducationalAttainment = document.getElementById('highestEducationalAttainment').value;

//     const nameOfCompany = document.getElementById('nameOfCompany').value;

//     // Accept only numbers
//     const yearsInService = document.getElementById('yearsInService').value;
//     if (yearsInService && isNaN(yearsInService)) {
//         alert("Years in service must be a number.");
//         return;
//     }

//     const skillsTraining = document.getElementById('skillsTraining').value;

//     const otherAffiliation = document.getElementById('otherAffiliation').value;

//     const bioDataChecked = document.getElementById('cbBioData').checked ? 1 : 0;

//     const interviewChecked = document.getElementById('cbInterview').checked ? 1 : 0;

//     // Accept only numbers
//     const fireResponsePoints = document.getElementById('fireResponse').value;
//     if (fireResponsePoints && isNaN(fireResponsePoints)) {
//         alert("Fire response points must be a number.");
//         return;
//     }

//     // Accept only numbers
//     const activityPoints = document.getElementById('activityPoints').value;
//     if (activityPoints && isNaN(activityPoints)) {
//         alert("Activity points must be a number.");
//         return;
//     }

//     // Accept only numbers
//     const inventoryPoints = document.getElementById('inventoryPoints').value;
//     if (inventoryPoints && isNaN(inventoryPoints)) {
//         alert("Inventory points must be a number.");
//         return;
//     }

//     // Accept only numbers
//     const dutyHours = document.getElementById('dutyHours').value;
//     if (dutyHours && isNaN(dutyHours)) {
//         alert("Duty hours must be a number.");
//         return;
//     }

//     // If all validations pass, proceed with registration
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
//     })
//     .catch(error => console.error('Error registering:', error));
// });

// // Validate email format
// function validateEmail(email) {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
// };


