

//VOLUNTEER SESSIONS

    document.addEventListener('DOMContentLoaded', () => {
        fetch('/profile') //fetch profile from server app.js sheesh
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Not logged in');
            }
        })
        .then(data => { //format: document.getElementById('FrontEndID').textContent = data.dataName;
            document.getElementById('rfid').textContent = data.rfid;//this 1
            //basic info
            document.getElementById('name').textContent = data.fullName;
            document.getElementById('callSign').textContent = data.callSign;
            const dateOfBirth = new Date(data.dateOfBirth);
            const formattedDate = dateOfBirth.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('Birthday').textContent = formattedDate;
            document.getElementById('Gender').textContent = data.gender;
            document.getElementById('CivilStatus').textContent = data.civilStatus;
            document.getElementById('Nationality').textContent = data.nationality;
            document.getElementById('BloodType').textContent = data.bloodType;
            document.getElementById('EducationalAttainment').textContent = data.highestEducationalAttainment;
            document.getElementById('NameOfCompany').textContent = data.nameOfCompany;
            document.getElementById('YearsInService').textContent = data.yearsInService;
            document.getElementById('SkillsTraining').textContent = data.skillsTraining;
            document.getElementById('OtherAffiliation').textContent = data.otherAffiliation;
            //contact info
            document.getElementById('EmailAddress').textContent = data.emailAddress;
            document.getElementById('ContactNumber').textContent = data.mobileNumber;
            document.getElementById('CurrentAddress').textContent = data.currentAddress;
            document.getElementById('EmergencyContactPerson').textContent = data.emergencyContactPerson;
            document.getElementById('EmergencyContactNumber').textContent = data.emergencyContactNumber;
            //points
            document.getElementById('DutyHours').textContent = `${data.dutyHours} hrs`;
            document.getElementById('FireResponse').textContent = `${data.fireResponsePoints} points`;
            document.getElementById('InventoryPoints').textContent = data.inventoryPoints || 'No data';
            document.getElementById('ActivityPoints').textContent = data.activityPoints;

            //dashboard
            document.getElementById('DashboardName').textContent = data.fullName;
            document.getElementById('DashboardAccountType').textContent = data.accountType;
            document.getElementById('DashboardDutyHours').textContent = data.dutyHours;
            document.getElementById('DashboardFireResponse').textContent = data.fireResponsePoints;
            document.getElementById('DashboardInventoryPoints').textContent = data.inventoryPoints;
            document.getElementById('DashboardActivityPoints').textContent = data.activityPoints            

            
            
        })
        .catch(error => {
            
            console.error('Error fetching profile:', error);
            window.location.href = '/';
        });
    });


//SUPERVISOR SESSIONS

//ADMIN SESSIONS