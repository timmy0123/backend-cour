import express from "express";
import { MysqlQuery } from "../model/mysql_query";

const router = express.Router();
const multer = require("multer");
const getMethod = require("../controllers/image/get_controllers");
const modifyMethod = require("../controllers/image/modify_controllers");

const imageGet = new getMethod();
const imageModify = new modifyMethod();
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images/uploads"); // Specify the destination directory
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage: storage });

router.get("/getImage", imageGet.getSelectedImage);
router.get("/listImage", imageGet.listImage);
router.post("/uploadImage", upload.single("image"), imageModify.uploadImage);
router.delete("/deleteImage", imageModify.deleteImage);
router.put("/selectImage", imageModify.selectImage);

module.exports = router;
