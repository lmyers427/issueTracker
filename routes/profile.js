const express = require('express');
const router = express.Router();
const path = require('path');

var sess;
router.get("/", function(req,res){
   if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: ' '} );


   res.render(path.join(__dirname, '..', 'views', 'profile'), {user: req.session.user, role: req.session.role, userDetails: req.session.userDetails, imagePath: req.session.imagePath });

});

module.exports = router; 