
//ADD EQUIPMENT FORM TOGGLE
function toggleEquipmentForm() {
    var addForm = document.getElementById('addForm');
    if (addForm.style.display === 'none' || v.style.display === '') {
     
        addForm.style.display = 'block';
    } else {
      
        addForm.style.display = 'none';
    }
}
document.getElementById('addEquipmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/auth/addEquipment', {
        method: 'POST',
        body: formData,
    })
    .then((response) => {
        // Check if the response is OK
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.message || 'Failed to add equipment.');
            });
        }
        return response.json();
    })
    .then((data) => {
        if (data.success) {
            alert('Equipment successfully added.'); 
            document.getElementById('addEquipmentForm').reset();
            addForm.style.display = 'none';
            loadEquipment();
        } else {
            alert('Failed to add equipment: ' + data.message); 
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add equipment: ' + error.message);
    });
});


// document.getElementById('addEquipmentForm').addEventListener('submit', function (event) {
//     var form = document.getElementById('addEquipmentForm');
//     var addForm = document.getElementById('addForm');
//     event.preventDefault();

//     const formData = new FormData(this);

//     fetch('/auth/addEquipment', {
//         method: 'POST',
//         body: formData,
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         if (data.success) {
//             alert('Equipment successfully added.'); 
//             document.getElementById('addEquipmentForm').reset();
//             addForm.style.display = 'none';
//             loadEquipment();
//         } else {
//             alert('Failed to add equipment.'); 
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('Failed to add equipment.');
//     });
// });

  
//CLOSE FOR Add equipment
function closeForm() {
    var addForm = document.getElementById('addForm');
    addForm.style.display = 'none';
}

//TRASH EQUIPMENT TOGGLE
function toggleTrashForm() {
    const equipmentContainer = document.getElementById('equipmentContainer');
    const trashContainer = document.getElementById('trashContainer');
    const btnTrash = document.getElementById('btnTrash');
    const searchBox = document.getElementById('inventorySearchBox'); 
    const dropdown = document.getElementById('sortVehicleAssignment'); 

    // Toggle visibility between equipmentContainer and trashContainer
    if (trashContainer.style.display === 'none' || trashContainer.style.display === '') {
        equipmentContainer.style.display = 'none';
        trashContainer.style.display = 'flex';  // Maintain flex properties
        btnTrash.innerText = 'Back';  // Change button text to "Back"
        loadTrash(); 
        searchBox.id = 'trashSearchBox';
        dropdown.id = 'trashSortbox';
        document.getElementById('trashSearchBox').addEventListener('input', function() {
            const searchQuery = this.value.trim();
            loadTrash(searchQuery); 
        });
        document.getElementById('trashSortbox').addEventListener('change', function() {
            const selectedValue = this.value;
            loadTrash(selectedValue); 
        });
    } else {
        trashContainer.style.display = 'none';
        equipmentContainer.style.display = 'flex';  
        btnTrash.innerText = 'Trash'; 
        dropdown.id = 'sortVehicleAssignment';
        searchBox.id = 'inventorySearchBox';
    }
}



//MOVE TO TRASH EQIPMENT 
function moveToTrash(itemID) {
    if (confirm(`Are you sure you want to move to the trash?`)) {
        const deleteButton = document.querySelector(`[onclick="moveToTrash('${itemID}')"]`);
        deleteButton.disabled = true; 

        fetch(`/moveToTrash/${encodeURIComponent(itemID)}`, {
            method: 'PUT'
        })
        .then(response => {
            deleteButton.disabled = false; 
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text || 'Failed to move equipment to trash'); });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadEquipment();
        })
        .catch(error => {
            console.error('Error moving equipment to trash:', error);
            alert('Error moving equipment to trash: ' + error.message);
        });
    }
}

let currentItemToDelete = null; 
function openPasswordModal(itemID) {
    currentItemToDelete = itemID;  // Store the item name
    const passwordModal = document.getElementById("passwordModal");
    passwordModal.classList.remove("hidden");
}

function closePasswordModal() {
    const passwordModal = document.getElementById("passwordModal");
    passwordModal.classList.add("hidden");
}
function handlePasswordConfirmation() {
    const passwordInput = document.getElementById("passwordInput").value;  

    if (!currentItemToDelete || !passwordInput) {
        alert("Please enter your password.");
        return;
    }
    fetch(`/deleteFromTrash/${encodeURIComponent(currentItemToDelete)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })  
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text || 'Failed to delete equipment'); });
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        loadTrash();  // Reload the trash list after permanent deletion
        closePasswordModal();  // Close the modal
    })
    .catch(error => {
        console.error('Error deleting equipment from trash:', error);
        alert('Error deleting equipment from trash: ' + error.message);
    });
}
document.getElementById("confirmButton").addEventListener("click", handlePasswordConfirmation);

document.getElementById("cancelButton").addEventListener("click", closePasswordModal);

function deleteFromTrash(itemID) {
    openPasswordModal(itemID); 
}



/////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    loadVehicleAssignments();
    EditAddVehicleAssignments();
    loadAddVehicleAssignments();
    loadEquipment();
});
function EditAddVehicleAssignments() {
    fetch('/getVehicleAssignments')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('editvehicleAssignment');
            selectElement.innerHTML = ''; // Clear existing options

            const options = data.map(item => `<option value="${item.vehicleName}">${item.vehicleName}</option>`).join('');
            selectElement.innerHTML += options;
        })
        .catch(error => console.error('Error loading vehicle assignments:', error));
}
function loadAddVehicleAssignments() {
    fetch('/getVehicleAssignments')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('addvehicleAssignment');
            selectElement.innerHTML = '<option value="">All Vehicles</option>';

            // Check if data is not null and has content
            if (data && data.length > 0) {
                data.forEach(item => {
                    selectElement.innerHTML += `<option value="${item.vehicleName}">${item.vehicleName}</option>`;
                });
            } else {
                console.error('No vehicle assignments found');
            }
        })
        .catch(error => console.error('Error loading vehicle assignments:', error));
}
function loadVehicleAssignments() {
    fetch('/getVehicleAssignments')
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById('sortVehicleAssignment');
        selectElement.innerHTML = '<option value="">All Vehicles</option>';  // Reset options

        data.forEach(item => {
            selectElement.innerHTML += `<option value="${item.vehicleName}">${item.vehicleName}</option>`;
        });
    })
    .catch(error => console.error('Error loading vehicle assignments:', error));
}

//Sorting
document.getElementById('sortVehicleAssignment').addEventListener('change', function() {
    const selectedValue = this.value;
    loadEquipment(selectedValue); 
});

document.getElementById('inventorySearchBox').addEventListener('input', function() {
    const searchQuery = this.value.trim();
    loadEquipment(searchQuery); 
});


// function loadEquipment(vehicleAssignment) {
//     const url = vehicleAssignment ? `/getEquipment?vehicleAssignment=${vehicleAssignment}` : '/getEquipment';
    
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         const equipmentGrid = document.getElementById('equipmentGrid');
//         equipmentGrid.innerHTML = '';  
//         data.forEach(item => {
//             equipmentGrid.innerHTML += `
//                 <div class="w-full bg-gray-300 h-28 mx-3 rounded-xl flex justify-between">
//                     <div class="flex justify-normal space-x-5 py-2">
//                         <p class="py-8 ml-5 text-3xl">${item.itemName}</p>
//                         <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md">
//                     </div>
//                     <div class="flex justify-normal space-x-10 mr-10 py-8">
//                         <svg class="w-10 h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red" onclick="moveToTrash('${item.itemID}')">
//                             <!-- Trash Icon -->
//                         </svg>
//                     </div>
//                 </div>
//             `;
//         });
//     })
//     .catch(error => console.error('Error loading equipment:', error));
// }

// Load vehicle assignments into the select element
function loadEquipment(search = '') {
    
    const url = search ? `/getEquipment?search=${encodeURIComponent(search)}` : '/getEquipment'; 

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('equipmentGrid');
            if (!container) return;

            container.innerHTML = ''; // Clear previous contents

            data.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'md:w-full w-full bg-gray-300 h-14 md:h-28 rounded-xl flex justify-between md:mx-0'; // Match the class names
            
                div.innerHTML = `
                    <div class="flex justify-normal space-x-5 py-2">
                        <p class="md:py-8 md:ml-5 ml-3 text-xl py-2 md:text-3xl">${index + 1}</p> <!-- Sequential numbering based on the index -->
                        <img src="${item.itemImage}" class="object-fill w-10 h-10 md:w-24 md:h-24 rounded-md" alt="Equipment Image"> <!-- Image for equipment -->
                        <div class="md:w-full w-full flex justify-start md:justify-between">
                            <p class="md:py-8 py-2 md:ml-5 text-sm md:text-2xl font-bold">${item.itemName}</p> <!-- Equipment name -->
                            <p class="md:py-8 py-2 md:ml-5 text-sm md:text-xl font-[300] pl-6">${item.vehicleAssignment}</p> <!-- Vehicle assignment -->
                        </div>
                    </div>
                    <div class="flex justify-normal md:space-x-5 space-x-1 mr-2 py-2 md:mr-10 md:py-8">
                        <!-- Delete icon: Passing itemID to moveToTrash function -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="md:w-10 md:h-10 w-7 h-7 cursor-pointer mt-1" onclick="moveToTrash('${item.itemID}')" viewBox="0 -960 960 960" fill="black"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        <!-- Edit icon -->
                        <svg class="md:w-8 md:h-8 w-5 h-6 cursor-pointer mt-[5px] md:mt-2" onclick="editEquipment('${item.itemID}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                    </div>
                `;
            
                container.appendChild(div); // Append the created div to the container
            });
            
        })
        .catch(error => {
            console.error('Error loading equipment:', error);
        });
}
// function loadEquipment(search = '') {
    
//     const url = search ? `/getEquipment?search=${encodeURIComponent(search)}` : '/getEquipment'; 

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const container = document.getElementById('equipmentGrid');
//             if (!container) return;

//             container.innerHTML = ''; // Clear previous contents

//             data.forEach((item, index) => {
//                 const div = document.createElement('div');
//                 div.className = 'md:w-full w-full bg-gray-300 h-14 md:h-28 rounded-xl flex justify-between md:mx-0'; // Match the class names
            
//                 div.innerHTML = `
//                     <div class="flex justify-normal space-x-5 py-2">
//                         <p class="md:py-8 md:ml-5 ml-3 text-xl py-2 md:text-3xl">${index + 1}</p> <!-- Sequential numbering based on the index -->
//                         <img src="${item.itemImage}" class="object-fill w-10 h-10 md:w-24 md:h-24 rounded-md" alt="Equipment Image"> <!-- Image for equipment -->
//                         <div class="md:w-full w-full flex justify-start md:justify-between">
//                             <p class="md:py-8 py-2 md:ml-5 text-sm md:text-2xl font-bold">${item.itemName}</p> <!-- Equipment name -->
//                             <p class="md:py-8 py-2 md:ml-5 text-sm md:text-xl font-[300] pl-6">${item.vehicleAssignment}</p> <!-- Vehicle assignment -->
//                         </div>
//                     </div>
//                     <div class="flex justify-normal md:space-x-5 space-x-1 mr-2 py-2 md:mr-10 md:py-8">
//                         <!-- Delete icon: Passing itemID to moveToTrash function -->
//                         <svg xmlns="http://www.w3.org/2000/svg" class="md:w-10 md:h-10 w-7 h-7 cursor-pointer mt-1" onclick="moveToTrash('${item.itemID}')" viewBox="0 -960 960 960" fill="black"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
//                         <!-- Edit icon -->
//                         <svg class="md:w-8 md:h-8 w-5 h-6 cursor-pointer mt-[5px] md:mt-2" onclick="editEquipment('${item.itemID}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
//                     </div>
//                 `;
            
//                 container.appendChild(div); // Append the created div to the container
//             });
            
//         })
//         .catch(error => {
//             console.error('Error loading equipment:', error);
//         });
// }
function loadTrash(search = '') {
    const url = search ? `/getTrashedEquipment?search=${encodeURIComponent(search)}` : '/getTrashedEquipment'; 

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const trashGrid = document.getElementById('trashGrid');
            if (!trashGrid) return; // Ensure the element exists

            trashGrid.innerHTML = '';  // Clear the grid

            data.forEach((item) => {
                console.log(`${item.itemImage}`);
                const div = document.createElement('div');
                div.className = 'w-full bg-gray-300 h-14 md:h-28 rounded-xl px-10'; // Updated class names for full width, height, and padding
            
                div.innerHTML = `
                    <div class="flex justify-between w-full space-x-5 py-2">
                        <img src="${item.itemImage}" class="object-fill w-10 h-10 md:w-24 md:h-24 rounded-md" alt="Trashed Equipment Image">
                        <p class="md:py-7 ml-5 py-1 text-xl md:text-3xl">${item.itemName}</p>
                        <div class="md:py-6">
                            <svg class="w-8 h-8 md:w-10 md:h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red" onclick="deleteFromTrash('${item.itemID}')">
                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                            </svg>
                        </div>
                    </div>
                `;
            
                trashGrid.appendChild(div); // Append the created div to the grid
            });
            
        })
        .catch(error => console.error('Error loading trash:', error));
}

// function loadEquipment() {
//     fetch('/getEquipment') 
//         .then(response => response.json())
//         .then(data => {
//             const container = document.getElementById('equipmentGrid');
//             if (!container) return;

//             container.innerHTML = ''; 

//             const selectedVehicle = document.getElementById('sortVehicleAssignment') ? document.getElementById('sortVehicleAssignment').value : ''; 
//             const searchQuery = document.getElementById('inventorySearchBox') ? document.getElementById('inventorySearchBox').value.toLowerCase() : ''; 

            
//             const filteredData = data.filter(item => {
//                 const matchesVehicle = selectedVehicle ? item.vehicleAssignment === selectedVehicle : true;
//                 const matchesSearch = item.itemName.toLowerCase().includes(searchQuery);
//                 return matchesVehicle && matchesSearch; 
//             });

           
//             filteredData.forEach((item, index) => {
//                 const div = document.createElement('div');
//                 div.className = 'w-full bg-gray-300 h-28 mx-3 rounded-xl flex justify-between'; // Updated layout class name

//                 div.innerHTML = `
//                     <div class="flex justify-normal space-x-5 py-2">
//                         <p class="py-8 ml-5 text-3xl">${index + 1}</p> <!-- Sequential numbering based on the index -->
//                         <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md" alt="Equipment Image"> <!-- Image for equipment -->
//                         <p class="py-8 ml-5 text-2xl font-bold">${item.itemName}</p> <!-- Equipment name -->
//                         <p class="py-8 ml-5 text-xl font-[300] pl-6">${item.vehicleAssignment}</p> <!-- Vehicle assignment -->
//                     </div>
//                     <div class="flex justify-normal space-x-10 mr-10 py-8">
//                         <!-- Delete icon: Passing itemName to deleteEquipment function -->
//                         <svg class="w-10 h-10 cursor-pointer" onclick="moveToTrash('${item.itemID}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
//                         <!-- Edit icon -->
//                         <svg class="w-8 h-8 cursor-pointer mt-2" onclick="editEquipment('${item.itemID}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
//                     </div>
//                 `;


//                 container.appendChild(div); 
//             });
//         })
//         .catch(error => {
//             console.error('Error loading equipment:', error);
//         });
// }
// TANGGALIN IF DI NA GUMAGANA!
// function deleteEquipment(itemName) {
//     if (confirm(`Are you sure you want to delete ${itemName}?`)) {
//         fetch(`/deleteEquipment/${encodeURIComponent(itemName)}`, {
//             method: 'DELETE'
//         })
//         .then(response => {
//             if (!response.ok) {
//                 return response.text().then(text => { throw new Error(text || 'Failed to delete equipment'); });
//             }
//             return response.json();
//         })
//         .then(data => {
//             alert(data.message);
//             loadEquipment(); // Reload the equipment list after deletion
//         })
//         .catch(error => {
//             console.error('Error deleting equipment:', error);
//             alert('Error deleting equipment: ' + error.message);
//         });
//     }
// }
// function loadTrash() {
//     fetch('/getTrashedEquipment')
//     .then(response => response.json())
//     .then(data => {
//         const trashGrid = document.getElementById('trashGrid');
//         trashGrid.innerHTML = '';  // Clear the grid

//         data.forEach(item => {
//             console.log(`${item.itemImage}`);
//             trashGrid.innerHTML += `
//                 <div class="w-full bg-gray-300 h-28 mx-3 rounded-xl flex justify-between">
//                     <div class="flex justify-normal space-x-5 py-2">
//                         <p class="py-8 ml-5 text-3xl">${item.itemName}</p>
//                         <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md">
//                     </div>
//                     <div class="flex justify-normal space-x-10 mr-10 py-8">
//                         <svg class="w-10 h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red" onclick="deleteFromTrash('${item.itemID}')">
//                             <!-- Delete Icon for permanent deletion from trash -->
//                             <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
//                         </svg>
//                     </div>
//                 </div>
//             `;
//         });
//     })
//     .catch(error => console.error('Error loading trash:', error));
// }

function closeVehicleForm() {
    var form = document.getElementById('addVehicleForm');
    form.classList.add('hidden'); 
}
function toggleVehicleForm() {
    var form = document.getElementById('addVehicleForm');
    form.classList.remove('hidden');

}
document.getElementById('addVehicleForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const vehicleName = document.getElementById('vehicleName').value;
    try {
        const response = await fetch('/auth/add-vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vehicleName })
        });

        const result = await response.json();
        if (result.success) {
            alert('Vehicle added successfully!');
            loadVehicleAssignments();
            EditAddVehicleAssignments();
            loadAddVehicleAssignments();
            var form = document.getElementById('addVehicleForm');
            form.classList.add('hidden');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the vehicle.');
    }
});

function editEquipment(itemId) {
    fetch(`/auth/equipment/${itemId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                document.getElementById('editvehicleAssignment').value = data.data.vehicleAssignment; 
                document.getElementById('name').value = data.data.itemName; 
                const imgElement = document.getElementById('itemImageadsd');
                imgElement.src = data.data.itemImagePath;

                // Store the itemId in a hidden input field
                document.getElementById('itemId').value = itemId;

                document.getElementById('invedit').style.display = 'block';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function saveEquipment() {
    const updatedItemName = document.getElementById('name').value;
    const updatedVehicleAssignment = document.getElementById('editvehicleAssignment').value;
    const itemImageFile = document.getElementById('editImage').files[0];
    
    const itemId = document.getElementById('itemId').value; 
    const formData = new FormData();
    formData.append('updatedItemName', updatedItemName);
    formData.append('updatedVehicleAssignment', updatedVehicleAssignment);
    formData.append('itemImage', itemImageFile);
    formData.append('itemId', itemId); 
    
    fetch('/auth/updateEquipment', {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            loadEquipment();
            exitinvedit();
        } else {
            alert('Update failed');
        }
    })
    .catch(error => {
        console.error('Error updating equipment:', error);
    });
}




function exitinvedit(){

        document.getElementById('itemId').value = '';
        document.getElementById('editImage').value = ''; // Resets the file input
        document.getElementById('itemImageadsd').src = ''; // Reset the image source
        document.getElementById('editvehicleAssignment').selectedIndex = 0; // Resets the select to the first option
        document.getElementById('name').value = '';
    var invedit = document.getElementById('invedit');
    invedit.style.display = 'none';

}

//INVTORY STATUS LOG






