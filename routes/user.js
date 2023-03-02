const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');

/*****
 * The following variables are 
 * implemented for fetching image files
 * and storing them into our public/uploads/bookCover path
*******/
const multer = require('multer');
const User = require('../model/Users');
const uploadPath = path.join('public', User.profileImageBasePath);
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif' ];
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
});

router.post('/update', upload.single('profileImage'), userController.updateUser);
module.exports = router;