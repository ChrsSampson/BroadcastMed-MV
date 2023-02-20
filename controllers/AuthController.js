const User = require('../models/User');
const {v4} = require('uuid');

async function login (username, plainPassword) {
    try{
    // find user in database
        const user = await User.findOne({'email': username});
        if(user && user.session){
            // respond with existing session
            return user;
        }

    // compare plainPassword with hashed password
        const u = new User(user); // a bit scuffed, doing this in order to use class methods

        if(user){
            const match = await u.comparePassword(plainPassword);
     // if match, create user session
            if(match) {
                // generate session id with UUID
                const session = v4();
                const updatedUser = await User.findByIdAndUpdate(u._id, {session}, {new: true});
                return updatedUser;
            } else {
                throw new Error('Invalid username or password');
            }
        } else {
            throw new Error('Invalid username or password');
        }
    } catch(err) {
        throw err;
    }
}

async function logout (session) {
    try{
        // find user by session
        const user = await User.findOneAndUpdate({'session': session}, {session: null}, {new: true});
        // delete session
        return user;
    } catch (err) {
        throw err;
    }

}

//---------------------------------
// User Self Service Password Reset
//---------------------------------

// begin password reset 
// generate reset token and stick it to user
// set expiry to 1 hour from now
// send email to user with reset link containing token and userId
async function beginReset (email) {
    // the check for emaiul is done in the router
    try{
        const token = v4();
        // 1 hour from now
        const expiry = new Date(Date.now() + (60 * 60 * 1000));

        const updatedUser = await User.findOneAndUpdate({email: email}, {resetToken: token, resetExpiry: expiry}, {new: true})

        // remote irreelevant fields
        const userInfo = {
            email: updatedUser.email,
            displayName: updatedUser.displayName
        }

        const emailInfo = {
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            id: updatedUser._id, 
            token: updatedUser.resetToken,
        }

        return {userInfo, emailInfo}
    } catch (err) {
        throw err;
    }   
}

// check user token against user Id
async function checkToken (id, token) {
    try{
        const user = await User.findById(id);

        if(!user) {
            throw new Error('Invalid token');
        }

        // user to info to be returned if valid
        const userInfo = {
            email: user.email,
            displayName: user.displayName,
            _id: user._id
        }

        // check if token matches
        if(user.resetToken !== token) {
            throw new Error(`Invalid token`);
        }

        const now = new Date();
        const ex = new Date(user.resetExpiry);

        // check if token expired
        if(now > ex) {
            throw new Error('Token expired, Try a different reset link or request a new one');
        }

        return userInfo;
        
    } catch (err) {
        throw err;
    }
}


// reset password
async function resetPassword (id, token, plainPassword) {
    try{
        // find user by id 
        const user = await User.findById(id);
        if(!user) {
            throw new Error('Invalid user');
        }

        // check token
        if(user.resetToken !== token) {
            throw new Error('Invalid token');
        }
        // check if token expired
        const now = new Date();
        const ex = new Date(user.resetExpiry);
        if(now > ex) {
            throw new Error('Token expired, Try a different reset link or request a new one');
        }

        // set the new password
        user.password = plainPassword;
        // clear token and expiry
        user.resetToken = null;
        user.resetExpiry = null;
        // hash password - should be done in the model by pre save hook
        const u = new User(user);
        // update user in database
        await u.save();

        return 'Password reset successful'
    } catch (err) {
        throw err;
    }
}


module.exports = {login, logout, resetPassword, beginReset, checkToken }