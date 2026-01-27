import express from "express";
import Auth from "../middlewares/Auth.js";
import Uploader from "../middlewares/Uploader.js";
import { getDashboardDataList } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", Auth.authenticate(), getDashboardDataList);

export default dashboardRouter;
