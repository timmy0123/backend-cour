import express from "express";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5566;
const path = require("path");

const GetUser = require("./routes/GetUser");

app.use("/GetUser", GetUser);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
