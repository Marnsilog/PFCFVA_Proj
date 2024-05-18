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
    const formIds = ['dashb', 'reg', 'att', 'ranks','inc','inV','prof'];
    
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
    const formIds = ['frmDashboard', 'frmRegister', 'frmAttendance','frmRanks','frmIncident', 'frmInventory','frmHtvolunteer', 'frmMainProfile', 'Setting', 'frmaboutus','editProfile'];

    formIds.forEach(id => {
        const element = document.getElementById(id);
        if (id === elementId) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

//DASHBOARD CONFIG
function showDashboard() {
    showElement('frmDashboard');
    addLine('dashb');
}
function showRegister(){
    showElement('frmRegister');
    addLine('reg');
}
function showAttendance(){
    showElement('frmAttendance');
    addLine('att');
}
function showRanks(){
    showElement('frmRanks');
    addLine('ranks');
}
function showIncident(){
    showElement('frmIncident');
    addLine('inc');
}
function showInventory() {
    showElement('frmInventory');
    addLine('inV');
}

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
    // showDashboard();
    // };

document.addEventListener('DOMContentLoaded', function() {
    animateProgressBar(70);
    animateProgressBar2(40);
    animateProgressBar3(60);
    animateProgressBar4(10);

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

  function animateProgressBar3(targetWidth) {
    const progressBar3 = document.getElementById('progress3');
    if (progressBar3) {
      progressBar3.style.width = targetWidth + '%';
    }
  }

  function animateProgressBar4(targetWidth) {
    const progress4 = document.getElementById('progress4');
    if (progress4) {
        progress4.style.width = targetWidth + '%';
    }
  }
  
  function inciform(){
    var incidentLog = document.getElementById('incidentLog');
    
    if (incidentLog.style.display === 'none' || incidentLog.style.display === '') {
     
        incidentLog.style.display = 'block';
    } else {
      
        incidentLog.style.display = 'none';
    }

  }

  function exitinc(){
    var incidentLog = document.getElementById('incidentLog');
    if (incidentLog.style.display === 'none' || incidentLog.style.display === '') {
     
        incidentLog.style.display = 'block';
    } else {
      
        incidentLog.style.display = 'none';
    }
  }

  function showICS(){
    var InciSys = document.getElementById('InciSys');
    var frmIncident = document.getElementById('frmIncident');
    frmIncident.style.display = 'none';
    InciSys.style.display = 'block';
  }
function icsBack(){
    var InciSys = document.getElementById('InciSys');
    var frmIncident = document.getElementById('frmIncident');
    frmIncident.style.display = 'block';
    InciSys.style.display = 'none';
}
  function rankOpt(){
    var rankhead1 = document.getElementById('rankhead1');
    var rankOpt1 = document.getElementById('rankOpt1');
    var buttonContainer = document.getElementById('buttonContainer');
    var currentDisplayStyle = window.getComputedStyle(rankOpt1).display;

    if (currentDisplayStyle === 'none') {
        buttonContainer.classList.add('border-2','border-black','rounded-lg');
        rankhead1.classList.add('border-b-[1px]','border-b-gray-300','rounded-b-none')
        rankhead1.classList.remove('shadow-lg','shadow-gray-400','border-2')
        rankOpt1.style.display = 'block';
    } else {
        buttonContainer.classList.remove('border-2','border-black','rounded-lg');
        rankhead1.classList.remove('border-b-[1px]','border-b-gray-300','rounded-b-none')
        rankhead1.classList.add('shadow-lg','shadow-gray-400','border-2')
        rankOpt1.style.display = 'none';
    }
   
  }