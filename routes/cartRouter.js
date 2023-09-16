const router = require("express").Router();
const cartController = require("../controllers/cartController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/", authMiddleware, cartController.addProduct);
router.get("/:id", authMiddleware, cartController.getCartProducts);
router.delete("/:id", authMiddleware, cartController.deleteUserCart);
router.delete(
  "/product/:id",
  authMiddleware,
  cartController.deleteUserProductById
);

module.exports = router;
