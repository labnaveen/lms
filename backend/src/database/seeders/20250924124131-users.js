import bcrypt from "bcrypt";
import crypto from "crypto";

export const up = async (queryInterface) => {
  // const schoolUuid = 'a1e97719-439a-4871-8a30-67eedb03bb89';
  const adminPassword = await bcrypt.hash("Admin@123", 10);

  // Insert only admin user
  await queryInterface.bulkInsert("users", [
    {
      user_uuid: crypto.randomUUID(),
      role_id: 1,          // superadmin role
      name: "Super Admin",
      email: "superadmin@lms.com",
      phone: "+1-555-0000",
      password_hash: adminPassword,
      profile_photo_url: null,
      is_active: true,
      is_verified: true,
      last_login_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("users", { email: "superadmin@lms.com" }, {});
};
