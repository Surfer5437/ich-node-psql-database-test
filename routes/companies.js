
const db = require("../db");
const express = require("express");
const router = express.Router();



router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(
        //   `SELECT * FROM companies FULL JOIN companies_invoices ON companies.id=companies_invoices.companies_id FULL JOIN invoices ON companies_invoices.invoice_id=invoices.id`);
          `SELECT * FROM companies`);

    return res.json(results.rows);
  }

  catch (err) {
    return next(err);
  }
});

router.get("/search", async function (req, res, next) {
  try {
    const name = req.query.name;

    const results = await db.query(
      `SELECT id, name, address 
       FROM companies
       WHERE name=$1`, [name]);

    return res.json(results.rows);
  }

  catch (err) {
    return next(err);
  }
});



router.post("/", async function (req, res, next) {
  try {
    const { name, address, phone_number, service_type } = req.body;

    const result = await db.query(
          `INSERT INTO companies (name, address, phone_number, service_type) 
           VALUES ($1, $2, $3, $4)
           RETURNING id, name, address, phone_number, service_type`,
        [name, address, phone_number, service_type]
    );

    return res.status(201).json(result.rows[0]);
  }

  catch (err) {
    return next(err);
  }
});


router.patch("/:id", async function (req, res, next) {
  try {
    const { name, address, phone_number, service_type } = req.body;

    const result = await db.query(
          `UPDATE companies SET name=$1, address=$2, phone_number=$3, service_type=$4
           WHERE id = $5
           RETURNING id, name, address, phone_number, service_type`,
        [name, address, phone_number, service_type, req.params.id]
    );

    return res.json(result.rows[0]);
  }

  catch (err) {
    return next(err);
  }
});


router.delete("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
        "DELETE FROM companies WHERE id = $1",
        [req.params.id]
    );

    return res.json({message: "Deleted"});
  }

  catch (err) {
    return next(err);
  }
});

module.exports = router;