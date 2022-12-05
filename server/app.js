require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 4001;
const router = require("./routers/index");
const { main } = require("./config/mongodb_connection");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

main().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
