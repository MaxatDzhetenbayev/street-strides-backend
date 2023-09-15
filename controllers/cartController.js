const db = require("../db.js");

class CartController {
  async addProduct(req, res) {
    const { userId, productId } = req.body;

    try {
      const productQuery =
        "INSERT INTO carts(id,userid,productid) VALUES (default, $1, $2) RETURNING *";
      const product = db.query(productQuery, [userId, productId]);
      console.log(product.rows[0]);

      if (!product.rows[0]) {
        return res.status(500).json({ message: "Не удалось создать заказ" });
      }

      return res.staus(201).json({ message: "Заказ создан" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Не удалось создать заказ", error: err });
    }
  }
}

module.exports = new CartController();
