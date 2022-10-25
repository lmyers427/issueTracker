const express = require('express');
const router = express.Router();
const path = require('path');

const testController = require('../controllers/testController');

//app.get('/:action', function (req, res) {
// console.log(req.params['action']);
//});

router.get("/", testController.testControl);
router.post("/", testController.testControl);

//router.get("/", (req, res, next) => {
//console.log("testcontrol route called-b4 ctl");
//	testController.testControl;
//console.log("testcontrol route called-after ctl");
//   let viewCount = 0;
//   viewCount += 1;
//   res.render("../views/index_new", { viewCount });
        
//});

module.exports = router; 