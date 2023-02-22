// password reset email sender
const {config} = require('dotenv');
const nodemailer = require('nodemailer');
const createResetEmail = require('./createResetEmail');


config();

// testing mailer
async function mailTester (userInfo) {

    try{
        const testUser = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                    user: testUser.user,
                    pass: testUser.pass
            }
        });

        console.log('Use this login to test the temp mailbox: ', 'https://ethereal.email/login')
        console.log('test Email: ', testUser.user)
        console.log('test Password:', testUser.pass)

        const template = createResetEmail(process.env.RESET_LINK_TARGET ,userInfo.email, userInfo.displayName, userInfo.id, userInfo.token);

        const recipients = `${userInfo.email} <${userInfo.email}>`;

        const info = await transporter.sendMail({
            from: 'Test System <ITSupport@BroadcastMed.com>', // sender address
            to: recipients, // list of receivers
            subject: "Password Reset: BroadcastMed PingPlotter Mutltiviewer ", // Subject line
            html: template, // html body
        }); 

    } catch (err) {
        throw err;
    }

}

async function sendResetEmail (userInfo) {

    try{
        const transporter = nodemailer.createTransport({
            service: 'GSuite',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PW
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
        });

        const template = createResetEmail(process.env.RESET_LINK_TARGET ,userInfo.email, userInfo.displayName, userInfo.id, userInfo.token);

        const recipients = `${userInfo.displayName} <${userInfo.email}>`;

        const info = await transporter.sendMail({
            from: 'BroadcastMed PingPlotter Multiviewer <itsupport@broadcastmed.com>', // sender address
            to: recipients, // list of receivers
            subject: "Password Reset: BroadcastMed PingPlotter Mutltiviewer ", // Subject line
            html: template, // html body
        });

    } catch (err) {
        throw err;
    }

}


module.exports = { mailTester, sendResetEmail }