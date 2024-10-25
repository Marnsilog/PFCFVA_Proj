
document.addEventListener('DOMContentLoaded', function () {
    fetchIcsLogs();
});

// Function to fetch ICS Logs
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
//                     <td class="px-3"> ${incidentDateFormatted}</td>
//                     <td class="px-3">${dispatchTimeFormatted}</td>
//                     <td class="px-3"><a href="#" onclick="inciform(${log.icsID})"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg></a></td>
//                 `;
                
//                 // Append the new row to the table body
//                 icsLogsTable.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching ICS logs:', error);
//         });
// }


//WORKING
// function fetchIcsLogs() {
//     fetch('/getIcsLogs')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Sort the data array based on incidentDateFormatted in descending order (newest at the top)
//             data.sort((a, b) => {
//                 const dateA = new Date(a.incidentDate).getTime();
//                 const dateB = new Date(b.incidentDate).getTime();
//                 return dateB - dateA; // Sort in descending order
//             });

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
//                     <td class="px-3">${incidentDateFormatted}</td>
//                     <td class="px-3">${dispatchTimeFormatted}</td>
//                     <td class="px-3"><a href="#" onclick="inciform(${log.icsID})"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg></a></td>
//                 `;

//                 // Append the new row to the table body
//                 icsLogsTable.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching ICS logs:', error);
//         });
// }

// //working din
// function fetchIcsLogs() {
//     fetch('/getIcsLogs')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // First, sort by dispatchTime in descending order (newest time first)
//             data.sort((a, b) => {
//                 const timeA = a.dispatchTime ? a.dispatchTime.replace(":", "") : '0000'; // Handle missing times
//                 const timeB = b.dispatchTime ? b.dispatchTime.replace(":", "") : '0000'; // Handle missing times
//                 return timeB - timeA; // Sort by time in descending order
//             });

//             // Then, sort by incidentDate in descending order (newest date first)
//             data.sort((a, b) => {
//                 const dateA = new Date(a.incidentDate).getTime();
//                 const dateB = new Date(b.incidentDate).getTime();
//                 return dateB - dateA; // Sort by date in descending order
//             });

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

//                 // Format dispatchTime to remove seconds
//                 const dispatchTimeFormatted = log.dispatchTime ? log.dispatchTime.substring(0, 5) : '--:--';

//                 // Populate the table row with fetched data
//                 row.innerHTML = `
//                     <td>${log.supervisorName}</td>
//                     <td class="px-3">${incidentDateFormatted}</td>
//                     <td class="px-3">${dispatchTimeFormatted}</td>
//                     <td class="px-3"><a href="#" onclick="inciform(${log.icsID})"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg></a></td>
//                 `;

//                 // Append the new row to the table body
//                 icsLogsTable.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching ICS logs:', error);
//         });
// }

function fetchIcsLogs() {
    fetch('/getIcsLogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // First, sort by date in descending order
            data.sort((a, b) => {
                const dateA = new Date(a.incidentDate).getTime();
                const dateB = new Date(b.incidentDate).getTime();
                
                if (dateA !== dateB) {
                    return dateB - dateA; // Sort by date if they are different
                } else {
                    // If the dates are the same, sort by time in descending order
                    const timeA = a.dispatchTime ? parseInt(a.dispatchTime.replace(':', ''), 10) : 0;
                    const timeB = b.dispatchTime ? parseInt(b.dispatchTime.replace(':', ''), 10) : 0;
                    return timeB - timeA; // Sort by time when the dates are the same
                }
            });

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

                // Format dispatchTime to remove seconds
                const dispatchTimeFormatted = log.dispatchTime ? log.dispatchTime.substring(0, 5) : '--:--';

                // Populate the table row with fetched data
                row.innerHTML = `
                    <td>${log.supervisorName}</td>
                    <td class="px-3">${incidentDateFormatted}</td>
                    <td class="px-3">${dispatchTimeFormatted}</td>
                    <td class="px-3"><a href="#" onclick="inciform(${log.icsID})"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg></a></td>
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


function downloadLogs() {
    // Get the data from the form fields
    const supervisorName = document.getElementById('supervisorName')?.innerText.trim().replace(/\s+/g, '_') || 'Unknown_Supervisor';
const incidentDate = document.getElementById('incidentDate')?.innerText.trim() || 'Unknown_Date';


    // Format the date in YYYY-MM-DD
    const formattedDate = new Date(incidentDate).toISOString().split('T')[0];

    // Prepare the content of the logs
    const content = `
Supervisor Name: ${supervisorName}
Incident Date: ${incidentDate}
Dispatch Time: ${document.getElementById('dispatchTime').innerText.trim()}
Alarm Status: ${document.getElementById('alarmStatus').innerText.trim()}
Location: ${document.getElementById('location').innerText.trim()}
Who Requested: ${document.getElementById('whoRequested').innerText.trim()}
Fire Type: ${document.getElementById('fireType').innerText.trim()}
Vehicle Used: ${document.getElementById('vehicleUsed').innerText.trim()}

Responders:
${document.getElementById('responders').innerText.trim()}

Chat Logs:
${document.getElementById('chatLogs').innerText.trim()}

Remarks:
${document.getElementById('remarks').innerText.trim()}
`;

    // Create a blob for the file content
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Set the filename as supervisorName_date.txt
    link.download = `${supervisorName}_${formattedDate}.txt`;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
}

// Function to close the incident log modal
function exitinc() {
    document.getElementById('incidentLog').style.display = 'none'; // Close the div
}

