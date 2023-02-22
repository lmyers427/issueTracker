const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        // connect to mongoDB via DATABASE URI in .env file (local only)
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB
