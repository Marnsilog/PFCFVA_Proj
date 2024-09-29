
function toggleEquipmentForm() {
    var form = document.getElementById('addEquipmentForm');
    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden'); 
    } else {
        form.classList.add('hidden'); 
    }
}



function toggleTrashForm() {
    const equipmentContainer = document.getElementById('equipmentContainer');
    const trashContainer = document.getElementById('trashContainer');
    const btnTrash = document.getElementById('btnTrash');

    // Toggle visibility between equipmentContainer and trashContainer
    if (trashContainer.style.display === 'none' || trashContainer.style.display === '') {
        equipmentContainer.style.display = 'none';
        trashContainer.style.display = 'flex';  // Maintain flex properties
        btnTrash.innerText = 'Back';  // Change button text to "Back"
        loadTrash();  // Load trash content when trash is shown
    } else {
        trashContainer.style.display = 'none';
        equipmentContainer.style.display = 'flex';  // Reapply flex properties
        btnTrash.innerText = 'Trash';  // Change button text back to "Trash"
    }
}



function moveToTrash(itemName) {
    if (confirm(`Are you sure you want to move ${itemName} to the trash?`)) {
        const deleteButton = document.querySelector(`[onclick="moveToTrash('${itemName}')"]`);
        deleteButton.disabled = true;  // Disable the button to prevent multiple clicks

        fetch(`/moveToTrash/${encodeURIComponent(itemName)}`, {
            method: 'PUT'
        })
        .then(response => {
            deleteButton.disabled = false;  // Re-enable the button
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text || 'Failed to move equipment to trash'); });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadEquipment();  // Reload the equipment list after moving to trash
        })
        .catch(error => {
            console.error('Error moving equipment to trash:', error);
            alert('Error moving equipment to trash: ' + error.message);
        });
    }
}


function deleteFromTrash(itemName) {
    if (confirm(`Are you sure you want to permanently delete ${itemName}? This action cannot be undone.`)) {
        fetch(`/deleteFromTrash/${encodeURIComponent(itemName)}`, {
            method: 'DELETE'
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
        })
        .catch(error => {
            console.error('Error deleting equipment from trash:', error);
            alert('Error deleting equipment from trash: ' + error.message);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadVehicleAssignments();
    loadAddVehicleAssignments();
    EditAddVehicleAssignments();
});
function EditAddVehicleAssignments() {
    fetch('/getVehicleAssignments')
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById('editvehicleAssignment');
        selectElement.innerHTML = '<option value="">All Vehicles</option>';  // Reset options

        data.forEach(item => {
            selectElement.innerHTML += `<option value="${item.vehicleName}">${item.vehicleName}</option>`;
        });
    })
    .catch(error => console.error('Error loading vehicle assignments:', error));
}
function loadAddVehicleAssignments() {
    fetch('/getVehicleAssignments')
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById('addvehicleAssignment');
        selectElement.innerHTML = '<option value="">All Vehicles</option>';  // Reset options

        data.forEach(item => {
            selectElement.innerHTML += `<option value="${item.vehicleName}">${item.vehicleName}</option>`;
        });
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

document.getElementById('sortVehicleAssignment').addEventListener('change', function() {
    const selectedValue = this.value;
    loadEquipment(selectedValue); 
});

function loadEquipment(vehicleAssignment) {
    const url = vehicleAssignment ? `/getEquipment?vehicleAssignment=${vehicleAssignment}` : '/getEquipment';
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const equipmentGrid = document.getElementById('equipmentGrid');
        equipmentGrid.innerHTML = '';  
        data.forEach(item => {
            equipmentGrid.innerHTML += `
                <div class="w-full bg-gray-300 h-28 mx-3 rounded-xl flex justify-between">
                    <div class="flex justify-normal space-x-5 py-2">
                        <p class="py-8 ml-5 text-3xl">${item.itemName}</p>
                        <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md">
                    </div>
                    <div class="flex justify-normal space-x-10 mr-10 py-8">
                        <svg class="w-10 h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red" onclick="moveToTrash('${item.itemName}')">
                            <!-- Trash Icon -->
                        </svg>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error loading equipment:', error));
}



function loadTrash() {
    fetch('/getTrashedEquipment')
    .then(response => response.json())
    .then(data => {
        const trashGrid = document.getElementById('trashGrid');
        trashGrid.innerHTML = '';  // Clear the grid

        data.forEach(item => {
            trashGrid.innerHTML += `
                <div class="w-full bg-gray-300 h-28 mx-3 rounded-xl flex justify-between">
                    <div class="flex justify-normal space-x-5 py-2">
                        <p class="py-8 ml-5 text-3xl">${item.itemName}</p>
                        <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md">
                    </div>
                    <div class="flex justify-normal space-x-10 mr-10 py-8">
                        <svg class="w-10 h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red" onclick="deleteFromTrash('${item.itemName}')">
                            <!-- Delete Icon for permanent deletion from trash -->
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error loading trash:', error));
}



function closeForm() {
    var form = document.getElementById('addEquipmentForm');
    form.classList.add('hidden'); 
}

function closeVehicleForm() {
    var form = document.getElementById('addVehicleForm');
    form.classList.add('hidden'); 
}


document.addEventListener('DOMContentLoaded', function() {
    
  
    const addEquipmentForm = document.getElementById('addEquipmentForm');
    if (addEquipmentForm) {
        addEquipmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var formData = new FormData(this);

            
            fetch('/uploadEquipment', {
                method: 'POST',
                body: formData 
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text || 'Server responded with status: ' + response.status) });
                }
                return response.json();
            })
            .then(data => {
                alert('Success: ' + data.message);
                closeForm(); 
                window.location.reload(); 
            })
            .catch(error => {2
                console.error('Error:', error);
                alert('Error submitting the form: ' + error.message);
            });
        });
    }

   
    loadEquipment(); 

    
    const sortVehicleAssignment = document.getElementById('sortVehicleAssignment');
    if (sortVehicleAssignment) {
        sortVehicleAssignment.addEventListener('change', loadEquipment); 
    }

  
    const inventorySearchBox = document.getElementById('inventorySearchBox');
    if (inventorySearchBox) {
        inventorySearchBox.addEventListener('input', loadEquipment); 
    }
});


function loadEquipment() {
    fetch('/getEquipment') 
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('equipmentGrid');
            if (!container) return;

            container.innerHTML = ''; 

            const selectedVehicle = document.getElementById('sortVehicleAssignment') ? document.getElementById('sortVehicleAssignment').value : ''; // Retrieve selected vehicle
            const searchQuery = document.getElementById('inventorySearchBox') ? document.getElementById('inventorySearchBox').value.toLowerCase() : ''; // Retrieve search query

            
            const filteredData = data.filter(item => {
                const matchesVehicle = selectedVehicle ? item.vehicleAssignment === selectedVehicle : true;
                const matchesSearch = item.itemName.toLowerCase().includes(searchQuery);
                return matchesVehicle && matchesSearch; 
            });

           
            filteredData.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'w-full bg-gray-300 h-28 mx-3 rounded-xl flex justify-between'; // Updated layout class name
                // div.innerHTML = `
                //     <div class="flex justify-normal space-x-5 py-2">
                //         <p class="py-8 ml-5 text-3xl">${index + 1}</p> <!-- Sequential numbering based on the index -->
                //         <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md" alt="Equipment Image"> <!-- Image for equipment -->
                //         <p class="py-8 ml-5 text-2xl font-bold">${item.itemName}</p> <!-- Equipment name -->
                //         <p class="py-8 ml-5 text-xl font-[300] pl-6">${item.vehicleAssignment}</p> <!-- Vehicle assignment -->
                //     </div>
                //     <div class="flex justify-normal space-x-10 mr-10 py-8">
                //         <svg class="w-10 h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                //         <!-- Delete icon -->

                //         <svg class="w-8 h-8 cursor-pointer mt-2" onclick="edit()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                //         <!-- Edit icon -->
                //     </div>
                // `;
                div.innerHTML = `
                    <div class="flex justify-normal space-x-5 py-2">
                        <p class="py-8 ml-5 text-3xl">${index + 1}</p> <!-- Sequential numbering based on the index -->
                        <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md" alt="Equipment Image"> <!-- Image for equipment -->
                        <p class="py-8 ml-5 text-2xl font-bold">${item.itemName}</p> <!-- Equipment name -->
                        <p class="py-8 ml-5 text-xl font-[300] pl-6">${item.vehicleAssignment}</p> <!-- Vehicle assignment -->
                    </div>
                    <div class="flex justify-normal space-x-10 mr-10 py-8">
                        <!-- Delete icon: Passing itemName to deleteEquipment function -->
                        <svg class="w-10 h-10 cursor-pointer" onclick="moveToTrash('${item.itemName}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        <!-- Edit icon -->
                        <svg class="w-8 h-8 cursor-pointer mt-2" onclick="editEquipment('${item.itemName}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                    </div>
                `;


                container.appendChild(div); 
            });
        })
        .catch(error => {
            console.error('Error loading equipment:', error);
        });
}




function deleteEquipment(itemName) {
    if (confirm(`Are you sure you want to delete ${itemName}?`)) {
        fetch(`/deleteEquipment/${encodeURIComponent(itemName)}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text || 'Failed to delete equipment'); });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadEquipment(); // Reload the equipment list after deletion
        })
        .catch(error => {
            console.error('Error deleting equipment:', error);
            alert('Error deleting equipment: ' + error.message);
        });
    }
}


function editEquipment(itemName) {
    // Scroll to the top of the page when edit is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Get the item from the displayed list in the frontend
    const equipmentItems = document.querySelectorAll('#equipmentGrid > div'); // Assuming each equipment entry is a child div
    let currentItem;

    // Loop through the items to find the one matching the clicked itemName
    equipmentItems.forEach(item => {
        const itemNameElement = item.querySelector('p:nth-child(3)'); // Adjust this selector based on your structure
        const vehicleAssignmentElement = item.querySelector('p:nth-child(4)'); // Adjust based on the structure
        const itemImageElement = item.querySelector('img'); // Get the image element

        if (itemNameElement && itemNameElement.textContent === itemName) {
            currentItem = {
                itemName: itemNameElement.textContent,
                vehicleAssignment: vehicleAssignmentElement.textContent,
                itemImage: itemImageElement ? itemImageElement.src : null // Get the image source
            };
        }
    });

    if (!currentItem) {
        alert('Error: Item not found.');
        return;
    }

    // Show the form and populate it with the current item details
    const inveditForm = document.getElementById('invedit');
    inveditForm.style.display = 'block';

    // Populate the form with the selected equipment details
    const itemNameInput = inveditForm.querySelector('input[type="text"]');
    const vehicleAssignmentSelect = inveditForm.querySelector('select[name="vehicleAssignment"]');
    const itemImageElement = inveditForm.querySelector('img'); // Image element in the form

    // Set the values from the selected equipment
    itemNameInput.value = currentItem.itemName;
    vehicleAssignmentSelect.value = currentItem.vehicleAssignment;
    if (itemImageElement && currentItem.itemImage) {
        itemImageElement.src = currentItem.itemImage; // Set the image source in the form
    }

    // Add event listener to the save button
    const saveButton = inveditForm.querySelector('button');
    saveButton.onclick = function() {
        // Get updated values from the form
        const updatedItemName = itemNameInput.value;
        const updatedVehicleAssignment = vehicleAssignmentSelect.value;

        // Prepare the data to be sent to the backend
        const updatedData = {
            originalItemName: currentItem.itemName, // To identify the item being edited
            updatedItemName: updatedItemName,
            updatedVehicleAssignment: updatedVehicleAssignment
        };

        // Send the updated data to the backend via a PUT request
        fetch(`/updateEquipment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text || 'Failed to update equipment'); });
            }
            return response.json();
        })
        .then(data => {
            alert('Equipment updated successfully');
            inveditForm.style.display = 'none'; // Hide the form after saving
            loadEquipment(); // Reload the equipment list to reflect the changes
        })
        .catch(error => {
            console.error('Error updating equipment:', error);
            alert('Error updating equipment: ' + error.message);
        });
    };
}


function toggleVehicleForm() {
    var form = document.getElementById('addVehicleForm');
    form.classList.remove('hidden');

}
 //Add Equipment
 document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addVehicleForm').addEventListener('submit', async function (event) {
        event.preventDefault();  
        
        const vehicleName = document.getElementById('vehicleName').value;
        const confirmation = confirm(`Are you sure you want to add the vehicle: ${vehicleName}?`);

        if (confirmation) {
            const formData = new FormData(this);
            try {
                const response = await fetch('/auth/addVehicle', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json(); // Parse response only once

                if (response.ok) {
                    alert(result.message);
                    this.reset(); // Reset the form
                    closeVehicleForm(); // Close the form only after successful submission
                } else {
                    console.error('Server responded with an error:', result);
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('An unexpected error occurred. Check the console for details.');
            }
        } else {
            console.log('Vehicle addition cancelled.'); // Log when the user cancels
        }
    });
});
