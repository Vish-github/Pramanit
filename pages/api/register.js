const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import connectDB from "../../middleware/mongodb";

import User from '../../models/User.schema'
// const path = require("path");
const saltRound = 8;
let {db}= connectDB
const handler = async (req, res) => {
  console.log(req.body);
  if (req.method === "POST") {
    User.findOne({email: req.body.email}, (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        console.log(req.body);
        if (req.body == null) {
          return;
        }
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const newUser = new User({
          username,
          password,
          email,
        });
        bcrypt.hash(newUser.password, saltRound, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save((err, user) => {
            if (err) {
              console.log(err);
            } else {
              console.log("user created");
              let payload = {subject: user.Id};
              // let token = newUser.generateAuthToken();
              let token = jwt.sign(payload, process.env.SECRET_KEY);
              res.status(200).send({token, user});
            }
          });
        });
      } else if (user) {
        res.status(401).send("User Already exists");
      }
    });
  }
};

export default connectDB(handler);
