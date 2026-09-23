import multer from "multer";
import fs from "fs";

if (!fs.existsSync("./public/tempImages")) {
  fs.mkdirSync("./public/tempImages", { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/tempImages");
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