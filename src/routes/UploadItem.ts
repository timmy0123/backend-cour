import express from "express";
import { MysqlQuery } from "../model/mysql_query";

const multer = require("multer");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images/items"); // Specify the destination directory
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
    const itemName = req.query.itemname as string;
    const title = req.query.title as string;
    const subtitle = req.query.subtitle as string;
    let description = req.body.description as string;
    let city = req.query.city as string[];
    let district = req.query.district as string[];
    let address = req.query.address as string[];
    let storeName = req.query.storeName as string[];

    if (typeof city === "string") {
      city = [city];
    }
    if (typeof district === "string") {
      district = [district];
    }
    if (typeof address === "string") {
      address = [address];
    }
    if (typeof storeName === "string") {
      storeName = [storeName];
    }

    (async () => {
      const metadata = await queryEvent.UploadItem(
        req!.file!.originalname,
        itemName,
        title,
        subtitle,
        description
      );

      if (!metadata) return res.status(400).json({ error: "database broken1" });
      for (let i = 0; i < city.length; i++) {
        const locdata = await queryEvent.UploadLoc(
          itemName,
          storeName[i],
          city[i],
          district[i],
          address[i]
        );
        if (!locdata) {
          // delete builded data
          const deletedata = await queryEvent.DeleteItem(itemName);
          const deleteloc = await queryEvent.Deleteloc(itemName);

          return res.status(400).json({ error: "database broken2" });
        }
      }

      const newPath = `public/images/items/${req!.file!.originalname}`;
      // Rename the uploaded file
      fs.rename(req!.file!.path, newPath, (err: any) => {
        if (err) {
          // delete builded data
          (async () => {
            const deletedata = await queryEvent.DeleteItem(itemName);
            const deleteloc = await queryEvent.Deleteloc(itemName);
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
