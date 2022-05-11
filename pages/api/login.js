const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import connectDB from "../../middleware/mongodb";

let user = require("../../models/User.schema");

const handler = async (req, res) => {
  console.log("request for login", req.body);
  await user
    .findOne({email: req.body.email})
    .then((user, err) => {
      console.log("error: ", err);
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(401).send("invalid Email");
        } else {
          console.log("bycrpyt compare");
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (isMatch) {
              console.log("generating token");
              let payload = {subject: user._id};
              let token = user.generateAuthToken();
              // let token = jwt.sign(payload, "process.env.JWTPRIVATEKEY");
              console.log("login successfully");
              res.status(200).send({level: user.level, ward: user.ward, token});
            } else {
              res.status(401).send("invalid Password");
            }
          });
        }
      }
    })
    .catch((err) => {
      console.log("invalid user");
      res.status(401).send("User dosen't exist");
    });
};

export default connectDB(handler);
