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
