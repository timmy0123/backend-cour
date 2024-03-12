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
const Item = require("./routes/item");

app.use("/User", User);
app.use("/Image", Image);
app.use("/Abs", Abs);
app.use("/Item", Item);

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
