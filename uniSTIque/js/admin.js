        // Open the Profile Modal
        function openProfileModal() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeProfileModal()">&times;</span>
                    <h2>Admin Profile</h2>
                    <p><strong>Name:</strong> Admin</p>
                    <p><strong>Email:</strong> admin@example.com</p>
                    <p><strong>Role:</strong> Administrator</p>
                    <p><strong>Last Login:</strong> October 9, 2024</p>
                    <button onclick="closeProfileModal()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }

        // Close the Profile Modal
        function closeProfileModal() {
            const modal = document.querySelector('.modal');
            if (modal) {
                modal.remove();
            }
        }

        // Function to handle the search
        function search() {
            const searchTerm = document.querySelector('.search-bar input').value;
            alert(`Searching for: ${searchTerm}`);
            // Implement search logic here
        }

        // Functionality for Manage Products
        function addProduct() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal()">&times;</span>
                    <h2>Add Product</h2>
                    <label for="productName">Product Name:</label>
                    <input type="text" id="productName">
                    <label for="productPrice">Price:</label>
                    <input type="number" id="productPrice">
                    <button onclick="submitProduct()">Add Product</button>
                    <button onclick="closeModal()">Cancel</button>
                </div>
            `;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }

        // Submit Product Logic
        function submitProduct() {
            const name = document.getElementById('productName').value;
            const price = document.getElementById('productPrice').value;
            alert(`Product Added: ${name} - Price: $${price}`);
            // Here you can add logic to save the product to the database
            closeModal();
        }

        // Functionality for User Management
        function manageUsers() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal()">&times;</span>
                    <h2>User Management</h2>
                    <p>Implement your user management functionality here.</p>
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }

        // Functionality for Viewing Reports
        function viewReports() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal()">&times;</span>
                    <h2>Reports</h2>
                    <p>Implement report generation logic here.</p>
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }

        // Functionality for Viewing Inventory
        function viewInventory() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal()">&times;</span>
                    <h2>Inventory Management</h2>
                    <p>Implement inventory monitoring functionality here.</p>
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }

        // Functionality for Viewing Notifications
        function viewNotifications() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal()">&times;</span>
                    <h2>Notifications</h2>
                    <p>View recent notifications here.</p>
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }

        // Functionality for Settings
        function goToSettings() {
            alert('Navigating to Settings...');
            // Add your logic to navigate to settings here
        }

        // Functionality for Viewing Logs
        function viewLogs() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal()">&times;</span>
                    <h2>Logs & Audit Trail</h2>
                    <p>View admin activity logs here.</p>
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }

        // Functionality for Viewing Customer Support Tickets
        function viewTickets() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal()">&times;</span>
                    <h2>Customer Support</h2>
                    <p>Manage and respond to customer queries here.</p>
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }

        // Close all modals
        function closeModal() {
            const modal = document.querySelector('.modal');
            if (modal) {
                modal.remove();
            }
        }

        // Event Listeners for Buttons
        document.getElementById('addProductBtn').onclick = addProduct;
        document.getElementById('manageUsersBtn').onclick = manageUsers;
        document.getElementById('viewReportsBtn').onclick = viewReports;
        document.getElementById('viewInventoryBtn').onclick = viewInventory;
        document.getElementById('viewNotificationsBtn').onclick = viewNotifications;
        document.getElementById('goToSettingsBtn').onclick = goToSettings;
        document.getElementById('viewLogsBtn').onclick = viewLogs;
        document.getElementById('viewTicketsBtn').onclick = viewTickets;

        