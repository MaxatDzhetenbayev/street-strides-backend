const router = require("express").Router();
const carttController = require("../controllers/cartController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/", authMiddleware, carttController.addProduct);

module.exports = router;
