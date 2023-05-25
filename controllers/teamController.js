/**
 * This Controller interacts with out User collection in MongoDB to create a new Team
 * 
 */


const Ticket = require('../model/Tickets');
const User = require('../model/Users');
const Team = require('../model/Teams');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { ObjectId } = require('mongodb');

const newTeam = async (req, res) => {

    
   const {teamName, teamLead, members, status} = req.body; //may change depending on HTML
  
   //const userAssigned = await User.findOne({_id:assignedTo});

   //const teamAssigned = await Teams.findOne({_id:assignedTo});

   
   try{

        // //creates new Team
        const newTeam = new Team();
        //newTeam.enteredBy = req.session.user;
        newTeam.teamName = teamName;
        newTeam.teamLead = teamLead;
        if (members) { members.forEach(element => {
            newTeam.members.push(ObjectId(element));
        });}
            
        newTeam.status = status;
        
        //console.log(newTeam.members);
        //console.log(newTeam.teamLead);
        
       
        const result = await newTeam.save();

         //Create a session variable with TEAMS {id & name}
         req.session.teams = await Team.find({}).select('teamName');

        res.render('../views/createTeam.ejs', {
            message: req.session.message = 'Team Created',
            user: req.session.user,
            users: req.session.users, 
            teams:req.session.teams, 
//            userTickets: tickets, 
            imagePath: req.session.imagePath, 
            userDetails: req.session.user}); //with ejs updated to render
    
    }catch(error){
        console.log(error);
        res.status(500).render('../views/createTeam.ejs', {
            message: req.session.message = 'Failed to create Team',
            user: req.session.user,
            users: req.session.users, 
            teams:req.session.teams, 
//            userTickets: tickets, 
            imagePath: req.session.imagePath, 
            userDetails: req.session.user}); //with ejs updated to render
        }
}

const getTeams = async (req, res) => {

    if(!req.session.user || !req.session.role) return res.render(path.join(__dirname, '..', 'views', 'login'), {message: "Please Login"} );

    //pull object ids from user 
    const user = await User.findById(req.session.user);

    const tickets = await Ticket.find({_id:{$in:user.tickets}});

    res.render(path.join(__dirname, '..', 'views', 'tickets'), {
        message: ' ', 
        user: req.session.user,
        users: req.session.users, 
        teams:req.session.teams, 
//        userTickets: tickets, 
        imagePath: req.session.imagePath, 
        userDetails: req.session.user}); //with ejs updated to render
    

}


module.exports = {
    newTeam,
    getTeams
}