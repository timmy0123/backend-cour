import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const router = express.Router();
const multer = require("multer");
const upload = multer();

router.post("/", upload.none(), (req, res) => {
  const queryEvent = new MysqlQuery();

  const id = req.query.id as string;
  const title = req.query.title as string;
  const subtitle = req.query.subtitle as string;
  const description = req.body.description as string;

  (async () => {
    const metadata = await queryEvent.UpdateAbs(
      id,
      title,
      subtitle,
      description
    );
    if (!metadata) return res.status(400).json({ error: "database broken1" });

    res.json({ result: "Update successfully" });
  })();
});

module.exports = router;
