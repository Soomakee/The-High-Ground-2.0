# The High Ground 2.0

A modern, sleek guild management system with a sci-fi aesthetic designed for gaming communities and organizations.

## 🚀 Features

### **Core Functionality**
- **Member Management** - View and manage guild members with detailed profiles
- **Guild Inventory** - Track materials, schematics, and resources
- **To-Do Lists** - Manage guild tasks and objectives with priority levels
- **Event Calendar** - Schedule and track guild events
- **For Hire Board** - Display available services and offerings
- **Activity Logs** - Comprehensive logging system for all actions

### **User Interface**
- **Dark Theme** - Modern dark interface with purple accents
- **Responsive Design** - Works on desktop and mobile devices
- **Interactive Elements** - Hover effects, animations, and smooth transitions
- **Modal System** - Clean overlay system for detailed views and editing

### **Member Profiles**
- **Detailed Information** - Name, rank, status, join date, achievements
- **Role Preferences** - Customizable harvest role selections (Scout, Guard, Pilot, etc.)
- **Activity Tracking** - Real-time activity logs and statistics
- **Status Indicators** - Online, offline, and away status bubbles

## 🛠️ Technical Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** Custom CSS with modern design patterns
- **Icons:** Emoji-based icon system
- **Server:** Simple HTTP server (no backend required)

## 📁 Project Structure

```
The-High-Ground-2.0/
├── index.html          # Main application file
├── style.css           # All styling and animations
├── script.js           # Application logic and functionality
├── Images/
│   └── sama.png        # Default profile images
└── README.md           # This file
```



## 🎮 Usage Guide

### **Navigation**
- **Sidebar:** Access different sections of the application
- **Profile Button:** View and edit your personal profile
- **Home:** Dashboard with overview and quick access

### **Member Management**
1. Click "Member List" in the sidebar
2. Click on any member to view their detailed profile
3. Use "VIEW ACTIVITY LOGS" to see member activity history
4. Edit member roles and ranks through the profile interface

### **Inventory Management**
1. Navigate to "Guild Inventory"
2. Add new items with custom icons and quantities
3. Edit or delete existing items
4. View inventory logs for tracking changes

### **Task Management**
1. Go to "To Do" section
2. Add new tasks with priority levels
3. Mark tasks as complete
4. Edit or delete tasks as needed

### **Event Planning**
1. Access "Events" section
2. Create new guild events with dates and descriptions
3. Track event participation
4. Manage event details

## 🎨 Customization

### **Adding New Members**
Edit the member list in `script.js` within the `showContent('about')` function.

### **Modifying Roles**
Update the role options in the harvest role preferences modal.

### **Styling Changes**
Modify `style.css` to change colors, layouts, and animations.

### **Profile Images**
Replace `Images/sama.png` or add new images to the Images folder.

## 🔧 Development

### **File Structure Overview**
- **`index.html`** - Main structure and content areas
- **`style.css`** - All styling, animations, and responsive design
- **`script.js`** - Application logic, event handlers, and data management

### **Key Functions**
- `showContent(section)` - Main navigation function
- `showProfile()` - Profile page generation
- `openMemberProfile()` - Member detail modal
- `addItem()` / `editItem()` - Inventory management
- `addTodo()` / `editTodo()` - Task management
- `addEvent()` / `editEvent()` - Event management

## 🌟 Features in Detail

### **Home Dashboard**
- Real-time session timer
- Guild overview statistics
- Quick access cards
- System log display

### **Member Profiles**
- Avatar with status indicators
- Role preference management
- Activity statistics
- Comprehensive activity logs

### **Inventory System**
- Categorized items (Materials, Schematics)
- Custom icon support
- Quantity tracking
- Full CRUD operations

### **Task Management**
- Priority-based organization
- Completion tracking
- Due date management
- Bulk operations

## 🔒 Security & Access

Currently, the application runs without authentication, making all features accessible to anyone with access to the files. For production use, consider implementing:

- User authentication system
- Role-based access control
- Data validation and sanitization
- Secure data storage

## 🚀 Future Enhancements

Potential features for future development:
- User authentication and authorization
- Database integration
- Real-time collaboration
- Mobile app development
- API endpoints for external integrations
- Advanced reporting and analytics

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**The High Ground 2.0** - Elevating guild management to new heights! 🚀

