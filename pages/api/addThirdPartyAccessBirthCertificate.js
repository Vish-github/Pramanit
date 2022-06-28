import connectDB from "../../middleware/mongodb";
import ThirdPartyCompany from "../../models/ThirdPartyCompany.schema";
import BirthApplication from "../../models/BirthApplication.schema";

const handler = async (req, res) => {
  // BirthApplication.findOne({applicant_id: req.body.applicant_id}).then(
  //   (certificate, err) => {
  //     if (err) {
  //       console.log("Error", err);
  //       res.status(400).send(err);
  //     }
  console.log(req.body.data);
  ThirdPartyCompany.updateOne(
    {_id: req.body.id},
    {$push: {birthcertificates: req.body.data}}
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
// );
// };
export default connectDB(handler);
