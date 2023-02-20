// password reset email sender
const {config} = require('dotenv');
const nodemailer = require('nodemailer');
const createResetEmail = require('./createResetEmail');


config();



// testing mailer
async function mailTester (userInfo) {

    console.log(userInfo)

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

        console.log('test Email: ', testUser.user)
        console.log('test Password:', testUser.pass)

        const template = createResetEmail(process.env.RESET_LINK_TARGET ,userInfo.email, userInfo.displayName, userInfo.id, userInfo.token);

        const recipients = `${userInfo.email}@example.com <${userInfo.email}@example.com>`;

        const info = await transporter.sendMail({
            from: 'System <System@example.com>', // sender address
            to: recipients, // list of receivers
            subject: "Password Reset: BroadcastMed PingPlotter Mutltiviewer ", // Subject line
            html: template, // html body
        }); 

    } catch (err) {
        throw err;
    }

}

module.exports = { mailTester }