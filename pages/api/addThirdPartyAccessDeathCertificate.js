import connectDB from "../../middleware/mongodb";
import ThirdPartyCompany from "../../models/ThirdPartyCompany.schema";

const handler = async (req, res) => {
  ThirdPartyCompany.updateOne(
    {_id: req.id},
    {$push: {deathcertificates: req.certiid}}
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
