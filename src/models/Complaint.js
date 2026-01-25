import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  name: String,
  mobile: String,
  email: String,
  title: String,
  description: String,
  department: String,
  address: String,
  location: {
    lat: {type:Number},
    lng:{type: Number}
  },

  createdAt: { type: Date, default: Date.now },
}, { timestamps: true }); // 👈 timestamps se createdAt + updatedAt dono milenge


const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;