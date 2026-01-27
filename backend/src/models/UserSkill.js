import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Skill from "./SkillModel.js";
import ProgressStatus from "./ProgressStatus.js";

const UserSkill = sequelize.define(
  "UserSkill",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    user_skill_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "skills",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "progress_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    progress_percent: {
      type: DataTypes.INTEGER,
      defaultValue: 33,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "user_skills",
    timestamps: false,
  }
);

// Relations

UserSkill.belongsTo(Skill, { foreignKey: "skill_id" });
Skill.hasMany(UserSkill, { foreignKey: "skill_id" });
UserSkill.belongsTo(ProgressStatus, { foreignKey: "status_id" });

export default UserSkill;
