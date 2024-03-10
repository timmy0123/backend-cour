import { Request, Response, NextFunction } from "express";
import onTime from "../helper/getTime";
import { absList } from "../../interface/interface";
const _absList = require("../../model/Abs/absList");

module.exports = class getAbs {
  listAbs(req: Request, res: Response, next: NextFunction) {
    _absList()
      .then((result: absList[]) => {
        res.status(200).json({ message: result });
      })
      .catch((error: any) => {
        res.status(401).json({ message: error });
      });
  }
};
