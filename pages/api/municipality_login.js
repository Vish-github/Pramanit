const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import connectDB from "../../middleware/mongodb";
import Municipality from "../../models/Municipality.schema";

const handler = async (req, res) => {
  console.log(req.body);
  await Municipality.findOne({email: req.body.email})
    .then((municipality, err) => {
      console.log("error: ", err);
      if (err) {
        console.log(err);
      } else {
        if (!municipality) {
          console.log("invalid email");
          res.status(401).send("invalid Email");
        } else {
          console.log("bycrpyt compare");
          bcrypt
            .compare(req.body.password, municipality.password)
            .then((isMatch) => {
              if (isMatch) {
                console.log("generating token");
                let payload = {subject: municipality._id};
                // let token = municipality.generateAuthToken();
                const token = jwt.sign({_id: municipality._id}, "musecret", {
                  expiresIn: "7d",
                });
                // let token = jwt.sign(payload, "process.env.JWTPRIVATEKEY");
                console.log("login successfully");
                res.status(200).send({
                  municipality,
                  token,
                });
              } else {
                res.status(401).send("invalid Password");
              }
            });
        }
      }
    })
    .catch((err) => {
      console.log("invalid municipality");
      res.status(401).send("municipality dosen't exist");
    });
};

export default connectDB(handler);
