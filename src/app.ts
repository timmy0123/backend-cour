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
const DeleteImg = require("./routes/deleteImg");
const SelectImg = require("./routes/UseImg");

app.use("/GetUser", GetUser);
app.use("/UploadImg", UploadImg);
app.use("/ListImg", ListImg);
app.use("/DeleteImg", DeleteImg);
app.use("/SelectImg", SelectImg);
app.use(
  "/image",
  express.static(path.join(__dirname, "../public/images/uploads"))
);

app.use(
  "/itemImage",
  express.static(path.join(__dirname, "../public/images/items"))
);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
