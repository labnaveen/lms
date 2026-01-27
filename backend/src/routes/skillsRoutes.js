import {
  getAllSkillsDetails,
  listSkills,
  createSkill,
  skillsCategoriesDropdown,
  skillsDifficultyLevelsDropdown,
  updateSkillStatus,
  destroySkill,
  updateSkill,
} from "../controllers/skillsController.js";
import Auth from "../middlewares/Auth.js";
import { Router } from "express";
import Uploader from "../middlewares/Uploader.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import {
  createSkillSchema,
  updateSkillSchema,
} from "../schemas/skillsJoiSchema.js";

const skillRoutes = Router();
skillRoutes.get("/all-skills", Auth.authenticate(), listSkills);
skillRoutes.get(
  "/details/:skill_uuid",
  Auth.authenticate(),
  getAllSkillsDetails
);
skillRoutes.post(
  "/create-skill",
  Auth.authenticate(),
  Uploader.uploadMultipleFiles("public/skills"),
  validateBody(createSkillSchema),
  createSkill
);
skillRoutes.get("/categories-dropdown", skillsCategoriesDropdown);
skillRoutes.get("/difficulty-dropdown", skillsDifficultyLevelsDropdown);
skillRoutes.put("/update-user-skill", Auth.authenticate(), updateSkillStatus);
skillRoutes.put(
  "/update-skill/:skill_uuid",
  Auth.authenticate(),
  Uploader.uploadMultipleFiles("public/skills"),
  validateBody(updateSkillSchema),
  updateSkill
);
skillRoutes.delete(
  "/delete-skill/:skill_uuid",
  Auth.authenticate(),
  destroySkill
);
export default skillRoutes;
