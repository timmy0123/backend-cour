import express from "express";
import { MysqlQuery } from "../database/mysql_query";

const router = express.Router();

router.get("/", (req, res) => {
  const user = req.query.username as string;
  const password = req.query.password as string;
  const queryEvent = new MysqlQuery();

  if (user && password)
    (async () => {
      const userExist = await queryEvent.getAdmin(user, password);
      return res.json(userExist);
    })();
  else res.status(400).json({ error: "Missing user parameter" });
});

module.exports = router;
