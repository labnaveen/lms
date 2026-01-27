import { Op } from "sequelize";
import ContactUs from "../models/ContactUsModel.js"
import ResponseHelper from "../helpers/ResponseHelper.js";

export const submitContactQuery = async (req, res) => {
  try {
    const { name, email, contact_no, query } = req.body;

    // Validations
    if (!name) {
      return ResponseHelper.BadRequest(
        res,
        "Name is required!",
        "Submit Contact Query API"
      );
    }

    if (!email) {
      return ResponseHelper.BadRequest(
        res,
        "Email is required!",
        "Submit Contact Query API"
      );
    }

    if (!query) {
      return ResponseHelper.BadRequest(
        res,
        "Query message is required!",
        "Submit Contact Query API"
      );
    }

    // Save query
    await ContactUs.create({
      name,
      email,
      contact_no,
      query,
    });

    return ResponseHelper.Created(
      res,
      true,
      "Your query has been submitted successfully!",
      null,
      null,
      "Submit Contact Query API"
    );
  } catch (error) {
    console.error("SubmitContactQuery Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message,
      "Submit Contact Query API"
    );
  }
};

export const listContactQueries = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    const whereClause = {};

    // Search by name, email, or query message
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { query: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows, count } = await ContactUs.findAndCountAll({
      where: whereClause,
      limit: limitInt,
      offset,
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["updated_at"],
      },
    });

    const meta = {
      totalCount: count || 0,
      pageCount: Math.ceil((count || 0) / limitInt),
      currentPage: pageInt,
      perPage: limitInt,
      hasNextPage: pageInt < Math.ceil((count || 0) / limitInt),
      hasPrevPage: pageInt > 1,
    };

    return ResponseHelper.OK(
      res,
      true,
      rows.length
        ? "Contact queries fetched successfully!"
        : "No contact queries found!",
      rows,
      rows.length ? meta : null,
      "List Contact Queries API"
    );
  } catch (error) {
    console.error("ListContactQueries Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to list contact queries",
      "List Contact Queries API"
    );
  }
};