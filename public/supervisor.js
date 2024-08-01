    
    
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


// FIRE RESPONSE ICS
// function addthis(){
//     var addPer = document.getElementById('addPer');
//     addPer.style.display = 'block';
// }
// function canaddPerson(){
//     var canAdd = document.getElementById('addPer');
//     canAdd.style.display = 'none';
// }
// function ConfirmAdd(){
//     var AddResponse = document.getElementById('AddResponse');
//     var InciSys = document.getElementById('InciSys');
//     InciSys.style.display = 'block';
//     AddResponse.style.display = 'none';
// }
// function icsDone(){
//     var fireresponseform = document.getElementById('fireresponseform');
//     var InciSys = document.getElementById('InciSys');
//     fireresponseform.style.display = 'block';
//     InciSys.style.display = 'none';
    
// }
// function addthis1(){
//     var addPer = document.getElementById('addPer1');
//     addPer.style.display = 'block';
// }
// function canaddPerson1(){
//     var canAdd = document.getElementById('addPer1');
//     canAdd.style.display = 'none';
// }
// function fireclose(){
//     var firelog = document.getElementById('firelog');
//     firelog.style.display = 'none';
// }


// function icsSubmit(){
//     var fireresponseform = document.getElementById('fireresponseform');
//     var frmFireResponse = document.getElementById('frmFireResponse');
//     frmFireResponse.style.display = 'block';
//     fireresponseform.style.display = 'none';
// }

// function AddFireResponse(){
//     var AddResponse = document.getElementById('AddResponse');
//     var frmFireResponse = document.getElementById('frmFireResponse');
//     AddResponse.style.display = 'block';
//     frmFireResponse.style.display = 'none';
// }
// function seedetails(){
//     var firelog = document.getElementById('firelog');
//     firelog.style.display = 'block';
// }

//PROFILE CONFIG
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

function addLine(LineId) {
    const formIds = ['dashb', 'fireS', 'leadB', 'inV','prof'];
    
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
//   function showElement(elementId) {
//     const formIds = ['frmDashboard', 'frmFireResponse', 'frmLeaderboards', 'frmInventory','frmHtvolunteer', 'frmMainProfile', 'Setting', 'frmaboutus','editProfile','AddResponse','fireresponseform'];

//     formIds.forEach(id => {
//         const element = document.getElementById(id);
//         if (id === elementId) {
//             element.style.display = 'block';
//         } else {
//             element.style.display = 'none';
//         }
//     });
// }

// //DASHBOARD CONFIG
// function showDashboard() {
//     showElement('frmDashboard');
//     addLine('dashb');
// }
// function showFireRes() {
//     showElement('frmFireResponse');
//     addLine('fireS');
//     // const dashboard = document.getElementById('frmDashboard');
//     // dashboard.style.display = 'block';
// }
// function showInventory() {
//     showElement('frmInventory');
//     addLine('inV');
// }
// function showLeaderboards() {
//   showElement('frmLeaderboards');
//   addLine('leadB');
// }
function toggleSetting() {

    var profileForm = document.getElementById('Setting');
    
    if (profileForm.style.display === 'none' || profileForm.style.display === '') {
     
        profileForm.style.display = 'block';
    } else {
      
        profileForm.style.display = 'none';
    }
    addLine('prof');
}

//SETTING CONFIG
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
  

//test
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth' 
    });

    calendar.render();
});

//FOR RESPONSIVE

document.addEventListener('DOMContentLoaded', function () {
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