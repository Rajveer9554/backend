import User from "../models/users.js";
import Complaint from "../models/Complaint.js";

export const getStats = async (req, res) => {
  try {
    const activeUsers = await User.countDocuments({ isVerified: true }); // sirf verified users
    const totalComplaints = await Complaint.countDocuments();
     console.log("Stats:", { activeUsers, totalComplaints }); 

    res.json({
      success: true,
      activeUsers,
      totalComplaints,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};