import express from "express";

const router = express.Router();
const multer = require("multer");
const getMethod = require("../controllers/item/get_controllers");
const modifyMethod = require("../controllers/item/modify_controllers");

const itemGet = new getMethod();
const itemModify = new modifyMethod();

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images/items"); // Specify the destination directory
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage: storage });

router.get("/listitem", itemGet.listItem);
router.get("/getItem", itemGet.getItem);

module.exports = router;
