const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const path = require('path');
const corsOptions = require('../model/config/corsOptions');
const PORT = process.env.PORT || 3000;
const errorHandler = require('../middleware/errorHandler');
const { logger } = require('../middleware/logEvents');

//I might not need this here depending....
const db = require('../model/config/database');


// custom middleware logger
app.use(logger);

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
app.use('/users', require('../routes/api/users'));
app.use('/testcontrol', require('../routes/testcontrol'));
app.use('/createTicket', require('../routes/createTicket'));
app.use('/viewTicket', require('../routes/viewTicket'));

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
function dbconnCB (err) {
	if(err){
	    console.log('unable to connect to database');
	    process.exit(1);
	}
	else {
	    app.listen(PORT,()=>{
                console.log(`connected to database, app listening on port ${PORT}.`);
	    });
	}
}

db.connect((err)=>dbconnCB(err));
// ****
// DATABASE RELATED CODE END
// ****


//PORT listening
//app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));