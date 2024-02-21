import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const fs = require("fs");
const router = express.Router();
const path = require("path");

router.delete("/", (req, res) => {
  const queryEvent = new MysqlQuery();
  const fileName = req.query.fileName as string;
  const itemName = req.query.itemName as string;
  console.log(fileName, itemName);
  const pth = path.resolve(__dirname, "../../public/images/items", fileName);

  if (fs.existsSync(pth)) {
    (async () => {
      const deleteItem = await queryEvent.DeleteItem(itemName);
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
      const deletloc = await queryEvent.Deleteloc(itemName);
      if (!deletloc) return res.status(400).json({ error: "database broken" });
    })();
  } else return res.status(400).json({ error: "file not exist" });
});

module.exports = router;
