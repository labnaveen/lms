"use strict";

import { Op } from "sequelize";

const permissionNames = ["create_notification", "read_notification", "update_notification", "delete_notification"];

export async function up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
        "permissions",
        permissionNames.map((name) => ({
            name,
            description: name.replace(/_/g, " "),
            created_at: now,
            updated_at: now,
        }))
    );

    const permissions = await queryInterface.sequelize.query(`SELECT id FROM permissions WHERE name IN (:names);`, {
        type: queryInterface.sequelize.QueryTypes.SELECT,
        replacements: { names: permissionNames },
    });

    // Super Admin (1), Admin (2), Teacher (3)
    const allRoles = [1, 2, 3];
    let rolePermissions = [];
    for (const roleId of allRoles) {
        rolePermissions.push(
            ...permissions.map((perm) => ({
                role_id: roleId,
                permission_id: perm.id,
                created_at: now,
                updated_at: now,
            }))
        );
    }

    if (rolePermissions.length > 0) {
        await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
    }
}

export async function down(queryInterface, Sequelize) {
    const permissions = await queryInterface.sequelize.query(`SELECT id FROM permissions WHERE name IN (:names);`, {
        type: queryInterface.sequelize.QueryTypes.SELECT,
        replacements: { names: permissionNames },
    });

    const permissionIds = permissions.map((p) => p.id);

    if (permissionIds.length > 0) {
        await queryInterface.bulkDelete("role_permissions", {
            role_id: { [Op.in]: [1, 2, 3] },
            permission_id: { [Op.in]: permissionIds },
        });
    }

    await queryInterface.bulkDelete("permissions", {
        id: { [Op.in]: permissionIds },
    });
}
