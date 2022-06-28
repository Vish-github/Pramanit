import connectDB from "../../middleware/mongodb";
import ThirdPartyCompany from "../../models/ThirdPartyCompany.schema";

const handler = async (req, res) => {
  ThirdPartyCompany.find()
    .then((companies) => {
      let dataarray = [];
      companies.forEach((company) => {
        dataarray.push({
          label: company.name,
          id: company._id,
        });
      });
      res.send(dataarray);
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(400).send(err);
    });
};
export default connectDB(handler);
