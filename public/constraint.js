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
    if (ageInYears < 18 || 
        (ageInYears === 18 && (today.getMonth() < selectedDate.getMonth() || 
        (today.getMonth() === selectedDate.getMonth() && today.getDate() < selectedDate.getDate())))) {
        birthdayInput.setCustomValidity("You need to be at least 18 years old.");
    } 
}

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
    const input = document.getElementById('EditYearsInService');
    input.value = input.value.replace(/[^0-9]/g, '');
}

document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    const oldPassword = document.getElementById('EditOldPassword').value;
    const newPassword = document.getElementById('EditNewPassword').value;
    const confirmPassword = document.getElementById('EditConfirmPassword').value;
    if (oldPassword.trim() !== '') {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

        if (!newPassword.match(passwordRegex)) {
            alert('New password must be at least 8 characters long, contain at least one number, and one special character.');
            event.preventDefault(); 
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.');
            event.preventDefault(); // Prevent form submission
            return;
        }
    }
});