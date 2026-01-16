import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  title: String,
  description: String,
  department: String,
  address: String,
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;