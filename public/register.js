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



document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const accountType = document.getElementById('accountType').value;
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const middleInitial = ''; // This field is not available in the form, so it's left empty
    const callSign = document.getElementById('callSign').value;
    const currentAddress = document.getElementById('currentAddress').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
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