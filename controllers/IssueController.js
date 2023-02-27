
const Issue = require('../models/Issue');

async function create(req, res, next ) {
    try {

        const {machine, user, issue, description} = req.body;

        // check required fields
        if(!machine || !user || !issue){
            const error = new Error('Missing one or more required fields');
            throw error;
        }

        const issues = await Issue.create({machine, user, issue, description});
        
        return issues;

    } catch (err) {
        throw err
    }
}

async function getAll(req, res, next) {
    try {

        const issues = await Issue.find().populate('machine').populate('user');

        return issues;

    } catch (err) {
        throw err
    }
}

// find all issues created by a user
async function findByUser(req, res, next) {
    try{

        const {id} = req.params;

        if(!id) {
            const error = new Error('Missing required fields (id)');
            throw error;
        }

        const issues = await Issue.find({user: id}).populate('machine')

        return issues;

    } catch(err) {
        throw err;
    }
}    

async function update(req, res, next) {
    try{

        const {id} = req.params;

        if(!id) {
            const error = new Error('Missing required fields (id)');
            throw error;
        }

        const {machine, user, issue, description, status} = req.body;

        const updatedIssue = Issue.findByIdAndUpdate(id, {machine, user, issue, description, status}, {new: true});

        return updatedIssue;

    } catch (err) {
        throw err
    }
}   

async function remove(req, res, next) {
    try{
    
        const {id} = req.params;

        if(!id) {
            const error = new Error('Missing required fields (id)');
            throw error;
        }

        const deletedIssue = await Issue.findByIdAndDelete(id);

        return deletedIssue;

    } catch (err) {
        throw err
    }   
}

async function limitedUpdate (req, res, next) {
    try{ 

        const {issueId, userId} = req.params;

        if(!issueId || !userId) {
            const error = new Error('Missing or Invalid required fields (id)');
            throw error;
        }

        const {machine, issue, description} = req.body;

        const i = Issue.findById(issueId);

        if(i.user != userId) {
            const error = new Error('User does not have permission to edit this issue');
            throw error;
        }

        const updatedIssue = await Issue.findByIdAndUpdate(issueId, {machine, issue, description}, {new: true});

        return updatedIssue;

    } catch (err) {
        throw err
    }
}

async function limitedRemove(req, res, next) {
    try{
        const {issueId, userId} = req.params;

        if(!issueId || !userId) {
            const error = new Error('Missing or Invalid required fields (id)');
            throw error;
        }

        const issue = await Issue.findById(issueId);

        if(issue.user != userId) {
            const error = new Error('User does not have permission to delete this issue');
            throw error;
        }

        const deletedIssue = await Issue.findByIdAndDelete(issueId);

        return deletedIssue;

    } catch(err) {

    }
}

module.exports = {create, getAll, findByUser, update, remove, limitedUpdate, limitedRemove}