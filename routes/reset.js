const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');


router.get('/', (req, res) => {
    
    res.render(path.join(__dirname, '..', 'views', 'reset-password'), {message: 'Please enter your email address. You will receive a link to create a new password via email. '}); //with ejs updated to render
    
});

//route called when user submits Login Form
router.post('/', userController.resetPw);

module.exports = router;