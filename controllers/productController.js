const db = require("../db.js");

class ProductController {
  async getAllProducts(req, res) {
    const { brand, sort } = req.query;

    let productQuery = `SELECT * FROM products`;

    let queryValues = [];

    if (brand !== "all") {
      productQuery += " WHERE brand = $1";
      queryValues.push(brand);
    }

    if (sort === "DESC") {
      productQuery += " ORDER BY price DESC";
    } else if (sort === "ASC") {
      productQuery += " ORDER BY price ASC";
    }

    const query = {
      text: productQuery,
      values: queryValues,
    };

    const products = await db.query(query);

    try {
      if (!products.rows) {
        return res.status(404).json({ message: "Продукты не найдены" });
      }

      return res.status(200).json(products.rows);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: "Продукты не найдены", error: e });
    }
  }

  async getProductById(req, res) {
    const { id } = req.params;

    try {
      const productQuery = "SELECT * FROM products where id = $1";

      const product = await db.query(productQuery, [id]);

      if (!product.rows[0]) {
        return res.status(404).json({ message: "Продукт не найден" });
      }

      return res.status(200).json(product.rows[0]);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: "Продукт не найден", error: e });
    }
  }
}

module.exports = new ProductController();
