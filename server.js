// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:5173', 'http://16.171.238.158'],
  credentials: true,
  exposedHeaders: ['token']
};

app.use(cors(corsOptions));

// Static user data
const users = [
  {
    id: 1,
    name: "John Doe Holla",
    email: "john.doe@example.com",
    age: 28,
    city: "New York"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 34,
    city: "Los Angeles"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    age: 42,
    city: "Chicago"
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    age: 29,
    city: "Houston"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    age: 37,
    city: "Phoenix"
  }
];

// API Routes

// Get all users
app.get('/api/users', async (req, res) => {
  const result = await axios.get('http://dotnet-service:6000/PMS/StaticUser', {
    'Content-Type': 'application/json',
  })
  console.log(result.data);
  res.json({
    success: true,
    count: result,
    data: result
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  console.log(user);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Static User API',
    endpoints: {
      getAllUsers: '/api/users',
      getUserById: '/api/users/:id'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Access users at: http://localhost:${PORT}/api/users`);
});