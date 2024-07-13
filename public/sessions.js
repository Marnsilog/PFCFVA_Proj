

//VOLUNTEER SESSIONS

    // document.addEventListener('DOMContentLoaded', () => {
    //     fetch('/profile') //fetch profile from server app.js sheesh
    //     .then(response => {
    //         if (response.status === 200) {
    //             return response.json();
    //         } else {
    //             throw new Error('Not logged in');
    //         }
    //     })
    //     .then(data => { //format: document.getElementById('FrontEndID').textContent = data.dataName;
    //         document.getElementById('RFID').textContent = `ID#: ${data.rfid}`; //this 1
    //         //basic info
    //         document.getElementById('FullName').textContent = data.fullName;
    //         document.getElementById('CallSign').textContent = data.callSign;
    //         const dateOfBirth = new Date(data.dateOfBirth);
    //         const formattedDate = dateOfBirth.toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric'
    //         });
    //         document.getElementById('Birthday').textContent = formattedDate;
    //         document.getElementById('Gender').textContent = data.gender;
    //         document.getElementById('CivilStatus').textContent = data.civilStatus;
    //         document.getElementById('Nationality').textContent = data.nationality;
    //         document.getElementById('BloodType').textContent = data.bloodType;
    //         document.getElementById('HighestEducationalAttainment').textContent = data.highestEducationalAttainment;
    //         document.getElementById('NameOfCompany').textContent = data.nameOfCompany;
    //         document.getElementById('YearsInService').textContent = data.yearsInService;
    //         document.getElementById('SkillsTraining').textContent = data.skillsTraining;
    //         document.getElementById('OtherAffiliation').textContent = data.otherAffiliation;
    //         //contact info
    //         document.getElementById('EmailAddress').textContent = data.emailAddress;
    //         document.getElementById('ContactNumber').textContent = data.mobileNumber;
    //         document.getElementById('CurrentAddress').textContent = data.currentAddress;
    //         document.getElementById('EmergencyContactPerson').textContent = data.emergencyContactPerson;
    //         document.getElementById('EmergencyContactNumber').textContent = data.emergencyContactNumber;
    //         //points
    //         document.getElementById('DutyHours').textContent = `${data.dutyHours || 0} hrs`;
    //         document.getElementById('FireResponse').textContent = `${data.fireResponsePoints || 0} points`;
    //         document.getElementById('InventoryPoints').textContent = data.inventoryPoints || '0';
    //         document.getElementById('ActivityPoints').textContent = data.activityPoints || '0' ;

    //         //dashboard
    //         document.getElementById('MenuFullName').textContent = data.fullName;
    //         document.getElementById('DashboardFullName').textContent = data.fullName;
    //         document.getElementById('DashboardAccountType').textContent = data.accountType;
    //         document.getElementById('DashboardDutyHours').textContent = data.dutyHours;
    //         document.getElementById('DashboardFireResponse').textContent = data.fireResponsePoints;
    //         document.getElementById('DashboardInventoryPoints').textContent = data.inventoryPoints;
    //         document.getElementById('DashboardActivityPoints').textContent = data.activityPoints;     
            
    //         //contactus
    //         document.getElementById('ContactUsFullName').textContent = data.fullName;
    //         document.getElementById('ContactUsAccountType').textContent = data.accountType;

            
            
    //     })
    //     .catch(error => {
            
    //         console.error('Error fetching profile:', error);
    //         window.location.href = '/';
    //     });
    // });



    //with bugs (username not populated)
    document.addEventListener('DOMContentLoaded', () => {
        fetchProfileData();
    });
    
    function fetchProfileData() {
        fetch('/profile')
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Not logged in');
            }
        })
        .then(data => {
            populateProfileData(data);
            populateEditProfileForm(data);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            alert('Session expired. Please log in again.');
            window.location.href = '/';
        });
    }
    
    function populateProfileData(data) {
        document.getElementById('RFID').textContent = `ID#: ${data.rfid}`;
        document.getElementById('FullName').textContent = data.fullName;
        document.getElementById('CallSign').textContent = data.callSign;
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
        document.getElementById('DashboardFullName').textContent = data.fullName;
        document.getElementById('DashboardAccountType').textContent = data.accountType;
        document.getElementById('DashboardDutyHours').textContent = data.dutyHours;
        document.getElementById('DashboardFireResponse').textContent = data.fireResponsePoints;
        document.getElementById('DashboardInventoryPoints').textContent = data.inventoryPoints;
        document.getElementById('DashboardActivityPoints').textContent = data.activityPoints;
        document.getElementById('ContactUsFullName').textContent = data.fullName;
        document.getElementById('ContactUsAccountType').textContent = data.accountType;
    }
    
    function populateEditProfileForm(data) {
        document.getElementById('EditRFID').value = data.rfid || '';
        document.getElementById('EditLastName').value = data.lastName || '';
        document.getElementById('EditFirstName').value = data.firstName || '';
        document.getElementById('EditMiddleName').value = data.middleName || '';
        document.getElementById('EditUsername').value = data.username || '';
        document.getElementById('EditEmailAddress').value = data.emailAddress || '';
        document.getElementById('EditContactNumber').value = data.mobileNumber || '';
        document.getElementById('EditCivilStatus').value = data.civilStatus || '';
        document.getElementById('EditNationality').value = data.nationality || '';
        document.getElementById('EditBloodType').value = data.bloodType || '';
        document.getElementById('EditBirthday').value = data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '';
        document.getElementById('EditGender').value = data.gender || '';
        document.getElementById('EditCurrentAddress').value = data.currentAddress || '';
        document.getElementById('EditEmergencyContactPerson').value = data.emergencyContactPerson || '';
        document.getElementById('EditEmergencyContactNumber').value = data.emergencyContactNumber || '';
        document.getElementById('EditHighestEducationalAttainment').value = data.highestEducationalAttainment || '';
        document.getElementById('EditNameOfCompany').value = data.nameOfCompany || '';
        document.getElementById('EditYearsInService').value = data.yearsInService || '';
        document.getElementById('EditSkillsTraining').value = data.skillsTraining || '';
        document.getElementById('EditOtherAffiliation').value = data.otherAffiliation || '';
    }
    
    document.getElementById('editProfileForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const updatedProfile = {
            rfid: document.getElementById('EditRFID').value,
            lastName: document.getElementById('EditLastName').value,
            firstName: document.getElementById('EditFirstName').value,
            middleName: document.getElementById('EditMiddleName').value,
            middleInitial: document.getElementById('EditMiddleName').value.charAt(0).toUpperCase(),
            username: document.getElementById('EditUsername').value,
            emailAddress: document.getElementById('EditEmailAddress').value,
            mobileNumber: document.getElementById('EditContactNumber').value,
            civilStatus: document.getElementById('EditCivilStatus').value,
            nationality: document.getElementById('EditNationality').value,
            bloodType: document.getElementById('EditBloodType').value,
            dateOfBirth: document.getElementById('EditBirthday').value,
            gender: document.getElementById('EditGender').value,
            currentAddress: document.getElementById('EditCurrentAddress').value,
            emergencyContactPerson: document.getElementById('EditEmergencyContactPerson').value,
            emergencyContactNumber: document.getElementById('EditEmergencyContactNumber').value,
            highestEducationalAttainment: document.getElementById('EditHighestEducationalAttainment').value,
            nameOfCompany: document.getElementById('EditNameOfCompany').value,
            yearsInService: document.getElementById('EditYearsInService').value,
            skillsTraining: document.getElementById('EditSkillsTraining').value,
            otherAffiliation: document.getElementById('EditOtherAffiliation').value,
            oldPassword: document.getElementById('EditOldPassword').value,
            newPassword: document.getElementById('EditNewPassword').value,
            confirmPassword: document.getElementById('EditConfirmPassword').value
        };
    
        // If newPassword is provided, oldPassword must be required
        if (updatedProfile.newPassword && !updatedProfile.oldPassword) {
            alert('Please enter your old password to change the password.');
            return;
        }
    
        fetch('/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfile)
        })
        .then(response => {
            if (response.ok) {
                alert('Profile updated successfully');
                location.reload();
            } else {
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Error updating profile: ' + error.message);
        });
    });
    
    function cancelEdit() {
        // Clear form fields
        document.getElementById('editProfileForm').reset();
    
        // Optionally, you can hide the edit profile section if needed
        document.getElementById('editProfile').style.display = 'none';
    
        // Optionally, you can show the profile view section if you have one
        // document.getElementById('profileView').style.display = 'block';
    }
    
    

//SUPERVISOR SESSIONS

//ADMIN SESSIONS