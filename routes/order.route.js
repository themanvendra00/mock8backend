const express = require("express");
const { OrderModel } = require("../models/order.model");

const orderRouter = express.Router();

orderRouter.get("/:id", async (req, res) => {
  try {
    const orders = await OrderModel.findById(req.params.id);
    res.send({
      message: `Here is the list of orders with id:${req.params.id}`,orders
    });
  } catch (error) {
    console.log(
      `Error occurred while finding the orders of id:${req.params.id}`
    );
    console.log(error);
  }
});

orderRouter.post("/", async (req, res) => {
  const { user, restaurant, items, totalPrice, deliveryAddress, status } =
    req.body;
  try {
    const newOrder = new OrderModel({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status,
    });
    await newOrder.save();
    res.send({ message: "Placed order!!!", newOrder });
  } catch (error) {
    console.log("Error occurred while ordering!");
    console.log(error);
  }
});

orderRouter.put("/:id", async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      message: `Status updated successfully with id:${req.params.id}`,
    });
  } catch (error) {
    console.log(
      `Error occurred while updating the status of order with id:${req.params.id}`
    );
    console.log(error);
  }
});



module.exports={
    orderRouter,
}