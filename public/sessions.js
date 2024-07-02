

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
            document.getElementById('name').textContent = data.fullName;
            document.getElementById('callSign').textContent = data.callSign;
            document.getElementById('Birthday').textContent = data.dateOfBirth; //bday
            document.getElementById('Gender').textContent = data.gender;
            document.getElementById('CivilStatus').textContent = data.civilStatus;
            document.getElementById('Nationality').textContent = data.nationality;
            document.getElementById('BloodType').textContent = data.bloodType;
            document.getElementById('EducationalAttainment').textContent = data.highestEducationalAttainment;
            document.getElementById('NameOfCompany').textContent = data.nameOfCompany;
            document.getElementById('YearsInService').textContent = data.yearsInService;
            
            
        })
        .catch(error => {
            
            console.error('Error fetching profile:', error);
            window.location.href = '/';
        });
    });


//SUPERVISOR SESSIONS

//ADMIN SESSIONS