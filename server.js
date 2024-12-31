const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const session = require('express-session'); // Add express-session for session management

// Firebase Admin SDK initialization
const serviceAccount = require('./my-profile-firestore-firebase-adminsdk-fu202-a42a4cf9dd.json'); // Replace with the path to your Firebase Admin SDK key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Firestore database instance

const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
app.use(
    session({
        secret: 'your-secret-key', // Replace with a strong secret key
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set secure to true if using HTTPS
    })
);

// Middleware to serve static files (e.g., CSS, images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to check if the user is logged in (for protected routes)
const checkAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next(); // User is logged in, proceed to the next middleware/route
    } else {
        res.redirect('/login'); // Redirect to login page if not authenticated
    }
};

// Routes

// Login route (GET)
app.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});

// Signup route (POST)
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email already exists in Firestore
        const userSnapshot = await db.collection('users').where('email', '==', email).get();
        if (!userSnapshot.empty) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        // Add a new user to Firestore
        await db.collection('users').add({ username, email, password });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login POST route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Search Firestore for the user with the provided email
        const userSnapshot = await db.collection('users').where('email', '==', email).get();

        if (userSnapshot.empty) {
            return res.status(404).json({ error: 'User not found!' });
        }

        const userData = userSnapshot.docs[0].data();
        if (userData.password !== password) {
            return res.status(401).json({ error: 'Invalid password!' });
        }

        // Store user session on successful login
        req.session.user = { email: userData.email, username: userData.username };
        res.redirect('/'); // Redirect to the homepage after successful login
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout route (to destroy the session)
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/login'); // Redirect to login page after logging out
    });
});

// Protected homepage route
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index', { user: req.session.user }); // Pass user info to the homepage
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Search Firestore for the user with the provided email
        const userSnapshot = await db.collection('users').where('email', '==', email).get();

        if (userSnapshot.empty) {
            return res.status(404).json({ error: 'User not found!' });
        }

        const userData = userSnapshot.docs[0].data();
        if (userData.password !== password) {
            return res.status(401).json({ error: 'Invalid password!' });
        }

        // Store user session on successful login
        req.session.user = { email: userData.email, username: userData.username };

        // Redirect to the homepage after successful login
        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
