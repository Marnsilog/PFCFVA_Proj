    
    
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
    dutyH.classList.add('text-bla   ck');
    //fetchVolunteers();
    handledhSearch(); 
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
    fetchFireResponse();
    handlefrSearch();
    }
    function toggleNotif(){
        var notification = document.getElementById('notification');
        var profileForm = document.getElementById('Setting');
        var mobilemenu = document.getElementById('mobile-menu');
        
        if (notification.style.display === 'none' || notification.style.display === '') {
            notification.style.display = 'block';
            mobilemenu.style.display = 'none';
            profileForm.style.display = 'none';
            loadNotifications();
        } else {
          
            notification.style.display = 'none';
        }
    }

    function toggleSetting() {

        var profileForm = document.getElementById('Setting');
        var notification = document.getElementById('notification');
        if (profileForm.style.display === 'none' || profileForm.style.display === '') {
            notification.style.display = 'none';
            profileForm.style.display = 'block';
        } else {
          
            profileForm.style.display = 'none';
        }
    }
    
    function loadNotifications() {
        fetch('/auth/notification')
            .then(response => response.json())
            .then(notifications => {
                const container = document.getElementById('notificationContainer');
                container.innerHTML = '';  // Clear existing content
    
                if (notifications.length === 0) {
                    container.innerHTML = '<p>No notifications available.</p>';
                    return;
                }
    
                notifications.forEach(notification => {
                    const fontWeight = notification.status === 'read' ? '' : 'font-semibold';
                    let message = notification.detail;
                    let name = notification.created_by || ''; 
    
                    // Notification message mapping
                    switch (notification.detail) {

                        case 'New account created':
                            message = 'WELCOME TO PFCFVA WEBSITE! Mabuhay!';
                            break;
                        case 'added activity Points':
                            message = 'Congratulations! You Earned 1 activity point';
                            name =  'PFCFVA System';
                            break;
                        case 'earned fire response':
                            message = 'Congratulations! You Earned 1 Fire Response point';
                            name =  'PFCFVA System';
                            break;
                    }
    
                    // Format time to HH:MM
                    const [hours, minutes] = notification.created_time.split(':');
                    const formattedTime = `${hours}:${minutes}`;
    
                    // Format date from 'MM/DD/YYYY' to 'DD/MM/YYYY'
                    const [month, day, year] = notification.created_date.split('/');
                    const formattedDate = `${day}/${month}/${year}`;
    
                    // Generate the notification div with dynamic content
                    const notificationDiv = `
                        <div class="h-[20%] max-h-[20%] w-full border-b border-black font-Inter px-1 py-1 cursor-pointer hover:bg-gray-300" 
                             onclick="markAsRead('${notification.notification_id}', '${notification.detail}')">
                            <div class="flex justify-between w-full overflow-hidden">
                                <div class="w-full pr-2">
                                    <p class="text-base ${fontWeight} w-full leading-tight overflow-hidden">${message}</p>
                                    <p class="text-sm overflow-hidden">${name}</p>
                                </div>
                                <div class="w-[25%] md:w-[20%] md:pr-0 pr-2">
                                    <p class="text-sm">${formattedTime}</p>
                                    <p class="text-sm">${formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', notificationDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                const container = document.getElementById('notificationContainer');
                container.innerHTML = '<p>Error loading notifications. Please try again later.</p>';
            });
    }
    
    function markAsRead(notificationId, detail) {
        fetch(`/auth/markNotificationRead/${notificationId}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Notification marked as read');
            } else {
                console.error('Failed to mark notification as read');
            }
    
            let href;
            switch (detail) {
                case 'New account created':
                    href = '/supervisor_dashboard';
                    break;
                case 'added activity Points':
                    href = '/supervisor_activity';
                    break;
                case 'earned fire response':
                    href = '/supervisor_ics_logs';
                    break;
                default:
                    href = '/supervisor_dashboard'; 
                
            }
    
            // Redirect the user if href is set
            if (href) {
                window.location.href = href; // Navigate to the specified page
            }
        })
        .catch(error => {
            console.error('Error marking notification as read:', error);
        });
    }
    


// FIRE RESPONSE ICS
// function addthis(){
//     var addPer = document.getElementById('addPer');
//     addPer.style.display = 'block';
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
  

    //FOR RESPONSIVE ---------------------------------->
    document.addEventListener('DOMContentLoaded', function () {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const notification = document.getElementById('notification');
    

        menuToggle.addEventListener('click', function () {
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            } else {
                mobileMenu.style.display = 'block';
                notification.style.display = 'none';
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
//FOR LOADING CONFIGURATION
window.addEventListener('load', function() {
    if (window.location.pathname === '/supervisor_leaderboards') {
        handledhSearch();
        fetchVolunteers();
    }else if (window.location.pathname === '/supervisor_inventory') {
        loadsVehicleAssignments();
        fetchAndDisplayInventory(); 
        document.getElementById('supervisorSearch').addEventListener('input', function() {
            const searchQuery = this.value.trim();
            fetchAndDisplayInventorySearch(searchQuery); 
        });

        document.getElementById('vehStatus').addEventListener('change', function() {
            const selectedStatus = this.value;
            console.log("Dropdown changed: " + selectedStatus);  // Add this to debug
            fetchAndDisplayInventorySearch(selectedStatus);
        });
    }else if(window.location.pathname === '/volunteer_leaderboards'){
        handledhSearch();
        fetchVolunteers();
    }else if(window.location.pathname === '/supervisor_inventory_report'){
        document.getElementById('Search_form_inv').addEventListener('input', function() {
            const searchQuery = this.value.trim();
            fetchInventory_form(searchQuery); 
        });
        fetchInventory_form();
    }
});
//LEADERBOARDS CLIENT
function handledhSearch() {
    const searchInput = document.getElementById('txtleaderboardsearch');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        fetchVolunteers(searchTerm);
    });
}
function handlefrSearch() {
    const searchInput = document.getElementById('txtleaderboardsearch');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        fetchFireResponse(searchTerm);
    });
}
function fetchVolunteers(searchTerm = '') {
    const url = searchTerm ? `/auth/volunteers?search=${encodeURIComponent(searchTerm)}` : '/auth/volunteers';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('Container');

            // Build the table HTML structure
            let tableHTML = `
                <div class="w-full h-full max-h-[28rem] md:max-h-[37rem] overflow-y-auto rounded-lg shadow-black shadow-lg">
                    <table id="myTable2" class="text-start w-full px-4">
                        <thead class="font-Inter md:font-[100] text-[#5B5B5B] md:text-2xl md:mx-0 md:h-16 sticky top-0 bg-white">
                            <tr>
                                <th class="text-start pl-5">Volunteers</th>
                                <th class="text-center">Hours</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm md:text-xl text-start font-Inter">
            `;

            // Loop through the data and create table rows
            data.forEach((volunteer, index) => {
                // Set the color red for the first 5 volunteers
                const textColorClass = index < 5 ? 'text-red-500' : '';

                tableHTML += `
                    <tr class="h-7 border-t-2 border-b-[1px] hover:bg-gray-300 border-gray-500 md:h-16 cursor-pointer" onclick="showDutyDetails(${volunteer.id})">
                        <td class="pl-5 flex justify-normal space-x-3 pt-4">
                            <p class="text-2xl font-bold ${textColorClass}">${index + 1}.</p>
                            <p>${volunteer.name}</p>
                        </td>
                        <td class="text-center">${volunteer.points||'0'}</td>
                    </tr>
                `;
            });

            tableHTML += `
                        </tbody>
                    </table>
                </div>
            `;

            // Inject the generated table HTML into the container
            container.innerHTML = tableHTML;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showDutyDetails(volunteerId) {
    fetch(`/auth/volunteer/${volunteerId}`)
        .then(response => response.json())
        .then(volunteerDetails => {
            document.getElementById('dutyhoursdetail').style.display = 'block';

            document.querySelector('#detailName').textContent = volunteerDetails.name;
            document.querySelector('#detailID').textContent = volunteerDetails.callSign;
            document.querySelector('#dutyHours').textContent = volunteerDetails.dutyHours;
            document.querySelector('#fireResponse').textContent = volunteerDetails.fireResponsePoints;
            document.querySelector('#inventory').textContent = volunteerDetails.inventoryPoints;
            document.querySelector('#activity').textContent = volunteerDetails.activityPoints;

            // Set the source of the detail image
            const detailImage = document.getElementById('detailImage');
            detailImage.src = volunteerDetails.image ? `${volunteerDetails.image}` : 'img/user.png';
        })
        .catch(error => console.error('Error fetching volunteer details:', error));
}
function exitdtdetail() {
    document.getElementById('dutyhoursdetail').style.display = 'none';
}
function fetchFireResponse(searchTerm = '') {
    const url = searchTerm ? `/auth/fireresponse?search=${encodeURIComponent(searchTerm)}` : '/auth/fireresponse';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('Container2');

            // Build the table HTML structure
            let tableHTML = `
                <div class="w-full h-full max-h-[28rem] md:max-h-[37rem] overflow-y-auto rounded-lg shadow-black shadow-lg">
                    <table id="myTable3" class="text-start w-full px-4">
                        <thead class="font-Inter md:font-[100] text-[#5B5B5B] md:text-2xl md:mx-0 md:h-16 sticky top-0 bg-white"">
                            <tr>
                                <th class="text-start pl-5">Volunteers</th>
                                <th class="text-center">Fire Response</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm md:text-xl text-start font-Inter">
            `;

            // Loop through the data and create table rows dynamically
            data.forEach((volunteer, index) => {
                const textColorClass = index < 5 ? 'text-red-500' : '';
                tableHTML += `
                    <tr class="h-7 border-t-2 border-b-[1px] hover:bg-gray-300 border-gray-500 md:h-16 cursor-pointer" onclick="showFireRe(${volunteer.id})">
                        <td class="pl-5 flex justify-normal space-x-3 pt-4">
                            <p class="text-2xl font-bold ${textColorClass}">${index + 1}.</p>
                            <p>${volunteer.name}</p>
                        </td>
                        <td class="text-center">${volunteer.points||'0'}</td>
                    </tr>
                `;
            });
            tableHTML += `
                        </tbody>
                    </table>
                </div>
            `;

            // Inject the generated table HTML into the container
            container.innerHTML = tableHTML;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showFireRe(volunteerId) {
    fetch(`/auth/fireresponse/${volunteerId}`)
        .then(response => response.json())
        .then(volunteerDetails => {
            document.getElementById('frdetail').style.display = 'block';

            document.querySelector('#detailName2').textContent = volunteerDetails.name;
            document.querySelector('#detailID2').textContent = volunteerDetails.callSign;
            document.querySelector('#dutyHours2').textContent = volunteerDetails.dutyHours;
            document.querySelector('#fireResponse2').textContent = volunteerDetails.fireResponsePoints;
            document.querySelector('#inventory2').textContent = volunteerDetails.inventoryPoints;
            document.querySelector('#activity2').textContent = volunteerDetails.activityPoints;

             // Set the source of the detail image
             const detailImage = document.getElementById('detailImage2');
             detailImage.src = volunteerDetails.image ? `${volunteerDetails.image}` : 'img/user.png';
        })
        .catch(error => console.error('Error fetching details:', error));
}

function exitdtdetail2() {
    document.getElementById('frdetail').style.display = 'none';
}

function loadsVehicleAssignments() {
    fetch('/getVehicleAssignments')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('sortVehicleAssignment');
            selectElement.innerHTML = '<option value="">All Vehicles</option>'; 

            if (data && data.length > 0) {
                data.forEach(item => {
                    selectElement.innerHTML += `<option value="${item.vehicleName}">${item.vehicleName}</option>`;
                });
            } else {
                console.error('No vehicle assignments found');
            }

            // Add event listener for sorting
            selectElement.addEventListener('change', () => {
                const selectedVehicle = selectElement.value; // Get selected value
                fetchAndDisplayInventory(selectedVehicle); // Pass selected vehicle to the function
            });
        })
        .catch(error => console.error('Error loading vehicle assignments:', error));
}
// VEHICLE ASSIGNMENT LOADING
async function loadVehicleAssignment(itemId, selectElement, assignedVehicle) {
    try {
        const response = await fetch('/getVehicleAssignments');
        const vehicles = await response.json();
        
        
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
//DROWNDOWN 
async function fetchAndDisplayInventory(selectedVehicle = '') {
    
    try {
        const response = await fetch(`/auth/inventory-supervisor?vehicleAssignment=${selectedVehicle}`);

       // const response = await fetch('/auth/inventory-supervisor?vehicleAssignment=${selectedVehicle}');
        const inventoryItems = await response.json();
        
        const container = document.getElementById('inventoryContainer');
        container.innerHTML = ''; 

        inventoryItems.forEach(async (item) => {
            const inventoryDiv = document.createElement('div');
            inventoryDiv.classList.add('w-full', 'h-full', 'space-y-2','md:space-y-5', 'inventory-item', 'p-0', 'md:p-0');
            inventoryDiv.setAttribute('data-item-id', item.itemId); 
            inventoryDiv.innerHTML = `
                <div class="md:w-[95%] w-full rounded-lg h-16 md:h-20 bg-[#DDDDDD] flex justify-between md:mx-6">
                    <div class="w-full">
                        <img src="${item.itemImage}" class="h-12 w-12 md:h-14 md:w-14 rounded-lg md:mt-4 mt-1 ml-2 object-cover md:object-fill" alt="">
                       
                    </div>
                     <div class="font-inter mt-4 space-y-1 md:space-y-2 w-full">
                            <p class="text-sm md:text-2xl font-semibold md:font-bold md:0 mx-3 break-all">${item.itemName}</p>
                        </div>
                   <div class="mt-2 pr-4 md:pr-10 w-full">
                         <p class="text-sm">Transfer to</p>
                         <select class="h-7 pr-14 rounded-lg text-start md:w-auto w-18" id="addvehicleAssignment-${item.itemId}"></select>
                     </div>
                </div>
            `;
            container.appendChild(inventoryDiv);
        
            const selectElement = document.getElementById(`addvehicleAssignment-${item.itemId}`);
            await loadVehicleAssignment(item.itemId, selectElement, item.vehicleAssignment);
        });

        
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
}
//INVENTORY SEARCH
async function fetchAndDisplayInventorySearch(search = '') {
    var sortVehicleAssignment = document.getElementById("sortVehicleAssignment").value;
    var vehStatus = document.getElementById("vehStatus").value;
    //console.log(vehStatus);
    const queryString = `/auth/inventory-supervisor-search?search=${encodeURIComponent(search)}&vehicleAssignment=${encodeURIComponent(sortVehicleAssignment)}&vehicleStat=${encodeURIComponent(vehStatus)}`;
    
    try {
        const response = await fetch(queryString);
        const inventoryItems = await response.json();
        
        const container = document.getElementById('inventoryContainer');
        container.innerHTML = ''; // Clear previous items

        inventoryItems.forEach(async (item) => {
            const inventoryDiv = document.createElement('div');
            inventoryDiv.classList.add('w-full', 'h-full', 'space-y-2', 'md:space-y-5', 'inventory-item', 'p-0', 'md:p-0');
            inventoryDiv.setAttribute('data-item-id', item.itemId);

            inventoryDiv.innerHTML = `
                <div class="md:w-[95%] w-full rounded-lg h-16 md:h-20 bg-[#DDDDDD] flex justify-between md:mx-6">
                    <div class="w-full">
                        <img src="${item.itemImage}" class="h-12 w-12 md:h-14 md:w-14 rounded-lg md:mt-4 mt-1 ml-2 object-cover md:object-fill" alt="">
                    </div>
                    <div class="font-inter mt-4 space-y-1 md:space-y-2 w-full">
                        <p class="text-sm md:text-2xl font-semibold md:font-bold md:0 mx-3 break-all">${item.itemName}</p>
                    </div>
                    <div class="mt-2 pr-4 md:pr-10 w-full">
                        <p class="text-sm">Transfer to</p>
                        <select class="h-7 pr-14 rounded-lg text-start md:w-auto w-18" id="addvehicleAssignment-${item.itemId}"></select>
                    </div>
                </div>
            `;
            container.appendChild(inventoryDiv);
            
            // Load vehicle assignment options
            const selectElement = document.getElementById(`addvehicleAssignment-${item.itemId}`);
            await loadVehicleAssignment(item.itemId, selectElement, item.vehicleAssignment);
        });
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
}

// async function fetchAndDisplayInventorySearch(search = '') {
//     var vehStatus = document.getElementById("vehStatus").value;
//     try {
//         const response = await fetch(`/auth/inventory-supervisor-search?search=${search}?vehicleAssignment=${vehStatus}`);
//         const inventoryItems = await response.json();
        
//         const container = document.getElementById('inventoryContainer');
//         container.innerHTML = ''; 

//         inventoryItems.forEach(async (item) => {
//             const inventoryDiv = document.createElement('div');
//             inventoryDiv.classList.add('w-full', 'h-full', 'space-y-2','md:space-y-5', 'inventory-item', 'p-0', 'md:p-0');
//             inventoryDiv.setAttribute('data-item-id', item.itemId); 
//             inventoryDiv.innerHTML = `
//                 <div class="md:w-[95%] w-full rounded-lg h-16 md:h-20 bg-[#DDDDDD] flex justify-between md:mx-6">
//                     <div class="w-full">
//                         <img src="${item.itemImage}" class="h-12 w-12 md:h-14 md:w-14 rounded-lg md:mt-4 mt-1 ml-2 object-cover md:object-fill" alt="">
                       
//                     </div>
//                      <div class="font-inter mt-4 space-y-1 md:space-y-2 w-full">
//                             <p class="text-sm md:text-2xl font-semibold md:font-bold md:0 mx-3 break-all">${item.itemName}</p>
//                         </div>
//                    <div class="mt-2 pr-4 md:pr-10 w-full">
//                          <p class="text-sm">Transfer to</p>
//                          <select class="h-7 pr-14 rounded-lg text-start md:w-auto w-18" id="addvehicleAssignment-${item.itemId}"></select>
//                      </div>
//                 </div>
//             `;
//             container.appendChild(inventoryDiv);
        
//             const selectElement = document.getElementById(`addvehicleAssignment-${item.itemId}`);
//             await loadVehicleAssignment(item.itemId, selectElement, item.vehicleAssignment);
//         });

//     } catch (error) {
//         console.error('Error fetching inventory data:', error);
//     }
// }

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');

    if (saveButton) {
        saveButton.addEventListener('click', async () => {
            const inventoryItems = [];
            const inventoryElements = document.querySelectorAll('#inventoryContainer > div.inventory-item');

            inventoryElements.forEach(itemElement => {
                const itemID = itemElement.getAttribute('data-item-id');
                const selectElement = itemElement.querySelector('select');
                const vehicleAssignment = selectElement.value;
                const vehAss = document.getElementById('sortVehicleAssignment')?.value || ''; // Ensure vehicleAssignment exists

                if (!vehicleAssignment) {
                    console.warn(`No vehicle assignment selected for itemID: ${itemID}`);
                } else {
                    inventoryItems.push({ itemID, vehicleAssignment, vehAss });
                }
            });
            try {
                const response = await fetch('/auth/inventory-supervisor/log', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inventoryItems),
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    window.location.href = result.redirect;
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error saving inventory data:', error);
                alert('An error occurred while saving the data.');
            }
        });
    } 
});

//INVENTORY FORM
function fetchInventory_form(searchTerm = '') {  
    const url = new URL('/auth/inventory2', window.location.origin);
    url.searchParams.append('search', searchTerm); 

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched inventory data:', data);
            const tbody = document.querySelector('#myTable tbody');
            tbody.innerHTML = ''; 

            if (data.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="4">No results found</td>';
                tbody.appendChild(row);
            } else {
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.classList.add('border-t-2', 'border-b-2', 'h-8', 'border-black', 'md:h-16');
                   // console.log(item.checked_date);

                    row.innerHTML = `
                        <td>${item.checked_date || 'N/A'}</td>
                        <td>${item.vehicle || 'N/A'}</td>
                        <td><a class="underline underline-offset-1 md:text-xl" href="#"onclick="seeinventory('${item.checked_date}')"">See details</a></td>
                    `;

                    tbody.appendChild(row);
                });
            }
        })
        .catch(err => console.error('Error fetching inventory data:', err));
}


//
function seeinventory(logID) {
    console.log(`Fetching details for itemID: ${logID}`); // Debug log
    fetch(`/auth/inventory2/detail/${logID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched inventory details:', data); // Debug log for fetched details
            const inventoryDetailDiv = document.getElementById('inventorydetail');
            const tbody = inventoryDetailDiv.querySelector('tbody');
            tbody.innerHTML = ''; 

            if (!data || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3">No details available</td></tr>'; // Handle no data case
                inventoryDetailDiv.style.display = 'block';
                return;
            }

            data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('text-center', 'h-10');

                row.innerHTML = `
                    <td>${item.itemName || 'N/A'}</td>
                    <td>${item.changeFrom || 'N/A'}</td>
                     <td>${item.changeTo || 'N/A'}</td>
                `;

                tbody.appendChild(row);
            });
            inventoryDetailDiv.style.display = 'block';
        })
        .catch(err => console.error('Error fetching inventory details:', err));
}

function exitinventorydetail() {
    const inventoryDetailDiv = document.getElementById('inventorydetail');
    inventoryDetailDiv.style.display = 'none';
}






