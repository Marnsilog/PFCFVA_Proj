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
    function toggleSetting() {

        var profileForm = document.getElementById('Setting');
        
        if (profileForm.style.display === 'none' || profileForm.style.display === '') {
         
            profileForm.style.display = 'block';
        } else {
          
            profileForm.style.display = 'none';
        }
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


document.addEventListener('DOMContentLoaded', function() {
    animateProgressBar(70);
    animateProgressBar2(40);

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

document.addEventListener('DOMContentLoaded', function () {
    fetch('/auth/volunteers')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            const container = document.getElementById('Container');
            if (!container) {
                return;
            }
            let tableHTML = `
                <div class="w-full h-full max-h-[37rem] overflow-y-auto rounded-lg  shadow-black shadow-lg">
                    <table id="myTable2" class="text-start   w-full px-4">
                        <thead class="font-Inter md:font-[100] text-[#5B5B5B] md:text-2xl md:mx-0 md:h-16">
                            <tr>
                                <th class="text-start pl-5">Volunteers</th>
                                <th class="text-center">Points</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm md:text-xl text-start font-Inter">
            `;

            // Loop through the data and create table rows dynamically
            data.forEach((volunteer, index) => {
                tableHTML += `
                    <tr class="h-7 border-t-2 border-b-[1px] hover:bg-gray-300 border-gray-500 md:h-16 cursor-pointer" onclick="showDutyDetails(${volunteer.id})">
                        <td class="pl-5 flex justify-normal space-x-3 pt-4">
                            <p class="text-2xl font-bold">${index + 1}.</p>
                            <p>${volunteer.name}</p>
                        </td>
                        <td class="text-center">${volunteer.points}</td>
                    </tr>
                `;
            });
            tableHTML += `
                        </tbody>
                    </table>
                </div>
            `;

            container.innerHTML = tableHTML;
        })
});

function showDutyDetails(volunteerId) {
    fetch(`/auth/volunteer/${volunteerId}`)
        .then(response => response.json())
        .then(volunteerDetails => {
            document.getElementById('dutyhoursdetail').style.display = 'block';

            document.querySelector('#detailName').textContent = volunteerDetails.name;
            document.querySelector('#detailID').textContent = volunteerDetails.id;
            document.querySelector('#dutyHours').textContent = volunteerDetails.dutyHours;
            document.querySelector('#fireResponse').textContent = volunteerDetails.fireResponsePoints;
            document.querySelector('#inventory').textContent = volunteerDetails.inventoryPoints;
            document.querySelector('#activity').textContent = volunteerDetails.activityPoints;
        })
}

function exitdtdetail() {
    document.getElementById('dutyhoursdetail').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('/auth/fireresponse')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            const container = document.getElementById('Container2');
            if (!container) {
                return;
            }

            // Build the table dynamically with the header and rows combined
            let tableHTML = `
                <div class="w-full h-full max-h-[37rem] overflow-y-auto rounded-lg shadow-black shadow-lg">
                    <table id="myTable3" class="text-start   w-full px-4">
                        <thead class="font-Inter md:font-[100] text-[#5B5B5B] md:text-2xl md:mx-0 md:h-16">
                            <tr>
                                <th class="text-start pl-5">Volunteers</th>
                                <th class="text-center">Fire Response</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm md:text-xl text-start font-Inter">
            `;

            // Loop through the data and create table rows dynamically
            data.forEach((volunteer, index) => {
                tableHTML += `
                    <tr class="h-7 border-t-2 border-b-[1px] hover:bg-gray-300 border-gray-500 md:h-16 cursor-pointer" onclick="showFireRe(${volunteer.id})">
                        <td class="pl-5 flex justify-normal space-x-3 pt-4">
                            <p class="text-2xl font-bold">${index + 1}.</p>
                            <p>${volunteer.name}</p>
                        </td>
                        <td class="text-center">${volunteer.points}</td>
                    </tr>
                `;
            });
            tableHTML += `
                        </tbody>
                    </table>
                </div>
            `;

            container.innerHTML = tableHTML;
        });
});

function showFireRe(volunteerId) {
    fetch(`/auth/fireresponse/${volunteerId}`)
        .then(response => response.json())
        .then(volunteerDetails => {
            document.getElementById('frdetail').style.display = 'block';

            document.querySelector('#detailName2').textContent = volunteerDetails.name;
            document.querySelector('#detailID2').textContent = volunteerDetails.id;
            document.querySelector('#dutyHours2').textContent = volunteerDetails.dutyHours;
            document.querySelector('#fireResponse2').textContent = volunteerDetails.fireResponsePoints;
            document.querySelector('#inventory2').textContent = volunteerDetails.inventoryPoints;
            document.querySelector('#activity2').textContent = volunteerDetails.activityPoints;
        })
}

function exitdtdetail2() {
    document.getElementById('frdetail').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    const editProfileForm = document.getElementById('editProfileForm');
    
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way

            const formData = {
                username: document.getElementById('HiddenUsername').value,
                lastName: document.getElementById('EditLastName').value,
                firstName: document.getElementById('EditFirstName').value,
                middleName: document.getElementById('EditMiddleName').value,
                emailAddress: document.getElementById('EditEmailAddress').value,
                contactNumber: document.getElementById('EditContactNumber').value,
                oldPassword: document.getElementById('EditOldPassword').value,
                newPassword: document.getElementById('EditNewPassword').value,
                civilStatus: document.getElementById('EditCivilStatus').value,
                nationality: document.getElementById('EditNationality').value,
                bloodType: document.getElementById('EditBloodType').value,
                birthday: document.getElementById('EditBirthday').value,
                gender: document.getElementById('EditGender').value,
                currentAddress: document.getElementById('EditCurrentAddress').value,
                emergencyContactPerson: document.getElementById('EditEmergencyContactPerson').value,
                emergencyContactNumber: document.getElementById('EditEmergencyContactNumber').value,
                highestEducationalAttainment: document.getElementById('EditHighestEducationalAttainment').value,
                nameOfCompany: document.getElementById('EditNameOfCompany').value,
                yearsInService: document.getElementById('EditYearsInService').value,
                skillsTraining: document.getElementById('EditSkillsTraining').value,
                otherAffiliation: document.getElementById('EditOtherAffiliation').value,
            };

            fetch('/auth/edit-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Ensure formData is an object containing the updated user information
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.text();
            })
            .then(message => {
                alert(message); 
                window.location.href = 'volunteer_main_profile';
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
        });
    }
});

