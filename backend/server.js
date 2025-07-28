import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'
import jwt from 'jsonwebtoken'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Environment variables
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Role-based permission mapping
const ROLE_PERMISSIONS = {
  'Guild Master': [
    'members:read', 'members:manage', 'members:write',
    'inventory:read', 'inventory:write', 'inventory:manage',
    'events:read', 'events:create', 'events:manage',
    'todo:read', 'todo:write', 'todo:manage',
    'hire:read', 'hire:write', 'hire:manage'
  ],
  'Officer': [
    'members:read', 'members:manage',
    'inventory:read', 'inventory:write',
    'events:read', 'events:create',
    'todo:read', 'todo:write',
    'hire:read', 'hire:write'
  ],
  'Event Manager': [
    'members:read',
    'inventory:read',
    'events:read', 'events:create',
    'todo:read',
    'hire:read'
  ],
  'Member': [
    'members:read',
    'inventory:read',
    'events:read',
    'todo:read',
    'hire:read'
  ]
}

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' })
    }
    req.user = user
    next()
  })
}

// Discord OAuth2 routes
app.post('/auth/discord', async (req, res) => {
  try {
    const { code, redirect_uri } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Authorization code required' })
    }

    // Exchange code for access token
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', 
      new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    const { access_token } = tokenResponse.data

    // Get user information
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const user = userResponse.data

    // Get user's guild membership
    const guildMemberResponse = await axios.get(
      `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/members/${user.id}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
      }
    )

    const guildMember = guildMemberResponse.data
    const userRoles = guildMember.roles || []

    // Get role names
    const roles = []
    const permissions = new Set()

    for (const roleId of userRoles) {
      try {
        const roleResponse = await axios.get(
          `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/roles`,
          {
            headers: {
              Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
            }
          }
        )

        const role = roleResponse.data.find(r => r.id === roleId)
        if (role) {
          roles.push(role.name)
          
          // Add permissions based on role
          if (ROLE_PERMISSIONS[role.name]) {
            ROLE_PERMISSIONS[role.name].forEach(permission => {
              permissions.add(permission)
            })
          }
        }
      } catch (error) {
        console.error(`Error fetching role ${roleId}:`, error.message)
      }
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        avatar: user.avatar,
        roles: roles,
        permissions: Array.from(permissions)
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        discriminator: user.discriminator
      },
      roles: roles,
      permissions: Array.from(permissions)
    })

  } catch (error) {
    console.error('Discord auth error:', error.response?.data || error.message)
    res.status(500).json({ error: 'Authentication failed' })
  }
})

// Get current user info
app.get('/auth/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      avatar: req.user.avatar
    },
    roles: req.user.roles,
    permissions: req.user.permissions
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
}) 