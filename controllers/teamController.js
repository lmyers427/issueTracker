/**
 * This Controller interacts with out User collection in MongoDB to create a new Team
 * 
 */


//const Ticket = require('../model/Tickets');
const User = require('../model/Users');
const Team = require('../model/Teams');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const newTeam = async (req, res) => {

    
   const {teamName, teamLead, tickets, members, status} = req.body; //may change depending on HTML
  
   //const userAssigned = await User.findOne({_id:assignedTo});

   //const teamAssigned = await Teams.findOne({_id:assignedTo});

   
   try{

        // //creates new Team
        const newTeam = new Team();
        //newTeam.enteredBy = req.session.user;
        newTeam.teamName = teamName;
        newTeam.teamLead = teamLead;
        newTeam.tickets = tickets;
        newTeam.members = members;
        newTeam.status = status;
        //if(userAssigned) newTicket.assignedTo = mongoose.Types.ObjectId(userAssigned);
        //if(teamAssigned) newTicket.assignedTo = mongoose.Types.ObjectId(teamAssigned);
        //if(userAssigned || teamAssigned) newTicket.status.assigned = true;
        //if(deadline) newTicket.deadline = new Date(deadline);
        //newTicket.notes.text = "Ticket Created";
        //newTicket.notes.noteBy = req.session.user;

        
    //     if(userAssigned) userAssigned.tickets.push(newTicket._id);
    //     if(teamAssigned) teamAssigned.tickets.push(newTicket._id);

       
    //    if(userAssigned){ const updateUser = await userAssigned.save();}
    //    if(teamAssigned) {const updateTeam = await teamAssigned.save();}
        const result = await newTeam.save();

        //if(userAssigned._id === req.session.user) req.session.user = userAssigned;
       
        res.render('../views/createTeam.ejs', {message: req.session.message = 'Team Created',user: req.session.user, role: req.session.role, message: '', userDetails: req.session.userDetails, imagePath: req.session.imagePath});
    
    }catch(error){
        console.log(error);
        res.status(500).render('../views/createTeam.ejs', {message: req.session.message = 'Failed to create Team'});
    }
}

const getTeams = async (req, res) => {

    if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: "Please Login"} );

    //pull object ids from user 
    const user = await User.findById(req.session.user);

    const tickets = await Ticket.find({_id:{$in:user.tickets}});

    res.render(path.join(__dirname, '..', 'views', 'tickets'), {
        message: ' ', 
        users: req.session.users, 
        teams:req.session.teams, 
        userTickets: tickets, 
        imagePath: req.session.imagePath, 
        userDetails: req.session.user}); //with ejs updated to render
    

}


module.exports = {
    newTeam,
    getTeams
}