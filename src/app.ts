import express from "express";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5566;
const path = require("path");

const GetUser = require("./routes/GetUser");
const UploadImg = require("./routes/UploadImg");
const ListImg = require("./routes/ListImg");
const DeleteImg = require("./routes/DeleteImg");
const SelectImg = require("./routes/UseImg");
const ListItem = require("./routes/ListItem");
const UploadItem = require("./routes/UploadItem");
const DeleteItem = require("./routes/DeleteItem");
const EditItem = require("./routes/EditItem");
const ListAbs = require("./routes/ListAbs");
const UploadAbs = require("./routes/UploadAbs");
const DeleteAbs = require("./routes/DeleteAbs");
const EditAbs = require("./routes/EditAbs");
const GetItem = require("./routes/GetItem");
const GetImg = require("./routes/GetImg");
const EditUser = require("./routes/EditUser");

app.use("/GetUser", GetUser);
app.use("/EditUser", EditUser);
app.use("/UploadImg", UploadImg);
app.use("/ListImg", ListImg);
app.use("/DeleteImg", DeleteImg);
app.use("/SelectImg", SelectImg);
app.use("/ListItem", ListItem);
app.use("/UploadItem", UploadItem);
app.use("/DeleteItem", DeleteItem);
app.use("/EditItem", EditItem);
app.use("/ListAbs", ListAbs);
app.use("/UploadAbs", UploadAbs);
app.use("/DeleteAbs", DeleteAbs);
app.use("/EditAbs", EditAbs);
app.use("/GetItem", GetItem);
app.use("/GetImg", GetImg);
app.use(
  "/image",
  express.static(path.join(__dirname, "../public/images/uploads"))
);
app.use(
  "/itemImage",
  express.static(path.join(__dirname, "../public/images/items"))
);
app.use(
  "/absImage",
  express.static(path.join(__dirname, "../public/images/abs"))
);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
