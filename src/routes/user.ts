import express from "express";
import { MysqlQuery } from "../model/mysql_query";

const router = express.Router();

const updateMethod = require("../controllers/user/modify_controllers");
const loginMethod = require("../controllers/user/get_controllers");

const userLogin = new loginMethod();
const userUpdate = new updateMethod();

router.put("/UpdateUser", userUpdate.updateUser);
router.get("/GetUser", userLogin.loginUser);

module.exports = router;
