const express = require("express");
const app = express();
const port = 3000;
const ip = require("ip");
const ipAddr = ip.address();
const router = require("./routes/start");

app.use(express.json());
app.use(express.static("public"));

app.use("/", require("./routes/start"));

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
    console.log(`Server run : ${ipAddr}:${port}`);
  });
};

initializeApp();

app.use(router);

let lastHouseVisited = "Gryffondor";

app.get("/Color", (req, res) => {
  return res.json({ message: lastHouseVisited });
});

app.post("/Color", (req, res) => {
  lastHouseVisited = req.body.house;
  return res.json({ message: lastHouseVisited });
});
