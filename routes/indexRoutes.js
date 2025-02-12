const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Home Route
router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

// Dashboard Route (Protected)
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

module.exports = router;
