import { Request, Response, NextFunction } from "express";
import onTime from "../helper/getTime";
import { updateResult } from "../../interface/interface";
const userUpdate = require("../../model/User/userUpdate");

module.exports = class modifyUser {
  updateUser(req: Request, res: Response, next: NextFunction) {
    const user = req.query.username as string;
    const password = req.query.password as string;

    userUpdate(user, password)
      .then((result: updateResult) => {
        res.status(200).json({ message: result });
      })
      .catch((error: updateResult) => {
        res.status(401).json({ message: error });
      });
  }
};
