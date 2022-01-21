require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const isUrl = require("is-url");

// Basic Configuration
const port = process.env.PORT || 3000;
let count = 0;
const shortendUrls = {};

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;

  if (!isUrl(url)) {
    res.send({ error: "invalid url" });
    return;
  }

  count += 1;
  shortendUrls[count] = url;
  res.send({ original_url: url, short_url: count });
});

app.get("/api/shorturl/:id", (req, res) => {
  const { id } = req.params;
  const url = shortendUrls[id];

  res.redirect(url);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
