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
    if (!req?.body?.title3) return res.status(400).json({ 'message': 'Book title required.' });
     
    const bookTitle = req.body.title3;

    //file for cover image, if it is equal to null then the file is null
    //req.file is sent from built-in middleware from multi
    const fileName = req.file != null ? req.file.filename : null;

    const book = await Book.findOne({ title: bookTitle }).exec();
    if (!book) {
        return res.status(204).json({ "message": `No book found matching title ${req.body.title3}.` });
    }
    //will chain through potential items in document to update. 
    //Currently we are only updating cover picture 
    //will add more later
    try{
    if(fileName) book.coverImageName = fileName;

    const result = await book.save();

    //for testing

    //res.json(result + 'updated');
    
    res.render('../views/books.ejs', {message: 'Book Successfully Updated'});
    


    }catch(error){
        if(newBook.coverImageName != null){
        //helper function from middleware to remove image 
        //from saved public/uploads/bookCovers folder    
        removeBookCover(newBook.coverImageName)
        }
        res.status(500)
    }
    
}

module.exports = {
    updateUser
}