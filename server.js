const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');
const dbConfig = require('./config/database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Database connection
let db;
async function initializeDb() {
    db = await mysql.createConnection(dbConfig);
}

initializeDb().catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

// Add this root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Library Management System API' });
});

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});