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
  

//LEADERBOARDS
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

    function dutyhoursdetail(){
        var dutyhoursdetail = document.getElementById('dutyhoursdetail');
        if (dutyhoursdetail.style.display === 'none' || dutyhoursdetail.style.display === '') {
           
            dutyhoursdetail.style.display = 'block';
        } else {
          
            dutyhoursdetail.style.display = 'none';
        }
    }

    function exitdtdetail(){
        var dutyhoursdetail = document.getElementById('dutyhoursdetail');
            dutyhoursdetail.style.display = 'none';
       
    }

    function fireresponsedetai(){
        var fireresponsedetail = document.getElementById('fireresponsedetail');
        if (fireresponsedetail.style.display === 'none' || fireresponsedetail.style.display === '') {
           
            fireresponsedetail.style.display = 'block';
        } else {
          
            fireresponsedetail.style.display = 'none';
        }
    }

    function exitfrdetail(){
        var fireresponsedetail = document.getElementById('fireresponsedetail');
        fireresponsedetail.style.display = 'none';
       
    }

    function itemstatus(selectElement) {

        const selectedValue = selectElement.value;
        selectElement.classList.remove('bg-red-500', 'bg-yellow-300', 'bg-green-400');
        if (selectedValue === 'Damaged') {
            selectElement.classList.add('bg-red-500');
        } else if (selectedValue === 'Missing') {
            selectElement.classList.add('bg-yellow-300');
        } else if (selectedValue === 'Good') {
            selectElement.classList.add('bg-green-400');
        }else {
            selectElement.classList.add('bg-white');
        }
    }
    
    
  


//FOR MENU

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
//INVENTORY
function remarks(){
    var remarkstag = document.getElementById('remarkstag');
    if (remarkstag.style.display === 'none' || remarkstag.style.display === '') {
       
        remarkstag.style.display = 'block';
    } else {
      
        remarkstag.style.display = 'none';
    }
}

function exitremarks(){
    var remarkstag = document.getElementById('remarkstag');

        remarkstag.style.display = 'none';
 
}

function CancelInv(){
    var addinv = document.getElementById('addInventory');
    var inv = document.getElementById('frmInventory');
    addinv.style.display = 'none';
    inv.style.display = 'block';
    

}

function seeinventory(){
    var inventorydetail = document.getElementById('inventorydetail');
    if (inventorydetail.style.display === 'none' || inventorydetail.style.display === '') {
       
        inventorydetail.style.display = 'block';
    } else {
      
        inventorydetail.style.display = 'none';
    }
}
function exitinventorydetail(){
    var inventorydetail = document.getElementById('inventorydetail');

    inventorydetail.style.display = 'none';
 
}

//
  function showElement(elementId) {
    const formIds = ['frmDashboard','frmLeaderboards', 'frmContactus', 'addInventory', 'frmMainProfile', 'Setting','editProfile','frmInventory',];

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
    showElement('addInventory');
    addLine('inV');
}
function showLeaderboards() {
  showElement('frmLeaderboards');
  addLine('leadB');
}
function showContactus() {
    showElement('frmContactus');
    addLine('conN');
   
}
function myProfile() {
    showElement('frmMainProfile');
    
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
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');


    menuToggle.addEventListener('click', function () {
        if (mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'block';
        }
    });

    const mobileMenuItems = mobileMenu.querySelectorAll('a');
    mobileMenuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            mobileMenu.style.display = 'none';
        });
    });

    document.addEventListener('click', function (event) {
        if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.style.display = 'none';
        }
    });
});

// document.addEventListener('DOMContentLoaded', function () {
   
// });




//edit prof, working with bugs
// // Function to populate edit form with current profile data
// function populateEditForm(data) {
//     document.getElementById('EditRFID').value = data.rfid;
//     document.getElementById('EditLastName').value = data.lastName || '';
//     document.getElementById('EditFirstName').value = data.firstName || '';
//     document.getElementById('EditMiddleName').value = data.middleName || '';
//     document.getElementById('EditUsername').value = data.username || '';
//     document.getElementById('EditEmailAddress').value = data.emailAddress || '';
//     document.getElementById('EditContactNumber').value = data.mobileNumber || '';
//     document.getElementById('EditCivilStatus').value = data.civilStatus || '';
//     document.getElementById('EditNationality').value = data.nationality || '';
//     document.getElementById('EditBloodType').value = data.bloodType || '';
//     document.getElementById('EditGender').value = data.gender || '';
//     document.getElementById('EditCurrentAddress').value = data.currentAddress || '';
//     document.getElementById('EditEmergencyContactPerson').value = data.emergencyContactPerson || '';
//     document.getElementById('EditEmergencyContactNumber').value = data.emergencyContactNumber || '';
//     document.getElementById('EditHighestEducationalAttainment').value = data.highestEducationalAttainment || '';
//     document.getElementById('EditNameOfCompany').value = data.nameOfCompany || '';
//     document.getElementById('EditYearsInService').value = data.yearsInService || '';
//     document.getElementById('EditSkillsTraining').value = data.skillsTraining || '';
//     document.getElementById('EditOtherAffiliation').value = data.otherAffiliation || '';
// }

// // Function to handle profile update
// function saveProfile() {
//     const rfid = document.getElementById('EditRFID').value;
//     const lastName = document.getElementById('EditLastName').value;
//     const firstName = document.getElementById('EditFirstName').value;
//     const middleName = document.getElementById('EditMiddleName').value;
//     const middleInitial = middleName.charAt(0).toUpperCase();
//     const username = document.getElementById('EditUsername').value;
//     const emailAddress = document.getElementById('EditEmailAddress').value;
//     const mobileNumber = document.getElementById('EditContactNumber').value;
//     const oldPassword = document.getElementById('EditOldPassword').value;
//     const newPassword = document.getElementById('EditNewPassword').value;
//     const confirmPassword = document.getElementById('EditConfirmPassword').value;
//     const civilStatus = document.getElementById('EditCivilStatus').value;
//     const nationality = document.getElementById('EditNationality').value;
//     const bloodType = document.getElementById('EditBloodType').value;
//     const gender = document.getElementById('EditGender').value;
//     const currentAddress = document.getElementById('EditCurrentAddress').value;
//     const emergencyContactPerson = document.getElementById('EditEmergencyContactPerson').value;
//     const emergencyContactNumber = document.getElementById('EditEmergencyContactNumber').value;
//     const highestEducationalAttainment = document.getElementById('EditHighestEducationalAttainment').value;
//     const nameOfCompany = document.getElementById('EditNameOfCompany').value;
//     const yearsInService = document.getElementById('EditYearsInService').value;
//     const skillsTraining = document.getElementById('EditSkillsTraining').value;
//     const otherAffiliation = document.getElementById('EditOtherAffiliation').value;

//     const profileData = {
//         rfid,
//         lastName,
//         firstName,
//         middleName,
//         middleInitial,
//         username,
//         emailAddress,
//         mobileNumber,
//         oldPassword,
//         newPassword,
//         confirmPassword,
//         civilStatus,
//         nationality,
//         bloodType,
//         gender,
//         currentAddress,
//         emergencyContactPerson,
//         emergencyContactNumber,
//         highestEducationalAttainment,
//         nameOfCompany,
//         yearsInService,
//         skillsTraining,
//         otherAffiliation
//     };

//     fetch('/updateProfile', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(profileData)
//     })
//     .then(response => response.json())
//     .then(result => {
//         if (result.success) {
//             alert('Profile updated successfully');
//             // Update the main profile display
//             document.getElementById('FullName').textContent = `${firstName} ${middleInitial}. ${lastName}`;
//             document.getElementById('CallSign').textContent = profileData.callSign;
//             // other updates as needed
//             showProfile(); // Switch back to profile view
//         } else {
//             alert('Failed to update profile: ' + result.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error updating profile:', error);
//         alert('An error occurred while updating the profile.');
//     });
// }

// // Function to show the edit profile form
// function showEdit() {
//     fetch('/profile')
//     .then(response => response.json())
//     .then(data => {
//         populateEditForm(data);
//         document.getElementById('frmMainProfile').style.display = 'none';
//         document.getElementById('editProfile').style.display = 'block';
//     })
//     .catch(error => {
//         console.error('Error fetching profile for edit:', error);
//     });
// }

// // Function to cancel the edit profile action
// function cancelEdit() {
//     document.getElementById('editProfile').style.display = 'none';
//     document.getElementById('frmMainProfile').style.display = 'block';
// }


//edit profile (working)
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/profile') // Fetch profile from server
//     .then(response => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error('Not logged in');
//         }
//     })
//     .then(data => {
//         document.getElementById('RFID').textContent = `ID#: ${data.rfid}`; // Display RFID
//         // Set the hidden RFID field in the form
//         document.getElementById('EditRFID').value = data.rfid;
//         // Set other profile data...
//     })
//     .catch(error => {
//         console.error('Error fetching profile:', error);
//         window.location.href = '/';
//     });
    
//     document.getElementById('editProfileForm').addEventListener('submit', function (event) {
//         event.preventDefault(); // Prevent the default form submission

//         const formData = new FormData(this);
//         const data = {};
//         formData.forEach((value, key) => {
//             data[key] = value;
//         });

//         fetch('/updateProfile', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(result => {
//             if (result.success) {
//                 alert('Profile updated successfully');
//                 // Optionally, update the profile view with new data
//             } else {
//                 alert('Failed to update profile');
//             }
//         })
//         .catch(error => {
//             console.error('Error updating profile:', error);
//             alert('An error occurred while updating the profile');
//         });
//     });
// });
