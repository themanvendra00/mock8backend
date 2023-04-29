const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const orderSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  restaurant: { type: ObjectId, ref: "Restaurant" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  status: String, // e.g, "placed", "preparing", "on the way", "delivered"
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = {
  OrderModel,
};
