import ContactUs from "../models/contactUs.js";
import sendContactEmail from "../services/emailService.js";
export const sendMessage =async (req, resp)=>{
    try{
        const { name, email,  message } = req.body;
        // save in db
        await ContactUs.create({name,email, message});

        // send email via sendgrid
        await sendContactEmail(name, email, message);

        resp.json({ success: true, message: "Message sent successfully." });

    } catch(err){
        console.error("Error saving contact message:", err);
        resp.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}