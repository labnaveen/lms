import { Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import rn from "random-number";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
// import twilio from "twilio";
import moment from "moment-timezone";
import sequelize from "../config/db.config.js"; // make sure db.config.js exports default sequelize instance
import ResponseHelper from "./ResponseHelper.js";
import Grade from "../models/GradeModel.js";
import ActivityLogs from "../models/ActivityLogs.js";

const apiKey = process.env.SMTP_APIKEY;
const smtpFrom = process.env.SMTP_FROM;
const defaultDistanceRadius = parseInt(process.env.DEFAULT_DISTANCE_RADIUS, 10);

const CommonHelper = {
  getCurrentWeek: async () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  },

  createPasswordHash: async (password) => {
    const salt = process.env.PASSWORD_SALT || "";
    return crypto
      .createHash("sha512")
      .update(password + salt, "utf8")
      .digest("hex");
  },

  sendOtpMail: async (email, otp, phoneNumber) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const body = `
          <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glocalview OTP Verification</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f0f9ff;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f9ff">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:40px auto; background-color:#ffffff; padding:40px; border-radius:10px; border-top:6px solid #ff6b02;">

            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:30px;">
                <h1 style="margin:0; color:#000000;">Welcome to <span style="color:#ff6b02;">Glocalview</span></h1>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="font-size:16px; color:#334155; padding-bottom:20px;">
                <p>Hello,</p>
                <p>Thank you for signing up with <strong>Glocalview</strong>! Use the OTP code below to complete your verification process:</p>
              </td>
            </tr>

            <!-- OTP Code -->
            <tr>
              <td align="center" style="padding:30px 0;">
                <span style="display:inline-block; font-size:36px; letter-spacing:6px; color:#0c4a6e; background-color:#e0f2fe; padding:16px 30px; border-radius:8px;">${otp}</span>
              </td>
            </tr>

            <!-- Info -->
            <tr>
              <td style="font-size:16px; color:#334155; padding-bottom:20px;">
                <p>This code is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="font-size:13px; color:#64748b; padding-top:40px;">
                <p>Need help? Contact our <a href="mailto:support@glocalview.com" style="color:#0260FF; text-decoration:none;">support team</a>.</p>
                <p>&copy; ${new Date().getFullYear()} Glocalview. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
        `;

      const message = {
        from: process.env.FROM_MAIL,
        to: email,
        subject: "Signup OTP",
        html: body,
        attachments: body.attachments,
      };

      const mail = await sgMail.send(message);

      return mail;
    } catch (error) {
      console.error("Error sending email:", error.response.body);
      return error.message;
    }
  },

  sendCredentialsMail: async (email, password, name) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Glocalview Login Credentials</title>
    </head>
    <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f0f9ff;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f9ff">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:40px auto; background-color:#ffffff; padding:40px; border-radius:10px; border-top:6px solid #ff6b02;">

              <!-- Header -->
              <tr>
                <td align="center" style="padding-bottom:30px;">
                  <h1 style="margin:0; color:#000000;">Welcome to <span style="color:#ff6b02;">Glocalview</span></h1>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="font-size:16px; color:#334155; padding-bottom:20px;">
                  <p>Hi ${name || "Student"},</p>
                  <p>We’re excited to have you join <strong>Glocalview</strong>! Below are your login credentials for accessing your account:</p>
                </td>
              </tr>

              <!-- Credentials -->
              <tr>
                <td align="center" style="padding:30px 0;">
                  <table cellpadding="10" cellspacing="0" border="0" style="background-color:#f0f9ff; border-radius:8px; padding:20px;">
                    <tr>
                      <td style="font-size:16px; color:#0c4a6e;"><strong>Email:</strong></td>
                      <td style="font-size:16px; color:#0c4a6e;">${email}</td>
                    </tr>
                    <tr>
                      <td style="font-size:16px; color:#0c4a6e;"><strong>Password:</strong></td>
                      <td style="font-size:16px; color:#0c4a6e;">${password}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Info -->
              <tr>
                <td style="font-size:15px; color:#334155; padding-bottom:20px;">
                  <p>Please keep your credentials safe and do not share them with anyone.</p>
                  <p>Please visit the Profile section to update your password.</p>
                  <p>You can log in to your account by visiting: 
                    <a href="${"https://elearning.glocalview.in/login"}" style="color:#0260FF; text-decoration:none;">
                      Glocalview LMS Portal
                    </a>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="font-size:13px; color:#64748b; padding-top:40px;">
                  <p>Need help? Contact our <a href="mailto:support@glocalview.com" style="color:#0260FF; text-decoration:none;">support team</a>.</p>
                  <p>&copy; ${new Date().getFullYear()} Glocalview. All rights reserved.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

      const message = {
        from: process.env.FROM_MAIL,
        to: email,
        subject: "Your Glocalview eLearning Login Credentials",
        html: body,
      };

      const mail = await sgMail.send(message);
      return mail;
    } catch (error) {
      console.error(
        "❌ Error sending credentials email:",
        error.response?.body || error.message
      );
      return error.message;
    }
  },

  //   sendOtpMail: async (email, otp, phoneNumber) => {
  //     try {
  //       // === 1. Send Email ===
  //       const transporter = nodemailer.createTransport({
  //         service: "gmail",
  //         auth: {
  //           user: process.env.SMTP_USER,
  //           pass: process.env.SMTP_PASSWORD,
  //         },
  //       });

  //       const mailOptions = {
  //         from: process.env.SMTP_USER,
  //         to: email,
  //         subject: "Your OTP Code - Glocalview",
  //         html: `
  //         <!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <title>Glocalview OTP Verification</title>
  // </head>
  // <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f0f9ff;">
  //   <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f9ff">
  //     <tr>
  //       <td align="center">
  //         <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:40px auto; background-color:#ffffff; padding:40px; border-radius:10px; border-top:6px solid #0260FF;">

  //           <!-- Header -->
  //           <tr>
  //             <td align="center" style="padding-bottom:30px;">
  //               <h1 style="margin:0; color:#0260FF;">Welcome to <span style="color:#14b8a6;">Glocalview</span></h1>
  //             </td>
  //           </tr>

  //           <!-- Greeting -->
  //           <tr>
  //             <td style="font-size:16px; color:#334155; padding-bottom:20px;">
  //               <p>Hello,</p>
  //               <p>Thank you for signing up with <strong>Glocalview</strong>! Use the OTP code below to complete your verification process:</p>
  //             </td>
  //           </tr>

  //           <!-- OTP Code -->
  //           <tr>
  //             <td align="center" style="padding:30px 0;">
  //               <span style="display:inline-block; font-size:36px; letter-spacing:6px; color:#0c4a6e; background-color:#e0f2fe; padding:16px 30px; border-radius:8px;">${otp}</span>
  //             </td>
  //           </tr>

  //           <!-- Info -->
  //           <tr>
  //             <td style="font-size:16px; color:#334155; padding-bottom:20px;">
  //               <p>This code is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.</p>
  //             </td>
  //           </tr>

  //           <!-- Footer -->
  //           <tr>
  //             <td align="center" style="font-size:13px; color:#64748b; padding-top:40px;">
  //               <p>Need help? Contact our <a href="mailto:support@glocalview.com" style="color:#0260FF; text-decoration:none;">support team</a>.</p>
  //               <p>&copy; ${new Date().getFullYear()} Glocalview. All rights reserved.</p>
  //             </td>
  //           </tr>

  //         </table>
  //       </td>
  //     </tr>
  //   </table>
  // </body>
  // </html>
  //       `,
  //       };

  //       await transporter.sendMail(mailOptions);
  //       // === 2. Send WhatsApp (Sandbox only) ===
  //       // const twilioClient = twilio(
  //       //   process.env.TWILIO_ACCOUNT_SID,
  //       //   process.env.TWILIO_AUTH_TOKEN
  //       // );

  //       // const formattedPhone = `whatsapp:+91${phoneNumber}`;
  //       // const whatsappMessage = `🔐 Your One-Time Password (OTP) for Glocalview is: *${otp}*\n\nThis code is valid for the next 5 minutes. For your security, please do not share this code with anyone.\n\nThank you for choosing Glocalview.`;
  //       // const res = await twilioClient.messages.create({
  //       //   from: process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886", // fallback to sandbox number
  //       //   to: formattedPhone,
  //       //   body: whatsappMessage,
  //       // });
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  orderUpdateStatus: async (message, phoneNumber) => {
    const formattedPhone = `whatsapp:+91${phoneNumber}`;
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    try {
      const res = await client.messages.create({
        from: "whatsapp:+14155238886", // Twilio Sandbox or approved number
        to: formattedPhone,
        body: message,
      });
    } catch (err) {}
  },

  sendEmail: async (data) => {
    try {
      sgMail.setApiKey(apiKey);
      data.from = smtpFrom;
      return await sgMail.send(data);
    } catch (error) {
      return { error: error.message, errorStack: error.stack };
    }
  },

  genrateOTP: async () => {
    const gen = rn.generator({ min: 1000, max: 9999, integer: true });
    return gen();
  },

  genrateRandomNumber: async (data) => {
    const gen = rn.generator({ min: data.min, max: data.max, integer: true });
    return gen();
  },

  generateStrongPassword: async (length = 12) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]<>?";
    const bytes = crypto.randomBytes(length);
    const passwordArray = new Array(length);

    for (let i = 0; i < length; i++) {
      passwordArray[i] = charset[bytes[i] % charset.length];
    }

    const password = passwordArray.join("");

    // Ensure it has at least 1 lowercase, 1 uppercase, 1 number, 1 special char
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+{}\[\]<>?]/.test(password);

    if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
      // Recursively generate until strong enough
      return CommonHelper.generateStrongPassword(length);
    }

    return password;
  },

  // generateStrongPassword: async (length = 12) => {
  //   const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  //   const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const numbers = "0123456789";
  //   const specialChars = "!@#$%^&*()_+{}[]<>?";
  //   const allChars = lowerChars + upperChars + numbers + specialChars;

  //   // ✅ Ensure minimum length of 4
  //   if (length < 4) length = 4;

  //   // ✅ Ensure at least one of each type
  //   const guaranteed = [
  //     lowerChars[Math.floor(Math.random() * lowerChars.length)],
  //     upperChars[Math.floor(Math.random() * upperChars.length)],
  //     numbers[Math.floor(Math.random() * numbers.length)],
  //     specialChars[Math.floor(Math.random() * specialChars.length)],
  //   ];

  //   // ✅ Fill remaining characters randomly
  //   const remainingLength = length - guaranteed.length;
  //   const randomBytes = crypto.randomBytes(remainingLength);
  //   const remaining = Array.from(randomBytes)
  //     .map((b) => allChars[b % allChars.length])
  //     .join("");

  //   // ✅ Combine and shuffle
  //   const passwordArray = (guaranteed.join("") + remaining)
  //     .split("")
  //     .sort(() => Math.random() - 0.5); // shuffle characters

  //   return passwordArray.join("");
  // },

  parseBool: async (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      const v = value.trim().toLowerCase();
      if (v === "true") return true;
      if (v === "false") return false;
    }
    throw new Error("Invalid boolean value");
  },

  getCoordinatesBasedOnLatLonAndDistanceRadius: async (
    centerLat,
    centerLon,
    distanceKm = defaultDistanceRadius
  ) => {
    function calculateNewLatLong(lat, lon, distanceKm, bearingDeg) {
      const R = 6371;
      const lat1 = (Math.PI / 180) * lat;
      const lon1 = (Math.PI / 180) * lon;
      const bearing = (Math.PI / 180) * bearingDeg;

      const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(distanceKm / R) +
          Math.cos(lat1) * Math.sin(distanceKm / R) * Math.cos(bearing)
      );

      const lon2 =
        lon1 +
        Math.atan2(
          Math.sin(bearing) * Math.sin(distanceKm / R) * Math.cos(lat1),
          Math.cos(distanceKm / R) - Math.sin(lat1) * Math.sin(lat2)
        );

      return {
        lat: (lat2 * 180) / Math.PI,
        lon: (lon2 * 180) / Math.PI,
      };
    }

    const bearings = [
      { direction: "North", bearing: 0 },
      { direction: "East", bearing: 90 },
      { direction: "South", bearing: 180 },
      { direction: "West", bearing: 270 },
    ];

    const coords = bearings.map(({ direction, bearing }) => {
      const point = calculateNewLatLong(
        centerLat,
        centerLon,
        distanceKm,
        bearing
      );
      return { direction, ...point };
    });

    return coords;
  },

  sanitizeLatLon: async (value, type = "lat") => {
    const num = parseFloat(value);
    if (isNaN(num)) throw new Error(`${type} must be a valid number`);
    if (type === "lat" && (num < -90 || num > 90))
      throw new Error("Latitude must be between -90 and 90");
    if (type === "lon" && (num < -180 || num > 180))
      throw new Error("Longitude must be between -180 and 180");
    return Number(num.toFixed(8));
  },

  // generateSlots(deliveryType, date) {
  //   const slotDuration = parseInt(deliveryType.slot_duration); // in minutes
  //   const now = moment();
  //   const isToday = moment(date).isSame(now, "day");

  //   let start = moment(
  //     `${date} ${deliveryType.start_time}`,
  //     "YYYY-MM-DD HH:mm:ss"
  //   );
  //   const end = moment(
  //     `${date} ${deliveryType.end_time}`,
  //     "YYYY-MM-DD HH:mm:ss"
  //   );

  //   // Adjust if it's today and current time has passed start time
  //   if (isToday && now.isAfter(start)) {
  //     const roundedMinutes =
  //       Math.ceil(now.minutes() / slotDuration) * slotDuration;
  //     start = now.clone().startOf("hour").minutes(roundedMinutes).seconds(0);
  //     if (start.isBefore(now)) start.add(slotDuration, "minutes");
  //   }

  //   const slots = [];
  //   let current = start.clone();

  //   while (current.clone().add(slotDuration, "minutes").isSameOrBefore(end)) {
  //     const slotStart = current.clone();
  //     const slotEnd = current.clone().add(slotDuration, "minutes");

  //     slots.push({
  //       start_time: slotStart.format("HH:mm"),
  //       end_time: slotEnd.format("HH:mm"),
  //     });

  //     current.add(slotDuration, "minutes");
  //   }

  //   return slots;
  // },

  generateSlots(deliveryType, date) {
    const slotDuration = parseInt(deliveryType.slot_duration); // in minutes
    const timezone = "Asia/Kolkata"; // <- Your local/business timezone

    const now = moment.tz(timezone);
    const isToday = moment.tz(date, timezone).isSame(now, "day");

    let start = moment.tz(
      `${date} ${deliveryType.start_time}`,
      "YYYY-MM-DD HH:mm:ss",
      timezone
    );
    const end = moment.tz(
      `${date} ${deliveryType.end_time}`,
      "YYYY-MM-DD HH:mm:ss",
      timezone
    );

    if (isToday && now.isAfter(start)) {
      const roundedMinutes =
        Math.ceil(now.minutes() / slotDuration) * slotDuration;
      start = now.clone().startOf("hour").minutes(roundedMinutes).seconds(0);
      if (start.isBefore(now)) start.add(slotDuration, "minutes");
    }

    const slots = [];
    let current = start.clone();

    while (current.clone().add(slotDuration, "minutes").isSameOrBefore(end)) {
      const slotStart = current.clone();
      const slotEnd = current.clone().add(slotDuration, "minutes");

      slots.push({
        start_time: slotStart.format("HH:mm"),
        end_time: slotEnd.format("HH:mm"),
      });

      current.add(slotDuration, "minutes");
    }

    return slots;
  },

  checkServiceAvailability: async (lat, lon) => {
    const query = `
    SELECT
      id,
      name,
      latitude,
      longitude,
      service_radius_km,
      (
        6371 * acos(
          cos(radians(:user_lat)) *
          cos(radians(latitude)) *
          cos(radians(longitude) - radians(:user_lon)) +
          sin(radians(:user_lat)) *
          sin(radians(latitude))
        )
      ) AS distance_km
    FROM servicable_locations
    WHERE status = true
    HAVING distance_km <= service_radius_km
    ORDER BY distance_km ASC
    LIMIT 1;
  `;

    const replacements = {
      user_lat: lat,
      user_lon: lon,
    };

    const location = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.SELECT,
    });

    return location.length > 0 ? location[0] : null;
  },

  getBase64ImageSrc: async (relativePath) => {
    try {
      const absolutePath = path.resolve(__dirname, relativePath);
      const ext = path.extname(absolutePath).slice(1).toLowerCase();
      const mime = `image/${ext === "jpg" ? "jpeg" : ext}`;
      const buffer = fs.readFileSync(absolutePath);
      return `data:${mime};base64,${buffer.toString("base64")}`;
    } catch (err) {
      return "";
    }
  },

  getIdFromUuid: async (
    model,
    uuid,
    res,
    apiName = "API",
    uuidField = "uuid"
  ) => {
    if (!uuid) {
      // ResponseHelper.BadRequest(res, `${model.name} UUID is required`, apiName);
      return null;
    }

    const record = await model.findOne({ where: { [uuidField]: uuid } });
    if (!record) {
      // ResponseHelper.NotFound(res, false, `${model.name} not found`, apiName);
      return null;
    }

    return record.id;
  },

  calculateGrade: async (total_score, total_marks) => {
    const percentage = (total_score / total_marks) * 100;
    const grade = await Grade.findOne({
      where: {
        min_percentage: { [Op.lte]: percentage },
        max_percentage: { [Op.gte]: percentage },
        deleted_at: null,
      },
    });

    if (grade) {
      return grade.id;
    }
    return 8;
  },

  sendMultipleEmails: async ({ to, subject, html, text }) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to,
        from: process.env.FROM_MAIL,
        subject,
        text: text || "",
        html: html || "",
      };
      return await sgMail.sendMultiple(msg);
    } catch (error) {
      console.error(
        "Error sending multiple emails:",
        error.response?.body || error.message
      );
      return error.message;
    }
  },

  logActivity: async ({ title, description, created_by }) => {
    try {
      await ActivityLogs.create({
        title,
        description: description || null,
        created_by: created_by || null,
      });
    } catch (err) {
      console.error("Activity Logging Failed:", err);
    }
  },
};

export default CommonHelper;
