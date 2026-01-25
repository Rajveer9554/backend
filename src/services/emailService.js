import fs from "fs";
import sgMail from "../config/sendgrid.js";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendComplaintEmail = async (userEmail, authorityEmail, subject, pdfPath) => {
  const pdfBuffer = fs.readFileSync(pdfPath);

  const msg = {
    to: authorityEmail,
    from: process.env.SENDGRID_SENDER,
    replyTo: userEmail,
    subject,
    text: "Please find attached complaint application.",
    attachments: [
      {
        content: pdfBuffer.toString("base64"),
        filename: "complaint.pdf",
        type: "application/pdf",
        disposition: "attachment"
      }
    ]
  };

  await sgMail.send(msg);
};

const To_EMAIL= "awazeejanata@gmail.com";
export default async function sendContactEmail(name, email, message) {
  const msg={
    to: To_EMAIL,
    from: { email: process.env.SENDGRID_SENDER, name: "Awaze-E-Janata" },
    replyTo: email,
    subject: `New Contact Us Message from ${name}`,
    text: message,
  };
  await sgMail.send(msg);
  }