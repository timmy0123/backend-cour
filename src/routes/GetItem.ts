import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const router = express.Router();
const url = router.get("/", (req, res) => {
  const queryEvent = new MysqlQuery();
  const itemName = req.query.itemname as string;

  (async () => {
    const listItems = await queryEvent.GetItem(itemName);
    if (listItems) return res.json(listItems);
    else return res.json({ Info: "No data" });
  })();
});

module.exports = router;
