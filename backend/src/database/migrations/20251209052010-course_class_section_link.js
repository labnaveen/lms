import { DataTypes } from "sequelize";

export async function up(queryInterface) {
  const tableName = "course_class_section_link";
  const tableExists = await queryInterface
    .describeTable(tableName)
    .then(() => true)
    .catch(() => false);
  if (!tableExists) {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
      },
    });
  } else {
    console.log(`Table "${tableName}" already exists. Skipping creation.`);
  }
}

export async function down(queryInterface) {
  await queryInterface.dropTable("course_class_section_link");
}
