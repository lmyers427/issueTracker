/**
 * This Controller interacts with out User collection in MongoDB to create a new user
 * 
 */



const Ticket = require('../model/Tickets');

const newTicket = async (req, res) => {

    console.log(req.body.priorty)


    //const {username, password} = req.body; //may change depending on HTML
    
    // try{

    //     // //creates new user
    //     const newTicket = new Ticket();
    //     newTicket.username = username;
    //     newUser.password = password;
    //     newUser.email = req.body.email;
    //     newUser.first_name = req.body.fname;
    //     newUser.last_name = req.body.lname;

    //     const result = await newUser.save();

    //     res.render('../views/login.ejs', {message: req.session.message = 'User successfully created. Please Login'});
    
    // }catch(error){
    //     console.log(error);
    //     res.status(500).render('../views/login.ejs', {message: req.session.message = 'Failed to create new user'});
    // }
}

module.exports = {
    newTicket
}