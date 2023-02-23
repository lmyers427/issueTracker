//const mysql = require('mysql');
const express = require('express');
const db = require('..config/database');
const app = express();

const testControl = (req, res) => {
   req.session.viewCount++;
   res.render("../views/index_new", { viewCount: req.session.viewCount });
};


module.exports = {

    testControl

}