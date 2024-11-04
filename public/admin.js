document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.editdel-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const editDeleteElement = this.parentElement.querySelector('.editdelete');
            if (editDeleteElement.style.display === "none") {
                editDeleteElement.style.display = "block";
            } else {
                editDeleteElement.style.display = "none";
            }
        });
    });
});


function toggleSetting() {

    var profileForm = document.getElementById('Setting');
    var notification = document.getElementById('notification');
    if (profileForm.style.display === 'none' || profileForm.style.display === '') {
        profileForm.style.display = 'block';
        notification.style.display = 'none';
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
function loadNotifications() {
    fetch('/auth/notification')
        .then(response => response.json())
        .then(notifications => {
            const container = document.getElementById('notificationContainer');
            container.innerHTML = '';  // Clear existing content

            notifications.forEach(notification => {
                const fontWeight = notification.status === 'read' ? '' : 'font-semibold';
                let message = notification.detail;
                let from = notification.created_by || '';
                switch (notification.detail) {
                    case 'All equipments are good':
                        message = 'A new Inventory Log has been submitted';
                        break;
                    case 'Equipment vehicle transfered':
                        message = 'A new Equipment transfer log has been submitted';
                        break;
                    case 'Equipment status changed':
                        message = 'A new Equipment status log has been submitted';
                        break;
                    case 'new activity logs':
                        message = 'A new Activity log has been submitted';
                        break;
                    case 'added activity Points':
                        message = 'Congratulations! You Earned 1 activity points';
                        from = 'PFCFVA System';
                        break;
                    case 'earned fire response':
                        message = 'Congratulations! You Earned 1 Fire Response point';
                        from = 'PFCFVA System';
                        break;
                    case 'fire response submitted':
                        message = 'A new Fire Response log has been submitted';
                        break;
                    default:
                        console.warn('Unknown notification detail:', notification.detail);
                }
                
                //console.log(message);
                // Generate the notification div with dynamic content
                const notificationDiv = `
                    <div class="h-[20%] max-h-[20%] w-full border-b border-black font-Inter px-1 py-1 cursor-pointer hover:bg-gray-300" 
                         onclick="markAsRead('${notification.notification_id}', '${notification.detail}')">
                        <div class="flex justify-between w-full overflow-hidden"">
                            <div class = "w-full pr-2">
                             <p class="text-base ${fontWeight} w-full leading-tight overflow-hidden">${message}</p>
                             <p class="text-sm overflow-hidden">${from}</p>
                            </div>
                           
                            <div class = "w-[25%] md:w-[20%] md:pr-0 pr-2">
                             <p class="text-sm">${notification.created_time}</p>
                             <p class="text-sm">${notification.created_date}</p>
                            </div>
                           
                        </div>
                       
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', notificationDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching notifications:', error);
        });
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

function markAsRead(notificationId, detail) {
    fetch(`/auth/markNotificationRead/${notificationId}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Notification marked as read');
            let href;
            switch (detail) {
                case 'All equipments are good':
                    href = '/admin_inventory_logs';
                    break;
                case 'Equipment vehicle transfered':
                    href = '/admin_inventory_vehicle_ass';
                    break;
                case 'Equipment status changed':
                    href = '/admin_inventory_status_logs';
                    break;
                case 'new activity logs':
                    href = '/admin_activity';
                    break;
                 case 'added activity Points':
                    href = '/admin_activity';
                    break;
                case 'earned fire response':
                    href = '/admin_fire_response';
                        break;
                case 'fire response submitted':
                    href = '/admin_fire_response';
                        break;
                default:
                    href = '/admin_dashboard'
            }
            if (href) {
                window.location.href = href; 
            }
        } else {
            console.error('Failed to mark notification as read');
        }
    })
    .catch(error => {
        console.error('Error marking notification as read:', error);
    });
}

function showSettings() {

    var profileForm = document.getElementById('inventorySetting');
    
    if (profileForm.style.display === 'none' || profileForm.style.display === '') {
     
        profileForm.style.display = 'block';
    } else {
      
        profileForm.style.display = 'none';
    }
}

// document.addEventListener('DOMContentLoaded', function() {

//     const circles = document.querySelectorAll('.colorCircle');
//     circles.forEach(circle => {
//         circle.addEventListener('click', function () {
//             circle.classList.toggle('bg-red-500');
//             circle.classList.toggle('bg-green-500');
//         });
//     });
// });
  
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
        var x = document.getElementById("password");
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
    window.addEventListener('load', function() {
        if (window.location.pathname === '/admin_inventory_status_logs') {
            fetchInventoryLog();
        } else if (window.location.pathname === '/admin_inventory_logs') {
            fetchInventoryLog3();
        } else if(window.location.pathname === '/admin_inventory_vehicle_ass') {
            fetchInventoryLog2();
        }else if(window.location.pathname === '/admin_inventory_count') {
            fetchInventoryLog4()
        }
       
    });

    //register, clear form

    //ADMIN INVENTORY STATUS  /admin_inventory_status_logs
    function fetchInventoryLog() {

            fetch('/auth/admin-inventory/log')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);  
                const tbody = document.getElementById('inventory-log');
                
                if (!data.length) {
                    console.log('No data found');
                    return; 
                }
    
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.className = "md:h-auto h-8 border-t-[1px] border-b-[1px] border-gray-500";
                    const remarks = row.remarks === null ? '' : row.remarks;
                    tr.innerHTML = `
                        <td><div class="flex justify-center"><img src="${row.image}" class="w-10 h-10 object-fill md:mt-2" alt=""></div></td>
                        <td>${row.item}</td>
                        <td>${row.volunteer_name}</td>
                        <td>${new Date(row.checked_date).toLocaleDateString()}</td>
                        <td>${row.checked_time}</td>
                        <td>${row.vehicle}</td>
                        <td>${row.from_vehicle}</td>
                        <td>${row.change_to}</td>
                        <td class="w-72 break-words">${remarks}</td>
                    `;
                    
                    tbody.appendChild(tr);
                });
            })
            .catch(error => console.error('Error fetching inventory log data:', error));

    }
    ///admin_inventory_logs
    function fetchInventoryLog3() {
     
            fetch('/auth/admin-inventory/log3')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const tbody = document.getElementById('inventory-log3');
        
                if (!data.length) {
                    console.log('No data found');
                    return; 
                }
    
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.className = "md:h-auto h-8 border-t-[1px] border-b-[1px] border-gray-500";
                    
                    // Handle status, assigning an empty string if it's null
                    const status = row.status === null ? '' : row.status;
                    
                    tr.innerHTML = `
                        <td>${row.volunteer_name}</td>
                        <td>${new Date(row.checked_date).toLocaleDateString()}</td>
                        <td>${row.checked_time}</td>
                        <td>${row.vehicle}</td>
                        <td>${status}</td>
                    `;
                    
                    tbody.appendChild(tr);
                });
            })
            .catch(error => console.error('Error fetching inventory log data:', error));

    }
    ///admin_inventory_vehicle_ass
    function fetchInventoryLog2() {
       
            fetch('/auth/admin-inventory/log2')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const tbody = document.getElementById('inventory-log2');
                
                if (!data.length) {
                    return; 
                }
    
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.className = "md:h-auto h-8 border-t-[1px] border-b-[1px] border-gray-500";
                    
                    tr.innerHTML = `
                        <td><div class="flex justify-center"><img src="${row.image}" class="w-10 h-10 object-fill md:mt-2" alt=""></div></td>
                        <td>${row.item}</td>
                        <td>${row.volunteer_name}</td>
                        <td>${new Date(row.checked_date).toLocaleDateString()}</td>
                        <td>${row.checked_time}</td>
                        <td>${row.from_vehicle}</td>
                        <td>${row.change_to}</td>
                    `;
                    
                    tbody.appendChild(tr);
                });
                
            })
            .catch(error => console.error('Error fetching inventory log data:', error));

    }

        ///admin_inventory_count
        function fetchInventoryLog4() {
       
            fetch('/auth/admin-inventory/log4')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const tbody = document.getElementById('inventory-log4');
                
                if (!data.length) {
                    return; 
                }
    
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.className = "md:h-auto h-8 border-t-[1px] border-b-[1px] border-gray-500";
                    
                    tr.innerHTML = `
                        <td>${row.item_Name}</td>
                        <td>${row.item_count}</td>
                    `;
                    
                    tbody.appendChild(tr);
                });
                
            })
            .catch(error => console.error('Error fetching inventory log data:', error));

    }
    


//NOTIFICATION


