
const express = require('express');
const { requestPasswordReset, resetPassword, registerUser } = require('../controllers/authControllers');
const router = express.Router();

// Route for requesting password reset
router.post('/request-password-reset', requestPasswordReset);

// Route for resetting password
router.post('/reset-password/:token', resetPassword);

router.post('/register', registerUser);

module.exports = router;
