const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const userRouter = express.Router();

// route for user registeration
userRouter.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      res.send({ message: "User already registered." });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          user = new UserModel({ name, email, password: hash, address });
          await user.save();
          res.send({ message: "User registered successful!" });
        }
      });
    }
  } catch (error) {
    console.log("Error occurred while registering the user!");
    console.log(error);
  }
});


// route for user to login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    const hashed_password = user[0]?.password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.KEY);
          res.send({ message: "Login successfull!", token: token });
        } else {
          res.send({ message: "Invalid email or password!" });
        }
      });
    } else {
      res.send({ message: "User not found!" });
    }
  } catch (error) {
    console.log("Error occurred while loggin in!");
    console.log(error);
  }
});

// route for user to reset the password with their id
userRouter.put("/:id/reset", async (req, res) => {
  const ID = req.params.id;
  const { currPassword, newPassword } = req.body;
  try {
    const user = await UserModel.find({ _id: ID });
    const hashed_password = user[0]?.password;
    if (user) {
      bcrypt.compare(currPassword, hashed_password, (err, result) => {
        if (result) {
          bcrypt.hash(newPassword, 5, async (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              await UserModel.findByIdAndUpdate(
                { _id: ID },
                { password: hash }
              );
              res.send({ message: "Password reset successfully!" });
            }
          });
        } else {
          res.send({
            message:
              "Current password doesn't match with the password in the database!",
          });
        }
      });
    } else {
      res.send({ message: "User not found!" });
    }
  } catch (error) {
    console.log("Error occurred while resetting the password");
    console.log(error);
  }
});

module.exports = {
  userRouter,
};
