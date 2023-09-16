const db = require("../db.js");

class OrderController {
  async createOrder(req, res) {
    const { userId, productList } = req.body;
    console.log(productList);

    const orderQuery =
      "INSERT INTO orders(id,userid,productid) VALUES(default, $1, $2) RETURNING id";

    try {
      const products = [];
      productList.map(async (element) => {
        let product;

        for (let index = 0; index < element.quantity; index++) {
          product = await db.query(orderQuery, [userId, element.id]);
        }

        if (!product.rows)
          return res.status(500).json({ message: "Не удалось создать заказ" });

        products.push(product.rows[0].id);
      });

      if (products.length === 0)
        return res.status(500).json({ message: "Не удалось создать заказ" });

      return res.status(201).json(products);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Не удалось создать заказ", error: err });
    }
  }

  async getUserOrders(req, res) {
    const { userid } = req.params;
    if (userid) {
      const orderQuery =
        "SELECT p.id,  p.name, p.style_code, createdate, status,  COUNT(o.id) as quantity, SUM(p.price) as price   FROM orders o INNER JOIN users u ON o.userid = u.id INNER JOIN products p ON o.productid = p.id WHERE u.id = $1 GROUP BY p.id,  p.name, p.style_code, createdate, status;";

      try {
        const products = await db.query(orderQuery, [userid]);

        if (!products.rows)
          return res.status(404).json({ message: "Your orders not found" });

        return res.status(200).json(products.rows);
      } catch (err) {
        return res.status(500).json({ message: "Your orders  not fount" });
      }
    }
  }
}

module.exports = new OrderController();
