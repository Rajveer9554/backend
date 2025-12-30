// import nodemailer from 'nodemailer';

// const sendOTP=async(email,otp)=>{
// // configure the email transporter
// const transporter=nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:process.env.EMAIL_USER,// email
//         pass:process.env.EMAIL_PASS,// pass
//     }
// });

// // send mail
//  await transporter.sendMail({
//     from:process.env.EMAIL_USER,
//     to:email,
//     subject:"Your OTP Code",
//     text:`Your OTP code is ${otp}. It is valid for 5 minutes.`
//  })
// };
// export default sendOTP;


// utils/sendotp.js
// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendOTP = async (email, otp) => {
//   const msg = {
//     to: email,
//     from: process.env.SENDGRID_SENDER, // must match your verified single sender
//     subject: 'Your OTP Code',
//     text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
//   };

//   await sgMail.send(msg);
// };

// export default sendOTP;
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOTP = async (email, otp) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER, // must be verified sender
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully to", email);
  } catch (error) {
    console.error("❌ SendGrid error:", error.response ? error.response.body : error);
  }
};