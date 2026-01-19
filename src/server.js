import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import otpRouter from "./routes/otp.routes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import contactrouter from "./routes/contact.Routes.js";

import cors from"cors";
import statsRouter from "./routes/stats.routes.js";
dotenv.config({ path: "./.env" });


// expres to get app

const app=express();
//middleware
app.use(cors({
    origin:["http://localhost:5173", 
            "https://awaze-e-janata.netlify.app"],
}))

app.use(express.json({limit:"3mb"}));// allow base 64 json data


// routes
app.use("/api", userRouter);
app.use("/api/otp", otpRouter);
app.use("/api/complaints",complaintRoutes);
app.use("/api",statsRouter);
app.use(errorHandler);
app.use("/api",contactrouter);







// connect db
connectDB();
// root handle
app.get("/",(req,resp)=>{
console.log("this is my root url");
resp.json({
    message:"welcome to my Awaze-e-janata "
})
})



// server strat
const PORT=process.env.PORT ;

app.listen(PORT, ()=>{
    console.log("Server start on port 8081");
});
