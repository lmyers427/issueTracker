const fs = require('fs');
const path = require('path');
const User = require('../model/Users');
const uploadPath = path.join('public', User.profileImageBasePath);

const removeProfileImage = (fileName) => {

fs.unlink(path.join(uploadPath, fileName), err => {
    if(err) console.error(err);
})
}

module.exports = removeProfileImage;