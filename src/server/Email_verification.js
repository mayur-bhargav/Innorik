const nodemailer = require('nodemailer');
require('dotenv').config();
async function sendVerificationEmail(userEmail, verificationToken, name) {
  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:process.env.SMTP_PORT,
    secure:false,
    requireTLS:true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      
    },
    
  });
  const mailOptions = {
    from: 'mayurbhargava026@gmail.com',
    to: userEmail,
    subject: 'Express News  App',
    html: `<h1>Hi ${name},</h1>
            <p>You are just a step away from creating your account on Express News App</p>
            <p>To veriy the mail please click on the below:-</p>
           <a style=" display: inline-block;
           text-decoration: none;
           color: #f44336;
           border: 1px solid #f44336;
           padding: 12px 34px;
           font-size: 13px;
           background: transparent;
           display: flex;
           justify-content: center;
           text-align:center;
           position: relative;
           cursor: pointer;" href="https://innorik.onrender.com/verify?token=${verificationToken}"><h style="text-align:center">Verify Email</h></a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

module.exports = sendVerificationEmail;