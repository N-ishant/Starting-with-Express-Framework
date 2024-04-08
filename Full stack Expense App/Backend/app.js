const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");

const app = express();

app.use(cors());

const expenseRoutes = require("./routes/expenses");

app.use(bodyParser.json({ extended: false }));

app.use(expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(8000, () => {
      console.log("Serer started at port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });