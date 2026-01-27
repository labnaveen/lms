import multer from 'multer';
import path from 'path';

class ImageUploader {
  constructor() {
    // Define storage and fileFilter as class properties
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '../profiles/');
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + path.extname(file.originalname));
      },
    });

    this.fileFilter = (req, file, cb) => {
      // if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
      // } else {
      //   cb(null, false);
      //   cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
      // }
    };

    this.upload = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    });
  }
}

export default new ImageUploader();
