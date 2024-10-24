

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
        var notification = document.getElementById('notification');
        if (profileForm.style.display === 'none' || profileForm.style.display === '') {
            notification.style.display = 'none';
            profileForm.style.display = 'block';
        } else {
          
            profileForm.style.display = 'none';
        }
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
                    let name = notification.created_by || ''; // Fallback to empty string if null or empty
    
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
                        href = '/volunteer_dashboard';
                        break;
                    default:
                        href = '/volunteer_dashboard'; 
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



//INVENTORY
//VOLUNTEER INV
window.addEventListener('load', function() {
    if (window.location.pathname === '/volunteer_form_inv') {
        
        document.getElementById('Search_form_inv').addEventListener('input', function() {
            const searchQuery = this.value.trim();
            fetchInventory_form(searchQuery); 
        });
        fetchInventory_form();
    } else if (window.location.pathname === '/volunteer_inventory') {
        loadsVehicleAssignments();
        const vehicleName = ''; 
        fetchAndDisplayInventory(vehicleName); 
        document.getElementById('searchInputInvs').addEventListener('input', function() {
            const searchQuery = this.value.trim();
            fetchAndDisplayInventoryforsearch(searchQuery); 
        });

        document.getElementById('vehStatus').addEventListener('change', function() {
            const selectedStatus = this.value; 
            fetchAndDisplayInventorySearch(selectedStatus);
        });
    

    }
});
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
function fetchAndDisplayInventoryforsearch(searchQuery = '') {
    let url = '/auth/inventory-search'; 

    if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#myTable2 tbody');
            tbody.innerHTML = ''; 

            data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('border-t', 'border-b', 'border-gray-500', 'h-14', 'md:h-14');
                row.dataset.itemId = item.id;
            
                row.innerHTML = `
                    <td class="flex justify-center items-center">
                        <div class="mt-2 md:mt-1">
                            <img src="${item.itemImage}" class="h-12 w-12 md:h-14 md:w-14 object-cover md:object-fill">
                        </div>
                    </td>
                    <td class="text-center p-2">
                        <p class="text-sm md:text-base">${item.name}</p>
                    </td>
                    <td>
                        <div class="flex justify-center">
                            <select class="border border-black text-sm md:text-base w-24 md:w-32" onchange="updateStatus(this)">
                                <option value="" disabled ${!item.Status ? 'selected' : ''}></option>
                                <option value="damaged" ${item.Status?.toLowerCase() === 'damaged' ? 'selected' : ''}>Damaged</option>
                                <option value="missing" ${item.Status?.toLowerCase() === 'missing' ? 'selected' : ''}>Missing</option>
                                <option value="good" ${item.Status?.toLowerCase() === 'good' ? 'selected' : ''}>Good</option>
                            </select>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="md:flex md:justify-center">
                            <textarea class="text-sm border border-black w-full min-h-[2rem] max-h-[3rem] px-2 py-1 bg-white focus:outline-none resize-none md:w-96"></textarea>
                        </div>
                    </td>
                `;
            
                tbody.appendChild(row);
            });
            
        })
        .catch(err => console.error('Error fetching inventory data:', err));
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
                row.classList.add('border-t', 'border-b', 'border-gray-500', 'h-14', 'md:h-14');
                row.dataset.itemId = item.id;
            
                row.innerHTML = `
                    <td class="flex justify-center items-center">
                        <div class="mt-2 md:mt-1">
                            <img src="${item.itemImage}" class="h-12 w-12 md:h-14 md:w-14 object-cover md:object-fill">
                        </div>
                    </td>
                    <td class="text-center p-2">
                        <p class="text-sm md:text-base">${item.name}</p>
                    </td>
                    <td>
                        <div class="flex justify-center">
                            <select class="border border-black text-sm md:text-base w-24 md:w-32" onchange="updateStatus(this)">
                                <option value="" disabled ${!item.Status ? 'selected' : ''}></option>
                                <option value="damaged" ${item.Status?.toLowerCase() === 'damaged' ? 'selected' : ''}>Damaged</option>
                                <option value="missing" ${item.Status?.toLowerCase() === 'missing' ? 'selected' : ''}>Missing</option>
                                <option value="good" ${item.Status?.toLowerCase() === 'good' ? 'selected' : ''}>Good</option>
                            </select>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="md:flex md:justify-center">
                            <textarea class="text-sm border border-black w-full min-h-[2rem] max-h-[3rem] px-2 py-1 bg-white focus:outline-none resize-none md:w-96"></textarea>
                        </div>
                    </td>
                `;
            
                tbody.appendChild(row);
            });
            
            
        })
        .catch(err => console.error('Error fetching inventory data:', err));
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
function cancelInventory() {
    console.log('Cancel clicked');
}
//INVENTORYLOG
function submitInventory() {
    const tbody = document.querySelector('#myTable2 tbody');
    const items = [];

    // Loop over tbody children directly
    for (const row of tbody.children) {
        const itemId = row.dataset.itemId;
        const vehicleAssignment = document.getElementById('sortVehicleAssignment')?.value || ''; // Ensure vehicleAssignment exists
        const statusSelect = row.querySelector('select');
        const remarksTextarea = row.querySelector('textarea');

        // Only add item if itemId and status are valid
        if (itemId && statusSelect?.value) {
            const item = {
                itemID: itemId,
                status: statusSelect.value,
                vehicleAssignment: vehicleAssignment, // Add vehicleAssignment
            };

            // Optionally add remarks only if present
            if (remarksTextarea?.value) {
                item.remarks = remarksTextarea.value;
            }

            items.push(item);
        }
    }

    // Submit the collected inventory data
    fetch('/auth/inventory/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.message || 'Failed to submit inventory');
            });
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        if (data.redirect) {
            window.location.href = data.redirect;
        }
    })
    .catch(error => {
        console.error('Error submitting inventory:', error);
        alert(error.message || 'Failed to submit inventory. Check console for details.');
    });
}

async function fetchInventoryData() {
    try {
        const response = await fetch('/inventory'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const inventoryData = await response.json();
        populateTable(inventoryData);
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
}

//DETAILS
function seeinventory(checked_date) {
    console.log(`Fetching details for itemID: ${checked_date}`); 
    fetch(`/auth/inventory2/detail/${checked_date}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched inventory details:', data); 
            const inventoryDetailDiv = document.getElementById('inventorydetail');
            const tbody = inventoryDetailDiv.querySelector('tbody');
            tbody.innerHTML = ''; 

            if (!data || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3">No details available</td></tr>';
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
