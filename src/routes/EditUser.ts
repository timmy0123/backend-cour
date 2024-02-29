import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const router = express.Router();

router.post("/", (req, res) => {
  const user = req.query.username as string;
  const password = req.query.password as string;
  const queryEvent = new MysqlQuery();

  if (user && password)
    (async () => {
      const userDelete = await queryEvent.DeleteAdmin();
      const userInsert = await queryEvent.InsertAdmin(user, password);
      res.json({ result: "Update successfully" });
    })();
  else res.status(400).json({ error: "Missing user parameter" });
});

module.exports = router;
