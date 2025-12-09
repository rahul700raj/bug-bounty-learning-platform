const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware (for secure endpoints)
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for demo purposes
}));

// CORS configuration
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes
const owaspRoutes = require('./routes/owasp');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

// API Routes
app.use('/api/owasp', owaspRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    platform: 'Bug Bounty Learning Platform'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bug Bounty Learning Platform running on http://localhost:${PORT}`);
  console.log(`📚 Educational environment - OWASP Top 10 demonstrations`);
  console.log(`⚠️  WARNING: Contains intentionally vulnerable code for learning`);
});

module.exports = app;
