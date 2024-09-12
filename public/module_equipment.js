// Function to toggle the visibility of the add equipment form
function toggleAddEquipmentForm() {
    var form = document.getElementById('addEquipmentForm');
    form.style.display = (form.style.display === 'none' ? 'block' : 'none');
}

// Ensure DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {

    // Add event listener to the ADD EQUIPMENT button
    const btnAddEquip = document.getElementById('btnAddEquip');
    if (btnAddEquip) {
        btnAddEquip.addEventListener('click', function() {
            toggleAddEquipmentForm(); // Show the form
        });
    }

    // Add event listener to the form submit button
    const addEquipmentForm = document.getElementById('addEquipmentForm'); // Changed from querySelector to getElementById
    if (addEquipmentForm) {
        addEquipmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var formData = new FormData(this);

            // Fetch request to upload equipment
            fetch('/uploadEquipment', {
                method: 'POST',
                body: formData  // No need to set Content-Type header because FormData handles it
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text || 'Server responded with status: ' + response.status) });
                }
                return response.json();
            })
            .then(data => {
                alert('Success: ' + data.message);
                toggleAddEquipmentForm(); // Close the form after submission
                window.location.reload(); // Reload to show the updated equipment list
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error submitting the form: ' + error.message);
            });
        });
    }

    // Load the equipment list
    loadEquipment(); // Call to load equipment data when the page loads

    // Add event listener to the sort select dropdown
    const sortVehicleAssignment = document.getElementById('sortVehicleAssignment');
    if (sortVehicleAssignment) {
        sortVehicleAssignment.addEventListener('change', loadEquipment); // Trigger loadEquipment on change
    }

    // Add event listener to the search box
    const inventorySearchBox = document.getElementById('inventorySearchBox');
    if (inventorySearchBox) {
        inventorySearchBox.addEventListener('input', loadEquipment); // Trigger loadEquipment on input
    }
});

// Function to load and display equipment
function loadEquipment() {
    fetch('/getEquipment') // Fetch request to get equipment data from the backend
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('equipmentGrid');
            if (!container) return; // Ensure container exists

            container.innerHTML = ''; // Clear the container

            const selectedVehicle = document.getElementById('sortVehicleAssignment') ? document.getElementById('sortVehicleAssignment').value : ''; // Retrieve selected vehicle
            const searchQuery = document.getElementById('inventorySearchBox') ? document.getElementById('inventorySearchBox').value.toLowerCase() : ''; // Retrieve search query

            // Filter equipment data based on vehicle and search query
            const filteredData = data.filter(item => {
                const matchesVehicle = selectedVehicle ? item.vehicleAssignment === selectedVehicle : true;
                const matchesSearch = item.itemName.toLowerCase().includes(searchQuery);
                return matchesVehicle && matchesSearch; // Filtering logic
            });

            // Loop through filtered data and dynamically create HTML
            filteredData.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'w-full bg-gray-300 h-28 mx-3 rounded-xl flex justify-between'; // Updated layout class name
                div.innerHTML = `
                    <div class="flex justify-normal space-x-5 py-2">
                        <p class="py-8 ml-5 text-3xl">${index + 1}</p> <!-- Sequential numbering based on the index -->
                        <img src="${item.itemImage}" class="object-fill w-24 h-24 rounded-md" alt="Equipment Image"> <!-- Image for equipment -->
                        <p class="py-8 ml-5 text-2xl font-bold">${item.itemName}</p> <!-- Equipment name -->
                        <p class="py-8 ml-5 text-xl font-[300] pl-6">${item.vehicleAssignment}</p> <!-- Vehicle assignment -->
                    </div>
                    <div class="flex justify-normal space-x-10 mr-10 py-8">
                        <svg class="w-10 h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="red" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        <!-- Delete icon -->

                        <svg class="w-8 h-8 cursor-pointer mt-2" onclick="edit()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                        <!-- Edit icon -->
                    </div>
                `;
                container.appendChild(div); // Append dynamically created equipment to the container
            });
        })
        .catch(error => {
            console.error('Error loading equipment:', error); // Error handling
        });
}
