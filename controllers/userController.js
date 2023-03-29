/**
 * The User Controller is a compilation of functions exported to our 
 * routes to communcate with our MongoDB collection Books
 * These various functions will interact with the form data submitted 
 * by the user currently logged into the application and respond accordingly
 * 
 * 
 */

const User = require('../model/Users');
const bcrypt = require('bcrypt');
//Implement middleware
const removeProfileImage = require('../middleware/removeProfileImage');



const updateUser = async (req, res) => {
    

    //file for cover image, if it is equal to null then the file is null
    //req.file is sent from built-in middleware from multi
    const fileName = req.file != null ? req.file.filename : null;

    const {password1, password2, email, first_name, last_name} = req.body;

    const user = await User.findById(req.session.user);
    if (!user) {
        return res.status(204).json({ "message": `No user found` });
    }

    if(!(password1 === password2)){
        res.render('../views/profile.ejs', {message: 'Passwords do not match'});
    
    }

    if(fileName && user.profileImageName) removeProfileImage(user.profileImageName);
    
    try{

    if(fileName) user.profileImageName = fileName;
    if(email) user.email = email;
    if(first_name) user.first_name = first_name;
    if(last_name) user.last_name = last_name;
    if(password2) user.password = password2;
    
    
    
    const result = await user.save();

    

    req.session.userDetails = user;

    req.session.imagePath = user.profileImagePath;
    
    res.render('../views/profile.ejs', {message: result, userDetails: req.session.userDetails, imagePath: req.session.imagePath });
    


    }catch(error){
        if(user.profileImageName != null){
        //helper function from middleware to remove image 
        //from saved public/uploads/bookCovers folder    
        removeProfileImage(user.profileImageName)
        }
        res.render('../views/profile.ejs', {message: "An error occured while trying to update user", userDetails: req.session.userDetails });
    
    }
    
}



module.exports = {
    updateUser
}