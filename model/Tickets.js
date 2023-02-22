const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageBasePath ='uploads/Screenshots';

const ticketSchema = new Schema({
    category: {

        type: String,
        required: true,

    },
    
    initialDescription: {
        
        type: String,
        required: true,
    },

    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    
    //reference the User's Teams with Object ID of Team
    Users: {
        type: [{

            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        },

   //images
   images: [
    
    imageName

],
   //status
   //resolvedDate
   //EnteredBy
   //Notes - User, Date, Detail
});

//Helper function to create a property to reference coverImagePath 
//to pull the images from the public/uploads/BookCover path and 
//appends the coverImageName from the specific book to the reference
ticketSchema.virtual('imagePath').get(function() {
    if(this.images != null){

        return path.join('/', imageBasePath, this.imageName)

    }
})

module.exports = mongoose.model('Ticket', userSchema);