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

// const db = new Pool({
//   user: "maksat",
//   host: "dpg-cjfe12gcfp5c73abst0g-a.frankfurt-postgres.render.com",
//   database: "sneakersdb",
//   password: "sPYAexxEwESUiE5lWMzzGAa4cscRWwva",
//   port: 5432,
//   idleTimeoutMillis: 7200,
//   ssl: true,
// });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const query = "SELECT id FROM users WHERE name = $1 AND password = $2";

  const user = await db.query(query, [username, password]);

  if (!user.rows[0]) return res.status(400).json("Пользователь не найден");

  return res
    .status(200)
    .json({ ...user.rows[0], token: "j1235jdskf.j23123123.12312fsdgfdsr" });
});

app.get("/products", async (req, res) => {
  const { type } = req.query;
  const query = "select * from products where type = $1";

  const products = await db.query(query, [type]);

  if (!products.rows) return res.status(404).json("Продуктов не существует");
  return res.status(200).json(products.rows);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const query = "select * from products where id = $1";

  const products = await db.query(query, [id]);

  if (!products.rows) return res.status(404).json("Продукт не найден");

  return res.status(200).json(products.rows[0]);
});

app.listen(3000, () => {
  try {
    console.log("Server work in 3000 port");
  } catch (err) {
    console.log(err);
  }
});
