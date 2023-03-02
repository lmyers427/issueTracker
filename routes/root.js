const express = require('express');
const router = express.Router();
const path = require('path');
var sess;
router.get("/", function(req,res){
   if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: ''} );

   
   
   res.render(path.join(__dirname, '..', 'views', 'index'), {user: req.session.user, role: req.session.role, message: ''})

});

module.exports = router; 