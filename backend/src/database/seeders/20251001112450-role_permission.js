export const up = async (queryInterface) => {
  const now = new Date();

  // Get all permissions
  const permissions = await queryInterface.sequelize.query(
    `SELECT id FROM permissions;`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
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
  await queryInterface.bulkDelete("role_permissions", { role_id: 1 }, {});
};
