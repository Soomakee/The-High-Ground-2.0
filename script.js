function showContent(section) {
    const contentAreas = document.querySelectorAll('.content-area');
    contentAreas.forEach(area => {
        area.classList.add('hidden');
    });
    
    const selectedArea = document.getElementById(section);
    if (selectedArea) {
        selectedArea.classList.remove('hidden');
        
        if (section === 'home') {
            initializeHomePage();
        } else {
            if (sessionTimer) {
                clearInterval(sessionTimer);
            }
        }
    }
    
    const buttons = document.querySelectorAll('.sidebar-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

function showProfile() {
    
    const contentAreas = document.querySelectorAll('.content-area');
    contentAreas.forEach(area => {
        area.classList.add('hidden');
    });
    
    let profileContent = document.getElementById('profile');
    if (!profileContent) {
        profileContent = document.createElement('div');
        profileContent.id = 'profile';
        profileContent.className = 'content-area';
        profileContent.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-avatar-large">
                        <img src="Images/sama.png" alt="Toji">
                        <div class="status-ring online"></div>
                    </div>
                    <div class="profile-info-main">
                        <h1 class="profile-name-main">TOJI</h1>
                        <div class="profile-title">ADMINISTRATOR</div>
                        <div class="profile-id">ID: THG-001-ADMIN</div>
                    </div>
                </div>
                
                <div class="profile-stats">
                    <div class="stat-panel">
                        <div class="stat-item">
                            <div class="stat-icon">📅</div>
                            <div class="stat-details">
                                <div class="stat-label">MEMBER SINCE</div>
                                <div class="stat-value">2024-01-15</div>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-details">
                                <div class="stat-label">RAIDS COMPLETED</div>
                                <div class="stat-value">47</div>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">⭐</div>
                            <div class="stat-details">
                                <div class="stat-label">ACHIEVEMENTS</div>
                                <div class="stat-value">23</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="profile-sections">
                    <div class="profile-section-card">
                        <h3 class="section-title">PERSONAL DATA</h3>
                        <div class="data-grid">
                            <div class="data-item">
                                <span class="data-label">FULL NAME</span>
                                <span class="data-value">Toji Fushiguro</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">SPECIALIZATION</span>
                                <span class="data-value">Combat Tactics</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">CLEARANCE LEVEL</span>
                                <span class="data-value">ALPHA</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">LAST ACTIVE</span>
                                <span class="data-value" id="last-active">Just now</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-section-card">
                        <h3 class="section-title">HARVEST ROLE PREFERENCES</h3>
                        <div class="harvest-roles-display" id="harvest-roles-display">
                            <div class="role-tag">SCOUT</div>
                            <div class="role-tag">GUARD</div>
                        </div>
                    </div>
                    
                    <div class="profile-section-card">
                        <h3 class="section-title">SYSTEM ACCESS</h3>
                        <div class="access-grid">
                            <div class="access-item active">
                                <div class="access-icon">🔐</div>
                                <div class="access-info">
                                    <div class="access-name">Full Admin</div>
                                    <div class="access-status">ACTIVE</div>
                                </div>
                            </div>
                            <div class="access-item active">
                                <div class="access-icon">👥</div>
                                <div class="access-info">
                                    <div class="access-name">Member Management</div>
                                    <div class="access-status">ACTIVE</div>
                                </div>
                            </div>
                            <div class="access-item active">
                                <div class="access-icon">📦</div>
                                <div class="access-info">
                                    <div class="access-name">Inventory Control</div>
                                    <div class="access-status">ACTIVE</div>
                                </div>
                            </div>
                            <div class="access-item">
                                <div class="access-icon">⚙️</div>
                                <div class="access-info">
                                    <div class="access-name">System Config</div>
                                    <div class="access-status">LOCKED</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="action-btn primary" onclick="openHarvestRolePreferences()">EDIT ROLE PREFERENCE</button>
                    <button class="action-btn secondary">CHANGE PASSWORD</button>
                    <button class="action-btn secondary">PRIVACY SETTINGS</button>
                </div>
            </div>
            
            <div id="harvest-role-modal" class="modal hidden">
                <div class="modal-content harvest-role-content">
                    <div class="modal-header">
                        <h3>HARVEST ROLE PREFERENCES</h3>
                        <button class="close-btn" onclick="closeHarvestRolePreferences()">×</button>
                    </div>
                    <div class="harvest-role-body">
                        <div class="role-preferences-list">
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-scout" class="role-checkbox" checked>
                                <label for="role-scout" class="role-label">SCOUT</label>
                            </div>
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-flight-commander" class="role-checkbox">
                                <label for="role-flight-commander" class="role-label">FLIGHT COMMANDER</label>
                            </div>
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-carrier-pilot" class="role-checkbox">
                                <label for="role-carrier-pilot" class="role-label">CARRIER PILOT</label>
                            </div>
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-assault-pilot" class="role-checkbox">
                                <label for="role-assault-pilot" class="role-label">ASSAULT PILOT</label>
                            </div>
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-guard" class="role-checkbox" checked>
                                <label for="role-guard" class="role-label">GUARD</label>
                            </div>
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-escort" class="role-checkbox">
                                <label for="role-escort" class="role-label">ESCORT</label>
                            </div>
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-thumper" class="role-checkbox">
                                <label for="role-thumper" class="role-label">THUMPER</label>
                            </div>
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-harvester" class="role-checkbox">
                                <label for="role-harvester" class="role-label">HARVESTER</label>
                            </div>
                            <div class="role-preference-item">
                                <input type="checkbox" id="role-mechanic" class="role-checkbox">
                                <label for="role-mechanic" class="role-label">MECHANIC</label>
                            </div>
                        </div>
                        <div class="harvest-role-actions">
                            <button class="save-preferences-btn" onclick="saveHarvestPreferences()">SAVE PREFERENCES</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(profileContent);
    }
    
    profileContent.classList.remove('hidden');
    
    const navButtons = document.querySelectorAll('.sidebar-button');
    navButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Update last active time
    const lastActiveElement = document.getElementById('last-active');
    if (lastActiveElement) {
        const now = new Date();
        lastActiveElement.textContent = now.toLocaleTimeString();
    }
}















function updateProfileRole(newRole) {
    // Update the role in the sidebar
    const roleSelector = document.getElementById('profile-role');
    if (roleSelector) {
        roleSelector.value = newRole;
    }
    
    // Update the profile name in the welcome message
    const profileName = document.querySelector('.profile-name');
    if (profileName) {
        profileName.textContent = 'TOJI';
    }
    
    // You can add additional logic here to save the role to a database or localStorage
    console.log('Role updated to:', newRole);
}

// Harvest Role Preferences Functions
function openHarvestRolePreferences() {
    const modal = document.getElementById('harvest-role-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeHarvestRolePreferences() {
    const modal = document.getElementById('harvest-role-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function saveHarvestPreferences() {
    const checkboxes = document.querySelectorAll('.role-checkbox');
    const selectedRoles = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedRoles.push(checkbox.id.replace('role-', '').replace('-', ' ').toUpperCase());
        }
    });
    
    console.log('Selected Harvest Roles:', selectedRoles);
    
    // Update the profile display
    updateHarvestRolesDisplay(selectedRoles);
    
    // Close the modal
    closeHarvestRolePreferences();
    
    // Show confirmation
    alert('Harvest role preferences saved successfully!');
}

function updateHarvestRolesDisplay(selectedRoles) {
    const rolesDisplay = document.getElementById('harvest-roles-display');
    if (rolesDisplay) {
        rolesDisplay.innerHTML = '';
        
        if (selectedRoles.length === 0) {
            rolesDisplay.innerHTML = '<div class="no-roles">No roles selected</div>';
        } else {
            selectedRoles.forEach(role => {
                const roleTag = document.createElement('div');
                roleTag.className = 'role-tag';
                roleTag.textContent = role;
                rolesDisplay.appendChild(roleTag);
            });
        }
    }
}

// Inventory System
let inventoryLogs = [
    {
        action: "System initialized",
        details: "Guild inventory system loaded with default items",
        timestamp: new Date().toLocaleString()
    }
];

// Add new item to inventory
function addItem() {
    const category = document.getElementById('item-category').value;
    const name = document.getElementById('item-name').value.trim();
    const quantity = parseInt(document.getElementById('item-quantity').value);
    
    if (!name || isNaN(quantity) || quantity < 0) {
        alert('Please enter valid item name and quantity');
        return;
    }
    
    const listId = category === 'materials' ? 'materials-list' : 'schematics-list';
    const list = document.getElementById(listId);
    
    // Check if item already exists
    const existingItems = list.querySelectorAll('.item-name');
    for (let item of existingItems) {
        if (item.textContent.toLowerCase() === name.toLowerCase()) {
            alert('Item already exists in this category');
            return;
        }
    }
    
    // Create icon HTML
    let iconHtml = '';
    if (selectedIcon) {
        iconHtml = `
            <div class="item-icon">
                <img src="${selectedIcon.src}" alt="${selectedIcon.name}">
            </div>
        `;
    } else {
        // Default icon
        iconHtml = `
            <div class="item-icon">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDkuNzRMMTIgMTZMMTAuOTEgOS43NEw0IDlMMTAuOTEgOC4yNkwxMiAyWiIgZmlsbD0iIzhjNWNmNiIvPgo8L3N2Zz4K" alt="Default Icon">
            </div>
        `;
    }
    
    const newItem = document.createElement('div');
    newItem.className = 'inventory-item';
    newItem.innerHTML = `
        ${iconHtml}
        <span class="item-name">${name}</span>
        <span class="item-quantity">${quantity.toLocaleString()}</span>
        <div class="item-actions">
            <button class="edit-btn" onclick="editItem(this)">✏️</button>
            <button class="delete-btn" onclick="deleteItem(this)">🗑️</button>
        </div>
    `;
    
    list.appendChild(newItem);
    
    // Clear form
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('icon-upload').value = '';
    selectIcon(null); // Reset icon selection
    
    // Log the action
    const iconInfo = selectedIcon ? ` with icon: ${selectedIcon.name}` : ' with default icon';
    addLog('Item added', `${name} (${quantity.toLocaleString()}) to ${category}${iconInfo}`);
}

// Edit item quantity
function editItem(button) {
    const item = button.closest('.inventory-item');
    const nameSpan = item.querySelector('.item-name');
    const quantitySpan = item.querySelector('.item-quantity');
    const actionsDiv = item.querySelector('.item-actions');
    
    const currentQuantity = parseInt(quantitySpan.textContent.replace(/,/g, ''));
    const itemName = nameSpan.textContent;
    
    // Store original values
    item.dataset.originalQuantity = currentQuantity;
    
    // Replace quantity with input
    quantitySpan.innerHTML = `
        <input type="number" class="edit-input" value="${currentQuantity}" min="0">
    `;
    
    // Replace actions with save/cancel
    actionsDiv.innerHTML = `
        <button class="save-btn" onclick="saveItem(this)">💾</button>
        <button class="cancel-btn" onclick="cancelEdit(this)">❌</button>
    `;
    
    item.classList.add('editing');
    
    // Focus on input
    const input = quantitySpan.querySelector('.edit-input');
    input.focus();
    input.select();
}

// Save edited item
function saveItem(button) {
    const item = button.closest('.inventory-item');
    const quantitySpan = item.querySelector('.item-quantity');
    const input = quantitySpan.querySelector('.edit-input');
    const newQuantity = parseInt(input.value);
    
    if (isNaN(newQuantity) || newQuantity < 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    const itemName = item.querySelector('.item-name').textContent;
    const originalQuantity = parseInt(item.dataset.originalQuantity);
    
    // Update quantity
    quantitySpan.textContent = newQuantity.toLocaleString();
    
    // Restore actions
    const actionsDiv = item.querySelector('.item-actions');
    actionsDiv.innerHTML = `
        <button class="edit-btn" onclick="editItem(this)">✏️</button>
        <button class="delete-btn" onclick="deleteItem(this)">🗑️</button>
    `;
    
    item.classList.remove('editing');
    
    // Log the action
    const change = newQuantity - originalQuantity;
    const changeText = change > 0 ? `+${change.toLocaleString()}` : change.toLocaleString();
    addLog('Quantity updated', `${itemName}: ${originalQuantity.toLocaleString()} → ${newQuantity.toLocaleString()} (${changeText})`);
}

// Cancel edit
function cancelEdit(button) {
    const item = button.closest('.inventory-item');
    const quantitySpan = item.querySelector('.item-quantity');
    const originalQuantity = parseInt(item.dataset.originalQuantity);
    
    // Restore original quantity
    quantitySpan.textContent = originalQuantity.toLocaleString();
    
    // Restore actions
    const actionsDiv = item.querySelector('.item-actions');
    actionsDiv.innerHTML = `
        <button class="edit-btn" onclick="editItem(this)">✏️</button>
        <button class="delete-btn" onclick="deleteItem(this)">🗑️</button>
    `;
    
    item.classList.remove('editing');
}

// Delete item
function deleteItem(button) {
    const item = button.closest('.inventory-item');
    const itemName = item.querySelector('.item-name').textContent;
    const quantity = item.querySelector('.item-quantity').textContent;
    
    if (confirm(`Are you sure you want to delete ${itemName} (${quantity})?`)) {
        // Log before deletion
        addLog('Item deleted', `${itemName} (${quantity})`);
        
        // Remove item
        item.remove();
    }
}

// Show logs modal
function showLogs() {
    const modal = document.getElementById('logs-modal');
    const logsContainer = document.getElementById('logs-container');
    
    // Populate logs
    logsContainer.innerHTML = '';
    inventoryLogs.forEach(log => {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <div class="log-action">${log.action}</div>
            <div class="log-details">${log.details}</div>
            <div class="log-timestamp">${log.timestamp}</div>
        `;
        logsContainer.appendChild(logEntry);
    });
    
    modal.classList.remove('hidden');
}

// Close logs modal
function closeLogs() {
    const modal = document.getElementById('logs-modal');
    modal.classList.add('hidden');
}

// Add log entry
function addLog(action, details) {
    const logEntry = {
        action: action,
        details: details,
        timestamp: new Date().toLocaleString()
    };
    
    inventoryLogs.unshift(logEntry); // Add to beginning
    
    // Keep only last 100 logs
    if (inventoryLogs.length > 100) {
        inventoryLogs = inventoryLogs.slice(0, 100);
    }
}

// Icon System
let uploadedIcons = [];
let selectedIcon = null;

// Open icon selector modal
function openIconSelector() {
    const modal = document.getElementById('icon-modal');
    modal.classList.remove('hidden');
    updateIconGallery();
}

// Close icon selector modal
function closeIconSelector() {
    const modal = document.getElementById('icon-modal');
    modal.classList.add('hidden');
}

// Handle icon upload
function handleIconUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const iconData = {
            id: Date.now(),
            src: e.target.result,
            name: file.name
        };
        
        uploadedIcons.push(iconData);
        selectIcon(iconData);
        updateIconGallery();
        
        // Log the action
        addLog('Icon uploaded', `New icon added: ${file.name}`);
    };
    
    reader.readAsDataURL(file);
}

// Select an icon from gallery
function selectIcon(iconData) {
    selectedIcon = iconData;
    
    // Update the button display
    const iconText = document.getElementById('selected-icon-text');
    const iconPreview = document.getElementById('selected-icon-preview');
    
    if (iconData) {
        iconText.style.display = 'none';
        iconPreview.style.display = 'block';
        iconPreview.src = iconData.src;
    } else {
        iconText.style.display = 'block';
        iconPreview.style.display = 'none';
    }
    
    // Update gallery selection
    updateIconGallery();
}

// Update icon gallery display
function updateIconGallery() {
    const gallery = document.getElementById('icon-gallery');
    gallery.innerHTML = '';
    
    uploadedIcons.forEach(icon => {
        const iconElement = document.createElement('div');
        iconElement.className = 'gallery-icon';
        if (selectedIcon && selectedIcon.id === icon.id) {
            iconElement.classList.add('selected');
        }
        
        iconElement.innerHTML = `<img src="${icon.src}" alt="${icon.name}">`;
        iconElement.onclick = () => selectIcon(icon);
        
        gallery.appendChild(iconElement);
    });
}

// Home Page Functionality
let sessionStartTime = new Date();
let sessionTimer;

// Update session timer
function updateSessionTimer() {
    const now = new Date();
    const diff = now - sessionStartTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const sessionTimeElement = document.getElementById('session-time');
    if (sessionTimeElement) {
        sessionTimeElement.textContent = timeString;
    }
}

// Add log entry to system log
function addSystemLog(message) {
    const logEntries = document.querySelector('.log-entries');
    if (logEntries) {
        const now = new Date();
        const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <span class="log-time">${timeString}</span>
            <span class="log-message">${message}</span>
        `;
        
        logEntries.appendChild(logEntry);
        logEntries.scrollTop = logEntries.scrollHeight;
        
        // Keep only last 10 entries
        const entries = logEntries.querySelectorAll('.log-entry');
        if (entries.length > 10) {
            entries[0].remove();
        }
    }
}



// Initialize home page when shown
function initializeHomePage() {
    // Start session timer
    sessionStartTime = new Date();
    updateSessionTimer();
    sessionTimer = setInterval(updateSessionTimer, 1000);
    
    // Add initial system logs
    setTimeout(() => addSystemLog('Spice melange levels optimal'), 500);
    setTimeout(() => addSystemLog('Sandworm activity minimal'), 1000);
    setTimeout(() => addSystemLog('Stillsuit hydration systems online'), 1500);
    setTimeout(() => addSystemLog('Fremen scouts reporting clear'), 2000);
    setTimeout(() => addSystemLog('Harvester crews ready for deployment'), 2500);
    setTimeout(() => addSystemLog('Guild operations proceeding smoothly'), 3000);
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    

    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const logsModal = document.getElementById('logs-modal');
        const iconModal = document.getElementById('icon-modal');
        const harvestRoleModal = document.getElementById('harvest-role-modal');
        
        if (event.target === logsModal) {
            closeLogs();
        }
        
        if (event.target === iconModal) {
            closeIconSelector();
        }
        
        if (event.target === harvestRoleModal) {
            closeHarvestRolePreferences();
        }
        
        const memberProfileModal = document.getElementById('member-profile-modal');
        if (event.target === memberProfileModal) {
            closeMemberProfile();
        }
        
        const memberRoleModal = document.getElementById('member-role-modal');
        if (event.target === memberRoleModal) {
            closeMemberRoleEditor();
        }
        
        const memberRankModal = document.getElementById('member-rank-modal');
        if (event.target === memberRankModal) {
            closeMemberRankEditor();
        }
    });

    // Handle Enter key in add item form
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const target = event.target;
            if (target.id === 'item-name' || target.id === 'item-quantity') {
                addItem();
            }
        }
    });

    // Handle Enter key in edit mode
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const target = event.target;
            if (target.classList.contains('edit-input')) {
                const saveBtn = target.closest('.inventory-item').querySelector('.save-btn');
                if (saveBtn) {
                    saveItem(saveBtn);
                }
            }
        }
        
        if (event.key === 'Escape') {
            const target = event.target;
            if (target.classList.contains('edit-input')) {
                const cancelBtn = target.closest('.inventory-item').querySelector('.cancel-btn');
                if (cancelBtn) {
                    cancelEdit(cancelBtn);
                }
            }
        }
    });
});

// To Do List Functions
function addTodo() {
    const text = document.getElementById('todo-text').value.trim();
    const priority = document.getElementById('todo-priority').value;
    
    if (!text) {
        alert('Please enter a task description');
        return;
    }
    
    const todoList = document.getElementById('todo-list');
    const todoId = 'todo-' + (todoList.children.length + 1);
    
    const newTodo = document.createElement('div');
    newTodo.className = 'todo-item';
    newTodo.innerHTML = `
        <div class="todo-checkbox">
            <input type="checkbox" id="${todoId}" onchange="toggleTodo(this)">
            <label for="${todoId}"></label>
        </div>
        <div class="todo-content">
            <span class="todo-text">${text}</span>
            <span class="todo-priority ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
        </div>
        <div class="todo-actions">
            <button class="edit-btn" onclick="editTodo(this)">✏️</button>
            <button class="delete-btn" onclick="deleteTodo(this)">🗑️</button>
        </div>
    `;
    
    todoList.appendChild(newTodo);
    document.getElementById('todo-text').value = '';
    document.getElementById('todo-priority').value = 'low';
}

function toggleTodo(checkbox) {
    const todoText = checkbox.closest('.todo-item').querySelector('.todo-text');
    if (checkbox.checked) {
        todoText.classList.add('completed');
    } else {
        todoText.classList.remove('completed');
    }
}

function editTodo(button) {
    const todoItem = button.closest('.todo-item');
    const todoText = todoItem.querySelector('.todo-text');
    const currentText = todoText.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = currentText;
    
    todoText.replaceWith(input);
    input.focus();
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => saveTodo(input, todoItem);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => cancelEdit(input, currentText, todoItem);
    
    const actions = todoItem.querySelector('.todo-actions');
    actions.innerHTML = '';
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
}

function saveTodo(input, todoItem) {
    const newText = input.value.trim();
    if (!newText) {
        alert('Task description cannot be empty');
        return;
    }
    
    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = newText;
    
    input.replaceWith(todoText);
    
    const actions = todoItem.querySelector('.todo-actions');
    actions.innerHTML = `
        <button class="edit-btn" onclick="editTodo(this)">✏️</button>
        <button class="delete-btn" onclick="deleteTodo(this)">🗑️</button>
    `;
}

function deleteTodo(button) {
    if (confirm('Are you sure you want to delete this task?')) {
        button.closest('.todo-item').remove();
    }
}

// Events Functions
function addEvent() {
    const title = document.getElementById('event-title').value.trim();
    const description = document.getElementById('event-description').value.trim();
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    
    if (!title || !date || !time) {
        alert('Please fill in all required fields');
        return;
    }
    
    const eventDate = new Date(date + 'T' + time);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const timeString = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    const eventsList = document.getElementById('events-list');
    
    const newEvent = document.createElement('div');
    newEvent.className = 'event-item';
    newEvent.innerHTML = `
        <div class="event-date">
            <div class="event-day">${day}</div>
            <div class="event-month">${month}</div>
        </div>
        <div class="event-content">
            <h4 class="event-title">${title}</h4>
            <p class="event-description">${description}</p>
            <div class="event-meta">
                <span class="event-time">${timeString}</span>
                <span class="event-participants">Open</span>
            </div>
        </div>
        <div class="event-actions">
            <button class="edit-btn" onclick="editEvent(this)">✏️</button>
            <button class="delete-btn" onclick="deleteEvent(this)">🗑️</button>
        </div>
    `;
    
    eventsList.appendChild(newEvent);
    
    document.getElementById('event-title').value = '';
    document.getElementById('event-description').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-time').value = '';
}

function editEvent(button) {
    const eventItem = button.closest('.event-item');
    const eventTitle = eventItem.querySelector('.event-title');
    const eventDescription = eventItem.querySelector('.event-description');
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'edit-input';
    titleInput.value = eventTitle.textContent;
    
    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.className = 'edit-input';
    descInput.value = eventDescription.textContent;
    
    eventTitle.replaceWith(titleInput);
    eventDescription.replaceWith(descInput);
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => saveEvent(titleInput, descInput, eventItem);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => cancelEventEdit(titleInput, descInput, eventTitle.textContent, eventDescription.textContent, eventItem);
    
    const actions = eventItem.querySelector('.event-actions');
    actions.innerHTML = '';
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
}

function saveEvent(titleInput, descInput, eventItem) {
    const newTitle = titleInput.value.trim();
    const newDescription = descInput.value.trim();
    
    if (!newTitle) {
        alert('Event title cannot be empty');
        return;
    }
    
    const eventTitle = document.createElement('h4');
    eventTitle.className = 'event-title';
    eventTitle.textContent = newTitle;
    
    const eventDescription = document.createElement('p');
    eventDescription.className = 'event-description';
    eventDescription.textContent = newDescription;
    
    titleInput.replaceWith(eventTitle);
    descInput.replaceWith(eventDescription);
    
    const actions = eventItem.querySelector('.event-actions');
    actions.innerHTML = `
        <button class="edit-btn" onclick="editEvent(this)">✏️</button>
        <button class="delete-btn" onclick="deleteEvent(this)">🗑️</button>
    `;
}

function cancelEventEdit(titleInput, descInput, originalTitle, originalDescription, eventItem) {
    const eventTitle = document.createElement('h4');
    eventTitle.className = 'event-title';
    eventTitle.textContent = originalTitle;
    
    const eventDescription = document.createElement('p');
    eventDescription.className = 'event-description';
    eventDescription.textContent = originalDescription;
    
    titleInput.replaceWith(eventTitle);
    descInput.replaceWith(eventDescription);
    
    const actions = eventItem.querySelector('.event-actions');
    actions.innerHTML = `
        <button class="edit-btn" onclick="editEvent(this)">✏️</button>
        <button class="delete-btn" onclick="deleteEvent(this)">🗑️</button>
    `;
}

function deleteEvent(button) {
    if (confirm('Are you sure you want to delete this event?')) {
        button.closest('.event-item').remove();
    }
}

function openEventPoster(title, description, day, month, time, participants, priority) {
    // Update poster content with event details
    document.getElementById('poster-title').textContent = title;
    document.getElementById('poster-description').textContent = description;
    document.getElementById('poster-day').textContent = day;
    document.getElementById('poster-month').textContent = month;
    document.getElementById('poster-time').textContent = time;
    document.getElementById('poster-participants').textContent = participants;
    document.getElementById('poster-priority').textContent = priority;
    
    // Show the modal
    document.getElementById('event-poster-modal').classList.remove('hidden');
}

function closeEventPoster() {
    document.getElementById('event-poster-modal').classList.add('hidden');
}

// For Hire Functions
function addForHire() {
    const title = document.getElementById('forhire-title').value.trim();
    const description = document.getElementById('forhire-description').value.trim();
    const price = document.getElementById('forhire-price').value.trim();
    const availability = document.getElementById('forhire-availability').value;
    
    if (!title || !description || !price) {
        alert('Please fill in all required fields');
        return;
    }
    
    const forhireList = document.getElementById('forhire-list');
    
    const newForHire = document.createElement('div');
    newForHire.className = 'forhire-item';
    newForHire.innerHTML = `
        <div class="forhire-avatar">
            <img src="Images/sama.png" alt="Service Provider">
        </div>
        <div class="forhire-content">
            <h4 class="forhire-title">${title}</h4>
            <p class="forhire-description">${description}</p>
            <div class="forhire-meta">
                <span class="forhire-price">${price}</span>
                <span class="forhire-availability">${availability}</span>
            </div>
        </div>
        <div class="forhire-actions">
            <button class="edit-btn" onclick="editForHire(this)">✏️</button>
            <button class="delete-btn" onclick="deleteForHire(this)">🗑️</button>
        </div>
    `;
    
    forhireList.appendChild(newForHire);
    
    document.getElementById('forhire-title').value = '';
    document.getElementById('forhire-description').value = '';
    document.getElementById('forhire-price').value = '';
    document.getElementById('forhire-availability').value = 'Available';
}

function editForHire(button) {
    const forhireItem = button.closest('.forhire-item');
    const forhireTitle = forhireItem.querySelector('.forhire-title');
    const forhireDescription = forhireItem.querySelector('.forhire-description');
    const forhirePrice = forhireItem.querySelector('.forhire-price');
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'edit-input';
    titleInput.value = forhireTitle.textContent;
    
    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.className = 'edit-input';
    descInput.value = forhireDescription.textContent;
    
    const priceInput = document.createElement('input');
    priceInput.type = 'text';
    priceInput.className = 'edit-input';
    priceInput.value = forhirePrice.textContent;
    
    forhireTitle.replaceWith(titleInput);
    forhireDescription.replaceWith(descInput);
    forhirePrice.replaceWith(priceInput);
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => saveForHire(titleInput, descInput, priceInput, forhireItem);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => cancelForHireEdit(titleInput, descInput, priceInput, forhireTitle.textContent, forhireDescription.textContent, forhirePrice.textContent, forhireItem);
    
    const actions = forhireItem.querySelector('.forhire-actions');
    actions.innerHTML = '';
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
}

function saveForHire(titleInput, descInput, priceInput, forhireItem) {
    const newTitle = titleInput.value.trim();
    const newDescription = descInput.value.trim();
    const newPrice = priceInput.value.trim();
    
    if (!newTitle || !newDescription || !newPrice) {
        alert('All fields are required');
        return;
    }
    
    const forhireTitle = document.createElement('h4');
    forhireTitle.className = 'forhire-title';
    forhireTitle.textContent = newTitle;
    
    const forhireDescription = document.createElement('p');
    forhireDescription.className = 'forhire-description';
    forhireDescription.textContent = newDescription;
    
    const forhirePrice = document.createElement('span');
    forhirePrice.className = 'forhire-price';
    forhirePrice.textContent = newPrice;
    
    titleInput.replaceWith(forhireTitle);
    descInput.replaceWith(forhireDescription);
    priceInput.replaceWith(forhirePrice);
    
    const actions = forhireItem.querySelector('.forhire-actions');
    actions.innerHTML = `
        <button class="edit-btn" onclick="editForHire(this)">✏️</button>
        <button class="delete-btn" onclick="deleteForHire(this)">🗑️</button>
    `;
}

function cancelForHireEdit(titleInput, descInput, priceInput, originalTitle, originalDescription, originalPrice, forhireItem) {
    const forhireTitle = document.createElement('h4');
    forhireTitle.className = 'forhire-title';
    forhireTitle.textContent = originalTitle;
    
    const forhireDescription = document.createElement('p');
    forhireDescription.className = 'forhire-description';
    forhireDescription.textContent = originalDescription;
    
    const forhirePrice = document.createElement('span');
    forhirePrice.className = 'forhire-price';
    forhirePrice.textContent = originalPrice;
    
    titleInput.replaceWith(forhireTitle);
    descInput.replaceWith(forhireDescription);
    priceInput.replaceWith(forhirePrice);
    
    const actions = forhireItem.querySelector('.forhire-actions');
    actions.innerHTML = `
        <button class="edit-btn" onclick="editForHire(this)">✏️</button>
        <button class="delete-btn" onclick="deleteForHire(this)">🗑️</button>
    `;
}

function deleteForHire(button) {
    if (confirm('Are you sure you want to delete this service?')) {
        button.closest('.forhire-item').remove();
    }
}

// Member Profile Functions
function openMemberProfile(name, rank, status, roles) {
    const modal = document.getElementById('member-profile-modal');
    const title = document.getElementById('member-profile-title');
    const memberName = document.getElementById('member-name');
    const memberRank = document.getElementById('member-rank');
    const memberStatus = document.getElementById('member-status');
    const statusRing = document.getElementById('member-status-ring');
    const rolesDisplay = document.getElementById('member-roles-display');
    const logsContainer = document.getElementById('member-logs-container');
    
    // Store current member data for editing
    currentMemberData = {
        name: name,
        rank: rank,
        status: status,
        roles: roles || []
    };
    
    // Update modal content
    title.textContent = `${name.toUpperCase()} - MEMBER PROFILE`;
    memberName.textContent = name;
    memberRank.textContent = rank.toUpperCase();
    memberStatus.textContent = status.toUpperCase();
    
    // Update status ring
    statusRing.className = `member-status-ring ${status}`;
    
    // Update roles display
    rolesDisplay.innerHTML = '';
    if (roles && roles.length > 0) {
        roles.forEach(role => {
            const roleTag = document.createElement('div');
            roleTag.className = 'role-tag';
            roleTag.textContent = role;
            rolesDisplay.appendChild(roleTag);
        });
    } else {
        rolesDisplay.innerHTML = '<div class="no-roles">No roles selected</div>';
    }
    
    // Logs will be generated when the activity logs modal is opened
    
    // Show modal
    modal.classList.remove('hidden');
}

function generateMemberLogs(memberName, container) {
    container.innerHTML = '';
    
    // Generate random activity logs for the member
    const logTypes = [
        { type: 'inventory', icon: '📦', actions: ['Added', 'Removed', 'Updated', 'Viewed'] },
        { type: 'profile', icon: '👤', actions: ['Updated profile', 'Changed roles', 'Modified settings'] },
        { type: 'todo', icon: '✅', actions: ['Created task', 'Completed task', 'Updated task'] },
        { type: 'events', icon: '📅', actions: ['Created event', 'Joined event', 'Left event'] },
        { type: 'forhire', icon: '💼', actions: ['Added service', 'Updated service', 'Removed service'] }
    ];
    
    const items = [
        'Spice Melange', 'Water', 'Schematic', 'Armor', 'Ornithopter Mk. I', 
        'Stillsuit Mk. II', 'Carrier Mk 2', 'Carier Mk 4', 'Harvester Tools',
        'Combat Gear', 'Medical Supplies', 'Fuel Cells', 'Navigation Systems'
    ];
    
    // Generate 8-15 random logs
    const numLogs = Math.floor(Math.random() * 8) + 8;
    const logs = [];
    
    for (let i = 0; i < numLogs; i++) {
        const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
        const action = logType.actions[Math.floor(Math.random() * logType.actions.length)];
        const item = items[Math.floor(Math.random() * items.length)];
        const quantity = Math.floor(Math.random() * 1000) + 1;
        
        // Generate timestamp (within last 7 days)
        const now = new Date();
        const daysAgo = Math.floor(Math.random() * 7);
        const hoursAgo = Math.floor(Math.random() * 24);
        const minutesAgo = Math.floor(Math.random() * 60);
        const timestamp = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000));
        
        let logMessage = '';
        if (logType.type === 'inventory') {
            logMessage = `${action} ${quantity} ${item}`;
        } else if (logType.type === 'profile') {
            logMessage = action;
        } else if (logType.type === 'todo') {
            logMessage = `${action}: ${item}`;
        } else if (logType.type === 'events') {
            logMessage = `${action}: ${item} Event`;
        } else if (logType.type === 'forhire') {
            logMessage = `${action}: ${item} Service`;
        }
        
        logs.push({
            timestamp: timestamp,
            type: logType.type,
            icon: logType.icon,
            message: logMessage
        });
    }
    
    // Sort logs by timestamp (newest first)
    logs.sort((a, b) => b.timestamp - a.timestamp);
    
    // Create log entries
    logs.forEach(log => {
        const logEntry = document.createElement('div');
        logEntry.className = 'member-log-entry';
        
        const timeString = log.timestamp.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        logEntry.innerHTML = `
            <div class="log-icon ${log.type}">${log.icon}</div>
            <div class="log-content">
                <div class="log-message">${log.message}</div>
                <div class="log-time">${timeString}</div>
            </div>
        `;
        
        container.appendChild(logEntry);
    });
    
    // Add "no logs" message if no logs generated
    if (logs.length === 0) {
        container.innerHTML = '<div class="no-logs">No activity logs found</div>';
    }
}

function closeMemberProfile() {
    const modal = document.getElementById('member-profile-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openActivityLogs() {
    const modal = document.getElementById('activity-logs-modal');
    const title = document.getElementById('activity-logs-title');
    const logsContainer = document.getElementById('member-logs-container');
    
    // Update modal title with current member name
    const memberName = document.getElementById('member-name');
    if (memberName) {
        title.textContent = `${memberName.textContent.toUpperCase()} - ACTIVITY LOGS`;
    }
    
    // Generate logs for the current member
    if (currentMemberData && currentMemberData.name) {
        generateMemberLogs(currentMemberData.name, logsContainer);
    }
    
    // Show modal
    modal.classList.remove('hidden');
}

function closeActivityLogs() {
    const modal = document.getElementById('activity-logs-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Member Role and Rank Editor Functions
let currentMemberData = {};

function openMemberRoleEditor() {
    const modal = document.getElementById('member-role-modal');
    const title = document.getElementById('member-role-title');
    
    // Update modal title with member name
    title.textContent = `EDIT ${currentMemberData.name.toUpperCase()} ROLES`;
    
    // Set current roles as checked
    const checkboxes = document.querySelectorAll('.member-role-checkbox');
    checkboxes.forEach(checkbox => {
        const roleName = checkbox.id.replace('member-role-', '').replace('-', ' ').toUpperCase();
        checkbox.checked = currentMemberData.roles.includes(roleName);
    });
    
    modal.classList.remove('hidden');
}

function closeMemberRoleEditor() {
    const modal = document.getElementById('member-role-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function saveMemberRoles() {
    const checkboxes = document.querySelectorAll('.member-role-checkbox');
    const selectedRoles = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedRoles.push(checkbox.id.replace('member-role-', '').replace('-', ' ').toUpperCase());
        }
    });

    // Update current member data
    currentMemberData.roles = selectedRoles;
    
    // Update the display in the member profile
    const rolesDisplay = document.getElementById('member-roles-display');
    if (rolesDisplay) {
        rolesDisplay.innerHTML = '';
        if (selectedRoles.length === 0) {
            rolesDisplay.innerHTML = '<div class="no-roles">No roles selected</div>';
        } else {
            selectedRoles.forEach(role => {
                const roleTag = document.createElement('div');
                roleTag.className = 'role-tag';
                roleTag.textContent = role;
                rolesDisplay.appendChild(roleTag);
            });
        }
    }

    closeMemberRoleEditor();
    alert(`Harvest roles updated for ${currentMemberData.name}!`);
}

function openMemberRankEditor() {
    const modal = document.getElementById('member-rank-modal');
    const title = document.getElementById('member-rank-title');
    const rankSelect = document.getElementById('member-rank-select');
    
    // Update modal title with member name
    title.textContent = `EDIT ${currentMemberData.name.toUpperCase()} RANK`;
    
    // Set current rank as selected
    rankSelect.value = currentMemberData.rank;
    
    modal.classList.remove('hidden');
}

function closeMemberRankEditor() {
    const modal = document.getElementById('member-rank-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function saveMemberRank() {
    const rankSelect = document.getElementById('member-rank-select');
    const newRank = rankSelect.value;
    
    // Update current member data
    currentMemberData.rank = newRank;
    
    // Update the display in the member profile
    const memberRank = document.getElementById('member-rank');
    if (memberRank) {
        memberRank.textContent = newRank.toUpperCase();
    }
    
    // Update the member list display (if visible)
    updateMemberListDisplay();
    
    closeMemberRankEditor();
    alert(`Rank updated for ${currentMemberData.name} to ${newRank}!`);
}

function updateMemberListDisplay() {
    // Update the member's rank in the member list
    const memberItems = document.querySelectorAll('.member-item');
    memberItems.forEach(item => {
        const memberName = item.querySelector('h4').textContent;
        if (memberName === currentMemberData.name) {
            const rankElement = item.querySelector('p');
            if (rankElement) {
                rankElement.textContent = currentMemberData.rank;
            }
        }
    });
}