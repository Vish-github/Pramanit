import connectDB from "../../middleware/mongodb";
import ThirdPartyCompany from "../../models/ThirdPartyCompany.schema";

const handler = async (req, res) => {
  console.log("data", req.body);
  ThirdPartyCompany.updateOne(
    {_id: req.body.id},
    {$push: {deathcertificates: req.body.data}}
  )
    .then((response) => {
      console.log("Response", response);
      res.send(response);
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(400).send(err);
    });
};
export default connectDB(handler);
