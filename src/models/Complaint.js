import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  name: {
    type:String,
    required:[true, "Name is required!"]
  },
  mobile: {
    type: String,
    
    minLength: [10, "Mobile number must be 10 digit !"],
    maxLength: [10, "Mobile number must be 10 digit !"],
  },
  email: {
    type: String,
    required: [true, "Email is required !"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email [abc@gmail.com]!!"],
  },
  title: {
    type: String,
    required:[true, "Title is required!"],
  },
  description: {
    type: String,
    required:[true, "Description is required!"],
  },
  department: {
    type: String,
    required:[true, "Department is required!"],
  },
  address: {
    type: String,
    
    minLength: [10, "Atleast 10 character are required!"],
    maxLength: [100, "Atmostt 100 character are required!"],
    trim: true,
  },
  location: {
    lat: {type:Number,required:[true, "Location is required!"]},
    lng:{type: Number,required:[true, "Location is required!"]},
    
  },

  createdAt: { type: Date, default: Date.now },
}, { timestamps: true }); // 👈 timestamps se createdAt + updatedAt dono milenge


const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;