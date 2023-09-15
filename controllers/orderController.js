const db = require("../db.js");

class OrderController {
  async createOrder(req, res) {
    const { userId, productId } = req.body;

    const orderQuery =
      "INSERT INTO orders(id,userid,productid) VALUES(default, $1, $2) RETURNING *";

    try {
      const order = await db.query(orderQuery, [userId, productId]);

      if (!order.rows[0]) {
        return res
          .status(500)
          .json({ message: "Не удалось создать заказ", error: err });
      }

      return res.staus(201).json({ message: "Заказ создан" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Не удалось создать заказ", error: err });
    }
  }
}

module.exports = new OrderController();
