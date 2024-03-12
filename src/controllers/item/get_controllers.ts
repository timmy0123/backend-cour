import { Request, Response, NextFunction } from "express";
import onTime from "../helper/getTime";
import { ItemList } from "../../interface/interface";
const _itemList = require("../../model/Item/itemList");
const itemGet = require("../../model/Item/itemGet.ts");

module.exports = class getItem {
  listItem(req: Request, res: Response, next: NextFunction) {
    _itemList()
      .then((result: ItemList[]) => {
        res.status(200).json({ message: result });
      })
      .catch((error: any) => {
        res.status(401).json({ message: error });
      });
  }

  getItem(req: Request, res: Response, next: NextFunction) {
    const itemName = req.query.itemName as string;
    itemGet(itemName)
      .then((result: ItemList) => {
        res.status(200).json({ message: result });
      })
      .catch((error: any) => {
        res.status(401).json({ message: error });
      });
  }
};
