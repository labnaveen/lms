import { Router } from "express";
import {
  schoolRegister,
  otpVerify,
  signIn,
  refreshToken,
  getUserPermissions,
  logout,
  resendOtpEmail,
  forgotPasswordWithOTP,
  sendOtpToEmail,
  resetUserPassword,
} from "../controllers/authController.js";
import Auth from "../middlewares/Auth.js";
import Uploader from "../middlewares/Uploader.js";

const accountRouter = Router();

accountRouter.post(
  "/signup",
  Uploader.uploadSingleFile("public/profile_images", "logo_url"),
  schoolRegister
);
accountRouter.post("/verify-otp", otpVerify);
accountRouter.post("/signin", signIn);
accountRouter.post("/revoke-access-token", refreshToken);
accountRouter.get("/logout", Auth.authenticate(), logout);
accountRouter.get("/permissions", Auth.authenticate(), getUserPermissions);
accountRouter.post("/resend-otp", resendOtpEmail);
accountRouter.post("/forgot-password", forgotPasswordWithOTP);
accountRouter.post("/send-otp", sendOtpToEmail);
accountRouter.post(
  "/reset-user-password",
  Auth.authenticate(),
  resetUserPassword
);

export default accountRouter;
