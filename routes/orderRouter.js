const router = require("express").Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/", authMiddleware, orderController.createOrder);

module.exports = router;
