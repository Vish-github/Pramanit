const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import connectDB from "../../middleware/mongodb";

import ThirdPartyCompany from "../../models/ThirdPartyCompany.schema";

// const path = require("path");
const saltRound = 8;
let {db} = connectDB;
const handler = async (req, res) => {
  console.log(req.body.username);
  if (req.method === "POST") {
    ThirdPartyCompany.findOne({email: req.body.email}, (err, user) => {
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
        const newUser = new ThirdPartyCompany({
          name: username,
          password,
          email,
        });
        bcrypt.hash(newUser.password, saltRound, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          console.log("New user", newUser);
          newUser.save((err, user) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Third Party created");
              res.status(200).send(user);
            }
          });
        });
      } else if (user) {
        res.status(401).send("Third Party Already exists");
      }
    });
  }
};

export default connectDB(handler);
