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
    const formIds = ['dashb', 'reg', 'att','vol','ranks','inc','inV','prof'];
    
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
    const formIds = ['frmDashboard', 'frmRegister', 'frmAttendance','frmRanks','frmIncident', 'frmInventory','frmHtvolunteer','SummaryVolunteer', 'frmMainProfile', 'Setting', 'frmaboutus','editProfile'];

    formIds.forEach(id => {
        const element = document.getElementById(id);
        if (id === elementId) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

//DASHBOARD CONFIG ------------------------------------------------------->
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
function showVolunteer(){
    showElement('SummaryVolunteer');
    addLine('vol');
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
  
  //FORM INCIDENT ----------------------------------->
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
        
    // FORM VOLUNTEER ----------------------------------------------------->
    function summarySorting(){
        var summarySort = document.getElementById('summarySort');
        if (summarySort.style.display === 'none' || incidentLog.style.display === '') {
         
            summarySort.style.display = 'block';
        } else {
          
            summarySort.style.display = 'none';
        }
      }
      

      function cancelSort(){
        var summarySort = document.getElementById('summarySort');
        if (summarySort.style.display === 'none' || incidentLog.style.display === '') {
         
            summarySort.style.display = 'block';
        } else {
          
            summarySort.style.display = 'none';
        }
      }
    //FOR RANKS ----------------------------------------------------------->
  
    function  cancelRank(){
        var addRanks = document.getElementById('addRanks');
        if (addRanks.style.display === 'none') {
     
            addRanks.style.display = 'block';
        } else {
          
            addRanks.style.display = 'none';
        }
    }
    function addRankDetail(){
        var addRanks = document.getElementById('addRanks');
        if (addRanks.style.display === 'none') {
     
            addRanks.style.display = 'block';
        } else {
          
            addRanks.style.display = 'none';
        }
    }
    function addRanking() {
        var container = document.getElementById('container');
        var newDiv = document.createElement('div');
        var newId = 'buttonContainer' + (container.children.length);
        var addRanks = document.getElementById('addRanks');
        
        newDiv.classList.add('w-[280px]', 'mx-2', 'my-5');
        newDiv.id = newId;
        newDiv.innerHTML = `
            <div class="border-2 border-black rounded-lg w-full pr-5" id="rankTest${container.children.length}">
            <div class="flex justify-start w-[280px] h-[45px]" id="rankhead${container.children.length}">
                <div class="w-[60%] text-center font-[600] text-lg border-gray-400 pt-[6px]">
                    <p>Aspirants</p>
                </div>
                <button class="h-full w-[10%]" onclick="editRank('${newId}')"><svg  class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg> </button>
                <button class="h-full w-[10%] mx-2" onclick="delRank('${newId}"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                <button class="border-l-[1px] border-gray-200  text-center h-full w-[10%]" onclick="rankOpt('${newId}','rankTest${container.children.length}', 'rankhead${container.children.length}', 'rankOpt${container.children.length}')">
                    <svg class="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/>
                    </svg>
                </button>
            </div>
            <div class="bg-white w-full font-Inter hidden" id="rankOpt${container.children.length}">
                <div class="my-2">
                    <p class="mt-2 text-md font-semibold">Requirements:</p>
                    <p class="mt-2 text-center">100 duty hours</p>
                </div>
            </div>
            </div>
        `;
        
        container.appendChild(newDiv);
        addRanks.style.display = 'none';
        // Move the button to the end of the container
        var addButton = container.querySelector('.w-[280px] .bg-white .text-center');
        container.appendChild(addButton.parentElement.parentElement);
       
    }
    function rankOpt(buttonContainerId,rankTest, rankheadId, rankOptId) {
        var rankOpt = document.getElementById(rankOptId);
        var rankhead = document.getElementById(rankheadId);
        var ranktest = document.getElementById(rankTest);
        rankOpt.classList.toggle('hidden');
     
    
    }
 
    var loadFile = function(event) {
        var input = event.target;
        var file = input.files[0];
        var type = file.type;
    
        var output = document.getElementById('preview_img');
        output.src = URL.createObjectURL(file);
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }
    };
    
    
    

    //for calendar
    document.addEventListener('DOMContentLoaded', (event) => {
        const dateOfBirthInput = document.getElementById('dateOfBirth');
        const today = new Date().toISOString().split('T')[0];
        dateOfBirthInput.setAttribute('max', today);
    });

    //FOR RESPONSIVE ---------------------------------->
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

