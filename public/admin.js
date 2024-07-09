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

  function passEye() {
    var x = document.getElementById("passWord");
    var seen = document.getElementById('seen');
    var unseen = document.getElementById('unseen');
    if (x.type === "password") {
        x.type = "text";
        unseen.classList.remove('hidden');
        seen.classList.add('hidden');

    } else {
        x.type = "password";
        seen.classList.remove('hidden');
        unseen.classList.add('hidden');
       
    }
    }      
    function passEye2() {
        var x = document.getElementById("confirmPassword");
        var seen = document.getElementById('seen2');
        var unseen = document.getElementById('unseen2');
        if (x.type === "password") {
            x.type = "text";
            unseen.classList.remove('hidden');
            seen.classList.add('hidden');
    
        } else {
            x.type = "password";
            seen.classList.remove('hidden');
            unseen.classList.add('hidden');
           
        }
        }        
      
    //FOR RANKS
    function addDiv() {
        var container = document.getElementById('container');
        var newDiv = document.createElement('div');
        var newId = 'buttonContainer' + (container.children.length);
    
        newDiv.classList.add('w-[280px]', 'mx-5', 'my-5');
        newDiv.id = newId;
        newDiv.innerHTML = `
            <div class="flex justify-start w-[280px] h-[45px] bg-white border-2 border-black rounded-lg shadow-lg shadow-gray-400" id="rankhead${container.children.length}">
                <div class="w-[85%] text-center font-[600] text-lg border-r-2 border-gray-400 pt-[6px]">
                    <p>Aspirants</p>
                </div>
                <button class="text-center h-full w-[15%]" onclick="rankOpt('${newId}', 'rankhead${container.children.length}', 'rankOpt${container.children.length}')">
                    <svg class="w-5 h-5 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/>
                    </svg>
                </button>
            </div>
            <div class="bg-white w-full font-Inter hidden" id="rankOpt${container.children.length}">
                <div class="my-5">
                    <p class="mt-2 text-md font-semibold">Requirements:</p>
                    <p class="mt-2 text-center">100 duty hours</p>
                </div>
            </div>
        `;
    
        container.appendChild(newDiv);
    
        // Move the button to the end of the container
        var addButton = container.querySelector('.w-[280px] .bg-white .text-center');
        container.appendChild(addButton.parentElement.parentElement);
    }
    
    function rankOpt(buttonContainerId, rankheadId, rankOptId) {
        var rankOpt = document.getElementById(rankOptId);
        rankOpt.classList.toggle('hidden');
    }
    
    

    //for calendar
    document.addEventListener('DOMContentLoaded', (event) => {
        const dateOfBirthInput = document.getElementById('dateOfBirth');
        const today = new Date().toISOString().split('T')[0];
        dateOfBirthInput.setAttribute('max', today);
    });

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

