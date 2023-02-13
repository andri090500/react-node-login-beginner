const express = require("express");
const cors = require("cors");
const db = require("./database.js");
const app = express();
const PORT = 3001;

app.use(express.json()); // buat ambil data dari client dan di parse ke json
app.use(cors()); // buat izin

app.get("/", (req, res) => {
  res.send("Backend is ready!!!");
});
// register
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    `INSERT INTO user(username,password) VALUES('${username}','${password}')`,
    (err, result) => {
      if (err) return console.log("data failed to inserting");
      console.log("data successful inserting");
      const response = JSON.parse(JSON.stringify(result));
      res.send(response);
    }
  );
});
// login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`,
    (err, result) => {
      if (err) {
        // si err ini buat ngecek struktur query
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
        // console.log(result);
      } else {
        res.send({ message: "username or password is wrong" });
      }
    }
  );
});

app.listen(PORT, () => console.log("Server is Running at port 3001"));
