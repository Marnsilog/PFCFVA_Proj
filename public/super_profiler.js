async function fetchProfileData() {
    try {
        const response = await fetch('/auth/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
            const data = result.data;
            document.querySelector('[data-field="FullName"]').innerText = data.fullName;
            document.querySelector('[data-field="CallSign"]').innerText = data.callSign;
            document.querySelector('[data-field="DutyHours"]').innerText = `${data.dutyHours} hrs`;
            document.querySelector('[data-field="FireResponse"]').innerText = `${data.fireResponsePoints} points`;
            document.querySelector('[data-field="InventoryPoints"]').innerText = data.inventoryPoints;
            document.querySelector('[data-field="ActivityPoints"]').innerText = data.activityPoints;
            document.querySelector('[data-field="Birthday"]').innerText = new Date(data.dateOfBirth).toLocaleDateString();
            document.querySelector('[data-field="Gender"]').innerText = data.gender;
            document.querySelector('[data-field="CivilStatus"]').innerText = data.civilStatus;
            document.querySelector('[data-field="Nationality"]').innerText = data.nationality;
            document.querySelector('[data-field="BloodType"]').innerText = data.bloodType;
            document.querySelector('#HighestEducationalAttainment').innerText = data.highestEducationalAttainment;
            document.querySelector('[data-field="NameOfCompany"]').innerText = data.nameOfCompany;
            document.querySelector('[data-field="YearsInService"]').innerText = `${data.yearsInService} Years`;
            document.querySelector('[data-field="SkillsTraining"]').innerText = data.skillsTraining;
            document.querySelector('[data-field="OtherAffiliation"]').innerText = data.otherAffiliation;
            document.querySelector('[data-field="EmailAddress"]').innerText = data.emailAddress;
            document.querySelector('[data-field="ContactNumber"]').innerText = data.mobileNumber;
            document.querySelector('[data-field="CurrentAddress"]').innerText = data.currentAddress;
            document.querySelector('[data-field="EmergencyContactPerson"]').innerText = data.emergencyContactPerson;
            document.querySelector('[data-field="EmergencyContactNumber"]').innerText = data.emergencyContactNumber;
            

        } else {
            console.error('Profile not found or other error:', result.message);
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

window.onload = fetchProfileData;

document.addEventListener('DOMContentLoaded', function () {
    fetch('/auth/get-user-data') // Replace with your endpoint to get user data
        .then(response => response.json())
        .then(data => {
            const dateOfBirth = new Date(data.dateOfBirth);
            const formattedDate = dateOfBirth.toISOString().split('T')[0];
            document.getElementById('HiddenUsername').value = data.username;
            document.getElementById('EditUsername').value = data.username;
            document.getElementById('EditLastName').value = data.lastName;
            document.getElementById('EditFirstName').value = data.firstName;
            document.getElementById('EditMiddleName').value = data.middleName;
            document.getElementById('EditEmailAddress').value = data.emailAddress;
            document.getElementById('EditContactNumber').value = data.mobileNumber;
            // Add more fields as necessary
            document.getElementById('EditCivilStatus').value = data.civilStatus;
            document.getElementById('EditNationality').value = data.nationality;
            document.getElementById('EditBloodType').value = data.bloodType;
            document.getElementById('EditBirthday').value = formattedDate;
            document.getElementById('EditGender').value = data.gender;
            document.getElementById('EditCurrentAddress').value = data.currentAddress;
            document.getElementById('EditEmergencyContactPerson').value = data.emergencyContactPerson;
            document.getElementById('EditEmergencyContactNumber').value = data.emergencyContactNumber;
            document.getElementById('EditHighestEducationalAttainment').value = data.highestEducationalAttainment;
            document.getElementById('EditNameOfCompany').value = data.nameOfCompany;
            document.getElementById('EditYearsInService').value = data.yearsInService;
            document.getElementById('EditSkillsTraining').value = data.skillsTraining;
            document.getElementById('EditOtherAffiliation').value = data.otherAffiliation;
        })
        .catch(error => console.error('Error fetching user data:', error));
});

