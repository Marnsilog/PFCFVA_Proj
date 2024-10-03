function animateProgressBar(currentValue, maxValue) {
    const progressBar = document.getElementById('progress');
    if (progressBar) {
        const percentage = currentValue > maxValue ? 100 : (currentValue / maxValue) * 100; 
        progressBar.style.width = percentage + '%'; 
        console.log('ProgressBar 1:', percentage + '%'); 
    }
}
function animateProgressBar2(currentValue, maxValue) {
    const progressBar2 = document.getElementById('progress2');
    if (progressBar2) {
        const percentage = currentValue > maxValue ? 100 : (currentValue / maxValue) * 100; 
        progressBar2.style.width = percentage + '%'; 
        console.log('ProgressBar 2:', percentage + '%'); 
    }
}
  
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
            const statusDuty = data.dutyHours;
            const statusFire = data.fireResponsePoints;
            const callsign = data.callSign.toLowerCase();;
            let dhmax;
            let frmax;
            if (/Aspirant/i.test(callsign)) {
                dhmax = 100;
                frmax = 0;
            } else if (/Probationary/i.test(callsign)) {
                dhmax = 1000;
                frmax = 10;
            } else if (/echo/i.test(callsign)) {
                dhmax = 2000;
                frmax = 20;
            } else {
                dhmax = 100;
                frmax = 100;
            }
            dhmax = parseInt(dhmax);
            frmax = parseInt(frmax);
            animateProgressBar(statusDuty, dhmax);
            animateProgressBar2(statusFire, frmax);
            
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
        return;
    }
}

window.onload = fetchProfileData;

document.addEventListener('DOMContentLoaded', function () {
    fetch('/auth/get-user-data') // Replace with your endpoint to get user data
        .then(response => response.json())
        .then(data => {
            const dateOfBirth = new Date(data.dateOfBirth);
            const formattedDate = dateOfBirth.toISOString().split('T')[0];
            
            if (document.getElementById('HiddenUsername')) {
                document.getElementById('HiddenUsername').value = data.username;
            }
            if (document.getElementById('EditUsername')) {
                document.getElementById('EditUsername').value = data.username;
            }
            if (document.getElementById('EditLastName')) {
                document.getElementById('EditLastName').value = data.lastName;
            }
            if (document.getElementById('EditFirstName')) {
                document.getElementById('EditFirstName').value = data.firstName;
            }
            if (document.getElementById('EditMiddleName')) {
                document.getElementById('EditMiddleName').value = data.middleName;
            }
            if (document.getElementById('EditEmailAddress')) {
                document.getElementById('EditEmailAddress').value = data.emailAddress;
            }
            if (document.getElementById('EditContactNumber')) {
                document.getElementById('EditContactNumber').value = data.mobileNumber;
            }
            if (document.getElementById('EditCivilStatus')) {
                document.getElementById('EditCivilStatus').value = data.civilStatus;
            }
            if (document.getElementById('EditNationality')) {
                document.getElementById('EditNationality').value = data.nationality;
            }
            if (document.getElementById('EditBloodType')) {
                document.getElementById('EditBloodType').value = data.bloodType;
            }
            if (document.getElementById('EditBirthday')) {
                document.getElementById('EditBirthday').value = formattedDate;
            }
            if (document.getElementById('EditGender')) {
                document.getElementById('EditGender').value = data.gender;
            }
            if (document.getElementById('EditCurrentAddress')) {
                document.getElementById('EditCurrentAddress').value = data.currentAddress;
            }
            if (document.getElementById('EditEmergencyContactPerson')) {
                document.getElementById('EditEmergencyContactPerson').value = data.emergencyContactPerson;
            }
            if (document.getElementById('EditEmergencyContactNumber')) {
                document.getElementById('EditEmergencyContactNumber').value = data.emergencyContactNumber;
            }
            if (document.getElementById('EditHighestEducationalAttainment')) {
                document.getElementById('EditHighestEducationalAttainment').value = data.highestEducationalAttainment;
            }
            if (document.getElementById('EditNameOfCompany')) {
                document.getElementById('EditNameOfCompany').value = data.nameOfCompany;
            }
            if (document.getElementById('EditYearsInService')) {
                document.getElementById('EditYearsInService').value = data.yearsInService;
            }
            if (document.getElementById('EditSkillsTraining')) {
                document.getElementById('EditSkillsTraining').value = data.skillsTraining;
            }
            if (document.getElementById('EditOtherAffiliation')) {
                document.getElementById('EditOtherAffiliation').value = data.otherAffiliation;
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});


document.addEventListener("DOMContentLoaded", function () {
    function fetchDashboardData() {
        fetch('/auth/dashboard-data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    updateDashboard(data.data);
                } else {
                    console.error('Error:', data.message);
                }
            });
    }

    function updateDashboard(data) {
        const fields = [
            { key: "fullName", element: "DashboardFullName", fallback: 'N/A' },
            { key: "accountType", element: "DashboardAccountType", fallback: 'N/A' },
            { key: "dutyHours", element: "DashboardDutyHours", fallback: '0' },
            { key: "fireResponsePoints", element: "DashboardFireResponse", fallback: '0' },
            { key: "inventoryPoints", element: "DashboardInventoryPoints", fallback: '0' },
            { key: "activityPoints", element: "DashboardActivityPoints", fallback: '0' },
        ];

        fields.forEach(field => {
            const element = document.querySelector(`[data-feild="${field.element}"]`);
            if (element) {
                element.textContent = data[field.key] || field.fallback;
            } 
        });
    }

    fetchDashboardData();
});

