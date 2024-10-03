

// document.addEventListener('DOMContentLoaded', function() {
//     let attendees = [];

//     // Fetch attendees (same function as before)
//     fetchCurrentPresent();

//     // Handle Confirm Attendance
//     const confirmAttendanceBtn = document.getElementById('confirmAttendanceBtn');
//     confirmAttendanceBtn.addEventListener('click', function() {
//         attendees = []; // Clear previous list
//         const attendeeRows = document.querySelectorAll('#currentPresent tr');

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

//         // Redirect to ICS page
//         window.location.href = '/supervisor_ics'; // Adjust path if necessary
//     });
// });

// // Fetch and populate current attendees (same function as before)
// function fetchCurrentPresent() {
//     fetch('/getCurrentPresent')
//         .then(response => response.json())
//         .then(data => {
//             const currentPresentDiv = document.getElementById('currentPresent');
//             currentPresentDiv.innerHTML = '';

//             data.forEach(record => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td class="py-2 px-4 border-b">${record.callSign}</td>
//                     <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
//                     <td class="py-2 px-4 border-b text-center">
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

// function removeFromTable(element) {
//     const row = element.closest('tr');
//     row.classList.add('removed'); // Mark row as removed
// }


// document.addEventListener('DOMContentLoaded', function() {
//     // Get the attendees stored in sessionStorage
//     const attendees = JSON.parse(sessionStorage.getItem('attendees')) || [];

//     const icsAttendeesDiv = document.getElementById('icsAttendees');
//     icsAttendeesDiv.innerHTML = ''; // Clear any existing data

//     attendees.forEach((attendee, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td class="py-2 px-4 border-b">${attendee.callSign}</td>
//             <td class="py-2 px-4 border-b">${attendee.name}</td>
//             <td><input type="checkbox"></td>
//             <td>00:00:00</td> <!-- Placeholder for timer -->
//             <td><a class="text-3xl text-red-700 font-bold mr-4" href="#" onclick="removeAttendee(${index})">x</a></td>
//         `;
//         icsAttendeesDiv.appendChild(row);
//     });
// });

// function removeAttendee(index) {
//     let attendees = JSON.parse(sessionStorage.getItem('attendees')) || [];
//     attendees.splice(index, 1); // Remove the attendee at the given index
//     sessionStorage.setItem('attendees', JSON.stringify(attendees)); // Save the updated list
//     location.reload(); // Refresh the page to reflect changes
// }



// function loadVehicleAssignments() {
//     fetch('/getVehicleAssignments')
//         .then(response => response.json())
//         .then(data => {
//             const selectElement = document.getElementById('vehicleAssignment');
//             selectElement.innerHTML = '<option value="">Choose Vehicle</option>';  // Reset options

//             data.forEach(item => {
//                 selectElement.innerHTML += `<option value="${item.vehicleName}">${item.vehicleName}</option>`;
//             });
//         })
//         .catch(error => console.error('Error loading vehicle assignments:', error));
// }

// // Call the function when the page loads
// document.addEventListener('DOMContentLoaded', loadVehicleAssignments);



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

        attendeeRows.forEach(row => {
            const callSign = row.querySelector('td:nth-child(1)').textContent;
            const name = row.querySelector('td:nth-child(2)').textContent;

            // Only add attendees that haven't been removed
            if (!row.classList.contains('removed')) {
                attendees.push({ callSign, name });
            }
        });

        // Store attendees in sessionStorage to transfer to ICS page
        sessionStorage.setItem('attendees', JSON.stringify(attendees));

        // Get the selected vehicle
        const vehicle = document.getElementById('vehicleAssignment').value;
        sessionStorage.setItem('selectedVehicle', vehicle);  // Store selected vehicle in sessionStorage

        // Redirect to ICS page
        window.location.href = '/supervisor_ics'; // Adjust path if necessary
    });
}

// Function to fetch and populate current attendees for fire_response.html
function fetchCurrentPresent() {
    fetch('/getCurrentPresent')
        .then(response => response.json())
        .then(data => {
            const currentPresentDiv = document.getElementById('currentPresent');
            currentPresentDiv.innerHTML = '';

            data.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="py-2 px-4 border-b">${record.callSign}</td>
                    <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                    <td class="py-2 px-4 border-b text-center">
                        <a href="#" onclick="removeFromTable(this)">
                            <i class="fa-solid fa-x text-red-500 cursor-pointer"></i>
                        </a>
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
            <td class="py-2 px-4 border-b">${attendee.callSign}</td>
            <td class="py-2 px-4 border-b">${attendee.name}</td>
            <td><input type="checkbox"></td>
            <td>00:00:00</td> <!-- Placeholder for timer -->
            <td><a class="text-3xl text-red-700 font-bold mr-4" href="#" onclick="removeAttendee(${index})">x</a></td>
        `;
        icsAttendeesDiv.appendChild(row);
    });

    // Get the selected vehicle from sessionStorage and display it in vehicleName
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
