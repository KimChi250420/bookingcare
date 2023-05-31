import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectBD from "../src/config/connectDB";
import cors from "cors";
require("dotenv").config();
let app = express();
// app.use(cors({ origin: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    " X-Requested-With, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectBD();
let port = process.env.PORT;
app.listen(port, () => {
  console.log("backend Nodejs is running: " + port);
});
