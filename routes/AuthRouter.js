const express = require('express');
const Response = require('../lib/Response');
const asyncHandler = require('../lib/AsyncHandler');
const {config} = require('dotenv');

const router = express.Router();

const  {login, logout, resetPassword, beginReset, checkToken} = require('../controllers/AuthController');
const {mailTester} = require('../lib/mailer');

config();

//  api/auth/login
router.post('/login', asyncHandler( async (req,res, next) => {
    try{
        const {username, password} = req.body;

        if(!username || !password) {
            const response = new Response(400, 'Username and password required', null, {error: 'Username and password required'});
            response.send(res);
            return;
        }

        const result = await login(username, password);

        // set a cookie with the session id - 24 hours
        res.cookie('session', result.session, {expires: new Date(Date.now() + (60 * 60 * 24 * 1000)), httpOnly: true});

        const response = new Response(200, 'Login Successful', result, null);
        response.send(res);

    } catch (err) {
        next(err);
    }
}));

router.post('/logout', asyncHandler( async (req,res, next) => {
    try{
        const {session} = req.cookies;
        if (session) {
            const result = await logout(session);
            res.cookie('session', '', {expires: new Date(Date.now()), httpOnly: true});
            const response = new Response(200, 'Logout Successful', result, null);
            response.send(res);
        } else {
            throw new Error('Missing Required Field (Active Session)');
        }
    } catch (err) {
        throw err
    }
}));


//---------------------------------
// User Self Service Password Reset
//---------------------------------

// begin the password reset
router.post('/reset', asyncHandler( async (req,res, next) => {
    try{
        const {email} = req.body;

        if(!email) {
            const response = new Response(400, 'Email required', null, {error: 'Email required'});
            response.send(res);
            return;
        }

        const result = await beginReset(email);
        
         // reset email should be send here after the user has been updated with reset token
         if(process.env.NODE_ENV === 'production') {
            console.log('send email here')
        } else {
            await mailTester(result.emailInfo);
        }

        const response = new Response(200, 'Password Reset Initiated', {...result.userInfo}, null);
        response.send(res);

    } catch (err) {
        throw err
    }
}));

// check the token and reset the password
router.get('/reset/:userId/:token', asyncHandler( async (req,res, next) => {
    const {userId, token} = req.params;

    try{
        const result = await checkToken(userId, token);
        const response = new Response(200, 'Password Reset Confirmed', result, null);
        response.send(res)
    } catch (err) {
        throw err
    }
}));

// reset the users password
router.post('/reset/:userId/:token', asyncHandler( async (req,res, next) => {
    const {userId, token} = req.params;
    const {password} = req.body;

    if(!password) {
        const response = new Response(400, 'Password required', null, {error: 'Password required'});
        response.send(res);
        return;
    }

    try{
        const result = await resetPassword(userId, token, password);

        const response = new Response(200, 'Password Reset Successful', result, null);
        response.send(res)
    } catch (err) {
        throw err
    }
}));

// router 404 handler
router.use((req,res) => {
    const response = new Response(404, 'Method Not Supported', null, {error: 'Method Not Supported', path: req.url, method: req.method});
    response.send(res);
});

module.exports = router;