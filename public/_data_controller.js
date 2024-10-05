// document.addEventListener('DOMContentLoaded', function () {
//     fetchIcsLogs();
// });

// // Function to fetch ICS Logs
// function fetchIcsLogs() {
//     fetch('/getIcsLogs')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const icsLogsTable = document.getElementById('icsLogs');
//             icsLogsTable.innerHTML = ''; // Clear existing logs

//             data.forEach(log => {
//                 const row = document.createElement('tr');
                
//                 // Formatting date to a readable format, for example, "Month Day, Year"
//                 const incidentDateFormatted = new Date(log.incidentDate).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                 });

//                 // If `dispatchTime` is returned in `HH:MM:SS` format, we remove seconds (substring(0, 5))
//                 const dispatchTimeFormatted = log.dispatchTime ? log.dispatchTime.substring(0, 5) : '--:--';

//                 // Populate the table row with fetched data
//                 row.innerHTML = `
//                     <td>${log.supervisorName}</td>
//                     <td>${incidentDateFormatted}</td>
//                     <td>${dispatchTimeFormatted}</td>
//                     <td><a href="#" onclick="fetchIncidentLog(${log.icsID})"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg></a></td>
//                 `;
                
//                 // Append the new row to the table body
//                 icsLogsTable.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching ICS logs:', error);
//         });
// }

// // Function to fetch incident log details for a given icsID
// function fetchIncidentLog(icsID) {
//     fetch(`/getIncidentLog/${icsID}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error fetching incident log');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Populate the incident log modal with fetched data
//             document.getElementById('supervisorName').innerText = data.supervisorName;
//             document.getElementById('incidentDate').innerText = new Date(data.incidentDate).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             });
//             document.getElementById('dispatchTime').innerText = data.dispatchTime ? data.dispatchTime.substring(0, 5) : '--:--';
//             document.getElementById('alarmStatus').innerText = data.alarmStatus;
//             document.getElementById('location').innerText = data.location;
//             document.getElementById('whoRequested').innerText = data.whoRequested;
//             document.getElementById('fireType').innerText = data.fireType;
//             document.getElementById('vehicleUsed').innerText = data.vehicleUsed;
//             document.getElementById('responders').innerText = data.responders.replace(/,/g, '\n'); // Format responders list with line breaks
//             document.getElementById('chatLogs').innerText = data.chatLogs || 'No logs available';
//             document.getElementById('remarks').innerText = data.remarks;

//             // Show the incident log modal
//             document.getElementById('incidentLog').style.display = 'block';
//         })
//         .catch(error => {
//             console.error('Error fetching incident log:', error);
//         });
// }

// // Function to close the incident log modal
// function exitinc() {
//     document.getElementById('incidentLog').style.display = 'none';
// }

document.addEventListener('DOMContentLoaded', function () {
    fetchIcsLogs();
});

// Function to fetch ICS Logs
function fetchIcsLogs() {
    fetch('/getIcsLogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const icsLogsTable = document.getElementById('icsLogs');
            icsLogsTable.innerHTML = ''; // Clear existing logs

            data.forEach(log => {
                const row = document.createElement('tr');
                
                // Formatting date to a readable format, for example, "Month Day, Year"
                const incidentDateFormatted = new Date(log.incidentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // If `dispatchTime` is returned in `HH:MM:SS` format, we remove seconds (substring(0, 5))
                const dispatchTimeFormatted = log.dispatchTime ? log.dispatchTime.substring(0, 5) : '--:--';

                // Populate the table row with fetched data
                row.innerHTML = `
                    <td>${log.supervisorName}</td>
                    <td>${incidentDateFormatted}</td>
                    <td>${dispatchTimeFormatted}</td>
                    <td><a href="#" onclick="inciform(${log.icsID})"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg></a></td>
                `;
                
                // Append the new row to the table body
                icsLogsTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching ICS logs:', error);
        });
}

// Function to fetch incident log details for a given icsID and toggle the modal visibility
function inciform(icsID) {
    var incidentLog = document.getElementById('incidentLog');
    
    if (incidentLog.style.display === 'none' || incidentLog.style.display === '') {
        fetchIncidentLog(icsID);  // Fetch the log data only when opening the modal
        incidentLog.style.display = 'block';  // Show the modal
    } else {
        incidentLog.style.display = 'none';  // Hide the modal if it was already open
    }
}

// // Function to fetch incident log details for a given icsID
// function fetchIncidentLog(icsID) {
//     fetch(`/getIncidentLog/${icsID}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error fetching incident log');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Populate the incident log modal with fetched data
//             document.getElementById('supervisorName').innerText = data.supervisorName;
//             document.getElementById('incidentDate').innerText = new Date(data.incidentDate).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             });
//             document.getElementById('dispatchTime').innerText = data.dispatchTime ? data.dispatchTime.substring(0, 5) : '--:--';
//             document.getElementById('alarmStatus').innerText = data.alarmStatus;
//             document.getElementById('location').innerText = data.location;
//             document.getElementById('whoRequested').innerText = data.whoRequested;
//             document.getElementById('fireType').innerText = data.fireType;
//             document.getElementById('vehicleUsed').innerText = data.vehicleUsed;
//             document.getElementById('responders').innerText = data.responders.replace(/,/g, '\n'); // Format responders list with line breaks
//             document.getElementById('chatLogs').innerText = data.chatLogs || 'No logs available';
//             document.getElementById('remarks').innerText = data.remarks;
//         })
//         .catch(error => {
//             console.error('Error fetching incident log:', error);
//         });
// }


// Function to fetch incident log details for a given icsID
function fetchIncidentLog(icsID) {
    fetch(`/getIncidentLog/${icsID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching incident log');
            }
            return response.json();
        })
        .then(data => {
            // Check if data exists
            if (data) {
                // Populate the incident log modal with fetched data
                document.getElementById('supervisorName').innerText = data.supervisorName || 'N/A';
                document.getElementById('incidentDate').innerText = new Date(data.incidentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) || 'N/A';
                document.getElementById('dispatchTime').innerText = data.dispatchTime ? data.dispatchTime.substring(0, 5) : '--:--';
                document.getElementById('alarmStatus').innerText = data.alarmStatus || 'N/A';
                document.getElementById('location').innerText = data.location || 'N/A';
                document.getElementById('whoRequested').innerText = data.whoRequested || 'N/A';
                document.getElementById('fireType').innerText = data.fireType || 'N/A';
                document.getElementById('vehicleUsed').innerText = data.vehicleUsed || 'N/A';
                document.getElementById('responders').innerText = data.responders ? data.responders.replace(/,/g, '\n') : 'N/A'; // Format responders list with line breaks
                document.getElementById('chatLogs').innerText = data.chatLogs || 'No logs available';
                document.getElementById('remarks').innerText = data.remarks || 'N/A';
            } else {
                console.error('No data found for the given incident log');
            }
        })
        .catch(error => {
            console.error('Error fetching incident log:', error);
        });
}


// Function to close the incident log modal
function exitinc() {
    document.getElementById('incidentLog').style.display = 'none'; // Close the div
}
