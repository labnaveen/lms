// utils/searchHelper.js
import { Op } from "sequelize";

export function buildSearchQuery(search, fields = []) {
    if (!search || fields.length === 0) return {};

    return {
        [Op.or]: fields.map((field) => ({
            [field]: { [Op.like]: `%${search}%` },
        })),
    };
}
