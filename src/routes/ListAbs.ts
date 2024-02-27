import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const router = express.Router();
const url = router.get("/", (req, res) => {
  const queryEvent = new MysqlQuery();

  (async () => {
    const listAbs = await queryEvent.ListAbs();
    if (listAbs) return res.json(listAbs);
    else return res.json({ Info: "No data" });
  })();
});

module.exports = router;
