const express = require('express');
const router = express.Router();
const path = require('path');





router.get('/', (req, res) => {

    //checks if session user has been assigned or if user has logged in. If no, routes user back to login page to login first
    if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: "Please Login"} );

    
    //res.render(path.join(__dirname, '..', 'views', 'calendar'), {message: ' '}); //with ejs updated to render
    res.render('../views/calendar', { user: req.session.user, message: '', userDetails: req.session.userDetails, imagePath: req.session.imagePath});
});

module.exports = router;