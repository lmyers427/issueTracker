/**
 * This Controller interacts with out User collection in MongoDB to create a new user
 * 
 */



const Ticket = require('../model/Tickets');
const User = require('../model/Users');
const Teams = require('../model/Teams');
const express = require('express');
const mongoose = require('mongoose');

const newTicket = async (req, res) => {

    
   const {category, message, assignedTo} = req.body; //may change depending on HTML
  
   const userAssigned = await User.findOne({_id:assignedTo});

   const teamAssigned = await Teams.findOne({_id:assignedTo});

   
   try{

        // //creates new user
        const newTicket = new Ticket();
        newTicket.enteredBy = req.session.user;
        newTicket.category = category;
        newTicket.initialDescription = message;
        if(userAssigned) newTicket.assignedTo = mongoose.Types.ObjectId(userAssigned);
        if(teamAssigned) newTicket.assignedTo = mongoose.Types.ObjectId(teamAssigned);
        if(userAssigned || teamAssigned) newTicket.status.assigned = true;
        newTicket.notes.text = "Ticket Created";
        newTicket.notes.noteBy = req.session.user;
        
        console.log(newTicket);
    //     const result = await newUser.save();

        res.render('../views/index.ejs', {message: req.session.message = 'Ticket Created',user: req.session.user, role: req.session.role, message: '', userDetails: req.session.userDetails, imagePath: req.session.imagePath});
    
    }catch(error){
        console.log(error);
        res.status(500).render('../views/login.ejs', {message: req.session.message = 'Failed to create Ticket'});
    }
}

module.exports = {
    newTicket
}