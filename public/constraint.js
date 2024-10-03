function setMaxDateForBirthday(inputId, yearsBack) {
    const birthdayInput = document.getElementById(inputId);
    const today = new Date();
    const maxDate = new Date();

    // Calculate the date specified years back
    maxDate.setFullYear(today.getFullYear() - yearsBack);

    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(maxDate.getDate()).padStart(2, '0');

    birthdayInput.max = `${year}-${month}-${day}`; 
}

function validateBirthday() {
    const birthdayInput = document.getElementById('EditBirthday');
    const today = new Date();
    const selectedDate = new Date(birthdayInput.value);

    // Check if the input is valid
    if (isNaN(selectedDate)) {
        birthdayInput.setCustomValidity("Please enter a valid date.");
        return;
    }

    const ageInYears = today.getFullYear() - selectedDate.getFullYear();

    // Check if the selected date makes the user under 18 years old
    if (ageInYears < 18 || 
        (ageInYears === 18 && (today.getMonth() < selectedDate.getMonth() || 
        (today.getMonth() === selectedDate.getMonth() && today.getDate() < selectedDate.getDate())))) {
        birthdayInput.setCustomValidity("You need to be at least 18 years old.");
    } 
}

// Call the function to set the max date to 18 years ago
setMaxDateForBirthday('EditBirthday', 18);

function removeNumbers(event) {
    const input = event.target;
    input.value = input.value.replace(/[0-9]/g, '');
}

function validateEmail(event) {
const input = event.target;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!emailPattern.test(input.value)) {
    input.setCustomValidity("Please enter a valid email address.");
} else {
    input.setCustomValidity(""); 
}
}

function validateContactNumber(event) {
const input = event.target;
const value = input.value;

// Remove non-numeric characters except '+' at the beginning
const numericValue = value.replace(/[^0-9+]/g, '');

// Set the numeric value back to the input
input.value = numericValue;

// Validate Philippine mobile number format
const isValidPhilippineNumber = /^(09\d{9}|\+639\d{9})$/.test(numericValue);

if (numericValue && !isValidPhilippineNumber) {
    input.setCustomValidity("Please enter a valid Philippine contact number (09XXXXXXXXX or +639XXXXXXXXX).");
} else {
    input.setCustomValidity(""); 
}
}

function validateYearsInService() {
    const input = document.getElementById('EditYearsInService');
    // Replace non-numeric characters with an empty string
    input.value = input.value.replace(/[^0-9]/g, '');
}