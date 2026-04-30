import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ Admin Login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    let superAdmins = process.env.SUPER_ADMIN_USER;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

    superAdmins = superAdmins.split(",");

    const isSuperAdmin = superAdmins.find(
      (adminEmail) => adminEmail.trim() === email
    );

    // Super Admin Login
    if (isSuperAdmin) {
      console.log("Super Admin Matched Here");

      if (password === superAdminPassword) {
        console.log("Password matched")
        const token = jwt.sign(
          { email: email, role: "superAdmin" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.json({ token, userType:"superAdmin" });
      } else {
        return res.status(400).json({
          msg: "Invalid Super Admin Password",
        });
      }
    }

    // Normal Admin Login
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

    return res.json({ token });

  } catch (err) {
    console.log(err, "Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    return res.status(500).json({ msg: "Server error", err:err });
  }
};