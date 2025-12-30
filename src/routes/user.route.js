// import { Router } from "express";
// import {
//   listUser,
//   getUser,
//   createUser,
// //   deleteUser,
// //   updateUser,
// } from "../controllers/user.controller.js";

// const userRouter = Router();

// //list user
// userRouter.get("/users", listUser);
// userRouter.get("/users/:userId", getUser);
// userRouter.post("/register", createUser);
// // userRouter.put("/users/:userId", updateUser);
// // userRouter.delete("/users/:userId", deleteUser);
// export default userRouter;


import { Router } from "express";
import { createUser, loginUser, checkAccess,logoutUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", auth, logoutUser);  // ✅ नया logout route
// Protected route to check access
userRouter.get("/register-complaints-access", auth, checkAccess);

export default userRouter;