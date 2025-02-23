# Portfolio Web Application

## Overview

This is a web application built using Node.js and Firebase Firestore. It features a user authentication system with login, registration, and logout functionalities. The application utilizes Express for routing, EJS for templating, and Firebase Firestore as the database. Sessions are used to manage authenticated user sessions.

## Features

* User registration with email, username, and password.

* Secure login with session management.

* Logout functionality to terminate user sessions.

* Protected routes accessible only to authenticated users.

* Frontend built with responsive HTML and integrated with the backend.

## Prerequisites

Before setting up the project, ensure you have the following installed:

* Node.js (v14 or later)

* npm (comes with Node.js)

* Firebase project setup with Firestore enabled.

## Setup

### 1. Clone the Repository
```
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Install Dependencies
```
npm install
```
### 3. Firebase Setup

* Go to the Firebase Console.

* Create a Firebase project.

* Enable Firestore Database.

* Download your Firebase Admin SDK JSON file:

* Navigate to Project Settings > Service Accounts > Generate New Private Key.

* Save the downloaded firebase-adminsdk.json file in the project root.

### 4. Configure Firebase

Replace the placeholder Firebase Admin SDK file path in server.js with the path to your downloaded file:

const serviceAccount = require('./firebase-adminsdk.json');

### 5. Start the Server

Run the following command to start the server:
```
node server.js
```
The application will be available at http://localhost:3000.

Project Structure
```
.
├── public
│   ├── css
│   │   └── styles.css      # CSS for the frontend
│   ├── js
│   │   └── scripts.js      # JavaScript for frontend functionality
├── views
│   ├── login.ejs           # Login page
│   ├── index.ejs           # Home page
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
├── firebase-adminsdk.json  # Firebase credentials (DO NOT SHARE)
```
## Routes

### 1. User Authentication

* Register: POST /register

* Body: { username, email, password }

* Registers a new user in Firestore.

* Login: POST /login

* Body: { email, password }

* Authenticates a user and creates a session.

* Logout: GET /logout

* Ends the session and redirects to the login page.

### 2. Protected Route

* Home: GET /

* Accessible only if the user is authenticated.

* Testing

* Visit http://localhost:3000/login.

* Register a new user and log in.

* Verify you can access the homepage.

* Click the Logout button to terminate the session.

* Ensure you are redirected to the login page.

## Dependencies

* express: Web framework for Node.js.

* ejs: Template engine for rendering views.

* express-session: Session management.

* body-parser: Middleware for parsing request bodies.

* firebase-admin: Firebase Admin SDK for Firestore operations.
