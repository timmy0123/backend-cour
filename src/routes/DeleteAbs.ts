import express from "express";
import { MysqlQuery } from "../model/mysql_query";

const fs = require("fs");
const router = express.Router();
const path = require("path");

router.delete("/", (req, res) => {
  const queryEvent = new MysqlQuery();
  const fileName = req.query.fileName as string;
  const title = req.query.title as string;
  const pth = path.resolve(__dirname, "../../public/images/abs", fileName);

  if (fs.existsSync(pth)) {
    (async () => {
      const deleteItem = await queryEvent.DeleteAbs(title);
      if (!deleteItem)
        return res.status(400).json({ error: "database broken" });
      // Rename the uploaded file
      fs.unlink(pth, (err: any) => {
        if (err) {
          console.error("Error deleting file:", err);
          res.status(500).json({ error: "Failed to delete image" });
        } else {
          console.log("Image deleted successfully");
          res.status(200).json({ message: "Image deleted successfully" });
        }
      });
    })();
  } else return res.status(400).json({ error: "file not exist" });
});

module.exports = router;
