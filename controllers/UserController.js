// user Crud Operations
const User = require('../models/User');
const Response = require('../lib/Response');

// get a list of all users
async function getAll (req, res, next) {
    try{
        const users = await User.find({});
        const response = new Response(200, 'Success', users, null);
        response.send(res)
    } catch(err) {
        throw err;
    }
}

/*
    *Create a new user
    @param {Object} data - user data
    @param {String} data.username - email address
    @param {String} data.password - password
    @param {String} data.firstName - first name
    @param {String} data.lastName - last name
    @returns {Promise} - Promise object represents the created user
*/
async function create (req, res, next) {
    try{
        const {username, password, displayName} = req.body;
        if(!username || !password) {
            const error = new Error('Missing Required Field (username, password)')
            next(error)
        }

        const userInfo = {
            email: username,
            password: password,
            displayName: displayName
        }
        
        const user = await User.create(userInfo);
        const response = new Response(201, 'Success', user, null);
        response.send(res);
    } catch(err) {
        throw err;
    }
}

/*
    *Lookup user by id
    @param {string} id - User id
    @returns {object} data - User 
*/
async function findById (req, res, next) {
    try{
        const {id} = req.params
        if(!id){
            const error = new Error('Missing Required Field (id)')
            next(error)
        }
        const user = await User.findById(id)
        const response = new Response(200, 'Success', user, null)
        response.send(res)
    } catch (err) {
        throw err
    }
}

/*
    *Delete user by id
    @param {string} id - User id
    @returns {object} data - Deleted User 
*/
async function deleteById (req, res, next) {
    try{
        const {id} = req.params
        if(!id) {
            const error = new Error('Missing Required Field (id)')
            next(error)
        }
        const r = await User.findByIdAndDelete(id)
        const response = new Response(200, 'Success', r, null)
        response.send(res)
    } catch (err) {
        throw err
    }
}

/*
    *Lookup user by key and value
    @param {string} key - User key
    @param {string} value - User value
    @returns {object} data - User
*/
async function findOne (key, value) {
    try{
        const result = await User.findOne( {[key]: value} )
        return result
    } catch (err) {
        throw err
    }
}

/*
    *Update user by id
    @param {string} id - User id
    @param {object} data - User data
    @returns {object} data - Updated User
*/
async function updateById (req, res, next) {
    try{
        const {id} = req.params
        if(!id) {
            const error = new Error('Missing Required Field (id)')
            next(error)
            return
        }
        const {username, displayName, session} = req.body;
        if(!username) {
            const error = new Error('Missing Required Field (username)')
            next(error)
            return
        }

        const userInfo = {
            email: username,
            displayName: displayName,
            session: session
        }

        const r = await User.findByIdAndUpdate(id, userInfo)
        const response = new Response(200, 'Success', r, null)
        response.send(res)
    } catch (err) {
        throw err
    }
}

module.exports = {getAll, create, findById, deleteById, updateById, findOne}