// Router for issue related requests

const express = require('express');
const router = express.Router();

const asyncHandler = require('../lib/AsyncHandler');
const privilegeCheck = require('../middleware/privilegeCheck');

const Response = require('../lib/Response');

const {create, getAll, findByUser, update, limitedUpdate, remove} = require('../controllers/IssueController');

// get All Issues regardless of user or status - admin
router.get('/', privilegeCheck, asyncHandler( async (req, res, next) => {
        try{
            const result = await getAll(req, res, next)
            const response = new Response(200, 'Issues found', result);
            response.send(res)
        } catch (err) {
            next(err);
        }
}));

// get all issues created by a user - authenticated users
router.get('/user/:id', asyncHandler( async (req, res) => {
    try{
        const result = await findByUser(req, res)
        const response = new Response(200, 'Issues found', result);
        response.send(res)
    } catch (err) {
        next(err)
    }
}));

// createa a new issue - authenticated users
router.post('/' , asyncHandler( async (req, res, next) => {
    try{
        const result = await create(req, res, next)
        const response = new Response(200, 'Issue created', result);
        response.send(res)

    } catch (err) {
        next(err);
    }
}));

// admin - update Issue
router.put('/:id', privilegeCheck, asyncHandler( async (req, res) => {
    try{
        const result = await update(req, res)
        const response = new Response(200, 'Issue updated', result);
        response.send(res)
    } catch (err) {
        next(err);
    }
}));

// authenticated user - edit specific issue
router.put('/:issueId/user/:userId', asyncHandler( async (req, res) => {
    try{
        const result = await limitedUpdate(req, res)
        const response = new Response(200, 'Issue updated', result);
        response.send(res)
    } catch (err) {
        next(err);
    }
}));

// admin - delete Issue
router.delete('/:id', privilegeCheck, asyncHandler( async (req, res, next) => {
    try{
        const result = await remove(req, res)
        const response = new Response(200, 'Issue deleted', result);
        response.send(res)
    }catch (err) {
        next(err);
    }
}));

// authenticated user - delete specific issue
router.delete('/:issueId/user/:userId', asyncHandler( async (req, res) => {
    try{
        const result = await limitedRemove(req, res)
        const response = new Response(200, 'Issue deleted', result);
        response.send(res)
    } catch (err) {
        next(err);
    }
}));

module.exports = router;