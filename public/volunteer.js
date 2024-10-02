

//IMPORTANT
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



document.addEventListener('DOMContentLoaded', function() {

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

//Leaderboards

document.addEventListener('DOMContentLoaded', function () {
    fetch('/auth/volunteers')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            const container = document.getElementById('dhContainer');
            if (!container) {
                return;
            }
            let tableHTML = `
                <div class="w-full h-full max-h-[37rem] min-h-[37rem] overflow-y-auto rounded-lg  shadow-black shadow-lg">
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

// document.addEventListener("DOMContentLoaded", function () {
//     const editProfileForm = document.getElementById('editProfileForm');

//     if (editProfileForm) {
//         editProfileForm.addEventListener('submit', function (event) {
//             event.preventDefault(); 
//             const formData = new FormData(editProfileForm); 

//             fetch('/auth/edit-profile', {
//                 method: 'POST',
//                 body: formData, // Send FormData directly
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     return response.text().then(text => { throw new Error(text); });
//                 }
//                 return response.text();
//             })
//             .then(message => {
//                 alert(message); 
//                 window.location.href = 'volunteer_main_profile';
//             })
//             .catch(error => {
//                 alert('Error: ' + error.message);
//             });
//         });
//     }
// });


//INVENTORY
//VOLUNTEER INV
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

function fetchAndDisplayInventory(vehicleName) {
    let url = '/auth/inventory'; 

    if (vehicleName) {
        url += `?sortVehicle=${encodeURIComponent(vehicleName)}`; 
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#myTable2 tbody');
            tbody.innerHTML = ''; 

            data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('border-t-[1px]', 'border-b-[1px]', 'border-gray-500', 'md:h-14');
                row.dataset.itemId = item.id;

                row.innerHTML = `
                    <td>
                        <div class="justify-center flex m-2">
                            <img src="${item.itemImage}" class="w-14 h-14 object-fill" data-item-id="${item.id}">
                        </div>
                    </td>
                    <td><p class="text-center">${item.name}</p></td>
                    <td class="flex justify-center pr-5 h-14 pt-5">
                       <select class="border-[1px] border-black text-lg w-32" onchange="updateStatus(this)">
                            <option value="" disabled ${!item.Status ? 'selected' : ''}></option>
                            <option value="damaged" ${item.Status?.toLowerCase() === 'damaged' ? 'selected' : ''}>Damaged</option>
                            <option value="missing" ${item.Status?.toLowerCase() === 'missing' ? 'selected' : ''}>Missing</option>
                            <option value="good" ${item.Status?.toLowerCase() === 'good' ? 'selected' : ''}>Good</option>
                        </select>
                    </td>
                    <td>
                        <div class="flex justify-center pr-5">
                            <textarea class="text-sm min-h-[2rem] max-h-[3rem] min-w-[22rem] border-[1px] border-black focus:outline-none px-3 bg-white"></textarea>
                        </div>
                    </td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(err => console.error('Error fetching inventory data:', err));
}
window.onload = () => {
    loadsVehicleAssignments();
    fetchAndDisplayInventory(); 
};

function cancelInventory() {
    console.log('Cancel clicked');
}
//INVENTORYLOG
function submitInventory() {
    const tbody = document.querySelector('#myTable2 tbody');
    const items = [];
    Array.from(tbody.children).forEach(row => {
        const itemId = row.dataset.itemId;
        const statusSelect = row.querySelector('select');
        const remarksTextarea = row.querySelector('textarea');
        
        if (itemId && statusSelect.value) {
            items.push({
                itemID: itemId,
                status: statusSelect.value,
                remarks: remarksTextarea.value,
            });
        }
    });
    
    fetch('/auth/inventory/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.redirect) {
            // Redirect to /volunteer_form_inv
            window.location.href = data.redirect; 
        }
    })
    .catch(error => {
        console.error('Error submitting inventory:', error);
        alert('Failed to submit inventory. Check console for details.');
    });
}

// Function to fetch inventory data and populate the table
async function fetchInventoryData() {
    try {
        const response = await fetch('/inventory'); // Adjust the URL if needed
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const inventoryData = await response.json();
        populateTable(inventoryData);
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/auth/inventory2') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched inventory data:', data); // Debug log for fetched data
            const tbody = document.querySelector('#myTable tbody');
            tbody.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('border-t-2', 'border-b-2', 'h-8', 'border-black', 'md:h-16');

                row.innerHTML = `
                    <td>${item.checked_date || 'N/A'}</td>
                    <td>${item.checked_time || 'N/A'}</td>
                    <td>${item.vehicle || 'N/A'}</td>
                    
                    <td><a class="underline underline-offset-1 md:text-xl" href="#" onclick="seeinventory(${item.itemID})">See details</a></td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(err => console.error('Error fetching inventory data:', err));
});

function seeinventory(itemID) {
    console.log(`Fetching details for itemID: ${itemID}`); // Debug log
    fetch(`/auth/inventory2/detail/${itemID}`)
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
                    <td>${item.status || 'N/A'}</td>
                     <td>${item.vehicleAssignment || 'N/A'}</td>
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



