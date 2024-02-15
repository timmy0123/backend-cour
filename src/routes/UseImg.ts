import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const router = express.Router();
const url = router.post("/", (req, res) => {
  let SeletedImgs: string[] = req.query.imgs as string[];
  if (typeof SeletedImgs === "string") {
    SeletedImgs = [SeletedImgs];
  }
  const queryEvent = new MysqlQuery();

  (async () => {
    const selected = await queryEvent.SelectImg(SeletedImgs);
    return res.json(selected);
  })();
});

module.exports = router;
