import  jwt  from "jsonwebtoken";
const auth =(req,resp,next)=>{
   
//Backend Authorization header se token ko nikal raha hai.
    const token =req.header("Authorization")?.replace("Bearer", "");
   
//Agar token nahi mila: HTTP Status 401 (Unauthorized) Message: "No token provided" User ko next route par nahi jane diya jayega

    if(!token) return resp.status(401).json ({msg:"No token provided"});

    try{
const decoded =jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // attach user info
next();
    } catch(error){
 resp.status(401).json({msg:"Invalid token"});
    }

};

export default auth;