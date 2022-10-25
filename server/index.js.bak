const express = require('express');
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
app.use(cors(corsOptions));


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//Serve Static Files ...This would be for CSS and Images
app.use('/', express.static(path.join(__dirname, '/public')));

//Routes 
app.use('/', require('../routes/root'));
app.use('/users', require('../routes/api/users'));


app.all('*', (req, res) => {

    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')){
        res.json({"error": "404 Not Found" });
    }
    else{
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

//PORT listening
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));