import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import https from "http";
import { fileURLToPath } from "url";
import morgan from "morgan";
import helmet from "helmet";
import indexRoutes from "./routes/indexRoutes.js";

// ------------------ __dirname replacement ------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------ App & Config ------------------
const app = express();
const PORT = process.env.PORT || 7007;
const HOST = process.env.HOST || "0.0.0.0";

// ------------------ Helmet Security ------------------
app.use(
    helmet({
        crossOriginEmbedderPolicy: false, // prevent issues with fonts/images
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);

// Content Security Policy (CSP)
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "http://172.24.255.132", "http://elearning.glocalview.qa", "https://elearning.glocalview.in"], // allow your frontend to connect
            scriptSrc: ["'self'", "'unsafe-inline'", "http://172.24.255.132", "http://elearning.glocalview.qa", "https://elearning.glocalview.in"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "blob:", "http://172.24.255.132", "http://elearning.glocalview.qa", "https://elearning.glocalview.in"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            baseUri: ["'self'"],
        },
    })
);

// Other Security Headers
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
app.use(helmet.noSniff());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));

// ------------------ CORS ------------------
const allowedOrigins = [
    "http://172.24.255.132:", // your frontend
    "http://localhost:5173", // for Vite (if used)
    "https://your-production-domain.com", // production frontend,
    "http://172.24.255.132",
    "http://elearning.glocalview.qa",
    "https://elearning.glocalview.in",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// ------------------ Logging & Body Parsing ------------------
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------ Static Files ------------------
app.use("/public", express.static(path.join(__dirname, "../public")));

// ------------------ API Routes ------------------
indexRoutes(app);

// ------------------ Root Route ------------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ------------------ HTTPS Server ------------------
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, "certs/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "certs/cert.pem")),
};

https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
    console.log(`🔐 Secure server running at http://${HOST}:${PORT}`);
});
 
