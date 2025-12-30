import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import otpRouter from "./routes/otp.routes.js";


import cors from"cors";
dotenv.config({ path: "./.env" });


// expres to get app

const app=express();
//middleware
app.use(cors({
    origin:["http://localhost:5173", 
            "https://awaze-e-janata.netlify.app"],
}))

app.use(express.json());


// routes
app.use("/api", userRouter);
app.use("/api/otp", otpRouter);






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
