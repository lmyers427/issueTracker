const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: {

        type: String,
        required: true,
        index: {index: {unique: true}}

    },
    
    teamLead: {

        type: [ {

            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        validate: [arrayLimit, 'Limit of one Team Lead Reached']
        
    },
   
    //reference Tickets with Object ID
    Tickets :{
        type: [{

            type: Schema.Types.ObjectId,
            ref: 'Ticket'
        }],
        },
    
    //reference the User's Teams with Object ID of Team
    Users: {
        type: [{

            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        },

   
});

function arrayLimit(val) {

    return val.lenth === 1;
}


module.exports = mongoose.model('Team', userSchema);
