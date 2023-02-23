const express = require('express');
const router = express.Router();
const path = require('path');
var sess;
router.get("/", function(req,res){
   sess = req.session;
   sess.viewCount = 100;
   res.render(path.join(__dirname, '..', 'views', "login"), { var_pg: "HOME", 
                                                                  viewCount: sess.viewCount });
});

module.exports = router; 