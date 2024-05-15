function animateProgressBar(targetWidth) {
  
    const progressBar = document.getElementById('progress');
    if (progressBar) {
      progressBar.style.width = targetWidth + '%';
    }
  }
  
  function animateProgressBar2(targetWidth) {
    const progressBar2 = document.getElementById('progress2');
    if (progressBar2) {
      progressBar2.style.width = targetWidth + '%';
    }
  }
  


  function showDutyHours(){
    var dutyH = document.getElementById('dutyH');
    var FireR = document.getElementById('FireR');
    var frmFireResponse = document.getElementById('frmFireResponse');
    var frmDutyhours = document.getElementById('frmDutyhours');
    frmDutyhours.style.display = 'block';
    frmFireResponse.style.display = 'none';
    dutyH.classList.add('bg-red-700','text-white');
    FireR.classList.remove('bg-red-700','text-white');
    dutyH.classList.add('text-black');
    
  }

  function showFireRes(){
    
    var dutyH = document.getElementById('dutyH');
    var FireR = document.getElementById('FireR');
    var frmFireResponse = document.getElementById('frmFireResponse');
    var frmDutyhours = document.getElementById('frmDutyhours');
    frmFireResponse.style.display = 'block';
    frmDutyhours.style.display = 'none';
    FireR.classList.add('bg-red-700','text-white');
    dutyH.classList.remove('bg-red-700','text-white');
    FireR.classList.add('text-black');

  }
  function displaySection(sectionName) {
    const sections = ['frmMyprofile', 'frmRankings','frmRecord', 'frmAchievement' ];

    sections.forEach(section => {

        const element = document.getElementById(section);
        if (section === sectionName) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }

    });
}

function Records() {
    displaySection('frmRecord');
}

function Profile() {
    displaySection('frmMyprofile');
}

function Achievements() {
    displaySection('frmAchievement');
}


function Rankings() {
    displaySection('frmRankings');
}


function CancelInv(){
    var addinv = document.getElementById('addInventory');
    var inv = document.getElementById('frmInventory');
    addinv.style.display = 'none';
    inv.style.display = 'block';
    

}
    function toggleSetting() {
      addLine('prof');
      var profileForm = document.getElementById('Setting');
      

      if (profileForm.style.display === 'none' || profileForm.style.display === '') {
       
          profileForm.style.display = 'block';
      } else {
        
          profileForm.style.display = 'none';
      }
  }



function addLine(LineId) {
    const formIds = ['dashb', 'inV', 'leadB', 'conN','prof'];
    
    formIds.forEach(id => {
        const element = document.getElementById(id);
        if (id === LineId) {
            element.classList.add('underline', 'underline-offset-8');
        }
        else {
            element.classList.remove('underline', 'underline-offset-8');
        }
    });
}
  function showElement(elementId) {
    const formIds = ['frmDashboard','frmLeaderboards', 'frmContactus', 'frmHtvolunteer', 'frmInventory', 'frmMainProfile', 'Setting', 'frmaboutus','editProfile','addInventory'];

    formIds.forEach(id => {
        const element = document.getElementById(id);
        if (id === elementId) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}


function showDashboard() {
    showElement('frmDashboard');
    addLine('dashb');
}
function showInventory() {
    showElement('frmInventory');
    addLine('inV');
}
function showLeaderboards() {
  showElement('frmLeaderboards');
  addLine('leadB');
}
function showContactus() {
    showElement('frmContactus');
    addLine('conN');
    const dashboard = document.getElementById('frmDashboard');
    dashboard.style.display = 'block';
}
function myProfile() {
    showElement('frmMainProfile');
    
}
function showAboutUs() {
    showElement('frmaboutus');
}
function showHwVolunteer() {
    showElement('frmHtvolunteer');
}
function showEdit(){
    showElement('editProfile');
}
function AddInventory(){
    showElement('addInventory');
}

// window.onload = function() {
//   showDashboard();
// };

document.addEventListener('DOMContentLoaded', function() {
    animateProgressBar(70);
    animateProgressBar2(40);

    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                window.location.href = 'index.html';
            }
        });
    }

    const circles = document.querySelectorAll('.colorCircle');
    circles.forEach(circle => {
        circle.addEventListener('click', function () {
            circle.classList.toggle('bg-red-500');
            circle.classList.toggle('bg-green-500');
        });
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const logoutLink = document.getElementById('logoutLink');

//     if (logoutLink) {
//         logoutLink.addEventListener('click', function(event) {
//             event.preventDefault();

//             const confirmLogout = confirm("Are you sure you want to log out?");

//             if (confirmLogout) {
//                 window.location.href = 'dashboard.html';
//             }
//         });
//     }
// });



// document.addEventListener('DOMContentLoaded', function () {

//     const circles = document.querySelectorAll('.colorCircle');

//     circles.forEach(circle => {
//         circle.addEventListener('click', function () {
//             if (circle.classList.contains('bg-red-500')) {
//                 circle.classList.remove('bg-red-500');
//                 circle.classList.add('bg-green-500');
//             } else {
//                 circle.classList.remove('bg-green-500');
//                 circle.classList.add('bg-red-500');
//             }
//         });
//     });
// });


// // Fetch data from the server
// fetch('/getAccountData') // Assuming you have a server route to retrieve account data
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error('Failed to retrieve account data');
//     })
//     .then(data => {
//         // Populate HTML elements with retrieved data
//         document.getElementById('Birthday').innerText = data.dateOfBirth;
//         document.getElementById('Gender').innerText = data.gender;
//         document.getElementById('CivilStat').innerText = data.civilStatus;
//         document.getElementById('Nationality').innerText = data.nationality;
//         document.getElementById('BloodType').innerText = data.bloodType;
//         document.getElementById('CollegeUnd').innerText = data.highestEducationalAttainment;
//         document.getElementById('NOC').innerText = data.nameOfCompany;
//         document.getElementById('YOS').innerText = data.yearsInService;
//         document.getElementById('Skillandtraining').innerText = data.skillsTraining;
//         document.getElementById('others').innerText = data.otherAffiliation;
//         document.getElementById('emailAdd').innerText = data.emailAddress;
//         document.getElementById('ContactNum').innerText = data.mobileNumber;
//         document.getElementById('Address').innerText = data.currentAddress;
//         document.getElementById('ECP').innerText = data.emergencyContactPerson;
//         document.getElementById('ECN').innerText = data.emergencyContactNumber;
//     })
//     .catch(error => console.error('Error:', error));


    //
    // Function to retrieve user profile data after login
// function getUserProfileData() {
//     fetch('/getAccountData') // Replace with your endpoint to fetch user profile data
//     .then(response => {
//         if (response.ok) {
//             return response.json(); // Assuming the response is in JSON format
//         }
//         throw new Error('Failed to fetch user profile data');
//     })
//     .then(data => {
//         // Update HTML elements with user profile data
//         document.getElementById('Birthday').innerText = data.dateOfBirth;
//         document.getElementById('Gender').innerText = data.gender;
//         document.getElementById('CivilStat').innerText = data.civilStatus;
//         document.getElementById('Nationality').innerText = data.nationality;
//         document.getElementById('BloodType').innerText = data.bloodType;
//         document.getElementById('CollegeUnd').innerText = data.highestEducationalAttainment;
//         document.getElementById('NOC').innerText = data.nameOfCompany;
//         document.getElementById('YOS').innerText = data.yearsInService;
//         document.getElementById('Skillandtraining').innerText = data.skillsTraining;
//         document.getElementById('others').innerText = data.otherAffiliation;
//         document.getElementById('emailAdd').innerText = data.emailAddress;
//         document.getElementById('ContactNum').innerText = data.mobileNumber;
//         document.getElementById('Address').innerText = data.currentAddress;
//         document.getElementById('ECP').innerText = data.emergencyContactPerson;
//         document.getElementById('ECN').innerText = data.emergencyContactNumber;
//         // Update other HTML elements similarly
//     })
//     .catch(error => console.error('Error fetching user profile data:', error));
// }

// // Event listener for login form submission
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (response.status === 200) {
//             // Upon successful login, fetch user profile data
//             getUserProfileData();
//             // Redirect or perform other actions as needed
//         } else if (response.status === 401) {
//             alert('Invalid username or password');
//         } else {
//             throw new Error('Error logging in');
//         }
//     })
//     .catch(error => console.error('Error logging in:', error));
// });

// //disable here to fix live server (session pass args)
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/profile')
//     .then(response => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error('Not logged in');
//         }
//     })
//     .then(data => {
//         document.getElementById('name').textContent = data.fullName;
//         document.getElementById('callSign').textContent = data.callSign;
//         document.getElementById('Birthday').textContent = data.dateOfBirth; //bday
//         document.getElementById('Gender').textContent = data.gender;
//         document.getElementById('CivilStatus').textContent = data.civilStatus;
//     })
//     .catch(error => {
//         console.error('Error fetching profile:', error);
//         window.location.href = '/';
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     // Fetch user data from the server
//     fetch('/getUserData')
//         .then(response => response.json())
//         .then(data => {
//             // Update HTML elements with user data
//             document.getElementById('name').innerText = `${data.firstName} ${data.middleInitial} ${data.lastName}`;
//             document.getElementById('callSign').innerText = data.callSign;
//         })
//         .catch(error => console.error('Error fetching user data:', error));
// });
