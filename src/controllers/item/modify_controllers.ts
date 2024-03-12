import { Request, Response, NextFunction } from "express";
import onTime from "../helper/getTime";
import {
  uploadResuld,
  deleteResuld,
  updateResult,
} from "../../interface/interface";
import { error } from "console";

const absUpload = require("../../model/Abs/absUpload");
const absDelete = require("../../model/Abs/absDelete");
const absUpdate = require("../../model/Abs/absUpdate");
const fs = require("fs");
const path = require("path");

module.exports = class modifyAbs {
  uploadAbs(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const title = req.query.title as string;
    const subtitle = req.query.subtitle as string;
    const description = req.body.description as string;
    absUpload(
      req!.file!.originalname.replace(/ /g, "_"),
      title,
      subtitle,
      description
    )
      .then((result: uploadResuld) => {
        const newPath = `public/images/abs/${req!.file!.originalname.replace(
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

  deleteAbs(req: Request, res: Response, next: NextFunction) {
    const fileName = req.query.fileName as string;
    const title = req.query.title as string;
    console.log(fileName, title);
    const pth = path.resolve(__dirname, "../../../public/images/abs", fileName);
    if (fs.existsSync(pth)) {
      absDelete(title)
        .then((result: deleteResuld) => {
          fs.unlink(pth, (err: any) => {
            if (err) {
              console.error("Error deleting file:", err);
              res.status(500).json({ error: "Failed to delete abs" });
            } else {
              console.log("Image deleted successfully");
              res.status(200).json({ message: "Abs deleted successfully" });
            }
          });
        })
        .catch((error: any) => {
          res.status(401).json({ message: error });
        });
    } else {
      res.status(401).json({ message: "file not exist" });
    }
  }

  updateAbs(req: Request, res: Response, next: NextFunction) {
    const id = req.query.id as string;
    const title = req.query.title as string;
    const subtitle = req.query.subtitle as string;
    const description = req.body.description as string;

    absUpdate(id, title, subtitle, description)
      .then((result: updateResult) => {
        res.status(200).json({ result: "Abs update succussfully" });
      })
      .catch((error: any) => {
        res.status(401).json({ message: error });
      });
  }
};
