import fs from "fs";
import multer from "multer";

// Use Vercel's writable temporary directory (/tmp)
const uploadDir = "/tmp/tempImages";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = file.originalname.substring(
      file.originalname.lastIndexOf(".")
    );

    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage });