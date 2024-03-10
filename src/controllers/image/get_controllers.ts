import { Request, Response, NextFunction } from "express";
import onTime from "../helper/getTime";
import { Imageurl, ImageList } from "../../interface/interface";
const imageGet = require("../../model/Img/getSelectedImg");
const imageList = require("../../model/Img/imgList");

module.exports = class getImage {
  listImage(req: Request, res: Response, next: NextFunction) {
    imageList()
      .then((result: ImageList[]) => {
        res.status(200).json({ message: result });
      })
      .catch((error: any) => {
        res.status(401).json({ message: error });
      });
  }

  getSelectedImage(req: Request, res: Response, next: NextFunction) {
    imageGet()
      .then((result: Imageurl[]) => {
        res.status(200).json({ message: result });
      })
      .catch((error: any) => {
        res.status(401).json({ message: error });
      });
  }
};
