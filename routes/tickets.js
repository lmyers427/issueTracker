const express = require('express');
const router = express.Router();
const path = require('path');
const ticketController = require('../controllers/ticketController')





router.get('/', ticketController.getTickets);

router.post('/' /* , upload.single('screenShot')*/, ticketController.newTicket);


module.exports = router;