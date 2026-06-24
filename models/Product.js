const Model = require(".");
const pool = require("../db/pool");

class Product extends Model {
  static tableName = "products";

  static async paginate({ keyword, order, sort, page }) {
    let query = `SELECT * FROM products`;

    if (sort !== "desc") {
      sort = "asc";
    }

    if (isNaN(+page)) {
      page = 1;
    }

    if (keyword) {
      query += ` WHERE name ILIKE '%${keyword}%'`;
    }

    if (order && ["name", "price", "stock"].includes(order)) {
      query += ` ORDER BY ${order} ${sort}`;
    } else {
      query += ` ORDER BY name ${sort}`;
    }

    const skip = (page - 1) * 10;
    query += ` LIMIT 10 OFFSET ${skip}`;

    const result = await pool.query(query);
    const countResult = await pool.query(`SELECT COUNT(id) FROM products`);
    const total = countResult.rows[0].count;
    const totalPage = Math.ceil(total / 10);

    return {
      data: result.rows,
      skip,
      page: +page,
      total: +total,
      totalPage,
    };
  }
}

module.exports = Product;
