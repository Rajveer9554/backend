import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Basic validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and Password required" });
    }

    console.log("Login Attempt:", email, password);

    // ✅ ENV safe handling
    const superAdminsEnv = process.env.SUPER_ADMIN_USER || "";
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || "";

    const superAdmins = superAdminsEnv.split(",").map(e => e.trim());

    const isSuperAdmin = superAdmins.includes(email.trim());

    // =========================
    // ✅ SUPER ADMIN LOGIN
    // =========================
    if (isSuperAdmin) {
      console.log("Super Admin Matched Here");

      // ✅ Trim comparison (fixes your issue)
      if (password.trim() === superAdminPassword.trim()) {
        console.log("Super Admin Password matched");

        const token = jwt.sign(
          { email: email, role: "superAdmin" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          token,
          userType: "superAdmin",
        });
      } else {
        return res.status(400).json({
          msg: "Invalid Super Admin Password",
        });
      }
    }

    // =========================
    // ✅ NORMAL ADMIN LOGIN
    // =========================
    const user = await User.findOne({ email, role: "admin" });

    if (!user) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      userType: "admin",
    });

  } catch (err) {
    console.log("Login Error:", err);
    return res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};