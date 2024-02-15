import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const router = express.Router();
const url = router.get("/", (req, res) => {
  const queryEvent = new MysqlQuery();

  (async () => {
    const listItems = await queryEvent.ListItem();
    if (listItems && listItems.length > 0) return res.json(listItems);
    else return res.json({ Info: "No data" });
  })();
});

module.exports = router;
