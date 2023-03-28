const express = require('express');
const router = express.Router();
const path = require('path');
const resetController = require('../controllers/resetContorller');


router.get('/', (req, res) => {
    
    res.render(path.join(__dirname, '..', 'views', 'reset-password'), {message: 'Please enter your email address. You will receive a link to create a new password via email. '}); //with ejs updated to render
    
});


router.post('/auth/requestResetPassword', resetController.resetPasswordRequestController);

router.post('/auth/resetPassword', resetController.resetPasswordController);

module.exports = router;