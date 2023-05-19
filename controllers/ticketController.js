/**
 * This Controller interacts with out User collection in MongoDB to create a new user
 * 
 */



const Ticket = require('../model/Tickets');
const User = require('../model/Users');
const Teams = require('../model/Teams');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { ObjectId } = require('mongodb');

const newTicket = async (req, res) => {

    
   const {category, message, assignedTo, priority, ticketName, deadline} = req.body; //may change depending on HTML
  
   const userAssigned = await User.findOne({_id:assignedTo});

   const teamAssigned = await Teams.findOne({_id:assignedTo});

   
   try{

        // //creates new ticket
        const newTicket = new Ticket();
        newTicket.enteredBy = req.session.user;
        newTicket.category = category;
        newTicket.name = ticketName;
        newTicket.priority = priority;
        newTicket.initialDescription = message;
        if(userAssigned) newTicket.assignedTo = mongoose.Types.ObjectId(userAssigned);
        if(teamAssigned) newTicket.assignedTo = mongoose.Types.ObjectId(teamAssigned);
        if(userAssigned || teamAssigned) newTicket.status.assigned = true;
        if(deadline) newTicket.deadline = new Date(deadline);
        const note = {
            text: "Ticket Created",
            noteBy: req.session.user,

        }
        newTicket.notes.push(note);

        console.log(newTicket);
        if(userAssigned) userAssigned.tickets.push(newTicket._id);
        if(teamAssigned) teamAssigned.tickets.push(newTicket._id);

       
       if(userAssigned){ const updateUser = await userAssigned.save();}
       if(teamAssigned) {const updateTeam = await teamAssigned.save();}
        const result = await newTicket.save();

        if(userAssigned._id === req.session.user) req.session.user = userAssigned;
       
        res.render('../views/index.ejs', {message: req.session.message = 'Ticket Created',user: req.session.user, role: req.session.role, message: '', userDetails: req.session.userDetails, imagePath: req.session.imagePath});
    
    }catch(error){
        console.log(error);
        res.status(500).render('../views/login.ejs', {message: req.session.message = 'Failed to create Ticket'});
    }
}

const getTickets = async (req, res) => {

    if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: "Please Login"} );

    //pull object ids from user 
    const user = await User.findById(req.session.user);

    const tickets = await Ticket.find({_id:{$in:user.tickets}});

    console.log(tickets);

   
    res.render(path.join(__dirname, '..', 'views', 'tickets'), {
        user: req.session.user, 
        message: ' ', 
        users: req.session.users, 
        teams:req.session.teams, 
        userTickets: tickets, 
        imagePath: req.session.imagePath, 
        userDetails: req.session.user}); //with ejs updated to render
    

}

const getTicket = async(req, res) => {

 const {id} = req.query;

 const ticket = await Ticket.findById(id);

 const assignedTo = await User.findById(ticket.assignedTo);

 let notes = [];

for(let item of ticket.notes){

    let user = await User.findById(item.noteBy);

    let note = {
        text: item.text,
        noteBy: user.username,
        date: item.date.toDateString()
        
    }
    
    notes.push(note);
}

 
console.log(notes);
 


  //checks if session user has been assigned or if user has logged in. If no, routes user back to login page to login first
  if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: "Please Login"} );

  res.render(path.join(__dirname, '..', 'views', 'ticketDetail'), {
                      message: ' ', 
                      users: req.session.users, 
                      teams:req.session.teams,
                      user: req.session.user,
                      userDetails: req.session.userDetails,
                      imagePath: req.session.imagePath, 
                      ticket: ticket,
                      assignedTo: assignedTo,
                      notes: notes,
                      

                      }); //with ejs updated to render


}

module.exports = {
    newTicket,
    getTickets,
    getTicket
}