require('dotenv').config();
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
// const path = require('path');

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('Error: MONGO_URI environment variable is not set!');
  process.exit(1); // Exit the app if no MongoDB URI is provided
}

const app = express();
const port = process.env.PORT || 8000;
const authRoutes = require('./server/routes/auth'); // Correct path

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
// app.set('views', path.join(__dirname, 'views'));

// Database connection
connectDB();
app.set("trust proxy", 1);
// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Call of Duty',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 3600000,
      secure: process.env.NODE_ENV === 'production', // Set true for HTTPS
      sameSite: 'lax',
    },
  })
);

app.use((req, res, next) => {
  console.log('🔍 Session Before Request:', req.session);
  next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log('🔍 Session Data:', req.session);
  console.log('🔍 User Data:', req.user);
  next();
});
// Templating
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/dashboard'));


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// 404 Handler
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app._router.stack.forEach((route) => {
  if (route.route && route.route.path) {
    console.log(`✅ Registered Route: ${route.route.path}`);
  }
});
