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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const clearButton = document.getElementById('clearButton');
    const callSignSelect = document.getElementById('callSign');
    const tooltipText = callSignSelect ? callSignSelect.nextElementSibling : null;
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            clearForm(form);
        });
    } else {
        return;
    }

    function clearForm(form) {
        Array.from(form.elements).forEach(element => {
            switch(element.type) {
                case 'text':
                case 'password':
                case 'textarea':
                case 'email':
                case 'number':
                case 'date':
                case 'tel':
                    element.value = '';
                    break;
                case 'radio':
                case 'checkbox':
                    element.checked = false;
                    break;
                case 'select-one':
                case 'select-multiple':
                    element.selectedIndex = -1;
                    break;
                default:
                    break;
            }
        });

        // Reset callSign select to its initial state
        if (callSignSelect) {
            callSignSelect.disabled = true;
            if (tooltipText) {
                tooltipText.classList.remove('hidden');
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const accountTypeSelect = document.getElementById('accountType');
    const callSignSelect = document.getElementById('callSign');
    
    // Define options to disable for each account type
    const volunteerOptionsToDisable = ['ECHO', 'ECHO800', 'ECHO900', 'PREVO'];
    const supervisorOptionsToDisable = ['ASPIRANT', 'PROBATIONARY'];
    
    const tooltipText = document.getElementById('tooltip');

    // Listen for account type changes
    accountTypeSelect.addEventListener('change', function() {
        const selectedAccountType = accountTypeSelect.value;

        if (selectedAccountType) {
            callSignSelect.disabled = false;  // Enable call sign select
            tooltipText.classList.add('hidden');  // Hide tooltip
        } else {
            callSignSelect.disabled = true;  // Disable call sign select
            tooltipText.classList.remove('hidden');  // Show tooltip
        }

        // Reset all options to enabled first
        const allOptions = callSignSelect.querySelectorAll('option');
        allOptions.forEach(option => {
            option.disabled = false;
        });

        // Disable specific options based on selected account type
        if (selectedAccountType === 'Volunteer') {
            volunteerOptionsToDisable.forEach(optionValue => {
                const option = callSignSelect.querySelector(`option[value="${optionValue}"]`);
                if (option) option.disabled = true;  // Disable option for Volunteer
            });
        } else if (selectedAccountType === 'Supervisor') {
            supervisorOptionsToDisable.forEach(optionValue => {
                const option = callSignSelect.querySelector(`option[value="${optionValue}"]`);
                if (option) option.disabled = true;  // Disable option for Supervisor
            });
        }
    });

    // Tooltip logic
    callSignSelect.addEventListener('mouseover', function() {
        if (callSignSelect.disabled) {
            tooltipText.classList.remove('hidden');  // Show tooltip
        }
    });

    callSignSelect.addEventListener('mouseout', function() {
        tooltipText.classList.add('hidden');  // Hide tooltip
    });
});

