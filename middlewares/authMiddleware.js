const jwtn = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTION") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Не авторизован" });

    const decoded = jwtn.verify(token, process.env.SECRET_OF_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Не авторизован" });
  }
};
