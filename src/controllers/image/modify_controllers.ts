import { Request, Response, NextFunction } from "express";
import onTime from "../helper/getTime";
import {
  uploadResuld,
  deleteResuld,
  updateResult,
} from "../../interface/interface";
import { error } from "console";

const imageUpload = require("../../model/Img/imgUpload");
const imageDelete = require("../../model/Img/imgDelete");
const imageSelect = require("../../model/Img/imgSelect");
const fs = require("fs");
const path = require("path");

module.exports = class modifyImage {
  uploadImage(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    imageUpload(req!.file!.originalname.replace(/ /g, "_"))
      .then((result: uploadResuld) => {
        const newPath = `public/images/uploads/${req!.file!.originalname.replace(
          / /g,
          "_"
        )}`;
        fs.rename(req!.file!.path, newPath, (err: any) => {
          if (err) {
            console.error("Error renaming file:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(200).json({ result: "Image uploaded successfully" });
        });
      })
      .catch((error: any) => {
        res.status(401).json({ message: error });
      });
  }

  deleteImage(req: Request, res: Response, next: NextFunction) {
    const fileName = req.query.filename as string;
    const pth = path.resolve(
      __dirname,
      "../../../public/images/uploads",
      fileName
    );
    if (fs.existsSync(pth)) {
      imageDelete(fileName)
        .then((result: deleteResuld) => {
          console.log(result);
          fs.unlink(pth, (err: any) => {
            if (err) {
              console.error("Error deleting file:", err);
              res.status(500).json({ error: "Failed to delete image" });
            } else {
              console.log("Image deleted successfully");
              res.status(200).json({ message: "Image deleted successfully" });
            }
          });
        })
        .catch((error: any) => {
          console.log(error);
          res.status(401).json({ message: error });
        });
    } else {
      res.status(401).json({ message: "file not exist" });
    }
  }

  selectImage(req: Request, res: Response, next: NextFunction) {
    let SeletedImgs: string[] = req.query.imgs as string[];
    if (typeof SeletedImgs === "string") {
      SeletedImgs = [SeletedImgs];
    }
    imageSelect(SeletedImgs)
      .then((result: updateResult) => {
        res.status(200).json({ result: "Image update succussfully" });
      })
      .catch((error: any) => {
        res.status(401).json({ message: error });
      });
  }
};
