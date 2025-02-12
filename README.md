# Aether Pad

Aether Pad is a secure and responsive note-taking application designed for users to efficiently manage their notes. It offers a simple, user-friendly interface powered by Node.js, Express.js, and Bootstrap, with robust authentication using Google OAuth.

---

## Features

1. **User Authentication**
   - Secure login and signup using Google OAuth (Passport.js).

2. **Note Management**
   - Add, view, update, and delete personal notes.

3. **Responsive Design**
   - Bootstrap-powered interface for seamless usage on all devices.

4. **Data Security**
   - Notes are stored securely in a MongoDB database.

5. **Error Handling**
   - Friendly error pages (e.g., custom `404` page).

---

## Folder Structure

```
|-- public
|   |-- css
|       |-- main.css        # Custom styles
|   |-- img                 # Image assets (e.g., logo)
|
|-- server
|   |-- config
|       |-- db.js           # Database connection setup
|   |-- controllers
|       |-- dashboardController.js  # Dashboard-related logic
|       |-- mainController.js       # Main page logic
|   |-- middleware
|       |-- checkAuth.js    # Authentication middleware
|   |-- models
|       |-- Notes.js        # Notes schema
|       |-- User.js         # User schema
|   |-- routes
|       |-- auth.js         # Authentication routes
|       |-- dashboard.js    # Dashboard routes
|       |-- index.js        # Main routes
|
|-- views
|   |-- dashboard
|       |-- add.ejs         # Add note page
|       |-- index.ejs       # Dashboard home
|       |-- search.ejs      # Search notes
|       |-- view-notes.ejs  # View single note
|       |-- layouts
|           |-- dashboard.ejs  # Dashboard layout
|           |-- front-page.ejs # Main layout
|           |-- main.ejs       # General layout
|   |-- partials            # Shared components (e.g., navbar)
|   |-- about.ejs           # About page
|   |-- features.ejs        # Features page
|   |-- index.ejs           # Landing page
|
|-- .env                    # Environment variables
|-- app.js                  # Main application entry point
```

---

## Dependencies

The following dependencies are used in Aether Pad:

- **connect-mongo**: Stores sessions in MongoDB.
- **dotenv**: Manages environment variables.
- **ejs**: Template engine for rendering dynamic views.
- **express**: Web framework for Node.js.
- **express-ejs-layouts**: Layout support for EJS.
- **express-session**: Session management.
- **method-override**: Allows the use of HTTP verbs like PUT and DELETE.
- **mongoose**: MongoDB object modeling for Node.js.
- **passport**: Authentication middleware.
- **passport-google-oauth20**: Google OAuth 2.0 authentication strategy.

---

## Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
MONGODB_URI
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL
NODE_ENV
```

---

## Backend API Documentation

### Endpoints

1. **Home Page**
   - `GET /`
   - Renders the landing page.

2. **Dashboard**
   - `GET /dashboard`
   - Displays user notes.

3. **Add Note**
   - `POST /dashboard/add`
   - Adds a new note for the logged-in user.

4. **View Note**
   - `GET /dashboard/view-note/:id`
   - Views a specific note by ID.

5. **Update Note**
   - `PUT /dashboard/item/:id`
   - Updates a specific note by ID.

6. **Delete Note**
   - `DELETE /dashboard/item-delete/:id`
   - Deletes a specific note by ID.
     
7. **Search Note**
   - `GET /dashboard/search`
   - searches a specific note by ID.
---

## Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo-url/aether-pad.git
   cd aether-pad
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the necessary keys (`MONGO_URI`, `GOOGLE_CLIENT_ID`, etc.).

4. **Start the Application**
   ```bash
   npm start
   ```
   The app will run at `http://localhost:8000` by default.

---

## Deployment Guide

To deploy the app to platforms like Heroku or Render:

1. **Set Up Environment Variables**
   - Add the `.env` keys to your deployment platform.



3. **Install Add-Ons** (e.g., MongoDB)
   - Configure MongoDB via services like MongoDB Atlas.

---

## How to Contribute

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.



