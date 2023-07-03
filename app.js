require("dotenv/config");
const express = require("express");
const app = express();

const router = require("./routes/index");

//Setup CORS
const cors = require("cors");
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
};

//Set up middleware
app.use(express.json());
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
