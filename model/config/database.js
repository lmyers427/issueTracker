const mysql = require('mysql');
//Developement only; Once deployed to Heroku update Environment 
//Variables. 
require("dotenv").config({path:'../.env'});

const hostName = process.env.HOST_NAME;

const userName = process.env.USER_NAME;

const databaseName = process.env.DATABASE;

const db = mysql.createConnection({

    host: hostName,
    user: userName,
    database: databaseName
    //password: process.env.PASSWORD

});

db.connect((err) => {

    if(err){

        throw err;
    }

    console.log('MySql Connected');

})

module.exports = db;