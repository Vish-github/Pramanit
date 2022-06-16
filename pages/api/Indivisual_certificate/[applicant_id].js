import connectDB from "../../../middleware/mongodb";
import BirthApplication from "../../../models/BirthApplication.schema";
import User from "../../../models/User.schema";

const handler = async (req, res) => {
  console.log(req.query);
  const {id} = req.query;
  const data = await BirthApplication.findOne({applicant_id: id});
  const emailGetter = await User.findOne({_id: id});
  const email = emailGetter.email;
  console.log(data);
  if (data != undefined || data != null) {
    let allData = {email, data};
    return res.status(200).send({allData});
  } else {
    return res.status(404).send({error: "No data find"});
  }
};

export default connectDB(handler);
