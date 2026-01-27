import express from "express";
import Auth from "../middlewares/Auth.js";
import { changePassword, getProfileDetails, updateProfile } from "../controllers/profileController.js";
import Uploader from "../middlewares/Uploader.js";

const profileRouter = express.Router();

profileRouter.get("/", Auth.authenticate(), getProfileDetails);
profileRouter.put("/", Auth.authenticate(), Uploader.uploadSingleFile("public/profile_images", "profile_image"), updateProfile);
profileRouter.put("/change-password", Auth.authenticate(), changePassword);

export default profileRouter;
