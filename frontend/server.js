const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let currentConnection = null;

// Test MySQL connection
app.post('/api/connect', async (req, res) => {
    const { host, user, password } = req.body;
    
    try {
        const connection = await mysql.createConnection({
            host: host || 'mysql',
            user: user,
            password: password
        });
        
        // Store connection info
        currentConnection = { host: host || 'mysql', user, password };
        
        await connection.end();
        res.json({ success: true, message: 'Connected successfully' });
    } catch (error) {
        console.error('Connection error:', error);
        res.status(401).json({ 
            success: false, 
            message: 'Connection failed: ' + error.message 
        });
    }
});

// Get list of databases
app.get('/api/databases', async (req, res) => {
    if (!currentConnection) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not connected to MySQL' 
        });
    }
    
    try {
        const connection = await mysql.createConnection(currentConnection);
        const [rows] = await connection.query('SHOW DATABASES');
        await connection.end();
        
        const databases = rows
            .map(row => row.Database)
            .filter(db => !['information_schema', 'mysql', 'performance_schema', 'sys'].includes(db));
        
        res.json({ success: true, databases });
    } catch (error) {
        console.error('Database list error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch databases: ' + error.message 
        });
    }
});

// Get users from a specific database
app.get('/api/users/:database', async (req, res) => {
    if (!currentConnection) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not connected to MySQL' 
        });
    }
    
    const { database } = req.params;
    
    try {
        const connection = await mysql.createConnection({
            ...currentConnection,
            database: database
        });
        
        const [rows] = await connection.query('SELECT * FROM users');
        await connection.end();
        
        res.json({ success: true, users: rows });
    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch users: ' + error.message 
        });
    }
});

// Disconnect
app.post('/api/disconnect', (req, res) => {
    currentConnection = null;
    res.json({ success: true, message: 'Disconnected' });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
