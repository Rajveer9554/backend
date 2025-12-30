

/// new one 



import User from "../models/users.js";
import OTP from "../models/otp.js";
import sendOTP from "../utils/sendOTP.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

// logout user- token ko validate kro (db me nhi)

export const logoutUser = async(req,resp)=>{
 try{
// Token localStorage से delete होगा frontend पर
    // DB में कोई change नहीं होगा
    resp.json({msg:"User logged out successfully"});
 }catch(error){
resp.status(500).json({msg:"Logout Failed",error:error.message});
 }
}




/// Step 1---registration new user -> generate otp->send otp

export const createUser=async(req,resp)=>{
        const {username, email, password, gender, age}=req.body;
        let user=await User.findOne({email}); // kya ye email already database me hai?

if(user && user.isVerified){
    return resp.status(400).json({msg:"User already exists. Please login."});
 
}
if(!user){
  user=new User({
    username,email,password,age,gender});
  await user.save(); //Naya user object create kar rahe hain
}

const otp=Math.floor(100000+Math.random()*900000).toString(); // 6 digit otp generate

const saved=await OTP.create({email,otp}) //OTP ko Otp collection me save kar rahe hain Email ke sath map kar rahe hain
console.log("✅ OTP Saved:", saved);

// send otp to user email
await sendOTP(email,otp);
resp.json({msg:"OTP sent to your email. Please verify to complete registration.", email});

};


//Step 3--- Login -> generate JWT token -> access protected routes

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) 
    return res.status(400).json({ msg: "User not found. Please register first." });
  if(!user.isVerified) 
    return res.status(400).json({msg:"Please verify otp first."})

   // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid Password." });


  // generate JWT token
  const token = jwt.sign(
    { userId: User._id, email: User.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ msg: "Login successful", token,
    user: {
    name:User.username,
    email:User.email,
    age:User.age,
    gender:User.gender
  }
  });

};

// Example protected route (to check login)
export const checkAccess = async (req, res) => {
  res.json({ msg: "You are logged in, you can access Register Complaints page" });
};
