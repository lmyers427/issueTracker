const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imageBasePath ='uploads/Screenshots';

const ticketSchema = new Schema({

    name: {

        type: String,
        required: true,

    },

    category: {

        type: String,
        required: true,

    },
    
    initialDescription: {
        
        type: String,
        required: true,
    },

    priority: {
        
        type: String,
        required: true,
    },

    dateCreated: {

        type: Date, 
        default: Date.now
    },

    enteredBy: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    //reference the User's Teams with Object ID of Team
    assignedTo: {

            type: Schema.Types.ObjectId,
            
        },

   //images
   images: [

],
   //status
 resolvedDate: {

    type: Date
 },
   
  notes: [{
    text: {

        type: String,
        trim: true,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    noteBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

}], 

  deadline: {
    type: Date,
    
},

  status: {

    openned: {

        type: Boolean,
        default: true
    },

    assigned: {
        type: Boolean,
        default: false
    }

    
  },


});

//Helper function to create a property to reference coverImagePath 
//to pull the images from the public/uploads/BookCover path and 
//appends the coverImageName from the specific book to the reference
ticketSchema.virtual('imagePath').get(function() {
    if(this.images != null){

        return path.join('/', imageBasePath, this.imageName)

    }
})

module.exports = mongoose.model('Ticket', ticketSchema);
module.exports.imageBasePath = imageBasePath;