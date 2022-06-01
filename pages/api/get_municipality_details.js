import connectDB from "../../middleware/mongodb";
import Municipality from "../../models/Municipality.schema";

const handler = async (req, res) => {
  await Municipality.findOne({email: req.body.email})
    .then((municipality, err) => {
      if (err) {
        console.log(err);
      } else {
        if (!municipality) {
          console.log("invalid email");
          res.status(401).send("invalid Email");
        } else {
          let mun = municipality;
          mun.password = "";
          res.status(200).send(mun);
        }
      }
    })
    .catch((err) => {
      console.log("invalid municipality");
      res.status(401).send("municipality dosen't exist");
    });
};

export default connectDB(handler);
