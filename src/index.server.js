const express = require("express");
const app = express();
const env = require("dotenv");
const bodyParser = require("body-parser"); //we can use app.use(express.json()) to parse the data but its better to use a library that is made specifically for this purpose which is body-parser.
const mongoose = require("mongoose");

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");

//environment variable or you can say constants
env.config(); //dotenv allows you to use value from your .env file.

//mondodb connection
mongoose
  .connect(
    `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.ahqbj.mongodb.net:27017,cluster0-shard-00-01.ahqbj.mongodb.net:27017,cluster0-shard-00-02.ahqbj.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-79k3p5-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log("Database connected");
  });

//app.use(express.json()); //since we are using Json data we are using json to parse the data
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Middlewares : When you are making a request from POSTMAN or from a browser, and at the backend you are handling the request in between making the request and handling the request if you manipulate the data according to your requirement thats a middleware , so we'll write some functions so we can do that.
app.use("/api", authRoutes); //Every request will be prefixed with 'api' for the userRoutes and the useRoutes will be called which are available in '/routes/user.js'
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
