// //for attendance

// document.addEventListener('DOMContentLoaded', function() {
//     const rfidInput = document.createElement('input');
//     rfidInput.style.position = 'absolute';
//     rfidInput.style.opacity = 0;
//     rfidInput.style.top = '-9999px';
//     document.body.appendChild(rfidInput);
//     rfidInput.focus();

//     function focusRFIDInput() {
//         rfidInput.focus();
//     }

//     document.addEventListener('click', function() {
//         focusRFIDInput();
        
//     });

//     rfidInput.addEventListener('keypress', function(event) {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             const rfidValue = rfidInput.value.trim();
//             rfidInput.value = '';
//             console.log('RFID Scanned:', rfidValue);
//             handleRFIDScan(rfidValue);
//         }
//     });

//     // Fetch profile data when page loads
//     fetchProfileData();
//     fetchRecentAttendance(); 
// });

// function handleRFIDScan(rfid) {
//     document.getElementById('rfidText').textContent = rfid;
//     console.log('Handling RFID scan:', rfid);

//     // changeBackgroundColor();

//     fetch('/recordTimeIn', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ rfid: rfid })
//     })
//     .then(response => {
//         if (!response.ok) {
//             if (response.status === 400) {
//                 // if Time In already exists, record Time Out instead
//                 return fetch('/recordTimeOut', {
//                     method: 'POST', // logic to handle recording Time Out
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ rfid: rfid })
//                 })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     document.getElementById('TimeOut').textContent = data.timeOut; 
//                     document.getElementById('DateTimeOut').textContent = data.dateOfTimeOut; 
//                     // Fetch updated profile data after recording attendance
//                     fetchProfileData(rfid); // Fetch profile data after recording Time Out
//                     fetchRecentAttendance();
//                     timeOutAudio.play();
//                 });
//             } else {
//                 throw new Error('Network response was not ok');
//             }
//         }
//         return response.json();
//     })
//     .then(data => {
        
//         if (data.timeIn) {
//             document.getElementById('TimeIn').textContent = data.timeIn; 
//             document.getElementById('DateTimeIn').textContent = data.dateOfTimeIn; 
//             // Clear Time Out fields if no Time Out record exists
//             document.getElementById('TimeOut').textContent = 'Put TimeOut value here'; 
//             document.getElementById('DateTimeOut').textContent = 'DateTimeOut here'; 
//         }
//         // Fetch updated profile data after recording attendance
//         fetchProfileData(rfid); // Fetch profile data after recording Time In
//         fetchRecentAttendance(); 
//         timeInAudio.play();
//     })
//     .catch(error => {
//         console.error('Error recording attendance:', error);
//     });
// }

// function fetchProfileData(rfid = '') {
//     fetch(`/attendanceProfile?rfid=${rfid}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.fullName) {
//                 document.getElementById('FullName').textContent = data.fullName; 
//             }
//             if (data.callSign) {
//                 document.getElementById('CallSign').textContent = data.callSign; 
//             }
//             if (data.dutyHours) {
//                 document.getElementById('DutyHours').textContent = data.dutyHours; 
//             }
//             if (data.fireResponsePoints) {
//                 document.getElementById('FireResponsePoints').textContent = data.fireResponsePoints; 
//             }
//             if (data.inventoryPoints) {
//                 document.getElementById('InventoryPoints').textContent = data.inventoryPoints; 
//             }
//             if (data.activityPoints) {
//                 document.getElementById('ActivityPoints').textContent = data.activityPoints; 
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching profile data:', error);
//         });
// }



// function fetchRecentAttendance() {
//     fetch('/recentAttendance')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const attendanceLogs = document.getElementById('attendanceLogs');
//             attendanceLogs.innerHTML = ''; // Clear existing logs
//             data.forEach(record => {
//                 const row = document.createElement('tr');
//                 const dateFormatted = new Date(record.dateOfTimeIn).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                 }); // Format date to "Month Day, Year"

//                 const timeInFormatted = record.timeIn.substring(0, 5); // Remove seconds from timeIn
//                 const timeOutFormatted = record.timeOut ? record.timeOut.substring(0, 5) : 'N/A'; // Remove seconds from timeOut

//                 row.innerHTML = `
//                     <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
//                     <td class="py-2 px-4 border-b border-r">${timeInFormatted}</td>
//                     <td class="py-2 px-4 border-b border-r">${timeOutFormatted}</td>
//                     <td class="py-2 px-4 border-b border-r">${dateFormatted}</td>
//                 `;
//                 attendanceLogs.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching recent attendance logs:', error);
//         });
// }




document.addEventListener('DOMContentLoaded', function() {
    const rfidInput = document.createElement('input');
    rfidInput.style.position = 'absolute';
    rfidInput.style.opacity = 0;
    rfidInput.style.top = '-9999px';
    document.body.appendChild(rfidInput);
    rfidInput.focus();

    function focusRFIDInput() {
        rfidInput.focus();
    }

    document.addEventListener('click', function() {
        focusRFIDInput();
    });

    rfidInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const rfidValue = rfidInput.value.trim();
            rfidInput.value = '';
            console.log('RFID Scanned:', rfidValue);
            handleRFIDScan(rfidValue);
        }
    });

    // Fetch profile data when page loads
    fetchProfileData(); 
    fetchRecentAttendance(); 
});

function handleRFIDScan(rfid) {
    document.getElementById('rfidText').textContent = rfid;
    console.log('Handling RFID scan:', rfid);

    fetch('/recordTimeIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rfid: rfid })
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                // If Time In already exists, record Time Out instead
                return fetch('/recordTimeOut', {
                    method: 'POST', // Logic to handle recording Time Out
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rfid: rfid })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Update Time Out display
                    document.getElementById('TimeOut').textContent = data.timeOut; 
                    // Fetch updated profile data after recording Time Out
                    fetchProfileData(rfid);
                    fetchRecentAttendance();
                    timeOutAudio.play();
                });
            } else {
                throw new Error('Network response was not ok');
            }
        }
        return response.json();
    })
    .then(data => {
        // Update Time In display
        if (data.timeIn) {
            document.getElementById('TimeIn').textContent = data.timeIn; 
            // Clear Time Out fields if no Time Out record exists
            document.getElementById('TimeOut').textContent = '--:--'; 
        }
        // Fetch updated profile data after recording Time In
        fetchProfileData(rfid); // Fetch profile data after recording Time In
        fetchRecentAttendance(); // Fetch recent attendance logs
        timeInAudio.play();
    })
    .catch(error => {
        console.error('Error recording attendance:', error);
    });
}

function fetchProfileData(rfid = '') {
    fetch(`/attendanceProfile?rfid=${rfid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.fullName) {
                document.getElementById('FullName').textContent = data.fullName; 
            }
            if (data.callSign) {
                document.getElementById('CallSign').textContent = data.callSign; 
            }
            if (data.dutyHours) {
                document.getElementById('DutyHours').textContent = `${data.dutyHours} Duty Hours`;
            }
            if (data.fireResponsePoints) {
                document.getElementById('FireResponsePoints').textContent = `${data.fireResponsePoints} Fire Responses`;
            }
            if (data.inventoryPoints) {
                document.getElementById('InventoryPoints').textContent = data.inventoryPoints; 
            }
            if (data.activityPoints) {
                document.getElementById('ActivityPoints').textContent = data.activityPoints; 
            }
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
}

function fetchRecentAttendance() {
    fetch('/recentAttendance')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const attendanceLogs = document.getElementById('attendanceLogs');
            attendanceLogs.innerHTML = ''; // Clear existing logs
            data.forEach(record => {
                const row = document.createElement('tr');
                const dateFormatted = new Date(record.dateOfTimeIn).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }); // Format date to "Month Day, Year"

                const timeInFormatted = record.timeIn.substring(0, 5); // Remove seconds from timeIn
                const timeOutFormatted = record.timeOut ? record.timeOut.substring(0, 5) : '--:--'; // Remove seconds from timeOut

                row.innerHTML = `
                    <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                    <td class="py-2 px-4 border-b border-r">${timeInFormatted}</td>
                    <td class="py-2 px-4 border-b border-r">${timeOutFormatted}</td>
                    <td class="py-2 px-4 border-b border-r">${dateFormatted}</td>
                `;
                attendanceLogs.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching recent attendance logs:', error);
        });
}
