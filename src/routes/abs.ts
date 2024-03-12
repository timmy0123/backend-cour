import express from "express";

const router = express.Router();
const multer = require("multer");
const getMethod = require("../controllers/abs/get_controllers");
const modifyMethod = require("../controllers/abs/modify_controllers");

const absGet = new getMethod();
const absModify = new modifyMethod();

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images/abs"); // Specify the destination directory
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage: storage });

router.get("/listAbs", absGet.listAbs);
router.post("/uploadAbs", upload.single("image"), absModify.uploadAbs);
router.delete("/deleteAbs", absModify.deleteAbs);
router.put("/updateAbs", absModify.updateAbs);

module.exports = router;
