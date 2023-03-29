const express = require('express');
const router = express.Router();
const path = require('path');
const resetController = require('../controllers/resetContorller');


router.get('/', (req, res) => {
    
    res.render(path.join(__dirname, '..', 'views', 'reset-password-auth'), {message: 'Please enter a new password to reset'}); //with ejs updated to render
    
});


router.post('/auth/resetPassword', resetController.resetPasswordController);

module.exports = router;