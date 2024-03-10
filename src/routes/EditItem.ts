import express from "express";
import { MysqlQuery } from "../model/mysql_query";

const router = express.Router();
const multer = require("multer");
const upload = multer();

router.post("/", upload.none(), (req, res) => {
  const queryEvent = new MysqlQuery();

  const id = req.query.id as string;
  const itemName = req.query.itemname as string;
  const title = req.query.title as string;
  const subtitle = req.query.subtitle as string;
  let description = req.body.description as string;
  let locid = req.query.locid as string[];
  let city = req.query.city as string[];
  let district = req.query.district as string[];
  let address = req.query.address as string[];
  let storeName = req.query.storeName as string[];
  if (typeof locid === "string") {
    locid = [locid];
  }
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
    const metadata = await queryEvent.UpdateItem(
      id,
      itemName,
      title,
      subtitle,
      description
    );

    if (!metadata) return res.status(400).json({ error: "database broken1" });
    for (let i = 0; i < locid.length; i++) {
      const deleteloc = await queryEvent.Deletelocbyid(locid[i]);
      if (!deleteloc) {
        return res.status(400).json({ error: "database broken delete loc" });
      }
    }

    for (let i = 0; i < city.length; i++) {
      const locdata = await queryEvent.UploadLoc(
        itemName,
        storeName[i],
        city[i],
        district[i],
        address[i]
      );
      if (!locdata) {
        return res.status(400).json({ error: "database broken2" });
      }
    }

    res.json({ result: "Update successfully" });
  })();
});

module.exports = router;
