const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
// const callbackURL =
//   process.env.NODE_ENV === 'production'
//     ? 'https://note-app-nyhh.onrender.com/google/callback'
//     : 'http://localhost:8000/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:process.env.GOOGLE_CALLBACK_URL ,
      passReqToCallback:true,
      scope: ['profile', 'email'],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Debugging: Log full profile data
        console.log('Google Profile Data:', profile);

        // Handle missing emails
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          profileImage: profile.photos?.[0]?.value || '',
          email: email, // Allow null emails
        };

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          user = await User.create(newUser);
          return done(null, user);
        }
      } catch (error) {
        console.error('Google Auth Error:', error);
        return done(error, null);
      }
    }
  )
);

//Google Login Route
router.get(
  '/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    prompt: 'select_account' // 👈 This forces Google to show the account selection screen
  })
);


router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard',
  })
);

//Routes if something goes wrong
router.get('/login-failure', (req, res) => {
  res.send('Failed to login');
});

//Destroy user session
router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.send('Error logging out');
    } else {
      res.redirect('/');
    }
  });
});

//Persist user data after successful authentication
passport.serializeUser(function (user, done) {
  console.log('Serializing User ID:', user.id);
  done(null, user.id);
});
//Retrieve user data from session
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    console.log('Deserializing User:', user);
    done(null, user);
  } catch (err) {
    console.error('Deserialization Error:', err);
    done(err, null);
  }
});

//DAshboard route
// router.get('/dashboard', (req, res) => {
//   try {
//     console.log('Session Data:', req.session);
//     console.log('Passport Data:', req.session.passport);
//     console.log('User Data:', req.user);

//     if (!req.session) return res.status(500).send('Session is not stored.');
//     if (!req.session.passport)
//       return res.status(500).send('Passport session missing.');
//     if (!req.user) return res.status(401).send('Access Denied - No User Found');

//     res.render('layouts/dashboard', { user: req.user });
//   } catch (error) {
//     console.error('Error rendering dashboard:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;


