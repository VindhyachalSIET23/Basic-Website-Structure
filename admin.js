// admin.js - Integrated into your server.js or as a separate module
const express = require('express');
const router = express.Router();

// Mock database (In a real app, use MongoDB or PostgreSQL)
let subscribers = [{ id: 1, email: 'lead@research.io', date: '2025-03-20' }];

// Get all subscribers for the admin table
router.get('/subscribers', (req, res) => {
    res.json(subscribers);
});

// Delete a subscriber
router.delete('/subscribers/:id', (req, res) => {
    const { id } = req.params;
    subscribers = subscribers.filter(s => s.id != id);
    res.json({ success: true, message: "Subscriber removed." });
});

module.exports = router;