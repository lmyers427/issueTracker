const whitelist = [

    'https://issuetracker-grl6.onrender.com',
];

const corsOptions =  {

    origin: (origin, callback) => {


        if(whitelist.indexOf(origin) !== -1 || !origin) {

            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;