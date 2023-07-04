require("dotenv/config");
const express = require("express");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");

//Setup app
const app = express();

//Setup CORS
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};

//Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/", router);

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION);
}

app.listen(process.env.PORT, () =>
  console.log(`App alive at http://localhost:${process.env.PORT}/`)
);
