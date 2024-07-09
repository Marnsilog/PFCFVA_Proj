//for attendance




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
                // if Time In already exists, record Time Out instead
                return fetch('/recordTimeOut', {
                    method: 'POST', // logic to handle recording Time Out
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
                    document.getElementById('TimeOut').textContent = data.timeOut; 
                    document.getElementById('DateTimeOut').textContent = data.dateOfTimeOut; 
                    // Fetch updated profile data after recording attendance
                    fetchProfileData(rfid); // Fetch profile data after recording Time Out
                    fetchRecentAttendance();
                });
            } else {
                throw new Error('Network response was not ok');
            }
        }
        return response.json();
    })
    .then(data => {
        if (data.timeIn) {
            document.getElementById('TimeIn').textContent = data.timeIn; 
            document.getElementById('DateTimeIn').textContent = data.dateOfTimeIn; 
            // Clear Time Out fields if no Time Out record exists
            document.getElementById('TimeOut').textContent = 'Put TimeOut value here'; 
            document.getElementById('DateTimeOut').textContent = 'DateTimeOut here'; 
        }
        // Fetch updated profile data after recording attendance
        fetchProfileData(rfid); // Fetch profile data after recording Time In
        fetchRecentAttendance(); 
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
                document.getElementById('DutyHours').textContent = data.dutyHours; 
            }
            if (data.fireResponsePoints) {
                document.getElementById('FireResponsePoints').textContent = data.fireResponsePoints; 
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
                }); // Change: Format date to "Month Day, Year"
                row.innerHTML = `
                    <td class="py-2 px-4 border-b">${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                    <td class="py-2 px-4 border-b border-r">${record.timeIn}</td>
                    <td class="py-2 px-4 border-b border-r">${record.timeOut || 'N/A'}</td>
                    <td class="py-2 px-4 border-b border-r">${dateFormatted}</td>
                `;
                attendanceLogs.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching recent attendance logs:', error);
        });
}




// //working for retrieving profile
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
// });

// function handleRFIDScan(rfid) {
//     document.getElementById('rfidText').textContent = rfid;
//     console.log('Handling RFID scan:', rfid);
//     fetchProfileData(rfid);
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
//             document.getElementById('FullName').textContent = data.fullName;
//             document.getElementById('CallSign').textContent = data.callSign;
//             document.getElementById('DutyHours').textContent = data.dutyHours;
//             document.getElementById('FireResponsePoints').textContent = data.fireResponsePoints;
//             document.getElementById('InventoryPoints').textContent = data.inventoryPoints;
//             document.getElementById('ActivityPoints').textContent = data.activityPoints;
//         })
//         .catch(error => {
//             console.error('Error fetching profile data:', error);
//         });
// }
































// //working recent
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
// });

// function handleRFIDScan(rfid) {
//     document.getElementById('rfidText').textContent = rfid;
//     console.log('Handling RFID scan:', rfid);
//     fetchProfileData();
//     // Record attendance based on the RFID
//     recordAttendance(rfid);
// }

// function recordAttendance(rfid) {
//     fetch('/recordAttendance', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ rfid: rfid })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Attendance recorded successfully:', data);
//         if (data.timeInStatus === 1) {
//             document.getElementById('TimeIn').textContent = data.timeIn;
//             document.getElementById('DateTimeIn').textContent = data.dateOfTimeIn;
//         } else {
//             document.getElementById('TimeOut').textContent = data.timeOut;
//             document.getElementById('DateTimeOut').textContent = data.dateOfTimeOut;
//             document.getElementById('DutyHours').textContent = data.dutyHours;
//         }

//         // Fetch updated profile data
//         fetchProfileData(rfid);
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
//             document.getElementById('FullName').textContent = data.fullName;
//             document.getElementById('CallSign').textContent = data.callSign;
//             document.getElementById('DutyHours').textContent = data.dutyHours;
//             document.getElementById('FireResponsePoints').textContent = data.fireResponsePoints;
//             document.getElementById('InventoryPoints').textContent = data.inventoryPoints;
//             document.getElementById('ActivityPoints').textContent = data.activityPoints;
//         })
//         .catch(error => {
//             console.error('Error fetching profile data:', error);
//         });
// }





































//  // Event listener to handle RFID input
//  document.addEventListener('DOMContentLoaded', function() {
//     const rfidInput = document.getElementById('rfidInput');
//     rfidInput.focus();

//     rfidInput.addEventListener('keypress', function(event) {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             // Handle RFID scan
//             const rfidValue = rfidInput.value;
//             rfidInput.value = ''; // Clear the input for the next scan
//             console.log('RFID Scanned:', rfidValue); // You can remove this line in production

//             // Call your function to handle the RFID value
//             handleRFIDScan(rfidValue);
//         }
//     });
// });

// function handleRFIDScan(rfid) {
//     // Handle the RFID scan logic here
//     console.log('Handling RFID scan:', rfid); // You can remove this line in production
//     // You can add your code here to handle the scanned RFID value
// }








// document.addEventListener('DOMContentLoaded', function() {
//     const rfidInput = document.getElementById('rfidInput');
//     rfidInput.focus();

//     rfidInput.addEventListener('keypress', function(event) {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             // Handle RFID scan
//             const rfidValue = rfidInput.value;
//             rfidInput.value = ''; // Clear the input for the next scan
//             console.log('RFID Scanned:', rfidValue); // You can remove this line in production

//             // Call your function to handle the RFID value
//             handleRFIDScan(rfidValue);
//         }
//     });
// });

// function handleRFIDScan(rfid) {
//     // Handle the RFID scan logic here
//     console.log('Handling RFID scan:', rfid); // You can remove this line in production

//     // Example: Make an AJAX call to record attendance
//     fetch('/recordAttendance', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ rfid: rfid })
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error('Error recording attendance');
//         }
//     })
//     .then(data => {
//         // Update the UI with the response data
//         document.getElementById('FullName').textContent = data.fullName;
//         document.getElementById('CallSign').textContent = data.callSign;
//         document.getElementById('DutyHours').textContent = data.dutyHours;
//         document.getElementById('FireResponsePoints').textContent = data.fireResponsePoints;
//         document.getElementById('InventoryPoints').textContent = data.inventoryPoints;
//         document.getElementById('ActivityPoints').textContent = data.activityPoints;
//         document.getElementById('TimeIn').textContent = data.timeIn;
//         document.getElementById('DateTimeIn').textContent = data.dateTimeIn;
//         document.getElementById('TimeOut').textContent = data.timeOut;
//         document.getElementById('DateTimeOut').textContent = data.dateTimeOut;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Error recording attendance');
//     });
// }

