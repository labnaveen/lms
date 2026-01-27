import multer from "multer";
import { extname } from "path";
import { promises as fs } from "fs";

class Uploader {
    constructor() { }

    // Ensure upload directory exists
    async ensureDirectory(destination) {
        try {
            await fs.access(destination);
        } catch {
            await fs.mkdir(destination, { recursive: true });
        }
    }

    // Upload multiple files (for form-data without defined field names)
    uploadMultipleFiles(
        destination,
        maxFileSize = 100000 * 1024 * 1024,
        allowedMimeTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/heif",
            "application/pdf",
            "video/mp4",
            "video/mpeg",
            "video/quicktime",
            "video/x-msvideo",
            "video/x-matroska",
            "audio/mpeg",
            "audio/mp3",
            "audio/wav",
            "audio/x-wav",
            "audio/webm",
            "audio/ogg",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "text/plain",
        ]
    ) {
        // Ensure directory exists asynchronously (fire and forget)
        this.ensureDirectory(destination).catch(console.error);

        const storage = multer.diskStorage({
            destination,
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}_${Date.now()}${extname(file.originalname)}`);
            },
        });

        return multer({
            storage,
            limits: { fileSize: maxFileSize },
            fileFilter: (req, file, cb) => {
                if (allowedMimeTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error("Invalid file type"));
                }
            },
        }).any(); // handles multiple files
    }

    uploadSingleFile(
        destination,
        fieldName,
        maxFileSize = 100000 * 1024 * 1024,
        allowedMimeTypes = ["image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"]
    ) {
        this.ensureDirectory(destination).catch(console.error);

        const storage = multer.diskStorage({
            destination,
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}_${Date.now()}${extname(file.originalname)}`);
            },
        });

        return multer({
            storage,
            limits: { fileSize: maxFileSize },
            fileFilter: (req, file, cb) => {
                if (allowedMimeTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error("Invalid file type"));
                }
            },
        }).single(fieldName); // 👈 Only accept 1 file under this field name
    }

}

export default new Uploader();
