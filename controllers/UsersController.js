const mysql = require('mysql');
const express = require('express');
const db = require('../model/config/database');
const app = express();

const getAllUsers = (req, res) => {

    let sql = 'SELECT u.email, u.firstname, u.lastname, r.name AS role FROM users u INNER JOIN roles r ON u.roleId = r.id';

    let query = db.query(sql, (err, results) =>
    {

        if(err) throw err;

        res.send(results);

    });

};

const createNewUser = (req, res) => {
    //For Testing Use ThunderClient Body.Json

    let newUser = {
        email: req.body.email, 
        firstname: req.body.firstname,
        lastname:  req.body.lastname,
        roleId: req.body.roleId
    }

    

    if(!newUser.email || !newUser.firstname || !newUser.lastname || !newUser.roleId){

        return res.status(400).json({ 'message': 'All data fields are required.' });
    }

    let sql = 'INSERT INTO users SET ?';

    let query = db.query(sql, newUser, (err, results) => {

        if(err) throw err;

        console.log(results);
        res.send(newUser);
    });

};

const updateUser = (req, res) => {

    let user = {};

    if(!req.body.id){
        
        return res.status(400).json({ 'message': 'User Id is required' });
    }

    user.id = req.body.id;

    let sql = `SELECT * FROM users u WHERE u.id=${req.body.id} LIMIT 0,1`;
  
    let query = db.query(sql, (err, results) =>
    {
        if(err) throw err;
        else if (results.length === 0){
            res.status(400).json({'message' :  `User Id ${req.body.id} does not exist`});
        }
        else{
        console.log("User Id found...Proceeding to Delete");
        }
    });
    if(req.body.firstname) user.firstname = req.body.firstname;
    if(req.body.lastname) user.lastname = req.body.lastname;
    if(req.body.email) user.email = req.body.email;
    if(req.body.roleId) user.roleId = req.body.roleId;

    let sql2 = `UPDATE users SET ? WHERE id=${req.body.id}`;

    let query2 = db.query(sql2, user, (err, results) =>
    {
        if(err) throw err;
        console.log(results);
        res.send(user);
    });
};

const deleteUser = (req, res) => {

    let user = {};

    if(!req.body.id){
        
        return res.status(400).json({ 'message': 'User Id is required' });
    }

    user.id = req.body.id;

    let sql = `SELECT * FROM users u WHERE u.id=${req.body.id} LIMIT 0,1`;
  
    let query = db.query(sql, (err, results) =>
    {
        if(err) throw err;
        else if (results.length === 0){
            res.status(400).json({'message' :  `User Id ${req.body.id} does not exist`});
        }
        else{
        console.log("User Id found...Proceeding to Delete");
        }
    });

    let sql2 = `DELETE FROM users WHERE id=${req.body.id}`;

    let query2 = db.query(sql2, (err, results) =>
    {
        if(err) throw err;
        console.log(results);
        res.send(`User ID ${req.body.id} has been deleted`);
    });


};


const getUser = (req, res) => {

    let sql = `SELECT u.email , u.firstname , u.lastname, r.name AS role FROM users u INNER JOIN roles r ON u.roleId = r.id WHERE u.id=${req.params.id} LIMIT 0,1`;
  
    let query = db.query(sql, (err, results) =>
    {
        if(err) throw err;
        else if (results.length === 0){
            res.status(400).json({'message' :  `User Id ${req.params.id} does not exist`});
        }
        else{
        res.send(results);
        }
    });
};

module.exports = {

    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser, 
    getUser

}