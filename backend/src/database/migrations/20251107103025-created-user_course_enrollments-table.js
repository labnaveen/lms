import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "user_course_enrollments";

  const tableExists = await queryInterface
    .describeTable(tableName)
    .then(() => true)
    .catch(() => false);

  if (!tableExists) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      user_course_enrollment_uuid: {
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
      course_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      progress_status_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "progress_status",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      progress_percentage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      completed_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
  }
};

export const down = async (queryInterface) => {
  const tableName = "user_course_enrollments";
  const tableExists = await queryInterface
    .describeTable(tableName)
    .then(() => true)
    .catch(() => false);

  if (tableExists) {
    await queryInterface.dropTable(tableName);
  }
};
