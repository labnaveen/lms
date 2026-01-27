import express from "express";
import { chatWithAI } from "../controllers/chatController.js";
import Auth from "../middlewares/Auth.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import { chatSchema } from "../schemas/chatJoiSchema.js";

const chatRouter = express.Router();

chatRouter.post("/chat-with-ai", Auth.authenticate(), validateBody(chatSchema), chatWithAI);

export default chatRouter;
