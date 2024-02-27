import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const multer = require("multer");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images/abs"); // Specify the destination directory
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
  } else {
    const pictureName = req.file.originalname as string;
    const title = req.query.title as string;
    const subtitle = req.query.subtitle as string;
    const description = req.body.description as string;

    (async () => {
      const metadata = await queryEvent.UploadAbs(
        req!.file!.originalname,
        title,
        subtitle,
        description
      );

      if (!metadata) return res.status(400).json({ error: "database broken1" });
      const newPath = `public/images/abs/${req!.file!.originalname}`;
      // Rename the uploaded file
      fs.rename(req!.file!.path, newPath, (err: any) => {
        if (err) {
          // delete builded data
          (async () => {
            const deletedata = await queryEvent.DeleteAbs(title);
          })();
          console.error("Error renaming file:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json({ result: "Image uploaded successfully" });
      });
    })();
  }
});

module.exports = router;
