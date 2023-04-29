const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { restaurantRouter } = require("./routes/restaurant.route");
const { orderRouter } = require("./routes/order.route");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Food delivery app" });
});

app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);
app.use("/orders", orderRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error occurred while connecting to database");
    console.log(error);
  }
  console.log(`App is running at http://localhost:${port}`);
});
