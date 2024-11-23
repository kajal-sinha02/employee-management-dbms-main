const mysql = require("mysql");

const db = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = (req, res) => {
  if (req.method === "POST") {
    const { name, age, country, position, wage } = req.body;
    db.query(
      "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
      [name, age, country, position, wage],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.status(201).send("Employee created");
        }
      }
    );
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
