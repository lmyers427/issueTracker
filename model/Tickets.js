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
   //status
   //resolvedDate
   //EnteredBy
   //Notes - User, Date, Detail
});



module.exports = mongoose.model('Team', userSchema);