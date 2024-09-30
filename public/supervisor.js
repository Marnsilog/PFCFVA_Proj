    
    
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



document.addEventListener('DOMContentLoaded', function() {

    const circles = document.querySelectorAll('.colorCircle');
    circles.forEach(circle => {
        circle.addEventListener('click', function () {
            circle.classList.toggle('bg-red-500');
            circle.classList.toggle('bg-green-500');
        });
    });
});
  

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

document.addEventListener('DOMContentLoaded', function () {
    fetch('/auth/volunteers')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            const container = document.getElementById('Container');

            // Build the table dynamically with the header and rows combined
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
        .catch(error => console.error('Error fetching data:', error));
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
        .catch(error => console.error('Error fetching details:', error));
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
        })
        .catch(error => console.error('Error fetching data:', error));
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
        .catch(error => console.error('Error fetching details:', error));
}

function exitdtdetail2() {
    document.getElementById('frdetail').style.display = 'none';
}

async function loadVehicleAssignments(itemId, selectElement, assignedVehicle) {
    try {
        const response = await fetch('/getVehicleAssignments');
        const vehicles = await response.json();
        
        selectElement.innerHTML = '<option value="">All Vehicles</option>';
        
        if (vehicles && vehicles.length > 0) {
            vehicles.forEach(vehicle => {
                const isSelected = vehicle.vehicleName === assignedVehicle ? 'selected' : '';
                selectElement.innerHTML += `<option value="${vehicle.vehicleName}" ${isSelected}>${vehicle.vehicleName}</option>`;
            });
        } else {
            console.error('No vehicle assignments found');
        }
    } catch (error) {
        console.error('Error loading vehicle assignments:', error);
    }
}
async function fetchAndDisplayInventory() {
    try {
        const response = await fetch('/auth/inventory-supervisor');
        const inventoryItems = await response.json();
        
        const container = document.getElementById('inventoryContainer');
        container.innerHTML = ''; 

        inventoryItems.forEach(async (item) => {
            const inventoryDiv = document.createElement('div');
            inventoryDiv.classList.add('max-w-[70rem]', 'w-full', 'h-full', 'space-y-5');

            // Build the HTML content dynamically using template literals
            inventoryDiv.innerHTML = `
                <div class="w-full rounded-lg h-36 bg-[#DDDDDD] flex justify-between px-6">
                    <div class="flex justify-normal space-x-6">
                        <img src="${item.itemImage}" class="h-28 w-40 rounded-lg mt-4 ml-2" alt="">
                        <div class="Font-Inter mt-6 space-y-2">
                            <p class="text-3xl font-bold">${item.itemName}</p>
                        </div>
                    </div>
                    <div class="mt-5">
                        <p>Transfer to</p>
                        <select class="h-10 pr-16 rounded-lg text-start" id="addvehicleAssignment-${item.itemId}"></select>
                    </div>
                </div>
            `;
            container.appendChild(inventoryDiv);
            const selectElement = document.getElementById(`addvehicleAssignment-${item.itemId}`);
            await loadVehicleAssignments(item.itemId, selectElement, item.vehicleAssignment);
        });
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
}

// Fetch and display the inventory when the page loads
window.onload = fetchAndDisplayInventory;
