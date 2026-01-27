import { Op } from "sequelize";

const permissionNames = [
  "create_syllabus",
  "read_syllabus",
  "update_syllabus",
  "delete_syllabus",
];

export const up = async (queryInterface) => {
  const now = new Date(); 

  await queryInterface.bulkInsert("permissions", permissionNames.map((name) => ({
    name,
    description: name.replace(/_/g, " "), // simple description
    created_at: now,
    updated_at: now,
  })));

  // Get permissions based on names
  const permissions = await queryInterface.sequelize.query(
    `SELECT id FROM permissions WHERE name IN (:names);`,
    {
      type: queryInterface.sequelize.QueryTypes.SELECT,
      replacements: { names: permissionNames },
    }
  );

  // Map each permission to role_id = 1
  const rolePermissions = permissions.map((perm) => ({
    role_id: 1, // Super Admin
    permission_id: perm.id,
    created_at: now,
    updated_at: now,
  }));

  if (rolePermissions.length > 0) {
    await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
  }
};

export const down = async (queryInterface) => {
  // Get permission IDs based on names
  const permissions = await queryInterface.sequelize.query(
    `SELECT id FROM permissions WHERE name IN (:names);`,
    {
      type: queryInterface.sequelize.QueryTypes.SELECT,
      replacements: { names: permissionNames },
    }
  );

  const permissionIds = permissions.map((p) => p.id);

  // Delete role_permissions for role_id = 1 and the selected permission IDs
  if (permissionIds.length > 0) {
    await queryInterface.bulkDelete("role_permissions", {
      role_id: 1,
      permission_id: { [Op.in]: permissionIds },
    });
  }

  // Delete the permissions themselves
  await queryInterface.bulkDelete("permissions", {
    id: { [Op.in]: permissionIds },
  });
};
