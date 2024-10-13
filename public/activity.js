let selectedMembers = [];
function addResponders(){
    var addRes = document.getElementById('addRes');

    
    if (addRes.style.display === 'none' || addRes.style.display === '') {
        addRes.style.display = 'block';
        fetchMembers();

        document.getElementById('searchPerson').addEventListener('input', function() {
            const searchQuery = this.value.trim();
            fetchMembers(searchQuery);
        });
    } else {
      
        addRes.style.display = 'none';
    }
}
function addAcitivity(){
    var activityForm = document.getElementById('activityForm');

    
    if (activityForm.style.display === 'none' || activityForm.style.display === '') {
        activityForm.style.display = 'block';
        loadActivityAss();
    } else {
      
        activityForm.style.display = 'none';
        fetchActivities();
    }
}
function submitSelectedMembers() {
    const currentPresentDiv = document.getElementById('tblResponders');
    selectedMembers.forEach(member => {
        const row = document.createElement('tr');
        row.classList.add('text-sm', 'text-center');
        row.innerHTML = `
            <td class="py-2 md:px-4 border-b">${member.callSign}</td>
            <td class="py-2 md:px-4 border-b">${member.name}</td>
        `;
        currentPresentDiv.appendChild(row);
    });

    selectedMembers = [];
    var profileForm = document.getElementById('addRes');
    if (profileForm.style.display === 'none' || profileForm.style.display === '') {
        profileForm.style.display = 'block';
    } else {
      
        profileForm.style.display = 'none';
    }
}

function fetchMembers(Name) {
    let url = '/auth/allPerson';
    if (Name) {
        url += `?search=${encodeURIComponent(Name)}`;
    }
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('responds');
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

function loadActivityAss() {
    fetch('/getVehicleAssignments')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('activityAssignment');
            selectElement.innerHTML = '<option value="">Choose Vehicle</option>';  // Reset options

            data.forEach(item => {
                selectElement.innerHTML += `<option value="${item.vehicleName}">${item.vehicleName}</option>`;
            });
        })
        .catch(error => console.error('Error loading vehicle assignments:', error));
}

document.getElementById('submitLogs').addEventListener('click', function (event) {
    event.preventDefault();
    
    // Gather form data
    const activityDate = document.getElementById('activityDate').value;
    const activityTime = document.getElementById('activityTime').value;
    const location = document.getElementById('location').value;
    const activityAssignment = document.getElementById('activityAssignment').value;
    const activityDetail = document.getElementById('activityDetail').value;

    // Gather responder data from the table...
    const responders = [];
    const rows = document.getElementById('tblResponders').getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const callSign = rows[i].cells[0].innerText;
        responders.push({ callSign });
    }

    // Send data to the server using fetch...
    fetch('/auth/submit-activity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            activityDate,
            activityTime,
            location,
            activityAssignment,
            activityDetail,
            responders
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Clear the form fields by setting each one to an empty string
            document.getElementById('activityDate').value = '';
            document.getElementById('activityTime').value = '';
            document.getElementById('location').value = '';
            document.getElementById('activityAssignment').value = '';
            document.getElementById('activityDetail').value = '';

            // Optionally clear the responders table if needed
            const rows = document.getElementById('tblResponders').getElementsByTagName('tr');
            while (rows.length > 0) {
                rows[0].remove(); // Remove all rows
            }

            // Hide the form
            document.getElementById('activityForm').style.display = 'none'; 
            fetchActivities();
            alert('Activity successfully logged!');
        } else {
            alert('Error logging activity.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', fetchActivities);
function fetchActivities() {
    fetch('/auth/get-activities')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const activityTable = document.getElementById('actTable');
                activityTable.innerHTML = ''; // Clear any existing rows

                data.activities.forEach(activity => {
                    const dateString = activity.date;
                    const date = new Date(dateString);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const timeString = activity.time;
                    const [hours, minutes] = timeString.split(':').map(Number);
                    const formattedHours = hours % 12 || 12; // Convert 0 hours to 12
                    const ampm = hours < 12 ? 'AM' : 'PM';
                    const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    const row = document.createElement('tr');
                    row.classList.add('border-b','border-black');
                    row.innerHTML = `
                        <td>${formattedDate}</td>
                        <td>${formattedTime}</td>
                        <td class="w-72 break-words">${activity.detail}</td>
                        <td>${activity.location}</td>
                        <td><a class="underline underline-offset-1 md:text-xl" href="#" onclick="seeResponders(${activity.activityID})">See Responders</a></td>
                    `;
                    activityTable.appendChild(row);
                });
            } else {
                console.error('Failed to fetch activities:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching activities:', error);
        });
}

function seeResponders(activityId) {
    fetch(`/auth/get-responders/${activityId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const respondersTableBody = document.getElementById('respp'); // Reference to the table body
                respondersTableBody.innerHTML = ''; // Clear previous responders

                data.responders.forEach(responder => {
                    const row = document.createElement('tr');
                    row.classList.add('text-center'); // Add text-center class
                    row.innerHTML = `
                        <td>${responder.name}</td>
                        <td>${responder.callsign}</td>
                    `;
                    respondersTableBody.appendChild(row);
                });
                document.getElementById('activityResp').style.display = 'flex'; 
            } else {
                alert('Failed to fetch responders.');
            }
        })
        .catch(error => {
            console.error('Error fetching responders:', error);
        });
}

function exitResdetail() {
    document.getElementById('activityResp').style.display = 'none'; // Hide the responder modal
}
