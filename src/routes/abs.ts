import express from "express";
import { MysqlQuery } from "../model/mysql_query";

const router = express.Router();
const getMethod = require("../controllers/abs/get_controllers");

const absGet = new getMethod();

router.get("/listAbs", absGet.listAbs);

module.exports = router;
