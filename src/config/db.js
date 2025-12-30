import mongoose from "mongoose";
const connectDB =async ()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");
}
catch (error){
    console.log("❌ Faild DB connected", error.message);
    
}
};
export default connectDB;