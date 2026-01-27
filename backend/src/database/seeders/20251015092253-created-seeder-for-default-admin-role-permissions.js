export const up = async (queryInterface) => {
  const now = new Date();

  // Check if any role_permissions already exist for role_id = 2
  const existing = await queryInterface.sequelize.query(
    `SELECT COUNT(*) AS count FROM role_permissions WHERE role_id = 2;`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  if (parseInt(existing[0].count, 10) > 0) {
    console.log("Role permissions already exist for admin. Skipping insert.");
    return;
  }

  // Get all permissions
  const permissions = await queryInterface.sequelize.query(
    `
  SELECT id 
  FROM permissions
  WHERE name NOT IN ('create_school', 'read_school', 'update_school', 'delete_school');
  `,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );


  // Map each permission to role_id = 2 (Admin)
  const rolePermissions = permissions.map((perm) => ({
    role_id: 2,
    permission_id: perm.id,
    created_at: now,
    updated_at: now,
  }));

  if (rolePermissions.length > 0) {
    await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
    console.log(`Inserted ${rolePermissions.length} role_permissions for role admin.`);
  } else {
    console.log("No permissions found. Skipping insert.");
  }
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("role_permissions", { role_id: 2 }, {});
};
