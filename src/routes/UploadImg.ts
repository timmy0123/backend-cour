import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const multer = require("multer");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images/uploads"); // Specify the destination directory
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res) => {
  const queryEvent = new MysqlQuery();
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  (async () => {
    const metadata = await queryEvent.UploadImg(req!.file!.originalname);
    const newPath = `public/images/uploads/${req!.file!.originalname}`;
    if (!metadata) return res.status(400).json({ error: "database broken" });
    // Rename the uploaded file
    fs.rename(req!.file!.path, newPath, (err: any) => {
      if (err) {
        console.error("Error renaming file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json({ result: "Image uploaded successfully" });
    });
  })();
});

module.exports = router;
