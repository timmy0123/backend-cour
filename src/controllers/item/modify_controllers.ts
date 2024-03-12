import { Request, Response, NextFunction } from "express";
import onTime from "../helper/getTime";
import {
  uploadResuld,
  deleteResuld,
  updateResult,
} from "../../interface/interface";
import { error } from "console";

const itemUpload = require("../../model/item/itemUpload");
const itemDelete = require("../../model/item/itemDelete");
const itemUpdate = require("../../model/item/itemUpdate");
const locationUpload = require("../../model/location/locationUpload");
const locationDelete = require("../../model/location/locationDelete");
const locationDeleteById = require("../../model/location/locationDeleteById");

const fs = require("fs");
const path = require("path");

module.exports = class modifyItem {
  async uploadItem(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const pictureName = req.file.originalname.replace(/ /g, "_") as string;
    const itemName = req.query.itemname as string;
    const title = req.query.title as string;
    const subtitle = req.query.subtitle as string;
    let description = req.body.description as string;
    let city = req.query.city as string[];
    let district = req.query.district as string[];
    let address = req.query.address as string[];
    let storeName = req.query.storeName as string[];

    if (typeof city === "string") {
      city = [city];
    }
    if (typeof district === "string") {
      district = [district];
    }
    if (typeof address === "string") {
      address = [address];
    }
    if (typeof storeName === "string") {
      storeName = [storeName];
    }

    try {
      const itemUploadRes = await itemUpload(
        req!.file!.originalname.replace(/ /g, "_"),
        itemName,
        title,
        subtitle,
        description
      );
    } catch (error) {
      res.status(401).json({ message: error });
    }

    for (let i = 0; i < city.length; i++) {
      try {
        const locdata = await locationUpload(
          itemName,
          storeName[i],
          city[i],
          district[i],
          address[i]
        );
      } catch (error) {
        continue;
      }
    }

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
  }

  deleteItem(req: Request, res: Response, next: NextFunction) {
    const fileName = req.query.fileName as string;
    const itemName = req.query.itemName as string;
    const pth = path.resolve(__dirname, "../../public/images/items", fileName);
    if (fs.existsSync(pth)) {
      itemDelete(itemName)
        .then((result: deleteResuld) => {
          return locationDelete(itemName);
        })
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

  async updateitem(req: Request, res: Response, next: NextFunction) {
    const id = req.query.id as string;
    const itemName = req.query.itemname as string;
    const title = req.query.title as string;
    const subtitle = req.query.subtitle as string;
    let description = req.body.description as string;
    let locid = req.query.locid as string[];
    let city = req.query.city as string[];
    let district = req.query.district as string[];
    let address = req.query.address as string[];
    let storeName = req.query.storeName as string[];
    if (typeof locid === "string") {
      locid = [locid];
    }
    if (typeof city === "string") {
      city = [city];
    }
    if (typeof district === "string") {
      district = [district];
    }
    if (typeof address === "string") {
      address = [address];
    }
    if (typeof storeName === "string") {
      storeName = [storeName];
    }

    try {
      const metadata = await itemUpdate(
        id,
        itemName,
        title,
        subtitle,
        description
      );
    } catch (error) {
      res.status(401).json({ message: error });
    }

    for (let i = 0; i < locid.length; i++) {
      try {
        const deleteLoc = await locationDeleteById(locid[i]);
      } catch (error) {
        continue;
      }
    }

    for (let i = 0; i < city.length; i++) {
      try {
        const uploadLoc = await locationUpload(
          itemName,
          storeName[i],
          city[i],
          district[i],
          address[i]
        );
      } catch (error) {
        continue;
      }
    }
    res.status(200).json({ result: "Item update succussfully" });
  }
};
