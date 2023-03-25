const express = require("express");
const bodyParser = require("body-parser");
const con = require("./connection");
const response = require("./response");
const cors = require("cors");

const app = express();
const hostname = "localhost";
const port = "5000";

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/", (req, res) => {
  res.send("ok");
});
app.get("/penjualan", (req, res) => {
  try {
    con.query("select * from Penjualan", function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// getproduct
app.get("/products", (req, res) => {
  try {
    con.query("select * from Product", function (err, result) {
      if (err) throw err;
      //   response(200, result, "data produk", res);
      res.status(200).json(result);
    });
  } catch (error) {
    // response(500, ");
    res.status(500).json({ msg: error.message });
  }
});

// get prduk by id
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  try {
    con.query(`select * from Product where id=${id}`, function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// simpan poduk
app.post("/products", (req, res) => {
  const { nama, hjual, hbeli } = req.body;
  const sql = `INSERT INTO PRODUCT VALUES('','${nama}',${hbeli},${hjual},now())`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
// update produk
app.patch("/products/:id", (req, res) => {
  const id = req.params.id;
  const { nama, hjual, hbeli } = req.body;
  const sql = `UPDATE PRODUCT SET NAMA='${nama}',HJUAL=${hjual},HBELI=${hbeli},CREATEAT=NOW() WHERE ID=${id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
// delete produk
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM PRODUCT WHERE ID='${id}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
