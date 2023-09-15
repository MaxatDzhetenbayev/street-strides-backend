const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwtn = require("jsonwebtoken");
const dotenv = require("dotenv").config;

dotenv();

const generateJwt = (id, name) => {
  return jwtn.sign(
    {
      id,
      name,
    },
    process.env.SECRET_OF_PRIVATE_KEY,
    { expiresIn: "24h" }
  );
};

class AuthController {
  async registration(req, res) {
    const { name, password } = req.body;

    try {
      const candidateQuery = "SELECT * FROM users WHERE name = $1";
      const candidate = await db.query(candidateQuery, [name]);
      if (candidate.rows[0])
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });

      const hashPassrod = await bcrypt.hash(password, 5);

      const setUserQuery =
        "INSERT INTO users VALUES(default, $1, $2) RETURNING *";
      const user = await db.query(setUserQuery, [name, hashPassrod]);

      if (!user.rows[0])
        return res
          .status(400)
          .json({ message: "Ошибка при созданий пользователя" });

      const currentUser = user.rows[0];
      const token = generateJwt(currentUser.id, currentUser.name);

      return res.status(200).json({ token });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e });
    }
  }
  async login(req, res) {
    const { name, password } = req.body;

    const userQuery = "SELECT * FROM users WHERE name = $1";

    const userData = await db.query(userQuery, [name]);

    const user = userData.rows[0];

    if (!user)
      return res
        .status(400)
        .json({ message: "Такого пользователя не существует" });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return res.status(400).json({ message: "Указанный пароль не верный" });

    const token = generateJwt(user.id, user.name);

    return res.status(200).json({ token });
  }
  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.name);

    return res.status(200).json({ token });
  }
}

module.exports = new AuthController();
