const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const loginRoute = require("./Routes/loginRoute");
const { request, response } = require("express");
const server = express();
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected");
    server.listen(process.env.PORT || 8080, () => {
      console.log("from 8080");
    });
  })
  .catch((error) => console.log("Db Connection Error " + error));

server.use(morgan(":method :url"));
server.use(cors());

server.use(express.json());
server.use(loginRoute);
// server.use(speakerRoute);
// server.use(studentRoute);
// server.use(eventRoute);

server.use((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

server.use((error, request, response, next) => {
  response.status(500).json({ message: "Internal Error" + error });
});
