import fs from "fs";
import sgMail from "../config/sendgrid.js";

export const sendComplaintEmail = async (userEmail, authorityEmail, subject, pdfPath) => {
  const pdfBuffer = fs.readFileSync(pdfPath);

  const msg = {
    to: authorityEmail,
    from: process.env.SENDER_EMAIL,
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