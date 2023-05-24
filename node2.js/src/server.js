import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectBD from "../src/config/connectDB";
require("dotenv").config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectBD();
let port = process.env.PORT;
app.listen(port, () => {
  console.log("backend Nodejs is running: " + port);
});
