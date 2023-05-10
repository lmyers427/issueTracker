const express = require('express');
const router = express.Router();
const path = require('path');
const ticketController = require('../controllers/ticketController')





router.get('/', ticketController.getTicket);

//router.post('/' /* , upload.single('screenShot')*/, ticketController.updateTicket);


module.exports = router;