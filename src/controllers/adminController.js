import User from "../models/users.js";
import Complaint from "../models/Complaint.js";

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get all complaints with user info
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("userId", "username email");
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};