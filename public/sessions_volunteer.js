// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch the volunteer profile data from the backend
//     fetch('/auth/volunteer/profile')
//         .then(response => {
//             if (response.status === 200) {
//                 return response.json();
//             } else {
//                 throw new Error('Failed to fetch profile data');
//             }
//         })
//         .then(data => {
//             // Populate the profile information in the HTML
//             document.getElementById('RFID').textContent = `ID#: ${data.rfid}`;
//             document.getElementById('FullName').textContent = data.fullName;
//             document.getElementById('CallSign').textContent = data.callSign;
//             document.getElementById('Birthday').textContent = data.dateOfBirth;
//             document.getElementById('Gender').textContent = data.gender;
//             document.getElementById('CivilStatus').textContent = data.civilStatus;
//             document.getElementById('Nationality').textContent = data.nationality;
//             document.getElementById('BloodType').textContent = data.bloodType;
//             document.getElementById('HighestEducationalAttainment').textContent = data.highestEducationalAttainment;
//             document.getElementById('NameOfCompany').textContent = data.nameOfCompany;
//             document.getElementById('YearsInService').textContent = data.yearsInService;
//             document.getElementById('SkillsTraining').textContent = data.skillsTraining;
//             document.getElementById('OtherAffiliation').textContent = data.otherAffiliation;
//             document.getElementById('EmailAddress').textContent = data.emailAddress;
//             document.getElementById('ContactNumber').textContent = data.mobileNumber;
//             document.getElementById('CurrentAddress').textContent = data.currentAddress;
//             document.getElementById('EmergencyContactPerson').textContent = data.emergencyContactPerson;
//             document.getElementById('EmergencyContactNumber').textContent = data.emergencyContactNumber;
//             document.getElementById('DutyHours').textContent = `${data.dutyHours || 0} hrs`;
//             document.getElementById('FireResponse').textContent = `${data.fireResponsePoints || 0} points`;
//             document.getElementById('InventoryPoints').textContent = data.inventoryPoints || '0';
//             document.getElementById('ActivityPoints').textContent = data.activityPoints || '0';
//             document.getElementById('MenuFullName').textContent = data.fullName;
//         })
//         .catch(error => {
//             console.error('Error fetching profile data:', error);
//         });
// });


document.addEventListener('DOMContentLoaded', () => {
    // Fetch the volunteer profile data from the backend
    fetch('/auth/volunteer/profile', { credentials: 'include' })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                // If the session is invalid or the user is not logged in, redirect to login page
                window.location.href = '/index.html';
                throw new Error('Not logged in');
            }
        })
        .then(data => {
            // Populate the profile information in the HTML
            document.getElementById('RFID').textContent = `ID#: ${data.rfid}`;
            document.getElementById('FullName').textContent = data.fullName;
            document.getElementById('CallSign').textContent = data.callSign;
            document.getElementById('Birthday').textContent = data.dateOfBirth;
            document.getElementById('Gender').textContent = data.gender;
            document.getElementById('CivilStatus').textContent = data.civilStatus;
            document.getElementById('Nationality').textContent = data.nationality;
            document.getElementById('BloodType').textContent = data.bloodType;
            document.getElementById('HighestEducationalAttainment').textContent = data.highestEducationalAttainment;
            document.getElementById('NameOfCompany').textContent = data.nameOfCompany;
            document.getElementById('YearsInService').textContent = data.yearsInService;
            document.getElementById('SkillsTraining').textContent = data.skillsTraining;
            document.getElementById('OtherAffiliation').textContent = data.otherAffiliation;
            document.getElementById('EmailAddress').textContent = data.emailAddress;
            document.getElementById('ContactNumber').textContent = data.mobileNumber;
            document.getElementById('CurrentAddress').textContent = data.currentAddress;
            document.getElementById('EmergencyContactPerson').textContent = data.emergencyContactPerson;
            document.getElementById('EmergencyContactNumber').textContent = data.emergencyContactNumber;
            document.getElementById('DutyHours').textContent = `${data.dutyHours || 0} hrs`;
            document.getElementById('FireResponse').textContent = `${data.fireResponsePoints || 0} points`;
            document.getElementById('InventoryPoints').textContent = data.inventoryPoints || '0';
            document.getElementById('ActivityPoints').textContent = data.activityPoints || '0';
            document.getElementById('MenuFullName').textContent = data.fullName;
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });

    // Logout functionality
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();

            fetch('/auth/logout', { credentials: 'include' })
                .then(response => {
                    if (response.ok) {
                        window.location.href = '/index.html'; // Redirect to login page after logout
                    } else {
                        alert('Logout failed!');
                    }
                })
                .catch(error => console.error('Error during logout:', error));
        });
    }
});

