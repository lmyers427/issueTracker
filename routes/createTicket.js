const express = require('express');
const router = express.Router();
const path = require('path');
const ticketController = require('../controllers/ticketController')





router.get('/', (req, res) => {

    //checks if session user has been assigned or if user has logged in. If no, routes user back to login page to login first
    if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: "Please Login"} );

    res.render(path.join(__dirname, '..', 'views', 'createTicket'), {
                        message: ' ', 
                        users: req.session.users, 
                        teams:req.session.teams,
                        user: req.session.user,
                        userDetails: req.session.userDetails,
                        imagePath: req.session.imagePath
                        }); //with ejs updated to render

});

router.post('/' /* , upload.single('screenShot')*/, ticketController.newTicket);


module.exports = router;