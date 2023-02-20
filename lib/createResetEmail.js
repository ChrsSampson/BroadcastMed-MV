

function createResetEmail(targetURL,email, displayName, id, token) {

    const name = displayName ? displayName : email;

    const template = `
    <div class="wrapper">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>You have requested a password reset for your account.</p>
            <p>Please click the link below to reset your password.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>This link is valid for 1 hour.</p>
            <p>Thanks</p>
            
            <div class="link-container">
                <a class="link" href="${targetURL}/${id}/${token}">Reset Password</a>
            </div>
            
        </div>
        <style>
            .wrapper {
                width: 100%;
                border: 1px solid #0B86DB;
            }
            .header {
                background-color: #0B86DB;
                color: white;
                padding: 5px;
                border-radius: .5em;
                text-align: center;
                padding: 10px;
                margin-bottoim: 10px;
            }
            .content {
                background-color: white;
                color: black;
                padding: 5px;
                border-radius: .5em;
                padding: 10px;
                max-width: 700px;
            }
            .link-container{
                text-align: center;
                margin-top: 10px;
                width:100%;
            }
            .link{
                background-color: #0B86DB;
                text-align: center;
                color: white;
                padding: 5px 8px;
                border-radius: .5em;
                text-align: center;
            }
        </style>
    <div>
    `

    return template;
}

module.exports = createResetEmail