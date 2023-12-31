/**
 * This Controller interacts with our User database collection 
 * to verify if the individual attempting to log in is an existing user 
 * or needs to create an account. 
 * If the user exist a req.session.user variable is created for that user
 * so our application knows the user is logged in under that username. 
 */
const User = require('../model/Users');
const Team = require('../model/Teams');
const express = require('express');




const ExistingUser = async (req, res) => {

    

    const {username, password} = req.body; 

    console.log(req.body);
    if(!username || !password) return res.status(400).json({'message':'Username and password required'});

    //Fetch existing user from Database 
    const existingUname = await User.findOne({username: username}).exec();

    

     //if User does not exist
    if(!existingUname) return res.render('../views/register.ejs', { message: req.session.message = 'Username Not Found' });


     //Create a variable to validate passwords
    const validatePW = await existingUname.comparePassword(password);

    //if Password does not match 
    if(!validatePW) return res.render('../views/login.ejs', { message: req.session.message =  `Incorrect password` });


    //If Login is successful
    
        //Assigns session veriable user with id of user instance
        req.session.user = existingUname._id;

        //Assign session variable username with username of user instance

        req.session.username = existingUname.username;

        //Assigning session variable to User's assigned roles
        req.session.role = existingUname.role;

        //User details 
        req.session.userDetails = existingUname;

        //Create a session variable with TEAMS {id & name}
        req.session.teams = await Team.find({}).select('teamName');

        //Create a session variable with Users {id & name}

        req.session.users = await User.find({}).select('username');
        
        console.log(req.session.users);
        //store image

        if (existingUname.profileImagePath) req.session.imagePath = existingUname.profileImagePath;

    
        res.render('../views/index.ejs', { user: req.session.user, message: '', userDetails: req.session.userDetails,teamTickets: req.session.teamTickets, imagePath: req.session.imagePath});

       



    
  

}


module.exports = {

    ExistingUser
}