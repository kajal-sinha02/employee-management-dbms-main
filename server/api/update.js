const mysql = require("mysql");

const db = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = (req, res) => {
  if (req.method === "PUT") {
    const { id, wage } = req.body;
    db.query(
      "UPDATE employees SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.status(200).send("Employee updated");
        }
      }
    );
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
