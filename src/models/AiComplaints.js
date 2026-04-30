import mongoose from "mongoose";

const aicomplaintsSchema =new mongoose.Schema({
    ComplaintId:String,
    name:String,
    email:String,
    mobile:String,
    department:String,
    subject:String,
    description:String,
    pdfPath:String,
     status: {
      type: String,
      default: "submitted"
    }
},
{timestamps:true}
);
export default mongoose.model("AiCompalints", aicomplaintsSchema)