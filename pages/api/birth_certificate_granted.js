import connectDB from "../../middleware/mongodb";
import User from "../../models/User.schema";
import BirthApplication from "../../models/BirthApplication.schema";

const handler = async (req, res) => {
  const data = {
    birthIpfsHash: req.body.birthhash,
    birthTransactionId: req.body.birthtransaction,
    birthCertificateStatus: 2,
  };
  await User.findOneAndUpdate({email: req.body.email}, data)
    .then((certificate) => {
      BirthApplication.findOneAndUpdate({_id: req.body.id}, {issued: 1})
        .then((response) => {
          console.log("Successfully updated data");
          res.send("Successfully updated data");
        })
        .catch((err) => {
          console.log("Error", err);
        });
    })
    .catch((err) => {
      console.log("Cannot Update some error occured", err);
      res.status(401).send("Cannot Update some error occured");
    });
};

export default connectDB(handler);
