import mongoose from "mongoose";
const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,   
    required: [true, "Name is required !"],
    minLength: [3, "Atleast 3 character are required!"],
    maxLength: [50, "Atmostt 50 character are required!"],
    trim: true,
    },
    email:{
        type: String,
        required: [true, "Email is required !"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email [abc@gmail.com]!!"],

    },
    message:{
        type: String,
        required: [true, "Message is required !"],
        minLength: [5, "Atleast 5 character are required!"],
        maxLength: [500, "Atmostt 500 character are required!"],
        trim: true,
    },
    createdAt: { type: Date, default: Date.now },
}); 
const ContactUs = mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;
    
