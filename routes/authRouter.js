const router = require("express").Router();
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.get("/check", authMiddleware, authController.check);

module.exports = router;
