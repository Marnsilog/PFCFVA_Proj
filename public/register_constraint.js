function setMaxDateForBirthday(inputId, yearsBack) {
    const birthdayInput = document.getElementById(inputId);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - yearsBack);

    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(maxDate.getDate()).padStart(2, '0');

    birthdayInput.max = `${year}-${month}-${day}`; 
}

function validateBirthday() {
    const birthdayInput = document.getElementById('dateOfBirth');
    const today = new Date();
    const selectedDate = new Date(birthdayInput.value);

    // Check if the input is valid
    if (isNaN(selectedDate)) {
        birthdayInput.setCustomValidity("Please enter a valid date.");
        return;
    }

    const ageInYears = today.getFullYear() - selectedDate.getFullYear();
    if (ageInYears < 18 || 
        (ageInYears === 18 && (today.getMonth() < selectedDate.getMonth() || 
        (today.getMonth() === selectedDate.getMonth() && today.getDate() < selectedDate.getDate())))) {
        birthdayInput.setCustomValidity("You need to be at least 18 years old.");
    } 
}

setMaxDateForBirthday('dateOfBirth', 18);

function removeNumbers(event) {
    const input = event.target;
    input.value = input.value.replace(/[0-9]/g, '');
}

function validateEmailS(event) {
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

const numericValue = value.replace(/[^0-9+]/g, '');
input.value = numericValue;
const isValidPhilippineNumber = /^(09\d{9}|\+639\d{9})$/.test(numericValue);
if (numericValue && !isValidPhilippineNumber) {
    input.setCustomValidity("Please enter a valid Philippine contact number (09XXXXXXXXX or +639XXXXXXXXX).");
} else {
    input.setCustomValidity(""); 
}
}

function validateYearsInService() {
    const input = document.getElementById('yearsInService');
    
    // Replace non-numeric characters with an empty string
    input.value = input.value.replace(/[^0-9]/g, '');
    
    // Convert the value to a number for comparison
    const value = parseInt(input.value, 10);

    // Check if the value is greater than 80
    if (value > 80) {
        input.setCustomValidity("Years in Service cannot exceed 80.");
    } else {
        input.setCustomValidity(""); // Clear the validation message if valid
    }
}

