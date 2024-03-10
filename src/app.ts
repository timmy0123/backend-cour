import express from "express";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5566;
const path = require("path");

const User = require("./routes/user");
const Image = require("./routes/image");
const Abs = require("./routes/abs");

const ListItem = require("./routes/ListItem");
const UploadItem = require("./routes/UploadItem");
const DeleteItem = require("./routes/DeleteItem");
const EditItem = require("./routes/EditItem");
const UploadAbs = require("./routes/UploadAbs");
const DeleteAbs = require("./routes/DeleteAbs");
const EditAbs = require("./routes/EditAbs");
const GetItem = require("./routes/GetItem");

app.use("/User", User);
app.use("/Image", Image);
app.use("/Abs", Abs);

app.use("/ListItem", ListItem);
app.use("/UploadItem", UploadItem);
app.use("/DeleteItem", DeleteItem);
app.use("/EditItem", EditItem);
app.use("/UploadAbs", UploadAbs);
app.use("/DeleteAbs", DeleteAbs);
app.use("/EditAbs", EditAbs);
app.use("/GetItem", GetItem);
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
