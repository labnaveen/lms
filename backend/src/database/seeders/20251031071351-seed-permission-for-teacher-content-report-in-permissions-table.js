import { Op } from "sequelize";

const permissionNames = ["teacher_content_report"];

export const up = async (queryInterface) => {
    const now = new Date();

    // Insert the new permission
    await queryInterface.bulkInsert(
        "permissions",
        permissionNames.map((name) => ({
            name,
            description: name.replace(/_/g, " "),
            created_at: now,
            updated_at: now,
        }))
    );

    // Get the permission id
    const permissions = await queryInterface.sequelize.query(`SELECT id FROM permissions WHERE name IN (:names);`, {
        type: queryInterface.sequelize.QueryTypes.SELECT,
        replacements: { names: permissionNames },
    });

    // Map permission to Super Admin (1) and Admin (2)
    let rolePermissions = [];
    [1, 2].forEach((role_id) => {
        rolePermissions.push(
            ...permissions.map((perm) => ({
                role_id,
                permission_id: perm.id,
                created_at: now,
                updated_at: now,
            }))
        );
    });

    await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
};

export const down = async (queryInterface) => {
    // Get permission IDs based on names
    const permissions = await queryInterface.sequelize.query(`SELECT id FROM permissions WHERE name IN (:names);`, {
        type: queryInterface.sequelize.QueryTypes.SELECT,
        replacements: { names: permissionNames },
    });

    const permissionIds = permissions.map((p) => p.id);

    // Delete role_permissions for role_id = 1 and 2 and the selected permission IDs
    if (permissionIds.length > 0) {
        await queryInterface.bulkDelete("role_permissions", {
            role_id: { [Op.in]: [1, 2] },
            permission_id: { [Op.in]: permissionIds },
        });
    }

    // Delete the permissions themselves
    await queryInterface.bulkDelete("permissions", {
        id: { [Op.in]: permissionIds },
    });
};
