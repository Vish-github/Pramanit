const bcrypt = require("bcryptjs");

import connectDB from "../../middleware/mongodb";
import SuperAdmin from "../../models/SuperAdmin.schema";

const handler = async (req, res) => {
  await SuperAdmin.findOne({email: req.body.email})
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
              res.status(200).send({
                user,
                type: "SUPER_ADMIN",
              });
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
