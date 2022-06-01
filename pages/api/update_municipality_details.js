import connectDB from "../../middleware/mongodb";
import MunicipalitySchema from "../../models/Municipality.schema";

const handler = (req, res) => {
  MunicipalitySchema.findOneAndUpdate({email: req.body.email}, req.body)
    .then((response) => {
      console.log("res", response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(400).send(err);
    });
};

export default connectDB(handler);
