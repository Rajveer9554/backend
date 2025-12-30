// Step 2--- verify otp -> set isVerified true in user collection
import User from "../models/users.js";
import OTP from "../models/otp.js";


export const verifyOTP=async(req,resp)=>{
    const{email,otp}=req.body; // Frontend se aaya data:
    
    const otpRecord=await OTP.findOne({email:email}); // Database me check kar rahe hain: is email ke liye koi OTP hai ya nahi
       if(!otpRecord) 
        return resp.json({msg:"OTP not found. Please request a new one."});
    if(otpRecord.otp!==otp)
         return resp.json({msg:"Invalid OTP. Please try again."}); // DB me saved OTP vs user ka OTP compare
    
    await User.updateOne({email},{isVerified:true}); // User ko verified mark kar rahe hain
    await OTP.deleteMany({email}); // OTP ko delete kar rahe hain verification ke baad

    resp.json({success:true, message:"User verified successfully."});
}   