const express = require("express");
const cors = require("cors");
// const pkg = require("pg");
const multer = require("multer");
const path = require("path");
const db = require("./db");
const router = require("./routes/index.js");

// const { Pool } = pkg;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", router);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.listen(3000, () => {
  try {
    console.log("Server work in 3000 port");
  } catch (err) {
    console.log(err);
  }
});
