const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');

const app = express();

// Passport Config
require('./config/passportConfig')(passport);

// Set View Engine
app.set('view engine', 'ejs');

app.use(express.static('public'));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Flash Messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Serve Static Files
app.use(express.static('public'));

// Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);

// Start Server
const PORT = 4000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
});
