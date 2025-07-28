# The High Ground - Guild Management System

A futuristic guild management system with Discord OAuth2 authentication and role-based permissions.

## Features

- 🔐 **Discord OAuth2 Authentication** - Login with your Discord account
- 🎭 **Role-Based Permissions** - Access control based on Discord server roles
- 📊 **Guild Overview Dashboard** - Real-time guild statistics
- 👥 **Member Management** - Manage guild members and roles
- 📦 **Inventory System** - Track guild resources and items
- 📅 **Event Management** - Create and manage guild events
- ✅ **Task Management** - To-do lists and task tracking
- 💼 **Recruitment System** - Hiring and recruitment tools
- 🎨 **Futuristic UI** - Dark theme with purple accents and smooth animations

## Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Discord API** - OAuth2 authentication and role management
- **JWT** - Token-based authentication
- **CORS** - Cross-origin resource sharing

## Setup Instructions

### 1. Discord Application Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "OAuth2" section
4. Add redirect URI: `http://localhost:5173/auth/callback`
5. Copy your Client ID and Client Secret
6. Go to "Bot" section and create a bot
7. Copy the Bot Token
8. Enable "Server Members Intent" in Bot settings

### 2. Discord Bot Setup

1. Invite the bot to your Discord server with these permissions:
   - Read Messages/View Channels
   - Manage Roles
   - Read Server Members
2. Create roles in your Discord server:
   - Guild Master
   - Officer
   - Event Manager
   - Member
3. Assign roles to your bot and members

### 3. Environment Configuration

#### Frontend (.env)
```env
VITE_DISCORD_CLIENT_ID=your_discord_client_id_here
VITE_DISCORD_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_API_BASE_URL=http://localhost:3000
```

#### Backend (.env)
```env
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
DISCORD_GUILD_ID=your_discord_guild_id_here
DISCORD_BOT_TOKEN=your_discord_bot_token_here
JWT_SECRET=your_jwt_secret_key_here
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 4. Installation

#### Frontend
```bash
npm install
npm run dev
```

#### Backend
```bash
cd backend
npm install
npm run dev
```

### 5. Usage

1. Start both frontend and backend servers
2. Navigate to `http://localhost:5173`
3. Click "Continue with Discord" to login
4. Authorize the application
5. You'll be redirected back with your Discord profile and permissions

## Permission System

The system uses Discord server roles to determine user permissions:

### Role Permissions

- **Guild Master**: Full access to all features
- **Officer**: Can manage members, inventory, events, and tasks
- **Event Manager**: Can read all data and create events
- **Member**: Read-only access to most features

### Permission Scopes

- `members:read` - View member list
- `members:manage` - Manage member roles and permissions
- `inventory:read` - View inventory
- `inventory:write` - Edit inventory items
- `events:read` - View events
- `events:create` - Create new events
- `todo:read` - View tasks
- `todo:write` - Create and edit tasks
- `hire:read` - View recruitment posts
- `hire:write` - Create recruitment posts

## Development

### Project Structure
```
├── src/
│   ├── components/     # Reusable Vue components
│   ├── views/         # Page components
│   ├── stores/        # Pinia state management
│   ├── router/        # Vue Router configuration
│   └── assets/        # Static assets
├── backend/
│   ├── server.js      # Express server
│   └── package.json   # Backend dependencies
└── public/            # Public assets
```

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
