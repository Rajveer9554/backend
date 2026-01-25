import Complaint from "../models/Complaint.js";
import mongoose from "mongoose";
import Authority from "../models/Authority.js";
import { generateComplaintPDF } from "../services/pdfService.js";
import { sendComplaintEmail } from "../services/emailService.js";

// Helper function: Lucknow radius check
function isWithinLucknow(lat, lng) {
  const lucknowLat = 26.8467;
  const lucknowLng = 80.9462;
  const radiusKm = 25; // approx Lucknow city radius

  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat - lucknowLat);
  const dLng = toRad(lng - lucknowLng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lucknowLat)) *
      Math.cos(toRad(lat)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= radiusKm;
}
// Controller: Send Complaint


export const sendComplaint = async (req, res, next) => { 
  try {
    // Ensure userId is stored as ObjectId
    const complaint = await Complaint.create({
      ...req.body,
      userId: new mongoose.Types.ObjectId(req.body.userId),
    });

1
    // Generate PDF
    const pdfPath = await generateComplaintPDF(complaint);

    // Hardcoded fallback map
    const authorityEmailMap = {
      "Nagar Nigam": ["raj78606747@gmail.com", "mr.rajyadav272207@gmail.com"],
      "Water Supply": "watersupply@gmail.com",
      "dm": "district.magistrate@gmail.com",
      "sdm": "subdm@gmail.com",
      "Jal Nigam": "jal.nigam@gmail.com",
      "Rto": "rto@gmail.com",
      "Electricity Board": "electricity.board@gmail.com"
    };

    // Try DB first
    let authorityEmail;
    const authority = await Authority.findOne({ department: complaint.department });
    if (authority && authority.email?.length) {
      authorityEmail = authority.email;
    } else {
      // Fallback to hardcoded map
      authorityEmail = authorityEmailMap[complaint.department] || process.env.DEFAULT_AUTHORITY_EMAIL;
    }

    // Send email
    await sendComplaintEmail(
      complaint.email,          // user email (Reply-To)
      authorityEmail,           // department authority email
      `New Complaint: ${complaint.title}`,
      pdfPath
    );

    res.json({ success: true, message: "Complaint sent successfully to department authority" });
  } catch (err) {
    next(err);
  }
};

// // ✅ Get complaint summary for a user
// export const getUserComplaintSummary = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Fetch all complaints of this user
//     const complaints = await Complaint.find({ userId });

//     // Count total complaints
//     const totalComplaints = complaints.length;

//     // Group by department
//     const departmentCounts = complaints.reduce((acc, c) => {
//       acc[c.department] = (acc[c.department] || 0) + 1;
//       return acc;
//     }, {});

//     res.json({
//       success: true,
//       totalComplaints,
//       departmentCounts,
//       complaints,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

export const getUserComplaintSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const complaints = await Complaint.find({ userId: new mongoose.Types.ObjectId(userId) });

    const totalComplaints = complaints.length;
    const departmentCounts = complaints.reduce((acc, c) => {
      acc[c.department] = (acc[c.department] || 0) + 1;
      return acc;
    }, {});

    res.json({ success: true, totalComplaints, departmentCounts, complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

