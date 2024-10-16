
let selectedMembers = [];
document.addEventListener('DOMContentLoaded', function() {
    // Code for fire_response.html
    if (document.getElementById('confirmAttendanceBtn')) {
        handleFireResponsePage();
    }

    // Code for ics.html
    if (document.getElementById('icsAttendees')) {
        handleICSPage();
    }

    // Call loadVehicleAssignments function when the page loads if vehicle assignment select exists
    if (document.getElementById('vehicleAssignment')) {
        loadVehicleAssignments();
    }
});



// // Function to handle the fire_response.html logic
// function handleFireResponsePage() {
//     let attendees = [];

//     // Fetch attendees
//     fetchCurrentPresent();

//     // Handle Confirm Attendance
//     const confirmAttendanceBtn = document.getElementById('confirmAttendanceBtn');
//     confirmAttendanceBtn.addEventListener('click', function() {
//         attendees = []; // Clear previous list
//         const attendeeRows = document.querySelectorAll('#currentPresent tr');

//         // Get the selected vehicle
//         const vehicle = document.getElementById('vehicleAssignment').value;

//         // Check if a vehicle has been selected
//         if (!vehicle || vehicle === 'Choose Vehicle') {
//             alert('Please select a vehicle before confirming attendance.');
//             return; // Stop further execution if no vehicle is selected
//         }

//         // Loop through attendee rows and add them to the attendees array
//         attendeeRows.forEach(row => {
//             const callSign = row.querySelector('td:nth-child(1)').textContent;
//             const name = row.querySelector('td:nth-child(2)').textContent;

//             // Only add attendees that haven't been removed
//             if (!row.classList.contains('removed')) {
//                 attendees.push({ callSign, name });
//             }
//         });

//         // Store attendees in sessionStorage to transfer to ICS page
//         sessionStorage.setItem('attendees', JSON.stringify(attendees));
//         sessionStorage.setItem('selectedVehicle', vehicle);  // Store selected vehicle in sessionStorage

//         // Redirect to ICS page
//         window.location.href = '/supervisor_ics'; // Adjust path if necessary
//     });
// }

// Function to handle the fire_response.html logic
function handleFireResponsePage() {
    let attendees = [];

    // Fetch attendees
    fetchCurrentPresent();

    // Handle Confirm Attendance
    const confirmAttendanceBtn = document.getElementById('confirmAttendanceBtn');
    confirmAttendanceBtn.addEventListener('click', function() {
        attendees = []; // Clear previous list
        const attendeeRows = document.querySelectorAll('#currentPresent tr');

        // Get the selected vehicle
        const vehicle = document.getElementById('vehicleAssignment').value;

        // Check if a vehicle has been selected
        if (!vehicle || vehicle === 'Choose Vehicle') {
            alert('Please select a vehicle before confirming attendance.');
            return; // Stop further execution if no vehicle is selected
        }

        // Loop through attendee rows and check if they are selected (checked)
        attendeeRows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                const callSign = row.querySelector('td:nth-child(2)').textContent;
                const name = row.querySelector('td:nth-child(3)').textContent;
                attendees.push({ callSign, name });
            }
        });

        // Check if any attendees were selected
        if (attendees.length === 0) {
            alert('Please select at least one attendee.');
            return; // Stop if no attendees are selected
        }

        // Store attendees in sessionStorage to transfer to ICS page
        sessionStorage.setItem('attendees', JSON.stringify(attendees));
        sessionStorage.setItem('selectedVehicle', vehicle);  // Store selected vehicle in sessionStorage

        // Redirect to ICS page
        window.location.href = '/supervisor_ics'; // Adjust path if necessary
    });
}


// // Function to fetch and populate current attendees for fire_response.html
// function fetchCurrentPresent() {
//     fetch('/getCurrentPresent')
//         .then(response => response.json())
//         .then(data => {
//             const currentPresentDiv = document.getElementById('currentPresent');
//             currentPresentDiv.innerHTML = '';

//             data.forEach(record => {
//                 const row = document.createElement('tr');
//                 row.classList.add('text-sm', 'md:text-2xl');
//                 row.innerHTML = `
//                     <td class="py-2 md:px-4 border-b">${record.callSign}</td>
//                     <td class="py-2 md:px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
//                     <td class="py-2 md:px-4 border-b text-center">
//                         <a href="#" onclick="removeFromTable(this)">
//                             <i class="fa-solid fa-x text-red-500 cursor-pointer"></i>
//                         </a>
//                     </td>
//                 `;
//                 currentPresentDiv.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error:', error));
// }

// Function to fetch and populate current attendees for fire_response.html
function fetchCurrentPresent() {
    fetch('/getCurrentPresent')
        .then(response => response.json())
        .then(data => {
            const currentPresentDiv = document.getElementById('currentPresent');
            currentPresentDiv.innerHTML = '';

            data.forEach(record => {
                const row = document.createElement('tr');
                row.classList.add('text-sm', 'md:text-2xl');
                row.innerHTML = `
                    
                    <td class="py-2 md:px-4 border-b">${record.callSign}</td>
                    <td class="py-2 md:px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                    
                    <td class="py-2 md:px-4 border-b">
                        <input type="checkbox" class="attendee-checkbox" data-callSign="${record.callSign}">
                    </td>
                `;
                currentPresentDiv.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}


// Function to remove an attendee from the fire_response.html page
function removeFromTable(element) {
    const row = element.closest('tr');
    row.classList.add('removed'); // Mark row as removed
}

// Function to handle the ICS page logic
function handleICSPage() {
    // Get the attendees stored in sessionStorage
    const attendees = JSON.parse(sessionStorage.getItem('attendees')) || [];

    const icsAttendeesDiv = document.getElementById('icsAttendees');
    icsAttendeesDiv.innerHTML = ''; // Clear any existing data


    

    attendees.forEach((attendee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="md:py-2 md:px-4 border-b">${attendee.callSign}</td>
            <td class="md:py-2 md:px-4 border-b">${attendee.name}</td>
            <td><input type="checkbox"></td>
            <td>00:00:00</td> <!-- Placeholder for timer -->
        `;
        icsAttendeesDiv.appendChild(row);
    });

    // Get the selected vehicle from sessionStorage and display it in vehicleNames
    const vehicleName = sessionStorage.getItem('selectedVehicle');
    if (vehicleName) {
        document.getElementById('vehicleName').textContent = vehicleName;  // Set the vehicle name in the ICS page
    }
}

// Function to remove an attendee from the ICS page
function removeAttendee(index) {
    let attendees = JSON.parse(sessionStorage.getItem('attendees')) || [];
    attendees.splice(index, 1); // Remove the attendee at the given index
    sessionStorage.setItem('attendees', JSON.stringify(attendees)); // Save the updated list
    location.reload(); // Refresh the page to reflect changes
}

// Function to load vehicle assignments (common to both pages)
function loadVehicleAssignments() {
    fetch('/getVehicleAssignments')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('vehicleAssignment');
            selectElement.innerHTML = '<option value="">Choose Vehicle</option>';  // Reset options

            data.forEach(item => {
                selectElement.innerHTML += `<option value="${item.vehicleName}">${item.vehicleName}</option>`;
            });
        })
        .catch(error => console.error('Error loading vehicle assignments:', error));
}

// Function to fetch and display supervisor's name and call sign in ics.html
async function populateSupervisorName() {
    try {
        // Fetch the profile data of the logged-in user
        const response = await fetch('/auth/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
            const fullName = result.data.fullName;
            const callSign = result.data.callSign;

            // Store supervisor name in sessionStorage
            const supervisorName = `${fullName} [${callSign}]`;
            sessionStorage.setItem('supervisorName', supervisorName);

            // Populate the supervisorName field with FullName [CallSign]
            const supervisorNameElement = document.getElementById('supervisorName');
            if (supervisorNameElement) {
                supervisorNameElement.textContent = supervisorName;
            }
        } else {
            console.error('Error fetching supervisor name:', result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function when ics.html is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('supervisorName')) {
        populateSupervisorName(); // Populate supervisor's name when the page loads
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on the ICS form page
    if (document.getElementById('responders')) {
        handleICSFormPage();
    }
});

// Function to handle the ICS Form page (supervisor_ics_form.html)
function handleICSFormPage() {
    // Retrieve the attendees stored in sessionStorage
    const attendees = JSON.parse(sessionStorage.getItem('attendees')) || [];

    // Get the responders div and clear it before populating
    const respondersDiv = document.getElementById('responders');
    respondersDiv.innerHTML = ''; // Clear existing content

    // Loop through attendees and create list elements for each attendee
    attendees.forEach(attendee => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>[${attendee.callSign}]</strong> ${attendee.name}`;
        respondersDiv.appendChild(li); // Append each attendee to the responders div
    });

    // Retrieve chat logs from sessionStorage and populate the chatLogs textarea
    const storedChatLogs = JSON.parse(sessionStorage.getItem('storedChatLogs')) || [];  // Default to empty array if no logs found
    const chatLogs = storedChatLogs.join('\n'); // Combine all messages into a single string with line breaks
    document.getElementById('chatLogs').value = chatLogs;  // Populate chat logs in the textarea

    // Retrieve the supervisor name (already handled, but just in case)
    const supervisorName = sessionStorage.getItem('supervisorName') || '';
    document.getElementById('supervisorName').textContent = supervisorName;

    // If needed, retrieve and populate other details like vehicle used, incident date, etc.
    const vehicleUsed = sessionStorage.getItem('selectedVehicle') || '';
    document.getElementById('vehicleUsed').value = vehicleUsed;
}


document.getElementById('submitLogs').addEventListener('click', function(event) {
    // Retrieve the attendees stored in sessionStorage
    const attendees = JSON.parse(sessionStorage.getItem('attendees')) || [];

    // Convert attendees array into a string format
    const formattedResponders = attendees.map(attendee => `[${attendee.callSign}] ${attendee.name}`).join(', ');

    // Gather the rest of the form data
    const incidentDate = document.getElementById('incidentDate').value;
    const dispatchTime = document.getElementById('dispatchTime').value;

    const formData = {
        supervisorName: sessionStorage.getItem('supervisorName'),
        incidentDate: incidentDate,
        dispatchTime: dispatchTime,
        location: document.getElementById('location').value,
        alarmStatus: document.getElementById('alarmStatus').value,
        whoRequested: document.getElementById('whoRequested').value,
        fireType: document.getElementById('fireType').value,
        vehicleUsed: sessionStorage.getItem('selectedVehicle'),
        responders: formattedResponders,
        chatLogs: sessionStorage.getItem('storedChatLogs') ? JSON.parse(sessionStorage.getItem('storedChatLogs')).join('\n') : '',
        remarks: document.getElementById('remarks').value
    };

    // Validation: Check if incidentDate or dispatchTime is empty
    if (!incidentDate) {
        alert('Please select an Incident Date before submitting the form.');
        event.preventDefault();  // Prevent form submission
        return;  // Stop further execution
    }

    if (!dispatchTime) {
        alert('Please enter a Dispatch Time before submitting the form.');
        event.preventDefault();  // Prevent form submission
        return;  // Stop further execution
    }

    // Proceed with form submission if validation passes
    fetch('/saveICSLogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Logs saved successfully');
            // Redirect to the logs page after successful submission
            window.location.href = '/supervisor_ics_logs';  
        } else {
            console.error('Error saving logs:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to display the selected vehicle in a paragraph on the ICS form page
function displaySelectedVehicle() {
    const vehicle = sessionStorage.getItem('selectedVehicle'); // Retrieve the vehicle from sessionStorage

    // Check if vehicle is stored and if the vehicleAssignment paragraph exists
    if (vehicle && document.getElementById('vehicle')) {
        document.getElementById('vehicle').textContent = vehicle; // Display the vehicle name
    }
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    displaySelectedVehicle(); 
});


//Corsiga Add
// Declare selectedMembers at a higher scope


function fetchMembers(Name) {
    let url = '/auth/getMembers';
    if (Name) {
        url += `?search=${encodeURIComponent(Name)}`;
    }
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('addPersonICS');
            tableBody.innerHTML = ''; 

            data.forEach(member => {
                const row = document.createElement('tr');
                const checkboxId = `checkbox-${member.callSign}`;
                row.innerHTML = `
                    <td class="text-center">${member.callSign}</td>
                    <td class="text-center">${member.firstName} ${member.middleInitial} ${member.lastName}</td>
                    <td class="">
                        <div class="w-full flex justify-center">
                            <input type="checkbox" id="${checkboxId}" data-callSign="${member.callSign}" data-name="${member.firstName} ${member.middleInitial} ${member.lastName}">
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
                const checkbox = document.getElementById(checkboxId);
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        selectedMembers.push({
                            callSign: member.callSign,
                            name: `${member.firstName} ${member.middleInitial} ${member.lastName}`
                        });
                    } else {
                        selectedMembers = selectedMembers.filter(m => m.callSign !== member.callSign);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching members:', error));
}

function submitSelectedMembers() {
    const currentPresentDiv = document.getElementById('currentPresent');
    selectedMembers.forEach(member => {
        const row = document.createElement('tr');
        row.classList.add('text-sm', 'md:text-2xl');
        row.innerHTML = `
            <td class="py-2 md:px-4 border-b">${member.callSign}</td>
            <td class="py-2 md:px-4 border-b">${member.name}</td>
            <td class="py-2 md:px-4 border-b text-center">
                <a href="#" onclick="removeFromTable(this)">
                    <i class="fa-solid fa-x text-red-500 cursor-pointer"></i>
                </a>
            </td>
        `;
        currentPresentDiv.appendChild(row);
    });

    selectedMembers = [];
    var profileForm = document.getElementById('addPer');
    if (profileForm.style.display === 'none' || profileForm.style.display === '') {
        profileForm.style.display = 'block';
    } else {
      
        profileForm.style.display = 'none';
    }
}




function showAddperson(){
    
    var profileForm = document.getElementById('addPer');
    
    if (profileForm.style.display === 'none' || profileForm.style.display === '') {
        
        fetchMembers();
        document.getElementById('searchPerson').addEventListener('input', function() {
            const searchQuery = this.value.trim();
            fetchMembers(searchQuery);
        });
        profileForm.style.display = 'block';
    } else {
      
        profileForm.style.display = 'none';
    }
}
function canaddPerson(){
var canAdd = document.getElementById('addPer');
canAdd.style.display = 'none';
}