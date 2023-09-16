const db = require("../db.js");

class CartController {
  async addProduct(req, res) {
    const { userId, productId } = req.body;

    try {
      const productQuery =
        "INSERT INTO carts(id,userid,productid, date) VALUES (default, $1, $2, default) RETURNING *";
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

  async getCartProducts(req, res) {
    const { id } = req.params;
    const cartQuery =
      "select p.id, p.name, p.brand, p.style_code, p.price, COUNT(p.id) AS quantity from carts c INNER JOIN products p ON c.productid = p.id AND c.userid = $1  GROUP BY p.id, p.name, p.brand, p.style_code, p.price";
    try {
      const query = await db.query(cartQuery, [id]);

      if (!query.rows) {
        return res.status(500).json({ message: "Products for cart not found" });
      }

      return res.status(200).json(query.rows);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Products for cart not fount", error: error });
    }
  }

  async deleteUserProductById(req, res) {
    const { id } = req.params;

    const cartQuery = "delete from carts where productid = $1";

    try {
      await db.query(cartQuery, [id]);

      return res.status(200);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Product not deleted", error: err });
    }
  }

  async deleteUserCart(req, res) {
    const { id } = req.params;
    console.log(id);

    const cartQuery = "delete from carts where userid = $1 RETURNING *";

    try {
      const products = await db.query(cartQuery, [id]);

      return res.status(200).json(products.rows);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Products not deleted", error: err });
    }
  }
}

module.exports = new CartController();
