const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Mock database for subscribers
let subscribers = [{ id: 1, email: 'lead@research.io', date: '2025-03-20' }];

const contentPath = path.join(__dirname, 'content.json');

// Get current website content
app.get('/api/content', (req, res) => {
    try {
        const data = fs.readFileSync(contentPath);
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to load content' });
    }
});

// Update website content from Admin Panel
app.post('/api/update-content', (req, res) => {
    try {
        const newContent = req.body;
        fs.writeFileSync(contentPath, JSON.stringify(newContent, null, 2));
        res.json({ success: true, message: "Website updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update content' });
    }
});

// Subscribe to newsletter
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    const newSub = { id: Date.now(), email, date: new Date().toISOString().split('T')[0] };
    subscribers.push(newSub);
    res.json({ message: 'Subscribed successfully!' });
});

// Admin routes
app.get('/admin/subscribers', (req, res) => {
    res.json(subscribers);
});

app.delete('/admin/subscribers/:id', (req, res) => {
    const { id } = req.params;
    subscribers = subscribers.filter(s => s.id != id);
    res.json({ success: true, message: "Subscriber removed." });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
});