import express from "express";
import Auth from "../middlewares/Auth.js";
import { listContactQueries, submitContactQuery } from "../controllers/contactUsController.js";

const contactUsRouter = express.Router();

contactUsRouter.get("/list-queries", Auth.authenticate(), listContactQueries);
contactUsRouter.post("/add-query", submitContactQuery);

export default contactUsRouter;
