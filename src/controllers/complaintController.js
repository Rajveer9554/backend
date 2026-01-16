import Complaint from "../models/Complaint.js";
import Authority from "../models/Authority.js";
import { generateComplaintPDF } from "../services/pdfService.js";
import { sendComplaintEmail } from "../services/emailService.js";

export const sendComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.create(req.body);

    // Generate PDF
    const pdfPath = await generateComplaintPDF(complaint);

    // Hardcoded fallback map
    const authorityEmailMap = {
      "Nagar Nigam": "raj78606747@gmail.com",
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
    if (authority) {
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