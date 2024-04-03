const path = require("node:path");
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactUsRoutes = require("./routes/contactUs");
const successRoutes = require("./routes/success");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(contactUsRoutes);
app.use(successRoutes);

app.use(errorController.get404);

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

// app.listen(8000, () => {
//   console.log("Serer started at port 8000");
// });

/* 
NOTE :
(1) ORM stands for Object-Relational Mapping. It's like a bridge between the world of databases and the world 
    of programming languages.
(2) Imagine you have a database where you store information, like a list of books in a library. In traditional
    programming, you'd write code to interact with this database, which usually involves a lot of SQL queries 
    to fetch, insert, update, or delete data.
(3) But with ORM, you can think of your database tables as if they were objects in your programming language 
    (like Python, Java, or C#). So instead of writing SQL queries directly, you work with these objects, and 
    the ORM library handles the translation between your objects and the database tables.
(4) In simple terms, ORM helps you work with databases in your code more easily by letting you interact with 
    them using the programming language's natural syntax, rather than dealing with complex SQL queries. It 
    makes database operations more intuitive and saves you from writing a lot of repetitive code.            
*/

/* 
(1) Sequelize is a third party pacakage available in npm for NodeJS.
(2) Sequelize is an Object-Relational Mapping(ORM) Library for NodeJS.
(3) In the context of Express.js, Sequelize provides a powerful set of tools for managing relational databases,
    such as MySQL, PostgreSQL, SQLite, and MSSQL. It offers features like defining models to represent 
    database tables, establishing associations between models, executing CRUD (Create, Read, Update, Delete) 
    operations, and performing complex queries.
(4) By using Sequelize, developers can streamline database operations, enhance code maintainability, and reduce
    the need for writing raw SQL queries. It provides a higher level of abstraction, enabling developers to 
    focus more on application logic rather than database intricacies.
(5) In Sequelize, sync() is a method that synchronizes all defined models with the database schema, creating 
    tables for any models that do not already exist in the database. It ensures that the database schema 
    matches the Sequelize model definitions. 
    (*) sync() awares of all our models and it then basically creates tables for them in database.
(6) With Sequelize v5, findById() was replaced by findByPk().           
*/