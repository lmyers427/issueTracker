const express = require('express');
const router = express.Router();
const path = require('path');
const ticketController = require('../controllers/teamController')





router.get('/', teamController.getTeams);

router.post('/' /* , upload.single('screenShot')*/, teamController.newTeam);


module.exports = router;