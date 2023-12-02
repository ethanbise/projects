//Javascript functionality was generated with GPT-4


class InventoryItem {
    constructor(itemNumber, itemName, description, quantity, vendor, minOrderQuantity) {
        this.itemNumber = itemNumber;
        this.itemName = itemName;
        this.description = description;
        this.quantity = quantity;
        this.vendor = vendor;
        this.minOrderQuantity = minOrderQuantity;
        this.status = ''; // Initialize status
        this.setStatus(); // Set the initial status
    }

    increaseInventory(amount) {
        this.quantity += amount;
        this.setStatus();
    }

    decreaseInventory(amount) {
        if (this.quantity - amount >= 0) {
            this.quantity -= amount;
            this.setStatus();
        } else {
            alert('Not enough inventory to decrease.');
        }
    }

    setStatus() {
        if (this.quantity === 0) {
            this.status = 'Out';
        } else if (this.quantity <= this.minOrderQuantity * 0.2) {
            this.status = 'Low';
        } else {
            this.status = 'Good';
        }
    }

    reorderItem(orderQuantity) {
        if (orderQuantity >= this.minOrderQuantity) {
            this.increaseInventory(orderQuantity);
        } else {
            alert('Order quantity must be greater than or equal to the minimum order quantity.');
        }
    }
}

// Hardcoded password
const ADMIN_PASSWORD = 'starfox64';

document.addEventListener('DOMContentLoaded', function() {
    let inventory = [];

    const adminFunctionsDiv = document.getElementById('admin-functions');
    const adminLoginDiv = document.getElementById('admin-login');
    const adminLogoutButton = document.getElementById('admin-logout-button');
    const showAdminLoginButton = document.getElementById('show-admin-login');

    adminLoginDiv.style.display = 'none';
    adminLogoutButton.style.display = 'none';

    showAdminLoginButton.addEventListener('click', function() {
        adminLoginDiv.style.display = 'block';
        showAdminLoginButton.style.display = 'none';
    });


    
    function initInventory() {
        inventory.push(new InventoryItem(1, "Processors", "Responsible for the performance of the widget", 30, "Processors Plus", 15));
        inventory.push(new InventoryItem(2, "Batteries", "Provides power source for widget", 30, "Bob's Bodacious Battery Barn", 15));
        inventory.push(new InventoryItem(3, "Switches", "Allows users to select which mode their widget is in", 20, "Super Switch Supply Co.", 5));
        inventory.push(new InventoryItem(4, "Buttons", "Allows the user to turn the widget on and off, or mute the widget", 1, "Baxter's Buttons inc", 20));
        inventory.push(new InventoryItem(5, "Screws", "Responsible for maintaining structural integrity of the widget", 60, "Suretight Screws inc", 10));
        inventory.push(new InventoryItem(6, "Cases", "Allows users to style and protect their widgets simultaneously", 10, "Casey's Crafty Cases Company", 15));
        inventory.push(new InventoryItem(7, "Cartridges", "Allows users to save widget configurations and return to them", 5, "Carlton's Cartridges, inc", 5));
        inventory.push(new InventoryItem(8, "Adapters", "Lets the user connect their new widget to an older generation widget with different inputs, and read old widget cartridges", 0, "Alan's Awesome Adapaters", 20));
        inventory.push(new InventoryItem(9, "Knobs", "Knobs adjust the frequency that the widget receives and transmits", 25, "Nolans Knob Shop", 10));
        inventory.push(new InventoryItem(10, "Instruction Manuals", "Informs the user on every feature of their widget and how to use it", 40, "Manuel's Manuals LLC", 15));
    }
    
    function getStatusClass(status) {
        switch(status) {
            case 'Good': return 'status-good';
            case 'Low': return 'status-low';
            case 'Out': return 'status-out';
            default: return '';
        }
    }

    function renderInventory() {
        const inventoryTable = document.getElementById('inventory-table');
        const tbody = inventoryTable.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        inventory.forEach(item => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${item.itemNumber}</td>
                <td>${item.itemName}</td>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.vendor}</td>
                <td>${item.minOrderQuantity}</td>
                <td class="${getStatusClass(item.status)}">${item.status}</td>`;
        });
    }

    const itemForm = document.getElementById('item-form');
    itemForm.addEventListener('submit', handleItemUpdate);

    function handleItemUpdate(event) {
        event.preventDefault();
        const itemNumber = parseInt(document.getElementById('item-number').value, 10);
        let itemQuantity = parseInt(document.getElementById('item-quantity').value, 10);
        const item = inventory.find(i => i.itemNumber === itemNumber);

        if (item) {
            if (itemQuantity < 0) {
                item.increaseInventory(Math.abs(itemQuantity));
            } else {
                item.decreaseInventory(itemQuantity);
            }
            renderInventory();
        } else {
            alert('Item not found in inventory.');
        }

        itemForm.reset();
    }

    const adminLoginForm = document.getElementById('admin-login-form');
    adminLoginForm.addEventListener('submit', handleAdminLogin);

    function handleAdminLogin(event) {
        event.preventDefault();
        const passwordInput = document.getElementById('admin-password');
        if (passwordInput.value === ADMIN_PASSWORD) {
            adminFunctionsDiv.style.display = 'block';
            adminLoginDiv.style.display = 'none';
            adminLogoutButton.style.display = 'block'; // Show logout button after successful login
        } else {
            alert('Incorrect password.');
        }
        passwordInput.value = '';
    }
    adminLogoutButton.addEventListener('click', function() {
        adminFunctionsDiv.style.display = 'none';
        adminLoginDiv.style.display = 'none';
        adminLogoutButton.style.display = 'none';
        showAdminLoginButton.style.display = 'block';
    });
    
    

    const addItemForm = document.getElementById('add-item-form');
    addItemForm.addEventListener('submit', handleAddItem);

    const deleteItemForm = document.getElementById('delete-item-form');
    deleteItemForm.addEventListener('submit', handleDeleteItem);

    const reorderItemForm = document.getElementById('reorder-item-form');
    reorderItemForm.addEventListener('submit', handleReorderItem);

    function handleAddItem(event) {
        event.preventDefault();
        // Get values from form inputs...
        const itemNumber = parseInt(document.getElementById('new-item-number').value, 10);
        const itemName = document.getElementById('new-item-name').value;
        const description = document.getElementById('new-item-description').value;
        const quantity = parseInt(document.getElementById('new-item-quantity').value, 10);
        const vendor = document.getElementById('new-item-vendor').value;
        const minOrderQuantity = parseInt(document.getElementById('new-item-min-order-quantity').value, 10);

        // Check if the item number already exists
    const existingItem = inventory.find(item => item.itemNumber === itemNumber);
    if (existingItem) {
        alert('An item with this number already exists. Please use a unique item number.');
        return;
    }

        const newItem = new InventoryItem(itemNumber, itemName, description, quantity, vendor, minOrderQuantity);
        inventory.push(newItem);
        renderInventory();

        addItemForm.reset();
    }

    function handleDeleteItem(event) {
        event.preventDefault();
        const itemNumber = parseInt(document.getElementById('delete-item-number').value, 10);
        const item = inventory.find(i => i.itemNumber === itemNumber);
    
        if (item) {
            const confirmDelete = confirm(`Are you sure you want to delete '${item.itemNumber} - ${item.itemName}' from inventory?`);
            if (confirmDelete) {
                inventory = inventory.filter(i => i.itemNumber !== itemNumber);
                renderInventory();
                alert(`Item '${item.itemNumber} - ${item.itemName}' has been deleted from inventory.`);
            }
        } else {
            alert('Item not found in inventory.');
        }
    
        deleteItemForm.reset();
    }

    function handleReorderItem(event) {
        event.preventDefault();
        const itemNumber = parseInt(document.getElementById('reorder-item-number').value, 10);
        const quantity = parseInt(document.getElementById('reorder-item-quantity').value, 10);

        const item = inventory.find(i => i.itemNumber === itemNumber);
        if (item) {
            item.reorderItem(quantity);
            renderInventory();
        } else {
            alert('Item not found in inventory.');
        }

        reorderItemForm.reset();
    }


    initInventory();
    renderInventory();
});