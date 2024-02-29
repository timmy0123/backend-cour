import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const router = express.Router();
const url = router.get("/", (req, res) => {
  const queryEvent = new MysqlQuery();

  (async () => {
    const Imgs = await queryEvent.GetImg();
    if (Imgs) return res.json(Imgs);
    else return res.json({ Info: "No data" });
  })();
});

module.exports = router;
