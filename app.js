const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb+srv://1234:" +
    process.env.MONGO_PW +
    "@cluster0.vjzkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const productsRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

mongoose.Promise = global.Promise;

// async function startServer(err) {
//   if (err) { // detecta si hay un error, si hay error, crashea la app
//     throw err
//   }
//   console.log('Connected to DB') // sino, continua con la rutina
//   // app.listen(PORT, () => { // inicia el servidor
//   //   console.log(`Server started at port: ${PORT}`)
//   // })
// }
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-ControlAllow-Origin", "*");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requiested-With, Content-Type , Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
