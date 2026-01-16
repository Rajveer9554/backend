import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema({
  department: { type: String, required: true },
  email: { type: String, required: true },
  parentAuthority: { type: mongoose.Schema.Types.ObjectId, ref: "Authority" }
});

const Authority = mongoose.model("Authority", authoritySchema);
export default Authority;