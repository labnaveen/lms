import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("students", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    student_uuid: {
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
    roll_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    class_section_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "class_section",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    // section: {
    //   type: DataTypes.STRING(10),
    //   allowNull: true,
    // },

    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    gender_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "gender",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    guardian_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    guardian_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("students");
};
