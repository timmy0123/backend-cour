import { Request, Response, NextFunction } from "express";
import onTime from "../helper/getTime";
import { loginResult } from "../../interface/interface";
const userLogin = require("../../model/User/userLogin");

module.exports = class getUser {
  loginUser(req: Request, res: Response, next: NextFunction) {
    const user = req.query.username as string;
    const password = req.query.password as string;

    userLogin(user, password)
      .then((result: loginResult) => {
        res.status(200).json({ message: result });
      })
      .catch((error: loginResult) => {
        res.status(401).json({ message: error });
      });
  }
};
