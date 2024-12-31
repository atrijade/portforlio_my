const express = require('express');
const router = express.Router();
const db = require('./server'); // Import Firestore instance

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userSnapshot = await db.collection('users').where('email', '==', email).get();

        if (userSnapshot.empty) {
            return res.status(404).json({ error: 'User not found!' });
        }

        const userData = userSnapshot.docs[0].data();
        if (userData.password !== password) {
            return res.status(401).json({ error: 'Invalid password!' });
        }

        // Successful Login
        res.status(200).json({ message: 'Login successful!', user: userData });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Register is called");
    try {
        const userSnapshot = await db.collection('users').where('email', '==', email).get();

        if (!userSnapshot.empty) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        // Add new user to Firestore
        await db.collection('users').add({ username, email, password });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
