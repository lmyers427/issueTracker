require('dotenv').config();
require("express-async-errors");
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const corsOptions = require('../config/corsOptions');
const PORT = process.env.PORT || 3000;
const errorHandler = require('../middleware/errorHandler');
//const { logger } = require('../middleware/logEvents');
const mongoose = require('mongoose');
const connectDB = require('../config/database');


// Makes it easier to handle urlencoded & json form data
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());



//I might not need this here depending....
//const db = require('../model/config/database');

connectDB();


// custom middleware logger
//app.use(logger);

//Cross Origin Resource Sharing
//app.use(cors(corsOptions));


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// ****
// added for session variables
// ****
app.use(session({
   secret: 'secret-key',
   resave: false,
   saveUninitialized: false
}));


//Serve Static Files ...This would be for CSS and Images
app.use('/', express.static(path.join(__dirname, '..', '/public')));


//Routes 
app.use('/', require('../routes/root'));
app.use('/login' , require('../routes/login'));
app.use('/register', require('../routes/register'));
app.use('/logout', require('../routes/logout'));
app.use('/profile', require('../routes/profile'));
app.use('/createTicket', require('../routes/createTicket'));
app.use('/createTeam', require('../routes/createTeam'));
app.use('/user', require('../routes/user'));
app.use('/reset', require('../routes/reset'));
app.use('/resetauth', require('../routes/resetauth'));
app.use('/tickets', require('../routes/tickets'));


//Developer Routes- throwing an error about middleware 
 app.use('/icons', require('../routes/icons'));
 app.use('/forms', require('../routes/forms'));
 app.use('/tables', require('../routes/tables'));



// ****
// added for view engine
// ****
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");



//app.all('*', (req, res) => {
//
//    res.status(404);
//    if(req.accepts('html')){
//        res.render(path.join(__dirname, '../views', "404"));
//    }
//    else if (req.accepts('json')){
//        res.json({"error": "404 Not Found" });
//    }
//    else{
//        res.type('txt').send("404 Not Found");
//    }
//});

app.use(errorHandler);

// ****
// DATABASE RELATED CODE BEGIN
// ****
// function dbconnCB (err) {
// 	if(err){
// 	    console.log('unable to connect to database');
// 	    process.exit(1);
// 	}
// 	else {
// 	    app.listen(PORT,()=>{
//                 console.log(`connected to database, app listening on port ${PORT}.`);
// 	    });
// 	}
// }

//db.connect((err)=>dbconnCB(err));
// ****
// DATABASE RELATED CODE END
// ****
//Listen only if MongoDB connects
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    //might need to adjust this depending on how server is built
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

//PORT listening
//app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));