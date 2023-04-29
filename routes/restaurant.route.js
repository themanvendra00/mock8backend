const express = require("express");
const { RestaurantModel } = require("../models/restaurant.model");

const restaurantRouter = express.Router();

restaurantRouter.get("/", async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.send({ message: "List of all the restaurants available", restaurants });
  } catch (error) {
    console.log(`Error occurred while finding the restaurant`);
    console.log(error);
  }
});

restaurantRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const restaurant = await RestaurantModel.find({ _id: ID });
    res.send({ message: `Details of restaurant with id:${ID}:`, restaurant });
  } catch (error) {
    console.log(`Error occurred while finding the restaurant with id:${ID}`);
    console.log(error);
  }
});

restaurantRouter.get("/:id/menu", async (req, res) => {
  const ID = req.params.id;
  try {
    const restaurant = await RestaurantModel.find({ _id: ID });
    const menu = restaurant[0]?.menu;
    res.send({
      message: `Here is the menu of restaurant with id:${ID}:`,
      menu,
    });
  } catch (error) {
    console.log(
      `Error occurred while finding the menu of restaurant with id:${ID}`
    );
    console.log(error);
  }
});

restaurantRouter.post("/addrestaurant", async (req, res) => {
  const { name, address, menu } = req.body;
  try {
    const addRestaurant = new RestaurantModel({ name, address, menu });
    await addRestaurant.save();
    res.send({ message: "Restaurant added successfully!" });
  } catch (error) {
    console.log("Error occurred while posting/adding the restaurant!");
    console.log(error);
  }
});

restaurantRouter.post("/:id/menu", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    const restaurant = await RestaurantModel.findById({ _id: ID });
    if (!restaurant) {
      res.send({ message: `Restaurant with id:${ID} not found!` });
    }
    restaurant.menu.push(payload);
    await restaurant.save();
    res.send({
      message: `Added new menu to Restaurant with id:${ID}!`,
    });
  } catch (error) {
    console.log(`Error occurred while updating the restaurant menu`);
    console.log(error);
  }
});

restaurantRouter.delete("/:id/menu/:menuID", async (req, res) => {
  const restaurantID = req.params.id;
  const menuID = req.params.menuID;
  try {
    const restaurant = await RestaurantModel.find({ _id: restaurantID });
    if (!restaurant) {
      res.send({ message: `Restaurant with id:${restaurantID} not found` });
    } else {
      const menu = restaurant[0].menu.find({_id:menuID});
      console.log(menu)
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = {
  restaurantRouter,
};
