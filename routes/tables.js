const express = require('express');
const router = express.Router();
const path = require('path');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');




router.get('/', verifyRoles(ROLES_LIST.Editor), (req, res) => {

    //checks if session user has been assigned or if user has logged in. If no, routes user back to login page to login first
    if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: "Please Login"} );

    
    res.render(path.join(__dirname, '..', 'views', 'tables'), {user:req.session.user, userDetails: req.session.userDetails, message: ' ', imagePath: req.session.imagePath}); //with ejs updated to render
    
});
module.exports = router;