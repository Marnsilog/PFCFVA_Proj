

//VOLUNTEER sessions pass args 

    //disable this to fix live server (for frontend)
    document.addEventListener('DOMContentLoaded', () => {
        fetch('/profile') //fetch profile from server app.js sheesh
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Not logged in');
            }
        })
        .then(data => {
            document.getElementById('rfid').textContent = data.rfid;//this 1
            document.getElementById('name').textContent = data.fullName;
            document.getElementById('callSign').textContent = data.callSign;
            document.getElementById('Birthday').textContent = data.dateOfBirth; //bday
            document.getElementById('Gender').textContent = data.gender;
            document.getElementById('CivilStatus').textContent = data.civilStatus;
            document.getElementById('Nationality').textContent = data.nationality;
            document.getElementById('BloodType').textContent = data.bloodType;
        })
        .catch(error => {
            
            console.error('Error fetching profile:', error);
            window.location.href = '/';
        });
    });
