const express = require('express');
const router = express.Router();
const path = require('path');
const ticketController = require('../controllers/ticketController')





router.get('/', (req, res) => {

    //checks if session user has been assigned or if user has logged in. If no, routes user back to login page to login first
    if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: "Please Login"} );

    console.log(req.session.users);
    res.render(path.join(__dirname, '..', 'views', 'tickets'), {message: ' ', users: req.session.users, teams:req.session.teams}); //with ejs updated to render
    
});

router.post('/' /* , upload.single('screenShot')*/, ticketController.newTicket);


module.exports = router;