
//for attendance NAV
function fetchAndDisplayAttendanceLogs(url, attendanceLogsElement, searchBoxElement) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            function displayAttendanceData(records) { 
                attendanceLogsElement.innerHTML = ''; 
                records.forEach(record => {
                    const row = document.createElement('tr');
                    const dateFormattedTimeIn = new Date(record.dateOfTimeIn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    const dateFormattedTimeOut = record.dateOfTimeOut ? new Date(record.dateOfTimeOut).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : '-';
                    
                    row.innerHTML = `
                        <td>${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                        <td>${record.callSign}</td>
                        <td>${dateFormattedTimeIn}</td>
                        <td>${record.timeIn}</td>
                        <td>${dateFormattedTimeOut}</td>
                        <td>${record.timeOut || '-'}</td>
                    `;
                    attendanceLogsElement.appendChild(row);
                });
            }

            // Initial display of data
            displayAttendanceData(data);

            // Add event listener to search box
            searchBoxElement.addEventListener('input', function() {
                const searchTerm = searchBoxElement.value.toLowerCase();
                const filteredData = data.filter(record => {
                    const fullName = `${record.firstName} ${record.middleInitial}. ${record.lastName}`.toLowerCase();
                    const callSign = record.callSign.toLowerCase();
                    const dateOfTimeIn = new Date(record.dateOfTimeIn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }).toLowerCase();

                    // Match search term with full name, call sign, or date of time in
                    return fullName.includes(searchTerm) || 
                           callSign.includes(searchTerm) ||
                           dateOfTimeIn.includes(searchTerm);
                });
                displayAttendanceData(filteredData);
            });
        })
        .catch(error => {
            console.error('Error fetching attendance logs:', error);
        });
}

// Usage
document.addEventListener('DOMContentLoaded', function() {
    const attendanceLogs = document.getElementById('attendanceLogs');
    const searchBox = document.getElementById('attendanceSearchBox');
    fetchAndDisplayAttendanceLogs('/attendanceDetails', attendanceLogs, searchBox);
});




//for Volunteer Accounts Configuration
document.addEventListener('DOMContentLoaded', function() {
    fetch('/accountsAll')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const volunteerAccountsDetails = document.getElementById('volunteerAccountsDetails');
            const searchBox = document.getElementById('volunteerAccountsSearchBox');
            const sortByMeritTracking = document.getElementById('sortByMeritTracking');

            function createRow(record) {
                const rank = record.callSign.replace(/\d/g, ''); // Remove numbers from callSign
                return `
                    <tr>
                        <td class="py-2 px-4">
                            <a href="/admin_edit_volunter?accountID=${record.accountID}" class="hover:underline text-blue-500" onclick="showEdit()">
                                ${record.firstName} ${record.middleInitial}. ${record.lastName}
                            </a>
                        </td>
                        <td>${record.callSign}</td>
                        <td>${rank}</td>
                        <td>${record.accountType}</td>
                        <td>${record.status}</td>
                    </tr>
                `;
            }

            function displayAttendanceData(records) {
                volunteerAccountsDetails.innerHTML = ''; // Clear existing logs
                if (records.length === 0) {
                    volunteerAccountsDetails.innerHTML = '<tr><td colspan="5">No records found.</td></tr>';
                    return;
                }
                volunteerAccountsDetails.innerHTML = records.map(createRow).join('');
            }

            displayAttendanceData(data); // Display initial data

            // Search functionality
            searchBox.addEventListener('input', function() {
                const searchTerm = searchBox.value.toLowerCase();
                const filteredData = data.filter(record => {
                    const fullName = `${record.firstName} ${record.middleInitial}. ${record.lastName}`.toLowerCase();
                    return fullName.includes(searchTerm);
                });
                displayAttendanceData(filteredData);
            });

            // Sort functionality
            sortByMeritTracking.addEventListener('change', function() {
                const sortBy = sortByMeritTracking.value.toLowerCase();
                let sortedData = [...data]; // Create a copy of the data

                if (sortBy === 'name') {
                    sortedData.sort((a, b) => `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`)); // Descending
                } else if (sortBy === 'callsign') {
                    sortedData.sort((a, b) => b.callSign.localeCompare(a.callSign)); // Descending
                } else if (sortBy === 'rank') {
                    sortedData.sort((a, b) => {
                        const rankA = a.callSign.replace(/\d/g, ''); // Remove numbers from callSign
                        const rankB = b.callSign.replace(/\d/g, '');
                        return rankB.localeCompare(rankA); // Descending
                    });
                } else if (sortBy === 'accounttype') {
                    sortedData.sort((a, b) => b.accountType.localeCompare(a.accountType)); // Descending
                } else if (sortBy === 'status') {
                    sortedData.sort((a, b) => b.status.localeCompare(a.status)); // Descending
                } else if (sortBy === 'dutyhours') {
                    sortedData.sort((a, b) => b.dutyHours - a.dutyHours); // Descending
                } else if (sortBy === 'cumulativedutyhours') {
                    sortedData.sort((a, b) => b.cumulativeDutyHours - a.cumulativeDutyHours); // Descending
                } else if (sortBy === 'fireresponse') {
                    sortedData.sort((a, b) => b.fireResponse - a.fireResponse); // Descending
                } else if (sortBy === 'inventory') {
                    sortedData.sort((a, b) => b.inventory - a.inventory); // Descending
                }

                displayAttendanceData(sortedData); // Display sorted data
            });
        })
        .catch(error => {
            // Error handling: Notify the user
            console.error('Error fetching recent attendance logs:', error);
        });
});

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/accountsAll')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const volunteerAccountsDetails = document.getElementById('volunteerAccountsDetails');
//             const searchBox = document.getElementById('volunteerAccountsSearchBox');
//             const sortByMeritTracking = document.getElementById('sortByMeritTracking');

//             function createRow(record) {
//                 const rank = record.callSign.replace(/\d/g, ''); // Remove numbers from callSign
//                 return `
//                     <tr>
//                         <td class="py-2 px-4">
//                             <a href="/admin_edit_volunter?accountID=${record.accountID}" class="hover:underline text-blue-500" onclick="showEdit()">
//                                 ${record.firstName} ${record.middleInitial}. ${record.lastName}
//                             </a>
//                         </td>
//                         <td>${record.callSign}</td>
//                         <td>${rank}</td>
//                         <td>${record.accountType}</td>
//                         <td>${record.status}</td>
//                     </tr>
//                 `;
//             }

//             function displayAttendanceData(records) {
//                 volunteerAccountsDetails.innerHTML = ''; // Clear existing logs
//                 if (records.length === 0) {
//                     volunteerAccountsDetails.innerHTML = '<tr><td colspan="5">No records found.</td></tr>';
//                     return;
//                 }
//                 volunteerAccountsDetails.innerHTML = records.map(createRow).join('');
//             }

//             displayAttendanceData(data); // Display initial data

//             // Search functionality
//             searchBox.addEventListener('input', function() {
//                 const searchTerm = searchBox.value.toLowerCase();
//                 const filteredData = data.filter(record => {
//                     const fullName = `${record.firstName} ${record.middleInitial}. ${record.lastName}`.toLowerCase();
//                     return fullName.includes(searchTerm);
//                 });
//                 displayAttendanceData(filteredData);
//             });

//             // Sort functionality
//             sortByMeritTracking.addEventListener('change', function() {
//                 const sortBy = sortByMeritTracking.value;
//                 let sortedData = [...data]; // Create a copy of the data

//                 if (sortBy === 'name') {
//                     sortedData.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
//                 } else if (sortBy === 'callSign') {
//                     sortedData.sort((a, b) => a.callSign.localeCompare(b.callSign));
//                 } else if (sortBy === 'rank') {
//                     sortedData.sort((a, b) => {
//                         const rankA = a.callSign.replace(/\d/g, ''); // Remove numbers from callSign
//                         const rankB = b.callSign.replace(/\d/g, '');
//                         return rankA.localeCompare(rankB);
//                     });
//                 } else if (sortBy === 'accountType') {
//                     sortedData.sort((a, b) => a.accountType.localeCompare(b.accountType));
//                 } else if (sortBy === 'status') {
//                     sortedData.sort((a, b) => a.status.localeCompare(b.status));
//                 }

//                 displayAttendanceData(sortedData); // Display sorted data
//             });
//         })
//         .catch(error => {
//             // Error handling: Notify the user
//             console.error('Error fetching recent attendance logs:', error);
//         });
// });

function fetchVolunteerData() {
    const accountID = new URLSearchParams(window.location.search).get('accountID');
    const element = document.getElementById('volunteer-pic');

    if (!accountID) {
        console.error('Account ID not found in URL.');
        return;
    }

    console.log(`Fetching data for accountID: ${accountID}`);

    fetch(`/auth/get-volunteer-data/${accountID}`)
        .then(response => {
            if (!response.ok) {
                console.error('Response:', response);
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data) {
                console.error('No data found for the volunteer.');
                return;
            }

            const dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
            const formattedDate = dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : '';
            
            let dutyHours = data.cumulativeDutyHours ? Math.round(data.cumulativeDutyHours / 60) : '';

            const inventoryPoints = data.inventoryPoints || ''; // Assuming inventoryPoints is defined or part of data
            
            const fields = {
                HiddenUsername: data.username || '',
                EditaccountType: data.accountType || '',
                EditUsername: data.username || '',
                EditLastName: data.lastName || '',
                EditFirstName: data.firstName || '',
                EditMiddleName: data.middleName || '',
                EditEmailAddress: data.emailAddress || '',
                EditContactNumber: data.mobileNumber || '',
                EditCivilStatus: data.civilStatus || '',
                EditNationality: data.nationality || '',
                EditBloodType: data.bloodType || '',
                EditBirthday: formattedDate || '',
                EditGender: data.gender || '',
                EditCurrentAddress: data.currentAddress || '',
                EditEmergencyContactPerson: data.emergencyContactPerson || '',
                EditEmergencyContactNumber: data.emergencyContactNumber || '',
                EditHighestEducationalAttainment: data.highestEducationalAttainment || '',
                EditNameOfCompany: data.nameOfCompany || '',
                EditYearsInService: data.yearsInService || '',
                EditSkillsTraining: data.skillsTraining || '',
                EditOtherAffiliation: data.otherAffiliation || '',
                editDutyHours: dutyHours || '0',
                editFireResponse: data.fireResponsePoints || '0',
                editActivityPoints: data.activityPoints || '0',
                editInventoryPoints: inventoryPoints || '0'
            };
            

            element.src = data.idPicture || 'img/user.png'; 
            Object.keys(fields).forEach(id => {
                const field = document.getElementById(id);
                if (field) {
                    field.value = fields[id] || '';
                } 
            });
        })
        .catch(error => {
            alert('Failed to load volunteer accounts. Please try again later.');
            console.error('Error fetching volunteer details:', error.message);
        });
}

window.addEventListener('load', function() {
    if (window.location.pathname === '/admin_edit_volunter') {
        fetchVolunteerData();
    } else if (window.location.pathname === '/admin_attendance_logs') {
        const attendanceLogs = document.getElementById('attendanceLogs');
        const searchBox = document.getElementById('attendanceSearchBox');
        fetchAndDisplayAttendanceLogs('/attendanceDetails', attendanceLogs, searchBox);
    }
});

//Merit Tracking Nav
document.addEventListener('DOMContentLoaded', function() {
    fetch('/volunteerDetails')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const volunteerDetails = document.getElementById('volunteerDetails');
            const searchBox = document.getElementById('volunteerSearchBox');
            const sortByMeritTracking = document.getElementById('sortByMeritTracking'); // Reference to the sort dropdown

            // Function to display the data
            function displayData(records) {
                volunteerDetails.innerHTML = ''; 
                records.forEach(record => {
                    const dutyHours = record.dutyHours || 0; 
                    const cumulativeDutyHours = record.cumulativeDutyHours || 0; 
                    const row = document.createElement('tr');
                    const rank = record.callSign.replace(/\d/g, ''); // Remove numbers from callSign
                    row.innerHTML = `
                        <td>${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
                        <td>${record.callSign}</td>
                        <td>${rank}</td>
                        <td>${dutyHours}</td>
                        <td>${cumulativeDutyHours}</td>
                        <td>${record.fireResponsePoints}</td>
                        <td>${record.inventoryPoints}</td>
                        <td>${record.activityPoints}</td>
                    `;
                    volunteerDetails.appendChild(row);
                });
            }

            // Initial display of data
            displayData(data);

            // Add event listener to search box
            searchBox.addEventListener('input', function() {
                const searchTerm = searchBox.value.toLowerCase();
                const filteredData = data.filter(record => {
                    const fullName = `${record.firstName} ${record.middleInitial}. ${record.lastName}`.toLowerCase();
                    return fullName.includes(searchTerm);
                });
                displayData(filteredData); // Call displayData with filtered data
            });

            // Add event listener to sort dropdown
            sortByMeritTracking.addEventListener('change', function() {
                const sortBy = sortByMeritTracking.value;
                let sortedData;

                // Sort the data based on selected option
                switch (sortBy) {
                    case 'Name':
                        sortedData = data.sort((a, b) => {
                            const nameA = `${a.firstName} ${a.middleInitial}. ${a.lastName}`.toLowerCase();
                            const nameB = `${b.firstName} ${b.middleInitial}. ${b.lastName}`.toLowerCase();
                            return nameA.localeCompare(nameB);
                        });
                        break;
                    case 'CallSign':
                        sortedData = data.sort((a, b) => a.callSign.localeCompare(b.callSign));
                        break;
                    case 'Rank':
                        sortedData = data.sort((a, b) => {
                            const rankA = a.callSign.replace(/\d/g, '').toLowerCase(); // Remove numbers for rank
                            const rankB = b.callSign.replace(/\d/g, '').toLowerCase();
                            return rankA.localeCompare(rankB);
                        });
                        break;
                    case 'DutyHours':
                        sortedData = data.sort((a, b) => (a.dutyHours || 0) - (b.dutyHours || 0));
                        break;
                    case 'CumulativeDutyHours':
                        sortedData = data.sort((a, b) => (a.cumulativeDutyHours || 0) - (b.cumulativeDutyHours || 0));
                        break;
                    case 'FireResponse':
                        sortedData = data.sort((a, b) => a.fireResponsePoints - b.fireResponsePoints);
                        break;
                    case 'Inventory':
                        sortedData = data.sort((a, b) => a.inventoryPoints - b.inventoryPoints);
                        break;
                    case 'Activity':
                        sortedData = data.sort((a, b) => a.activityPoints - b.activityPoints);
                        break;
                    default:
                        sortedData = data; // No sorting
                }

                displayData(sortedData); // Call displayData with sorted data
            });
        })
        .catch(error => {
            console.error('Error fetching volunteer details:', error);
        });
});

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/volunteerDetails')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const volunteerDetails = document.getElementById('volunteerDetails');
//             const searchBox = document.getElementById('volunteerSearchBox');
//             const sortByMeritTracking = document.getElementById('sortByMeritTracking'); // Reference to the sort dropdown

//             // Function to display the data
//             function displayData(records) {
//                 volunteerDetails.innerHTML = ''; 
//                 records.forEach(record => {
//                     const row = document.createElement('tr');
//                     const rank = record.callSign.replace(/\d/g, ''); // Remove numbers from callSign
//                     row.innerHTML = `
//                         <td>${record.firstName} ${record.middleInitial}. ${record.lastName}</td>
//                         <td>${record.callSign}</td>
//                         <td>${rank}</td>
//                         <td>${record.dutyHours}</td>
//                         <td>${record.cumulativeDutyHours}</td>
//                         <td>${record.fireResponsePoints}</td>
//                         <td>${record.inventoryPoints}</td>
//                         <td>${record.activityPoints}</td>
//                     `;
//                     volunteerDetails.appendChild(row);
//                 });
//             }

//             // Initial display of data
//             displayData(data);

//             // Add event listener to search box
//             searchBox.addEventListener('input', function() {
//                 const searchTerm = searchBox.value.toLowerCase();
//                 const filteredData = data.filter(record => {
//                     const fullName = `${record.firstName} ${record.middleInitial}. ${record.lastName}`.toLowerCase();
//                     return fullName.includes(searchTerm);
//                 });
//                 displayData(filteredData); // Call displayData with filtered data
//             });

//             // Add event listener to sort dropdown
//             sortByMeritTracking.addEventListener('change', function() {
//                 const sortBy = sortByMeritTracking.value;
//                 let sortedData;

//                 // Sort the data based on selected option
//                 switch (sortBy) {
//                     case 'Name':
//                         sortedData = data.sort((a, b) => {
//                             const nameA = `${a.firstName} ${a.middleInitial}. ${a.lastName}`.toLowerCase();
//                             const nameB = `${b.firstName} ${b.middleInitial}. ${b.lastName}`.toLowerCase();
//                             return nameA.localeCompare(nameB);
//                         });
//                         break;
//                     case 'CallSign':
//                         sortedData = data.sort((a, b) => a.callSign.localeCompare(b.callSign));
//                         break;
//                     case 'Rank':
//                         sortedData = data.sort((a, b) => {
//                             const rankA = a.callSign.replace(/\d/g, '').toLowerCase(); // Remove numbers for rank
//                             const rankB = b.callSign.replace(/\d/g, '').toLowerCase();
//                             return rankA.localeCompare(rankB);
//                         });
//                         break;
//                     case 'DutyHours':
//                         sortedData = data.sort((a, b) => a.dutyHours - b.dutyHours);
//                         break;
//                     case 'CumulativeDutyHours':
//                         sortedData = data.sort((a, b) => a.cumulativeDutyHours - b.cumulativeDutyHours);
//                         break;
//                     case 'FireResponse':
//                         sortedData = data.sort((a, b) => a.fireResponsePoints - b.fireResponsePoints);
//                         break;
//                     case 'Inventory':
//                         sortedData = data.sort((a, b) => a.inventoryPoints - b.inventoryPoints);
//                         break;
//                     case 'Activity':
//                         sortedData = data.sort((a, b) => a.activityPoints - b.activityPoints);
//                         break;
//                     default:
//                         sortedData = data; // No sorting
//                 }

//                 displayData(sortedData); // Call displayData with sorted data
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching volunteer details:', error);
//         });
// });

//FOR MANUAL ATTENDANCE
function addManualAttendance(){
    var manualAttendance = document.getElementById('manualAttendance');
    if (manualAttendance.style.display === 'none' || manualAttendance.style.display === '') {
        manualAttendance.style.display = 'block';
        applyDateConstraints('dateIn', 'dateOut');
        const attendanceLogs = document.getElementById('attendanceLogs');
        const searchBox = document.getElementById('attendanceSearchBox');
        fetchAndDisplayAttendanceLogs('/attendanceDetails', attendanceLogs, searchBox);
    } else {
        manualAttendance.style.display = 'none';
        const attendanceLogs = document.getElementById('attendanceLogs');
        const searchBox = document.getElementById('attendanceSearchBox');
        fetchAndDisplayAttendanceLogs('/attendanceDetails', attendanceLogs, searchBox);
    }
}

function addVolunteer(){
    var addVolunteerAttendance = document.getElementById('addVolunteerAttendance');
    if (addVolunteerAttendance.style.display === 'none' || addVolunteerAttendance.style.display === '') {
        addVolunteerAttendance.style.display = 'block';
        fetchMembers();
        document.getElementById('searchPerson').addEventListener('input', function() {
            const searchQuery = this.value.trim();
            fetchMembers(searchQuery);
        });

    } else {
        addVolunteerAttendance.style.display = 'none';

    }
}
let selectedMembers = [];
function submitSelectedMembers() {
    const currentPresentDiv = document.getElementById('tbl_volunteers');
    selectedMembers.forEach(member => {
        const row = document.createElement('tr');
        row.classList.add('text-sm', 'text-center');
        row.innerHTML = `
            <td class="py-2 md:px-4 border-b">${member.accountID}</td>
            <td class="py-2 md:px-4 border-b">${member.callSign}</td>
            <td class="py-2 md:px-4 border-b">${member.name}</td>
        `;
        currentPresentDiv.appendChild(row);
    });

    selectedMembers = [];
    var profileForm = document.getElementById('addVolunteerAttendance');
    if (addVolunteerAttendance.style.display === 'none' || addVolunteerAttendance.style.display === '') {
        addVolunteerAttendance.style.display = 'block';
    } else {
      
        addVolunteerAttendance.style.display = 'none';
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
            const tableBody = document.getElementById('volunteer');
            tableBody.innerHTML = ''; 

            data.forEach(member => {
                const row = document.createElement('tr');
                const checkboxId = `checkbox-${member.accountID}`;
                row.innerHTML = `
                    <td class="text-center">${member.accountID}</td>
                    <td class="text-center">${member.callSign}</td>
                    <td class="text-center">${member.firstName} ${member.middleInitial} ${member.lastName}</td>
                    <td class="">
                        <div class="w-full flex justify-center">
                            <input type="checkbox" id="${checkboxId}" date-accountID="${member.accountID}" data-callSign="${member.callSign}" data-name="${member.firstName} ${member.middleInitial} ${member.lastName}">
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
                const checkbox = document.getElementById(checkboxId);
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        selectedMembers.push({
                            accountID: member.accountID,
                            callSign: member.callSign,
                            name: `${member.firstName} ${member.middleInitial} ${member.lastName}`
                        });
                    } else {
                        selectedMembers = selectedMembers.filter(m => m.accountID !== member.accountID);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching members:', error));
}

document.getElementById('submitLogs').addEventListener('click', function (event) {
    event.preventDefault();
    
    // Gather form data
    const attendanceDateIn = document.getElementById('dateIn').value;
    const attendanceTimeIn = document.getElementById('timeIn').value;
    const attendanceDateOut = document.getElementById('dateOut').value;
    const attendanceTimeOut = document.getElementById('timeOut').value;

    // Gather responder data from the table...
    const volunteers = [];  // This is the correct array name
    const rows = document.getElementById('tbl_volunteers').getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const accountID = rows[i].cells[0].innerText;
        volunteers.push({ accountID });  // Corrected the array name here
    }

    // Send data to the server using fetch...
    fetch('/auth/submit-manual-attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attendanceDateIn,
            attendanceTimeIn,
            attendanceDateOut,
            attendanceTimeOut,
            volunteers  // Make sure this matches the correct variable name
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('dateIn').value = '';
            document.getElementById('timeIn').value = '';
            document.getElementById('dateOut').value = '';
            document.getElementById('timeOut').value = '';
            const rows = document.getElementById('tbl_volunteers').getElementsByTagName('tr');
            while (rows.length > 0) {
                rows[0].remove();
            }

            // Hide the form
            document.getElementById('manualAttendance').style.display = 'none'; 
            const attendanceLogs = document.getElementById('attendanceLogs');
            const searchBox = document.getElementById('attendanceSearchBox');
            fetchAndDisplayAttendanceLogs('/attendanceDetails', attendanceLogs, searchBox);
            alert('Attendance successfully logged');
        } else {
            alert('Error logging activity.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function applyDateConstraints(dateInId, dateOutId) {
    const dateInInput = document.getElementById(dateInId);
    const dateOutInput = document.getElementById(dateOutId);
    const currentDate = new Date().toISOString().split('T')[0];
    dateOutInput.setAttribute('max', currentDate);

    dateInInput.oninput = () => {
        const dateInValue = dateInInput.value;
        if (dateInValue) {
            const dateIn = new Date(dateInValue);
            const maxDateOut = new Date(dateIn);
            maxDateOut.setDate(dateIn.getDate() + 2);
            dateOutInput.setAttribute('min', dateInValue);
            dateOutInput.setAttribute('max', maxDateOut.toISOString().split('T')[0]);
        }
    };
}

// document.addEventListener('DOMContentLoaded', () => {
//     applyDateConstraints('dateIn', 'dateOut');
// });