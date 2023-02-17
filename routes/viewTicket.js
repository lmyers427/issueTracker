const express = require('express');
const router = express.Router();
const path = require('path');

//const testController = require('../controllers/testController');

//router.get("/", testController.testControl);
//router.post("/", testController.testControl);

router.get("/", (req, res, next) => {
   
   //console.log("createTicket route called");
   let viewCount = 0;
   viewCount += 1;
   res.render("../views/viewTicket", { var_pg: "VIEW_TICKET",
                                         viewCount });
        
});

module.exports = router; 