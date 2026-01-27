import OpenAI from "openai";
import ResponseHelper from "../helpers/ResponseHelper.js";
const client = new OpenAI();

export const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        const aiResponse = await client.chat.completions.create({
            model: "gpt-5",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message },
            ],
        });

        return ResponseHelper.OK(res, true, "AI response generated successfully", aiResponse.choices[0].message, null, "ChatWithAI API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to generate AI response", "ChatWithAI API");
    }
};
