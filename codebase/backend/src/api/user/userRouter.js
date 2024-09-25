import express from "express";
import userController from "./userController.js";
import { isAdmin } from "../../middleware/auth.js";
const userRouter = express.Router();

userRouter.get("/get-me", userController.getMy);
userRouter.get("/:id", userController.getSingleUser);

userRouter.get("/", [isAdmin], userController.getAllUsers);
userRouter.post("/register", [isAdmin], userController.createUser);

userRouter.put("/change-password", userController.changePassword);
userRouter.put("/change-phone-email/:id", userController.changePhoneEmail);

userRouter.put("/assignRole/:id", [isAdmin], userController.assignRole);
userRouter.put("/changeStatus/:id", [isAdmin], userController.changeStatus);

userRouter.put("/:id", [isAdmin], userController.updateUser);
userRouter.delete("/:id", [isAdmin], userController.deleteUser);

export default userRouter;
