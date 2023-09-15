const router = require("express").Router();
const authRouter = require("./authRouter.js");
const productRouter = require("./productRouter.js");
const orderRouter = require("./orderRouter.js");
const cartRouter = require("./cartRouter.js");

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);

module.exports = router;
